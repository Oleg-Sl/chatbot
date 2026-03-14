import json
import time
from typing import Dict, Union
from requests import post, adapters, exceptions
from sqlalchemy.ext.asyncio import async_sessionmaker, AsyncSession

from app.repositories.credentials import CredentialRepository
from app.models.database.credentials import Credentials
from app.database.uow import IUnitOfWork, UnitOfWork
from sqlalchemy.ext.asyncio import async_sessionmaker, AsyncSession


adapters.DEFAULT_RETRIES = 10


class BitrixApiClient:
    api_url = 'https://%s/rest/%s.json'
    oauth_url = 'https://oauth.bitrix.info/oauth/token/'
    timeout = 60

    def __init__(self, session_factory: async_sessionmaker[AsyncSession]):
        self.session_factory = session_factory

    async def load_token(self, domain: str):
        async with UnitOfWork(self.session_factory) as uow:
            token = await uow.credentials.filter(Credentials.domain == domain)
        return token

    async def refresh_tokens(self, token_data: Credentials) -> Union[bool, Dict]:
        try:
            r = post(
                self.oauth_url,
                params={
                    'grant_type': 'refresh_token',
                    'client_id': token_data.client_id,
                    'client_secret': token_data.client_secret,
                    'refresh_token': token_data.refresh_token
                }
            )
            result = r.json()
            print('REFRESH TOKEN = ', result)
            async with UnitOfWork(self.session_factory) as uow:
                await uow.credentials.edit_one(
                    ident = token_data.id,
                    data = {
                        'auth_token': result['access_token'],
                        'refresh_token': result['refresh_token']
                    }
                )
                await uow.commit()
            return True
        except Exception as e:
            return {'error': f"Failed to refresh token: {e}"}

    async def call(self, domain: str, method: str, params: Dict) -> Dict:
        token_data = await self.load_token(domain)
        if not token_data:
            return dict(error='No credentials found for domain: %s' % domain)

        r = None
        try:
            url = self.api_url % (token_data.domain, method)
            url += '?auth=' + token_data.auth_token
            headers = {
                'Content-Type': 'application/json',
            }
            r = post(url, data=json.dumps(params), headers=headers, timeout=self.timeout)
            result = r.json()
        except ValueError:
            result = dict(error='Error on decode api response [%s]' % r.text if r else 'No response')
        except exceptions.ReadTimeout:
            result = dict(error='Timeout waiting expired [%s sec]' % str(self.timeout))
        except exceptions.ConnectionError:
            result = dict(error='Max retries exceeded [' + str(adapters.DEFAULT_RETRIES) + ']')

        if 'error' in result and result['error'] in ('NO_AUTH_FOUND', 'expired_token'):
            result_update_token = await self.refresh_tokens(token_data)
            if result_update_token is not True:
                return result
            result = await self.call(domain, method, params)
        elif 'error' in result and result['error'] in ['QUERY_LIMIT_EXCEEDED', ]:
            time.sleep(2)
            return await self.call(domain, method, params)

        return result

    async def batch(self, domain: str, params):
        if 'halt' not in params or 'cmd' not in params:
            return dict(error='Invalid batch structure')
        method = 'batch'
        return await self.call(domain, method, params)

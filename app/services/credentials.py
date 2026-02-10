from app.database.uow import IUnitOfWork
from app.schemas.credentials import CredentialSchema
from app.models.database.credentials import Credentials


class CredentialsService:
    async def add_credential(self, uow: IUnitOfWork, credential: CredentialSchema):
        credential_dict = credential.model_dump()

        async with uow:
            credential_id = await uow.credentials.add_one(credential_dict)
            await uow.commit()
            return credential_id

    async def create_or_update_credential(self, uow: IUnitOfWork, credential_data: CredentialSchema):
        credential_dict = credential_data.model_dump()

        async with uow:
            _credential = await uow.credentials.filter(Credentials.domain == credential_data.domain)
            if _credential:
                print('_credential.id = ', _credential.id)
                credential_id = await uow.credentials.edit_one(_credential.id, credential_dict)
            else:
                print('_credential id not found')
                credential_id = await uow.credentials.add_one(credential_dict)
            await uow.commit()
            return credential_id

    # async def get_credentials(self, uow: IUnitOfWork):
    #     async with uow:
    #         credentials = await uow.credentials.find_all()
    #         return credentials

    # async def edit_credential(self, uow: IUnitOfWork, credential_id: int, credential: BitrixClientSchema):
    #     credential_dict = credential.model_dump()
    #     async with uow:
    #         curr_credential = await uow.credentials.edit_one(credential_id, credential_dict)
    #         await uow.commit()
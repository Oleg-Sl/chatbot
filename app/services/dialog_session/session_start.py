import re
from typing import Optional
from app.api.dependencies import IUnitOfWork
from app.clients.dialog_client import DialogClient


class SessionStartService:
    def __init__(self, uow: IUnitOfWork, dialog_client: DialogClient) -> None:
        self.uow = uow
        self.dialog_client = dialog_client

    async def handle(
        self,
        domain,
        connector_id,
        connector_line_id,
        connector_user_id,
        chat_id
        ) -> bool:
        dialog = await self.dialog_client.get_dialog_data(
            domain=domain,
            dialog_id=f'chat{chat_id}'
        )
        contact_id = self.get_contact_id(dialog)
        connector_chat_id = self.get_connector_chat_id(dialog)
        task_id = await self.create_dialog_session(
            connector_id=connector_id,
            connector_line_id=connector_line_id,
            connector_user_id=connector_user_id,
            connector_chat_id=connector_chat_id,
            contact_id=contact_id,
            chat_id=chat_id
        )

        return True if task_id else False

    async def create_dialog_session(self, connector_id, connector_line_id, connector_user_id, connector_chat_id, contact_id, chat_id) -> Optional[int]:
        try:
            async with self.uow:
                task_id = await self.uow.dialog_session.create_or_update({
                    "connector_id": connector_id,
                    "connector_line_id": connector_line_id,
                    "connector_user_id": connector_user_id,
                    "connector_chat_id": connector_chat_id,
                    "contact_id": contact_id,
                    "chat_id": chat_id
                })
                await self.uow.commit()
                return task_id
        except Exception as e:
            print('Error while adding task reminder: ', e)

    def get_contact_id(self, dialog_data: dict) -> Optional[str]:
        for val in dialog_data.values():
            match = re.search(r'CONTACT\s*\|\s*(\d+)', val)
            if match:
                return match.group(1)
    
    def get_connector_chat_id(self, dialog_data: dict) -> Optional[str]:
        items = dialog_data['entity_id'].split('|')
        if len(items) == 3:
            return items[2]
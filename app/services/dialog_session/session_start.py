import re
from typing import Optional
from sqlalchemy.ext.asyncio import async_sessionmaker, AsyncSession

from app.api.dependencies import IUnitOfWork, UnitOfWork
from app.clients.dialog_client import DialogClient
from app.schemas.dtos.start_dialog_input_dto import StartDialogInputDTO
from app.domains.dialog import Dialog, SessionStatus


class SessionStartService:
    def __init__(self, uow: IUnitOfWork, dialog_client: DialogClient) -> None:
        self.uow = uow
        self.dialog_client = dialog_client

    async def handle(
        self,
        domain: str,
        data: StartDialogInputDTO
        ) -> bool:

        dialog = await self.dialog_client.get_dialog_data(
            domain=domain,
            dialog_id=f'chat{data.chat_id}'
        )
        contact_id = self.get_contact_id(dialog)
        connector_chat_id = self.get_connector_chat_id(dialog)

        dialog = await self.uow.dialog_session.search_by_bitrix_chat_id(data.chat_id)
            
        if dialog is None:
            dialog = Dialog(
                ident=None,
                connector_id=data.connector_id,
                connector_line_id=data.connector_line_id,
                connector_user_id=data.connector_user_id,
                connector_chat_id=connector_chat_id,
                chat_id=data.chat_id,
                contact_id=contact_id
            )

        dialog.contact_id = contact_id
        dialog.start_dialog()

        dialog_id = await self.uow.dialog_session.save(dialog)
        await self.uow.commit()
        
        return True if dialog_id else False

    def get_contact_id(self, dialog_data: dict) -> Optional[str]:
        for val in dialog_data.values():
            match = re.search(r'CONTACT\s*\|\s*(\d+)', val)
            if match:
                return match.group(1)
    
    def get_connector_chat_id(self, dialog_data: dict) -> Optional[str]:
        items = dialog_data['entity_id'].split('|')
        if len(items) > 3:
            return items[2]

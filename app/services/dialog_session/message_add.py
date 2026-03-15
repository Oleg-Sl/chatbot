import re
import datetime
from typing import Optional

from app.api.dependencies import IUnitOfWork
from app.clients.dialog_client import DialogClient
from app.schemas.dtos.add_message_input_dto import AddMessageInputDTO
from app.domains.dialog import Dialog


class MessageAddService:
    def __init__(self, uow: IUnitOfWork, dialog_client: DialogClient) -> None:
        self.uow = uow
        self.dialog_client = dialog_client

    async def handle(
            self,
            domain: str,
            data: AddMessageInputDTO
        ) -> bool:

        if not data.user_id:
            return False

        dialog = await self.uow.dialog_session.search_by_connector_chat_id(data.connector_chat_id)

        if dialog and dialog.is_taken():
            return False
        
        if dialog is None:
            dialog = await self.generate_dialog(domain, data)

        dialog.add_message(data.user_id)

        dialog_id = await self.uow.dialog_session.save(dialog)
        await self.uow.commit()

        if dialog and dialog.contact_id and dialog.is_taken():
            result = await self.dialog_client.update_contact(
                domain=domain,
                contact_id=dialog.contact_id,
                date_communication=datetime.datetime.now().strftime('%Y-%m-%d')
            )

        return True if dialog_id else False

    async def generate_dialog(self, domain: str, data: AddMessageInputDTO) -> Dialog:
        dict_dialog = await self.dialog_client.get_dialog_data(
            domain=domain,
            user_code=f'{data.connector_id}|{data.connector_line_id}|{data.connector_chat_id}|{data.connector_user_id}'
        )
        contact_id = self.get_contact_id(dict_dialog)

        return Dialog(
            ident=None,
            connector_id=data.connector_id,
            connector_line_id=data.connector_line_id,
            connector_user_id=data.connector_user_id,
            connector_chat_id=data.connector_chat_id,
            chat_id=dict_dialog['bitrix_chat_id'],
            contact_id=contact_id
        )

    def get_contact_id(self, dialog_data: dict) -> Optional[str]:
        for val in dialog_data.values():
            match = re.search(r'CONTACT\s*\|\s*(\d+)', val)
            if match:
                return match.group(1)

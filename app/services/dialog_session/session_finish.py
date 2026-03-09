import datetime
from typing import Optional
from app.api.dependencies import IUnitOfWork
from app.clients.dialog_client import DialogClient
from app.models.database.dialog_sessions import DialogSessions
from app.schemas.dtos.closed_dialog_input_dto import ClosedDialogInputDTO


class SessionFinishService:
    def __init__(self, uow: IUnitOfWork, dialog_client: DialogClient) -> None:
        self.uow = uow
        self.dialog_client = dialog_client

    async def handle(
        self,
        domain: str,
        data: ClosedDialogInputDTO
        ) -> bool:

        async with self.uow as uow:
            dialog = await uow.dialog_session.search_by_bitrix_chat_id(data.chat_id)

        if dialog is None:
            return False

        dialog.closed_dialog()

        async with self.uow as uow:
            dialog_id = await uow.dialog_session.save(dialog)

        if dialog.contact_id:
            result = await self.dialog_client.update_contact(
                domain=domain,
                contact_id=dialog.contact_id,
                date_communication=datetime.datetime.now().strftime('%Y-%m-%d')
            )
    
        return True if dialog_id else False

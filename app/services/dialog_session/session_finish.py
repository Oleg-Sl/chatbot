import datetime
from typing import Optional
from sqlalchemy.ext.asyncio import async_sessionmaker, AsyncSession

from app.api.dependencies import IUnitOfWork, UnitOfWork
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

        # async with UnitOfWork(self.session_factory) as uow:
        dialog = await self.uow.dialog_session.search_by_bitrix_chat_id(data.chat_id)

        if dialog is None:
            return False

        dialog.closed_dialog()

        # async with UnitOfWork(self.session_factory) as uow:
        dialog_id = await self.uow.dialog_session.save(dialog)
        await self.uow.commit()

        if dialog.contact_id:
            result = await self.dialog_client.update_contact(
                domain=domain,
                contact_id=dialog.contact_id,
                date_communication=datetime.datetime.now().strftime('%Y-%m-%d')
            )
            print('RESULT = ', result)
    
        return True if dialog_id else False

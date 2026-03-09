from typing import Optional
from app.api.dependencies import IUnitOfWork
from app.clients.dialog_client import DialogClient
from app.models.database.dialog_sessions import DialogSessions


class SessionFinishService:
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

        result = await self.update_session(
            connector_id=connector_id,
            connector_line_id=connector_line_id,
            connector_user_id=connector_user_id,
            chat_id=chat_id
        )
    
        return True

    async def update_session(self, connector_id, connector_line_id, connector_user_id, chat_id) -> Optional[int]:
        try:
            async with self.uow as uow:
                dialogs = await uow.dialog_session.filter({
                    DialogSessions.connector_id == connector_id,
                    DialogSessions.connector_line_id == connector_line_id,
                    DialogSessions.connector_user_id == connector_user_id,
                    DialogSessions.chat_id == chat_id
                })
                if dialogs:
                    dialog_id = dialogs[0].id
                    await uow.dialog_session.edit_one(
                        dialog_id,
                        {
                            'session_status': DialogSessions.SessionStatus.CLOSED
                        }
                    )
        except Exception as e:
            print('Error while updating status of dialog session: ', e)
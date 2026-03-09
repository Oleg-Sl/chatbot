from typing import Optional

from app.api.dependencies import IUnitOfWork
from app.clients.sender_client import SenderClient
from app.models.database.dialog_sessions import DialogSessions


class MessageAddService:
    def __init__(self, uow: IUnitOfWork, sender_client: SenderClient) -> None:
        self.uow = uow
        self.sender_client = sender_client

    async def handle(
            self,
            domain,
            connector_id,
            connector_line_id,
            connector_user_id,
            connector_chat_id,
            from_user_id
        ) -> bool:

        if from_user_id == connector_user_id:
            return await self.update_session(
                connector_id,
                connector_line_id,
                connector_user_id,
                connector_chat_id,
                {
                    'client_message_exists': True
                }
            )

        return await self.update_session(
            connector_id,
            connector_line_id,
            connector_user_id,
            connector_chat_id,
            {
                'manager_message_exists': True
            }
        )

    async def update_session(self, connector_id, connector_line_id, connector_user_id, connector_chat_id, data) -> Optional[int]:
        try:
            async with self.uow as uow:
                dialogs = await uow.dialog_session.filter({
                    DialogSessions.connector_id == connector_id,
                    DialogSessions.connector_line_id == connector_line_id,
                    DialogSessions.connector_user_id == connector_user_id,
                    DialogSessions.connector_chat_id == connector_chat_id
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

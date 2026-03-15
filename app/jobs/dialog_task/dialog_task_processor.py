from sqlalchemy.ext.asyncio import async_sessionmaker, AsyncSession

from app.database.uow import IUnitOfWork, UnitOfWork
from app.clients.dialog_client import DialogClient
from app.schemas.dtos.dialog_events_dto import DialogEventDTO, DialogStatus
from app.services.dialog_session.message_add import MessageAddService
from app.services.dialog_session.session_start import SessionStartService
from app.services.dialog_session.session_finish import SessionFinishService
from app.schemas.dtos.start_dialog_input_dto import StartDialogInputDTO
from app.schemas.dtos.closed_dialog_input_dto import ClosedDialogInputDTO
from app.schemas.dtos.add_message_input_dto import AddMessageInputDTO


class DialogTaskProcessor:
    def __init__(self, uow: IUnitOfWork, dialog_client: DialogClient):
        self.uow = uow
        self.dialog_client = dialog_client
        self.message_add_service = MessageAddService(uow, dialog_client)
        self.session_start_service = SessionStartService(uow, dialog_client)
        self.session_finish_service = SessionFinishService(uow, dialog_client)

    async def process(self, task: DialogEventDTO, uow, dialog_client):
        self.message_add_service = MessageAddService(uow, dialog_client)
        self.session_start_service = SessionStartService(uow, dialog_client)
        self.session_finish_service = SessionFinishService(uow, dialog_client)

        result = None

        if task.event == 'ONSESSIONSTART':
            result = await self.session_start_service.handle(
                task.domain,
                StartDialogInputDTO(
                    connector_id=str(task.connector_id),
                    connector_line_id=str(task.connector_line_id),
                    connector_user_id=str(task.connector_user_id),
                    chat_id=str(task.bitrix_chat_id)
                )
            )
            
        if task.event == 'ONSESSIONFINISH':
            result = await self.session_finish_service.handle(
                task.domain,
                ClosedDialogInputDTO(
                    connector_id=task.connector_id,
                    connector_line_id=str(task.connector_line_id),
                    connector_user_id=str(task.connector_user_id),
                    chat_id=str(task.bitrix_chat_id)
                )
            )
            
        if task.event == 'ONOPENLINEMESSAGEADD':
            result = await self.message_add_service.handle(
                task.domain,
                AddMessageInputDTO(
                    connector_id=task.connector_id,
                    connector_line_id=str(task.connector_line_id),
                    connector_user_id=str(task.connector_user_id),
                    connector_chat_id=str(task.connector_chat_id),
                    chat_id=str(task.bitrix_chat_id),
                    user_id=str(task.from_user_id)
                )    
            )

        event_id = await self.uow.dialog_event.completed_processing(task.ident)
        await self.uow.commit()
        
        return result

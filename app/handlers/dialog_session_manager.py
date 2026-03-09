import re
from typing import List, Dict, Any, Optional

from app.handlers.base_handler import BaseEventHandler
# from app.models.event_data import EventData
from app.services.dialog_session.message_add import MessageAddService
from app.services.dialog_session.session_start import SessionStartService
from app.services.dialog_session.session_finish import SessionFinishService
from app.schemas.dtos.add_message_input_dto import AddMessageInputDTO
from app.schemas.dtos.start_dialog_input_dto import StartDialogInputDTO
from app.schemas.dtos.closed_dialog_input_dto import ClosedDialogInputDTO


class DialogSessionHandlerManager:
    def __init__(
        self,
        message_add_service: MessageAddService,
        session_start_service: SessionStartService,
        session_finish_service: SessionFinishService
        ) -> None:
        self.message_add_service = message_add_service
        self.session_start_service = session_start_service
        self.session_finish_service = session_finish_service

    async def handle(self, data: Dict[str, Any]) -> bool:
        event_type = data.get('event')
        domain = data.get('auth[domain]')

        connector_id: Optional[str] = data.get('data[DATA][connector][connector_id]')
        connector_line_id: Optional[str] = data.get('data[DATA][connector][line_id]')
        connector_user_id: Optional[str] = data.get('data[DATA][connector][user_id]')
        chat_id: Optional[str] = data.get('data[DATA][connector][chat_id]')

        if not domain or not connector_id or not connector_line_id or not connector_user_id or not chat_id:
            return False

        if event_type == 'ONSESSIONSTART':
            return await self.session_start_service.handle(
                domain,
                StartDialogInputDTO(
                    connector_id=connector_id,
                    connector_line_id=connector_line_id,
                    connector_user_id=connector_user_id,
                    chat_id=chat_id
                )
            )
            
        if event_type == 'ONSESSIONFINISH':
            return await self.session_finish_service.handle(
                domain,
                ClosedDialogInputDTO(
                    connector_id=connector_id,
                    connector_line_id=connector_line_id,
                    connector_user_id=connector_user_id,
                    chat_id=chat_id
                )
            )
            
        if event_type == 'ONOPENLINEMESSAGEADD':

            bx_chat_id = data.get('data[DATA][message][chat_id]')
            user_id = data.get('data[DATA][message][user_id]')
            return await self.message_add_service.handle(
                domain,
                AddMessageInputDTO(
                    connector_id=connector_id,
                    connector_line_id=connector_line_id,
                    connector_user_id=connector_user_id,
                    connector_chat_id=chat_id,
                    chat_id=bx_chat_id,
                    user_id=user_id
                )    
            )

        return False

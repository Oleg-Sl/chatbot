import re
from typing import List, Dict, Any, Optional

from app.handlers.base_handler import BaseEventHandler
# from app.models.event_data import EventData
from app.services.dialog_session.dialog_events_service import DialogEventService
from app.schemas.dtos.dialog_events_input_dto import DialogEventInputDTO
# from app.services.dialog_session.message_add import MessageAddService
# from app.services.dialog_session.session_start import SessionStartService
# from app.services.dialog_session.session_finish import SessionFinishService
# from app.schemas.dtos.add_message_input_dto import AddMessageInputDTO
# from app.schemas.dtos.start_dialog_input_dto import StartDialogInputDTO
# from app.schemas.dtos.closed_dialog_input_dto import ClosedDialogInputDTO


class DialogEventHandler:
    def __init__(self, dialog_events_service: DialogEventService) -> None:
        self.dialog_events_service = dialog_events_service

    async def handle(self, data: Dict[str, Any]) -> bool:
        event_type = data.get('event')

        if event_type not in set(['ONSESSIONSTART', 'ONSESSIONFINISH', 'ONOPENLINEMESSAGEADD']):
            return False

        domain = data.get('auth[domain]')

        connector_id: Optional[str] = data.get('data[DATA][connector][connector_id]')
        connector_line_id: Optional[str] = data.get('data[DATA][connector][line_id]')
        connector_user_id: Optional[str] = data.get('data[DATA][connector][user_id]')
        connector_chat_id: Optional[str] = data.get('data[DATA][connector][chat_id]')
        bitrix_chat_id: Optional[str] = data.get('data[DATA][connector][chat_id]')
        from_user_id: Optional[str] = data.get('data[DATA][message][user_id]')

        if event_type == 'ONSESSIONSTART' or event_type == 'ONSESSIONFINISH':
            connector_chat_id = None

        if event_type == 'ONOPENLINEMESSAGEADD':
            bitrix_chat_id = data.get('data[DATA][message][chat_id]')
        
        if not domain or not connector_id or not connector_line_id or not connector_user_id:
            return False

        return await self.dialog_events_service.handle(
            domain=domain,
            data=DialogEventInputDTO(
                event=event_type,
                connector_id=connector_id,
                connector_line_id=int(connector_line_id),
                connector_chat_id=int(connector_chat_id) if connector_chat_id else None,
                connector_user_id=int(connector_user_id),
                bitrix_chat_id=int(bitrix_chat_id) if bitrix_chat_id else None,
                from_user_id=int(from_user_id) if from_user_id else None
            )
        )

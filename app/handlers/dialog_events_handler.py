from typing import Dict, Any, Optional

from app.services.dialog_session.dialog_events_service import DialogEventService
from app.schemas.dtos.dialog_events_input_dto import DialogEventInputDTO


class DialogEventHandler:
    ignore_event_from_users = set([20949, ])
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
        bitrix_chat_id: Optional[str]    = data.get('data[DATA][connector][chat_id]')
        from_user_id: Optional[str]      = data.get('data[DATA][message][user_id]')

        if from_user_id and int(from_user_id) in self.ignore_event_from_users:
            return False

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

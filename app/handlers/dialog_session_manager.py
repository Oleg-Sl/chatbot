import re
from typing import List, Dict, Any, Optional

from app.handlers.base_handler import BaseEventHandler
# from app.models.event_data import EventData
from app.services.dialog_session.message_add import MessageAddService
from app.services.dialog_session.session_start import SessionStartService
from app.services.dialog_session.session_finish import SessionFinishService


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

        connector_id = data.get('data[DATA][connector][connector_id]')
        connector_line_id = data.get('data[DATA][connector][line_id]')
        connector_user_id = data.get('data[DATA][connector][user_id]')

        if not all([domain, connector_id, connector_line_id, connector_user_id]):
            return False

        if event_type != 'ONSESSIONSTART':
            chat_id = data.get('data[DATA][connector][chat_id]')
            return await self.session_start_service.handle(
                domain,
                connector_id,
                connector_line_id,
                connector_user_id,
                chat_id
            )
        elif event_type == 'ONSESSIONFINISH':
            chat_id = data.get('data[DATA][connector][chat_id]')
            return await self.session_finish_service.handle(
                domain,
                connector_id,
                connector_line_id,
                connector_user_id,
                chat_id
            )
            # TODO: Сохранить запись даты закрытия диалога в Битрикс
        elif event_type == 'ONOPENLINEMESSAGEADD':
            connector_chat_id = data.get('data[DATA][connector][chat_id]'),
            user_id = data.get('data[DATA][message][user_id]')

            return await self.message_add_service.handle(
                domain=domain,
                connector_id=connector_id,
                connector_line_id=connector_line_id,
                connector_user_id=connector_user_id,
                connector_chat_id=connector_chat_id,
                from_user_id=user_id
            )
            # chat_id = data.get('data[DATA][connector][chat_id]')
            # user_id = data.get('data[DATA][message][user_id]')
            # if user_id == connector_user_id:
            #     print('Client message')
            #     # TODO: Сохранить в БД что получено сообщение от клиента
            # else:
            #     print('Manager message')
            #     # TODO: Сохранить в БД что получено сообщение от менеджера
            # # TODO: Проверить в БД, есть ли сообщения от менеджера и от клиента, если есть оба то обновить поле даты в контакте в Битриксе

        return False

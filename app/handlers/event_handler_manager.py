import re
from typing import List, Dict, Any, Optional

from app.handlers.base_handler import BaseEventHandler
from app.models.event_data import EventData


class EventHandlerManager:
    def __init__(self, handlers: List[BaseEventHandler]) -> None:
        self.handlers = handlers

    async def handle(self, data: Dict[str, Any]) -> bool:
        app_token = data.get('auth[application_token]')
        event_type = data.get('event')

        domain = data.get('auth[domain]')
        message = data.get('data[PARAMS][MESSAGE]', '').strip().strip('/').lower()
        dialog_id = data.get('data[PARAMS][DIALOG_ID]')
        bot_id = self._get_bot_id(data)
        user_id = data.get('data[PARAMS][FROM_USER_ID]')

        print('domain = ', domain)
        print('event_type = ', event_type)
        print('message = ', message)
        print('bot_id = ', bot_id)
        print('dialog_id = ', dialog_id)

        if domain is None or event_type is None or dialog_id is None or bot_id is None:
            return False

        event_data = EventData(
            domain=domain,
            event_type=event_type,
            message=message,
            dialog_id=dialog_id,
            bot_id=bot_id,
            command=self._get_command(data),
            command_params=self._get_command_params(data),
            from_user_id=user_id
        )

        for handler in self.handlers:
            if handler.can_handle(event_data):
                return await handler.handle(event_data)

        return False
    
    def _get_bot_id(self, data: Dict[str, Any]) -> Optional[int]:
        for key in data.keys():
            if re.match(r'^data\[COMMAND\]\[\d+\]\[BOT_ID\]$', key):
                return data[key]

    def _get_command_params(self, data: Dict[str, Any]) -> Optional[str]:
        for key in data.keys():
            if re.match(r'^data\[COMMAND\]\[\d+\]\[COMMAND_PARAMS\]$', key):
                return data[key]

    def _get_command(self, data: Dict[str, Any]) -> Optional[str]:
        for key in data.keys():
            if re.match(r'^data\[COMMAND\]\[\d+\]\[COMMAND\]$', key):
                return data[key]

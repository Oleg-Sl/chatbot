from app.handlers.base_handler import BaseEventHandler
from app.models.event_data import EventData
from app.services.base_service import BaseService


class CommandHandler(BaseEventHandler):
    def __init__(self,
                 command_go_service: BaseService,
                 command_commend_service: BaseService,
                 command_diz_service: BaseService,
                 command_pause_service: BaseService,
                 command_create_task_service: BaseService
        ) -> None:
        self.command_services = {
            'go': command_go_service,
            'commend': command_commend_service,
            'diz': command_diz_service,
            'pause': command_pause_service,
            'create_task': command_create_task_service
        }
        self.command_go_service = command_go_service
        self.command_commend_service = command_commend_service
        self.command_diz_service = command_diz_service

    def can_handle(self, event_data: EventData) -> bool:
        return event_data.event_type == 'ONIMCOMMANDADD' and event_data.command in self.command_services

    async def handle(self, event_data: EventData) -> bool:
        if event_data.command is None:
            raise Exception('Command is missing in the event data.')

        service = self.command_services.get(event_data.command)
        if not service:
            raise Exception(f'An unknown "{event_data.message}" command was received.')
        
        return await service.handle(event_data.domain, event_data.bot_id, event_data.dialog_id, event_data.command_params, event_data.from_user_id)

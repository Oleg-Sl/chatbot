from app.handlers.base_handler import BaseEventHandler
from app.models.event_data import EventData
from app.api.dependencies import IUnitOfWork
from app.services.base_service import BaseService


class CommandHandler(BaseEventHandler):
    def __init__(self,
                 command_go_service: BaseService,
                 command_commend_service: BaseService,
                 command_diz_service: BaseService
        ) -> None:
        self.command_services = {
            'go': command_go_service,
            'commend': command_commend_service,
            'diz': command_diz_service
        }
        self.command_go_service = command_go_service
        self.command_commend_service = command_commend_service
        self.command_diz_service = command_diz_service

    def can_handle(self, event_data: EventData) -> bool:
        return event_data.event_type == 'ONIMCOMMANDADD'

    async def handle(self, event_data: EventData) -> bool:
        service = self.command_services.get(event_data.message)
        print('service = ', service)
        if not service:
            raise Exception(f'An unknown "{event_data.message}" command was received.')
        print('Command data: ', event_data)
        return await service.handle(event_data.domain, event_data.bot_id, event_data.dialog_id)

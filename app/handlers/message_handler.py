from app.handlers.base_handler import BaseEventHandler
from app.models.event_data import EventData
from app.api.dependencies import IUnitOfWork


class MessageHandler(BaseEventHandler):
    def __init__(self) -> None:
        pass

    def can_handle(self, event_data: EventData) -> bool:
        return event_data.event_type == 'ONIMBOTMESSAGEADD'

    def handle(self, event_data: EventData) -> bool:
        return True

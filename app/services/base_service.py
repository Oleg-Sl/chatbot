from abc import ABC, abstractmethod

from app.models.event_data import EventData


class BaseService(ABC):
    @abstractmethod
    async def handle(self, domain: str, bot_id: int, dialog_id: str) -> bool:
        pass

    # @abstractmethod
    # async def can_handle(self, data: EventData) -> bool:
    #     pass

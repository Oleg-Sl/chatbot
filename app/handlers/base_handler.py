from abc import ABC, abstractmethod

from app.models.event_data import EventData
from app.api.dependencies import IUnitOfWork


class BaseEventHandler(ABC):
    @abstractmethod
    def can_handle(self, event_data: EventData) -> bool:
        pass

    @abstractmethod
    async def handle(self, event_data: EventData) -> bool:
        pass

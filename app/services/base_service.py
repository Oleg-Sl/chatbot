from typing import Optional
from abc import ABC, abstractmethod

from app.models.event_data import EventData


class BaseService(ABC):
    @abstractmethod
    async def handle(self, domain: str, bot_id: int, dialog_id: str, command_params: Optional[str], from_user_id: Optional[int]) -> bool:
        pass

    # @abstractmethod
    # async def can_handle(self, data: EventData) -> bool:
    #     pass

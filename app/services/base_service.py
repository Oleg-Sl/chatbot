from abc import ABC, abstractmethod


class BaseService(ABC):
    @abstractmethod
    async def handle(self, domain: str, bot_id: int, dialog_id: str) -> bool:
        pass

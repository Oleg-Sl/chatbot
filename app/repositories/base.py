from typing import Dict, Any
from abc import ABC, abstractmethod
from sqlalchemy.ext.asyncio import AsyncSession


class AbstractRepository(ABC):
    def __init__(self, session: AsyncSession):
        self.session = session

    @abstractmethod
    async def add_one(self, data: Dict[str, Any]) -> int:
        ...

    # @abstractmethod
    # async def find_all(self):
    #     ...

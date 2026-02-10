from typing import Optional, Type
from abc import ABC, abstractmethod
from sqlalchemy.ext.asyncio import AsyncSession

from app.repositories.credentials import CredentialRepository


class IUnitOfWork(ABC):
    # credentials: Optional[CredentialRepository]
    credentials: CredentialRepository

    @abstractmethod
    def __init__(self):
        ...

    @abstractmethod
    async def __aenter__(self) -> "IUnitOfWork":
        ...

    @abstractmethod
    async def __aexit__(self, exc_type, exc_val, exc_tb) -> None:
        ...

    @abstractmethod
    async def commit(self) -> None:
        ...

    @abstractmethod
    async def rollback(self) -> None:
        ...


class UnitOfWork(IUnitOfWork):
    def __init__(self, session_factory):
        self.session_factory = session_factory
        self.session: Optional[AsyncSession] = None

    async def __aenter__(self) -> IUnitOfWork:
        self.session = self.session_factory()
        if self.session is None:
            raise RuntimeError("Session factory returned None")
        # self.credentials = CredentialRepository(self.session) if self.session else None
        self.credentials = CredentialRepository(self.session)
        return self

    async def __aexit__(self, exc_type, exc_val, exc_tb) -> None:
        if self.session is None:
            return
        try:
            if exc_type:
                await self.rollback()
            else:
                await self.commit()
        finally:
            await self.session.close()
            self.session = None

    async def commit(self) -> None:
        if self.session is not None:
            await self.session.commit()

    async def rollback(self) -> None:
        if self.session is not None:
            await self.session.rollback()

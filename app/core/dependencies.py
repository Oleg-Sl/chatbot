from typing import Annotated, AsyncGenerator
from fastapi import Depends
from sqlalchemy.ext.asyncio import async_sessionmaker, AsyncSession

from app.database.uow import IUnitOfWork, UnitOfWork
from app.database.session import AsyncSessionMaker


def get_session_factory() -> async_sessionmaker[AsyncSession]:
    return AsyncSessionMaker


async def get_uow(session_factory = Depends(get_session_factory)) -> AsyncGenerator[IUnitOfWork, None]:
    async with UnitOfWork(session_factory) as uow:
        yield uow


UOWDep = Annotated[IUnitOfWork, Depends(get_uow)]

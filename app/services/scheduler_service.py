from typing import Annotated, Callable, Awaitable
from apscheduler.schedulers.asyncio import AsyncIOScheduler
from fastapi import Depends
from sqlalchemy.ext.asyncio import async_sessionmaker, AsyncSession


from app.database.uow import IUnitOfWork
from app.api.dependencies import get_session_factory


class SchedulerService:
    def __init__(self, session_factory: async_sessionmaker[AsyncSession]) -> None:
        self.session_factory = session_factory
        self.scheduler = AsyncIOScheduler()
    
    async def add_task(self, func: Callable, **kwargs):
        async def wrapped_task(*args, **wrap_kwargs):
            await func(self.session_factory)

        self.scheduler.add_job(wrapped_task, **kwargs)

    def start(self):
        self.scheduler.start()
    
    def shutdown(self):
        self.scheduler.shutdown()

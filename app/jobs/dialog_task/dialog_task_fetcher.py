from typing import List, Dict, Any, Sequence, Optional
from sqlalchemy.ext.asyncio import async_sessionmaker, AsyncSession

from app.database.uow import IUnitOfWork, UnitOfWork
from app.schemas.task_reminders import TaskRemindersSchema
from app.models.database.task_reminders import TaskReminders, TaskState
from sqlalchemy import func
from app.schemas.dtos.dialog_events_dto import DialogEventDTO, DialogStatus


class DialogTaskFetcher:
    def __init__(self, uow: IUnitOfWork) -> None:
        self.uow = uow

    async def get_pending_tasks(self) -> Sequence[DialogEventDTO]:
        tasks = await self.uow.dialog_event.get_pendings()
        return tasks

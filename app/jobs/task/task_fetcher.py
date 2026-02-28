from sqlalchemy.ext.asyncio import async_sessionmaker, AsyncSession

from app.database.uow import IUnitOfWork, UnitOfWork
from app.schemas.task_reminders import TaskRemindersSchema
from app.models.database.task_reminders import TaskReminders, TaskState
from sqlalchemy import func


class TaskFetcher:
    def __init__(self, session_factory: async_sessionmaker[AsyncSession]) -> None:
        self.session_factory = session_factory

    async def get_pending_tasks(self):
        async with UnitOfWork(self.session_factory) as uow:
            tasks = await uow.task_reminders.filter(
                TaskReminders.state == TaskState.PENDING,
                TaskReminders.created_at + func.make_interval(0, 0, 0, 0, 0, TaskReminders.delay) <= func.now()
            )

            return [TaskRemindersSchema.model_validate(task) for task in tasks]

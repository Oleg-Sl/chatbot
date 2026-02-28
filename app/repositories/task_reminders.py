from typing import List, Dict, Any, Sequence, Optional
from sqlalchemy import insert, select, update, and_

from app.repositories.base import AbstractRepository
from app.models.database.task_reminders import TaskReminders


class TaskReminderRepository(AbstractRepository):
    async def add_one(self, data: Dict[str, Any]) -> int:
        stmt = insert(TaskReminders).values(**data).returning(TaskReminders.id)
        result = await self.session.execute(stmt)
        return result.scalar_one()
    
    async def edit_one(self, ident: int, data: dict) -> int:
        stmt = update(TaskReminders).values(**data).filter_by(id=ident).returning(TaskReminders.id)
        res = await self.session.execute(stmt)
        await self.session.flush()
        return res.scalar_one()
    
    async def get(self, task_id: int) -> Optional[TaskReminders]:
        stmt = select(TaskReminders).where(TaskReminders.id == task_id)
        result = await self.session.execute(stmt)
        return result.scalar_one_or_none()
    
    async def filter(self, *args) -> Sequence[TaskReminders]:
        stmt = select(TaskReminders).where(and_(*args))
        result = await self.session.execute(stmt)
        # return result.scalar_one_or_none()
        return result.scalars().all()

    async def find_all(self) -> Sequence[TaskReminders]:
        stmt = select(TaskReminders)
        result = await self.session.execute(stmt)
        return result.scalars().all()











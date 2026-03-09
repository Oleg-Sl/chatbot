from typing import List, Dict, Any, Sequence, Optional
from sqlalchemy import insert, select, update, and_

from app.repositories.base import AbstractRepository
from app.models.database.dialog_sessions import DialogSessions


class DialogSessionRepository(AbstractRepository):
    async def add_one(self, data: Dict[str, Any]) -> int:
        stmt = insert(DialogSessions).values(**data).returning(DialogSessions.id)
        result = await self.session.execute(stmt)
        return result.scalar_one()
    
    async def edit_one(self, ident: int, data: dict) -> int:
        stmt = update(DialogSessions).values(**data).filter_by(id=ident).returning(DialogSessions.id)
        res = await self.session.execute(stmt)
        await self.session.flush()
        return res.scalar_one()
    
    async def get(self, task_id: int) -> Optional[DialogSessions]:
        stmt = select(DialogSessions).where(DialogSessions.id == task_id)
        result = await self.session.execute(stmt)
        return result.scalar_one_or_none()
    
    async def filter(self, *args) -> Sequence[DialogSessions]:
        stmt = select(DialogSessions).where(and_(*args))
        result = await self.session.execute(stmt)
        # return result.scalar_one_or_none()
        return result.scalars().all()

    async def find_all(self) -> Sequence[DialogSessions]:
        stmt = select(DialogSessions)
        result = await self.session.execute(stmt)
        return result.scalars().all()

    async def create_or_update(self, data: Dict[str, Any]) -> int:
        stmt = select(DialogSessions).where(
            DialogSessions.connector_id == data['connector_id'],
            DialogSessions.connector_line_id == data['connector_line_id'],
            DialogSessions.connector_user_id == data['connector_user_id'],
            DialogSessions.connector_chat_id == data['connector_chat_id']
        )
        result = await self.session.execute(stmt)
        row = result.scalars().first()

        if not row:
            stmt = insert(DialogSessions).values(**data).returning(DialogSessions.id)
        else:
            data['session_status'] = DialogSessions.SessionStatus.STARTED
            data['manager_message_exists'] = False
            data['client_message_exists'] = False
            stmt = update(DialogSessions).where(DialogSessions.id == row.id).values(**data).returning(DialogSessions.id)

        result = await self.session.execute(stmt)
        await self.session.commit()
        return result.scalar_one()


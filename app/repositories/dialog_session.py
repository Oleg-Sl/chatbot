import asyncio
from typing import List, Dict, Any, Sequence, Optional
from sqlalchemy import insert, select, update, text, and_
from sqlalchemy.ext.asyncio import AsyncSession

from app.repositories.base import AbstractRepository
from app.models.database.dialog_sessions import DialogSessions
from app.domains.dialog import Dialog, SessionStatus


class DialogSessionRepository:
    def __init__(self, session: AsyncSession):
        self.session = session

    async def get_dialog(self, dialog_id: int) -> Optional[Dialog]:
        stmt = select(DialogSessions).where(DialogSessions.id == dialog_id)
        result = await self.session.execute(stmt)
        dialog = result.scalar_one_or_none()
        return self._to_domain(dialog) if dialog else None

    async def search_by_connector_chat_id(self, connector_chat_id: str) -> Optional[Dialog]:
        stmt = select(DialogSessions).where(DialogSessions.connector_chat_id == connector_chat_id)
        result = await self.session.execute(stmt)
        dialog = result.scalar_one_or_none()  
        return self._to_domain(dialog) if dialog else None
  
    async def search_by_bitrix_chat_id(self, chat_id: str) -> Optional[Dialog]:
        stmt = select(DialogSessions).where(DialogSessions.chat_id == chat_id)
        result = await self.session.execute(stmt)
        dialog = result.scalar_one_or_none()
        return self._to_domain(dialog) if dialog else None

    async def save(self, dialog: Dialog) -> int:
        stmt = select(DialogSessions).where(DialogSessions.connector_chat_id == dialog.connector_chat_id)
        result = await self.session.execute(stmt)
        orm_dialog = result.scalar_one_or_none()

        dict_dialog = self._to_dict(dialog)

        dict_dialog['session_status'] = DialogSessions.SessionStatus(dict_dialog['session_status'])

        if orm_dialog:
            stmt = update(DialogSessions).values(**dict_dialog).filter_by(id=orm_dialog.id).returning(DialogSessions.id)
        else:
            stmt = insert(DialogSessions).values(**dict_dialog).returning(DialogSessions.id)
        
        result = await self.session.execute(stmt)

        return result.scalar_one()

    async def _update_orm(self, orm_dialog: DialogSessions, dialog: Dialog) -> int:
        stmt = update(DialogSessions).values(**self._to_dict(dialog)).filter_by(id=dialog.id).returning(DialogSessions.id)
        res = await self.session.execute(stmt)
        await self.session.flush()
        return res.scalar_one()

    def _to_domain(self, dialog: DialogSessions) -> Dialog:
        return Dialog(
            ident=dialog.id,
            connector_id=dialog.connector_id,
            connector_line_id=dialog.connector_line_id,
            connector_chat_id=dialog.connector_chat_id,
            connector_user_id=dialog.connector_user_id,
            chat_id=dialog.chat_id,
            contact_id=dialog.contact_id,
            session_status=SessionStatus(dialog.session_status.value),
            manager_message_exists=dialog.manager_message_exists,
            client_message_exists=dialog.client_message_exists
        )
    
    def _to_orm(self, dialog: Dialog) -> DialogSessions:
        return DialogSessions(
            id=dialog.id,
            connector_id=dialog.connector_id,
            connector_line_id=dialog.connector_line_id,
            connector_chat_id=dialog.connector_chat_id,
            connector_user_id=dialog.connector_user_id,
            chat_id=dialog.chat_id,
            contact_id=dialog.contact_id,
            session_status=DialogSessions.SessionStatus(dialog.session_status.value),
            manager_message_exists=dialog.manager_message_exists,
            client_message_exists=dialog.client_message_exists
        )
    
    def _to_dict(self, dialog: Dialog) -> dict:
        return {
            # 'id': dialog.id,
            'connector_id': dialog.connector_id,
            'connector_line_id': dialog.connector_line_id,
            'connector_chat_id': dialog.connector_chat_id,
            'connector_user_id': dialog.connector_user_id,
            'chat_id': dialog.chat_id,
            'contact_id': dialog.contact_id,
            'session_status': dialog.session_status.value,
            'manager_message_exists': dialog.manager_message_exists,
            'client_message_exists': dialog.client_message_exists
        }
    
    # async def add_one(self, data: Dict[str, Any]) -> int:
    #     stmt = insert(DialogSessions).values(**data).returning(DialogSessions.id)
    #     result = await self.session.execute(stmt)
    #     return result.scalar_one()

    async def edit_one(self, ident: int, data: dict) -> int:
        stmt = update(DialogSessions).values(**data).filter_by(id=ident).returning(DialogSessions.id)
        res = await self.session.execute(stmt)
        await self.session.flush()
        return res.scalar_one()

    # async def get(self, task_id: int) -> Optional[DialogSessions]:
    #     stmt = select(DialogSessions).where(DialogSessions.id == task_id)
    #     result = await self.session.execute(stmt)
    #     return result.scalar_one_or_none()

    # async def filter(self, *args) -> Sequence[DialogSessions]:
    #     stmt = select(DialogSessions).where(and_(*args))
    #     result = await self.session.execute(stmt)
    #     return result.scalars().all()

    # async def find_all(self) -> Sequence[DialogSessions]:
    #     stmt = select(DialogSessions)
    #     result = await self.session.execute(stmt)
    #     return result.scalars().all()

    # async def create_or_update(self, data: Dict[str, Any]) -> int:
    #     stmt = select(DialogSessions).where(
    #         DialogSessions.connector_id == data['connector_id'],
    #         DialogSessions.connector_line_id == data['connector_line_id'],
    #         DialogSessions.connector_user_id == data['connector_user_id'],
    #         DialogSessions.connector_chat_id == data['connector_chat_id']
    #     )
    #     result = await self.session.execute(stmt)
    #     row = result.scalars().first()

    #     if not row:
    #         stmt = insert(DialogSessions).values(**data).returning(DialogSessions.id)
    #     else:
    #         data['session_status'] = DialogSessions.SessionStatus.STARTED
    #         data['manager_message_exists'] = False
    #         data['client_message_exists'] = False
    #         stmt = update(DialogSessions).where(DialogSessions.id == row.id).values(**data).returning(DialogSessions.id)

    #     result = await self.session.execute(stmt)
    #     await self.session.commit()
    #     return result.scalar_one()


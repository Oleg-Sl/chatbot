from typing import List, Dict, Any, Sequence, Optional
from sqlalchemy import insert, select, update, and_
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.database.dialog_events import DialogEvents
from app.schemas.dtos.dialog_events_input_dto import DialogEventInputDTO
from app.schemas.dtos.dialog_events_dto import DialogEventDTO, DialogStatus


class DialogEventRepository:
    def __init__(self, session: AsyncSession):
        self.session = session

    async def create_event(self, domain: str, data: DialogEventInputDTO) -> int:
        created_data = self._to_dict(data)
        created_data['domain'] = domain
        stmt = insert(DialogEvents).values(**created_data).returning(DialogEvents.id)
        result = await self.session.execute(stmt)
        return result.scalar_one()
    
    async def get_pendings(self) -> Sequence[DialogEventDTO]:
        stmt = select(DialogEvents).where(DialogEvents.status == DialogEvents.Status.PENDING)
        result = await self.session.execute(stmt)
        events = result.scalars().all()
        return [self._to_dialog_event(event) for event in events]
    
    async def completed_processing(self, ident: int):
        stmt = update(DialogEvents).values(status=DialogEvents.Status.SUCCESS).filter_by(id=ident).returning(DialogEvents.id)
        res = await self.session.execute(stmt)
        return res.scalar_one()
    


    def _to_dialog_event(self, data: DialogEvents) -> DialogEventDTO:
        return DialogEventDTO(
            ident=data.id,
            domain=data.domain,
            event=data.event.value,
            connector_id=data.connector_id,
            connector_line_id=data.connector_line_id,
            connector_chat_id=data.connector_chat_id,
            connector_user_id=data.connector_user_id,
            bitrix_chat_id=data.bitrix_chat_id,
            from_user_id=data.from_user_id,
            status=DialogStatus(data.status.value)
        )

    def _to_dict(self, dialog: DialogEventInputDTO) -> dict:
        return {
            'event': dialog.event,
            'connector_id': dialog.connector_id,
            'connector_line_id': dialog.connector_line_id,
            'connector_chat_id': dialog.connector_chat_id,
            'connector_user_id': dialog.connector_user_id,
            'bitrix_chat_id': dialog.bitrix_chat_id,
            'from_user_id': dialog.from_user_id,
        }

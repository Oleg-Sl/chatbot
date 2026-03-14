from typing import Optional
from app.services.base_service import BaseService
from app.api.dependencies import IUnitOfWork
from app.schemas.dtos.dialog_events_input_dto import DialogEventInputDTO


class DialogEventService:
    def __init__(self, uow: IUnitOfWork) -> None:
        self.uow = uow

    async def handle(self, domain: str, data: DialogEventInputDTO) -> bool:        
        try:
            async with self.uow as uow:
                item_id = await uow.dialog_event.create_event(domain, data)
        except Exception as e:
            print('Error while adding task reminder: ', e)
            return False

        return True

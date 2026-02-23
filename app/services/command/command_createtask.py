from typing import Optional
from app.services.base_service import BaseService
from app.api.dependencies import IUnitOfWork
from app.clients.sender_client import SenderClient
from app.models.domain.keyboards import LinkKeyboard
from app.models.event_data import EventData


class CommandCreateTaskService(BaseService):
    def __init__(self, uow: IUnitOfWork) -> None:
        self.uow = uow

    async def handle(self, domain: str, bot_id: int, dialog_id: str, command_params: Optional[str], from_user_id: Optional[int]) -> bool:        
        return False

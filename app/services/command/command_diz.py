from typing import Optional
from app.services.base_service import BaseService
from app.api.dependencies import IUnitOfWork
from app.clients.sender_client import SenderClient


class CommandDizService(BaseService):
    def __init__(self, uow: IUnitOfWork, sender_client: SenderClient) -> None:
        self.uow = uow
        self.sender_client = sender_client

    async def handle(self, domain: str, bot_id: int, dialog_id: str, command_params: Optional[str], from_user_id: Optional[int]) -> bool:
        print('command = diz')
        print('domain = ', domain)
        print('bot_id = ', bot_id)
        print('dialog_id = ', dialog_id)
        return True

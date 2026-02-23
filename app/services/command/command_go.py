from typing import Optional
from app.services.base_service import BaseService
from app.api.dependencies import IUnitOfWork
from app.clients.sender_client import SenderClient
from app.models.domain.keyboards import LinkKeyboard
from app.models.event_data import EventData


class CommandGoService(BaseService):
    def __init__(self, uow: IUnitOfWork, sender_client: SenderClient) -> None:
        self.uow = uow
        self.sender_client = sender_client

    async def handle(self, domain: str, bot_id: int, dialog_id: str, command_params: Optional[str], from_user_id: Optional[int]) -> bool:
        print('command = go')
        print('domain = ', domain)
        print('bot_id = ', bot_id)
        print('dialog_id = ', dialog_id)
        
        message = 'Вот полезные ссылки:'
        
        keyboards = []
        keyboards.append(LinkKeyboard(
            TEXT='База знаний',
            LINK='https://google.com',
            BG_COLOR='#29619b'
        ).model_dump())
        keyboards.append(LinkKeyboard(
            TEXT='Прайс',
            LINK='https://yandex.com',
            BG_COLOR='#5ad240'
        ).model_dump())

        return await self.sender_client.send_message(
            domain=domain,
            bot_id=bot_id,
            dialog_id=dialog_id,
            message=message,
            keyboards=keyboards,
        )

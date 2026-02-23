from app.services.base_service import BaseService
from app.api.dependencies import IUnitOfWork
from app.clients.sender_client import SenderClient
from app.models.domain.keyboards import CommandKeyboard


class CommandCommendService(BaseService):
    def __init__(self, uow: IUnitOfWork, sender_client: SenderClient) -> None:
        self.uow = uow
        self.sender_client = sender_client
        self.delay_buttons = [
            { 'text': '15м', 'params': str(15) },
            { 'text': '30м', 'params': str(30) },
            { 'text': '45м', 'params': str(45) },
            { 'text': '1ч', 'params': str(60 * 1) },
            { 'text': '2ч', 'params': str(60 * 2) },
            { 'text': '4ч', 'params': str(60 * 4) },
            { 'text': 'день', 'params': str(60 * 24) },
        ]

    async def handle(self, domain: str, bot_id: int, dialog_id: str) -> bool:
        print('command = commend')
        print('domain = ', domain)
        print('bot_id = ', bot_id)
        print('dialog_id = ', dialog_id)
        message = 'Напомнить о чате через:'
        keyboards = self.get_keyboards()
        print('keyboards = ', keyboards)
        return await self.sender_client.send_message(
            domain,
            bot_id,
            dialog_id,
            message,
            keyboards
        )
    
    def get_keyboards(self):
        keyboards = []

        keyboards.append(CommandKeyboard(
            TEXT='Создать задачу',
            COMMAND='create_task',
            COMMAND_PARAMS='',
            BG_COLOR='#4b9b29'
        ).model_dump())

        for item in self.delay_buttons:
            keyboards.append(CommandKeyboard(
                TEXT=str(item['text']),
                COMMAND='pause',
                COMMAND_PARAMS=str(item['params']),
                BG_COLOR='#344bff'
            ).model_dump())

        return keyboards

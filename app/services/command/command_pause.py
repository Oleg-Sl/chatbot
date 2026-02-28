from typing import Optional
from app.services.base_service import BaseService
from app.api.dependencies import IUnitOfWork


class CommandPauseService(BaseService):
    def __init__(self, uow: IUnitOfWork) -> None:
        self.uow = uow

    async def handle(self, domain: str, bot_id: int, dialog_id: str, command_params: Optional[str], from_user_id: Optional[int]) -> bool:        
        try:
            async with self.uow:
                task_id = await self.uow.task_reminders.add_one({
                    'domain': domain,
                    'bot_id': bot_id,
                    'dialog_id': dialog_id,
                    'message': 'Наппоминание о чате',
                    'delay': int(command_params) if command_params and command_params.isdigit() else 0,
                    'to_user_id': from_user_id,
                })
                await self.uow.commit()
        except Exception as e:
            print('Error while adding task reminder: ', e)
            return False

        return True

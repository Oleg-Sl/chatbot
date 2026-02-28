from app.database.uow import IUnitOfWork
from app.schemas.task_reminders import TaskRemindersSchema
from app.clients.sender_client import SenderClient
from app.models.database.task_reminders import TaskState


class TaskProcessor:
    def __init__(self, uow:  IUnitOfWork, sender_client: SenderClient):
        self.uow = uow
        self.sender_client = sender_client

    async def process(self, task: TaskRemindersSchema):
        print('task to process = ', task)
        try:
            await self.uow.task_reminders.edit_one(task.id, {
                'state': TaskState.PROCESSED
            })
            
            message = self._prepare_message(task)
            result = await self.sender_client.send_message(
                task.domain,
                task.bot_id,
                task.dialog_id,
                message
            )

            final_state = TaskState.SUCCESS if result else TaskState.FAILURE

            await self.uow.task_reminders.edit_one(task.id, {
                'state': final_state
            })

            return final_state
        except Exception as err:
            await self.uow.task_reminders.edit_one(task.id, {
                'state': TaskState.FAILURE
            })
            raise err

    def _prepare_message(self, task: TaskRemindersSchema) -> str:
        created_at_str = task.created_at.strftime("%d.%m.%Y %H:%M:%S")
        return f'{task.message or "Напоминание о чате"} от {created_at_str}'

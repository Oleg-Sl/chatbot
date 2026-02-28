from time import sleep
from sqlalchemy.ext.asyncio import async_sessionmaker, AsyncSession

from app.jobs.task.task_fetcher import TaskFetcher
from app.database.uow import UnitOfWork
from app.schemas.task_reminders import TaskRemindersSchema
from app.clients.sender_client import SenderClient
from app.clients.bx24_client import BitrixClient
from app.jobs.task.task_processor import TaskProcessor


class TaskRunner:
    def __init__(self, session_factory: async_sessionmaker[AsyncSession], task_fetcher: TaskFetcher):
        self.session_factory = session_factory
        self.task_fetcher = task_fetcher

    async def run(self):
        pending_tasks = await self.task_fetcher.get_pending_tasks()
        print('COUNT OF TASK = ', len(pending_tasks))

        for task in pending_tasks:
            await self._process_task(task)
    
    async def _process_task(self, task: TaskRemindersSchema):
        sleep(1)

        async with UnitOfWork(self.session_factory) as uow:
            client = BitrixClient(uow)
            sender_client = SenderClient(client)
            processor = TaskProcessor(uow, sender_client)

            try:
                await processor.process(task)
            except Exception as e:
                print(f'Error processing task = {task.id}: {e}')

from time import sleep

from app.jobs.dialog_task.dialog_task_fetcher import DialogTaskFetcher
from app.clients.dialog_client import DialogClient
# from app.clients.bitrix_api_client import BitrixApiClient
from app.clients.bx24_client import BitrixClient
# from app.clients.fake_api_client import BitrixClient
from app.jobs.dialog_task.dialog_task_processor import DialogTaskProcessor
from app.schemas.dtos.dialog_events_dto import DialogEventDTO, DialogStatus
from app.database.uow import IUnitOfWork, UnitOfWork


class DialogTaskRunner:
    def __init__(self, uow: IUnitOfWork, task_fetcher: DialogTaskFetcher):
        self.uow = uow
        self.task_fetcher = task_fetcher

    async def run(self):
        pending_tasks = await self.task_fetcher.get_pending_tasks()

        for task in pending_tasks:
            await self._process_task(task)
    
    async def _process_task(self, task: DialogEventDTO):
        print('TASK = ', task)
        sleep(1)
        client = BitrixClient(self.uow)
        dialog_client = DialogClient(client)
        processor = DialogTaskProcessor(self.uow, dialog_client)

        try:
            await processor.process(task)
        except Exception as e:
            print(f'Error processing task = {task.connector_chat_id}: {e}')


from sqlalchemy.ext.asyncio import async_sessionmaker, AsyncSession

from app.jobs.dialog_task.dialog_task_runner import DialogTaskRunner
from app.jobs.dialog_task.dialog_task_fetcher import DialogTaskFetcher
from app.database.uow import IUnitOfWork, UnitOfWork
from app.clients.bx24_client import BitrixClient
from app.clients.dialog_client import DialogClient
from app.jobs.dialog_task.dialog_task_processor import DialogTaskProcessor


async def run_dialog_tasks(session_factory: async_sessionmaker[AsyncSession]):
    print('RUN DIALOG')
    async with UnitOfWork(session_factory) as uow:
        task_fetcher = DialogTaskFetcher(uow)
        # task_runner = DialogTaskRunner(uow, task_fetcher)
        pending_tasks = await task_fetcher.get_pending_tasks()
        # await task_runner.run()
    print('+++++++++++ pending_tasks = ', pending_tasks)
    for task in pending_tasks:
        try:
            async with UnitOfWork(session_factory) as task_uow:
                client = BitrixClient(task_uow)
                dialog_client = DialogClient(client)
                processor = DialogTaskProcessor(task_uow, dialog_client)
                await processor.process(task, task_uow, dialog_client)
                await task_uow.commit()
        except Exception as e:
            print(f'Error processing task {task.ident}: {e}')
            continue

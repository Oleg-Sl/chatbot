
from sqlalchemy.ext.asyncio import async_sessionmaker, AsyncSession

from app.jobs.task.task_runner import TaskRunner
from app.jobs.task.task_fetcher import TaskFetcher


async def run_tasks(session_factory: async_sessionmaker[AsyncSession]):
    task_fetcher = TaskFetcher(session_factory)
    task_runner = TaskRunner(session_factory, task_fetcher)
    await task_runner.run()

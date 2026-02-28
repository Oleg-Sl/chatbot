import sys
from fastapi import FastAPI
from contextlib import asynccontextmanager
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import settings
from app.api.routers.routers import all_routers
from app.services.scheduler_service import SchedulerService
from app.api.dependencies import get_session_factory
from app.jobs.run_task import run_tasks


sys.dont_write_bytecode = True


scheduler_service = SchedulerService(get_session_factory())


@asynccontextmanager
async def lifespan(app: FastAPI):
    try:
        await scheduler_service.add_task(run_tasks, trigger="interval", seconds=60)
        scheduler_service.start()
        yield
    finally:
        scheduler_service.shutdown()


app = FastAPI(
    title=settings.project_name,
    version="0.1.0",
    debug=True,
    root_path="/chatbot",
    lifespan=lifespan
)


# @app.on_event("startup")
# async def startup():
#     scheduler.add_job(run_me_every_minute, "interval", minutes=1)
#     scheduler.start()


app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


for router in all_routers:
    app.include_router(router)


app.mount("/static", StaticFiles(directory="app/static"), name="static")


@app.get("/test")
async def test():
    return {"test": 111, 'project_name': settings.project_name}


# uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload --log-level debug

# alembic init migrations
# alembic revision --message="Initial" --autogenerate
# alembic revision --autogenerate -m "Change type of field created_at"
# alembic upgrade head

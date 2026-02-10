import sys
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import settings
from app.api.routers.routers import all_routers

sys.dont_write_bytecode = True


app = FastAPI(
    title=settings.project_name,
    version="0.1.0",
    debug=True,
    root_path="/chatbot",
)

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
# alembic revision --autogenerate -m "Change type of column stage_id to str"
# alembic upgrade head

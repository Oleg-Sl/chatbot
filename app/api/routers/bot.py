import pathlib
import logging
from logging.handlers import RotatingFileHandler
from typing import Annotated
from fastapi import APIRouter, Request, Query, Form, Body
from fastapi.responses import HTMLResponse,  JSONResponse
from fastapi.templating import Jinja2Templates

from app.schemas.credentials import CredentialsInputSchema, CredentialSchema
from app.core.dependencies import UOWDep
from app.services.credentials import CredentialsService


router = APIRouter(
    prefix="/bot",
    tags=["Bot"],
)


log_path = pathlib.Path(__file__).parent.parent / "logs"
log_path.mkdir(parents=True, exist_ok=True)

logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)

file_handler = RotatingFileHandler(
    filename="logs/bot.log",
    maxBytes=10*1024*1024,  # 10 MB
    backupCount=5,
    encoding='utf-8'
)

formatter = logging.Formatter("%(asctime)s %(levelname)s %(message)s")
file_handler.setFormatter(formatter)

logger.addHandler(file_handler)


@router.post("/event")
async def event_bot(CLIENT_ID: str, data = Body()) -> dict:
    # query_params = dict(request.query_params)
    # logger.info(f'Query Params: {query_params}')
    # client_id = query_params.get('CLIENT_ID')
    # logger.info(f'Client ID: {client_id}')
    # try:
    #     body = await request.json()
    # except Exception:
    #     body = await request.body()
    logger.info(f'Client ID: {CLIENT_ID}')
    logger.info(f'Body: {data}')
    logger.info(f'Type of body: {type(data)}')
    # logger.info(f'event: {data.get('event')}')

    return {}

# @router.post("/create")
# async def create_bot(request: Request) -> dict:
#     return {}


# @router.post("/update")
# async def update_bot(request: Request) -> dict:
#     return {}


# @router.post("/delete")
# async def delete_bot(request: Request) -> dict:
#     return {}

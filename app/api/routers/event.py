import pathlib
import logging
from logging.handlers import RotatingFileHandler
from typing import Annotated, Dict, Any
from fastapi import APIRouter, Request, Query, Form, Body, Header, Depends
from fastapi.responses import HTMLResponse,  JSONResponse
from fastapi.templating import Jinja2Templates

from app.api.dependencies import UOWDep, IUnitOfWork
from app.handlers.event_handler_manager import EventHandlerManager
from app.api.dependencies import get_event_handler_manager


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
    maxBytes=10*1024*1024,
    backupCount=5,
    encoding='utf-8'
)

formatter = logging.Formatter("%(asctime)s %(levelname)s %(message)s")
file_handler.setFormatter(formatter)

logger.addHandler(file_handler)


@router.post("/event")
async def event_bot(
    request: Request,
    event_handler_manager: EventHandlerManager = Depends(get_event_handler_manager),
    ):
    headers = dict(request.headers)
    content_type = request.headers.get('content-type')
    form_data = await request.form()
    form = dict(form_data)

    logger.info(f"Headers: {headers}")
    logger.info(f"Content-Type: {content_type}")
    logger.info(f"Form data: {form}")

    status = None
    try:
        status = await event_handler_manager.handle(dict(form))
    except Exception as e:
        print('error = ', e)
        status = False

    return {"status": status}


@router.post("/event_test")
async def event_test(
    request: Request,
    ):
    headers = dict(request.headers)
    data = await request.body()

    logger.info(f"HEADERS: {headers}")
    logger.info(f"BODY: {data}")

    return {}

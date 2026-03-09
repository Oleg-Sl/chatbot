import pathlib
import logging
from logging.handlers import RotatingFileHandler
from typing import Annotated, Dict, Any
from fastapi import APIRouter, Request, Query, Form, Body, Header, Depends
from fastapi.responses import HTMLResponse,  JSONResponse
from fastapi.templating import Jinja2Templates

from app.api.dependencies import UOWDep, IUnitOfWork
# from app.handlers.event_handler_manager import EventHandlerManager
from app.handlers.dialog_session_manager import DialogSessionHandlerManager
from app.api.dependencies import get_session_dialog_handler


router = APIRouter(
    prefix="/dialog_sesion",
    tags=["DialogSession"],
)


log_path = pathlib.Path(__file__).parent.parent / "logs"
log_path.mkdir(parents=True, exist_ok=True)

logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)

file_handler = RotatingFileHandler(
    filename="logs/dialog_session.log",
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
    dialog_handler_manager: DialogSessionHandlerManager = Depends(get_session_dialog_handler),
    ):

    headers = dict(request.headers)
    form_data = await request.form()
    form = dict(form_data)

    logger.info(f"Headers: {headers}")
    logger.info(f"Form data: {form}")

    status = None
    try:
        status = await dialog_handler_manager.handle(form)
    except Exception as e:
        print('error = ', e)
        status = False

    return {"status": status}

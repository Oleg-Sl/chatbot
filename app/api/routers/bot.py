import pathlib
import logging
from typing import Annotated
from fastapi import APIRouter, Request, Query, Form
from fastapi.responses import HTMLResponse,  JSONResponse
from fastapi.templating import Jinja2Templates

from app.schemas.credentials import CredentialsInputSchema, CredentialSchema
from app.core.dependencies import UOWDep
from app.services.credentials import CredentialsService


router = APIRouter(
    prefix="/bot",
    tags=["Bot"],
)

pathlib.Path("logs").mkdir(parents=True, exist_ok=True)
logging.basicConfig(level=logging.INFO, filename="logs/bot.log",
                    format="%(asctime)s %(levelname)s %(message)s")


@router.post("/event")
async def event_bot(request: Request) -> dict:
    query_params = dict(request.query_params)
    logging.info(f'Query Params: {query_params}')
    try:
        body = await request.json()
    except Exception:
        body = await request.body()

    logging.info(f'Body: {body}')

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

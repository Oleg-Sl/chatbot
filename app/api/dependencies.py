from typing import Annotated, AsyncGenerator
from fastapi import Depends
from sqlalchemy.ext.asyncio import async_sessionmaker, AsyncSession

from app.database.uow import IUnitOfWork, UnitOfWork
from app.database.session import AsyncSessionMaker
from app.handlers.event_handler_manager import EventHandlerManager
from app.handlers.command_handler import CommandHandler
from app.services.command.command_go import CommandGoService
from app.services.command.command_commend import CommandCommendService
from app.services.command.command_diz import CommandDizService
from app.services.command.command_go import CommandGoService
from app.clients.sender_client import SenderClient
from app.clients.bx24_client import BitrixClient


def get_session_factory() -> async_sessionmaker[AsyncSession]:
    return AsyncSessionMaker


async def get_uow(session_factory = Depends(get_session_factory)) -> AsyncGenerator[IUnitOfWork, None]:
    async with UnitOfWork(session_factory) as uow:
        yield uow


UOWDep = Annotated[IUnitOfWork, Depends(get_uow)]


def get_sender_client():
    return SenderClient


def get_bitrix_client(uow: UOWDep):
    return BitrixClient(uow)


def get_command_go_service(
    uow: UOWDep,
    sender_client: Annotated[SenderClient, Depends(get_sender_client)]
    ) -> CommandGoService:
    return CommandGoService(uow, sender_client)
    

def get_command_commend_service(
    uow: UOWDep,
    sender_client: Annotated[SenderClient, Depends(get_sender_client)]
    ) -> CommandCommendService:
    return CommandCommendService(uow, sender_client)


def get_command_diz_service(
    uow: UOWDep,
    sender_client: Annotated[SenderClient, Depends(get_sender_client)]
    ) -> CommandDizService:
    return CommandDizService(uow, sender_client)


def get_command_handler(
    commandGoService: Annotated[CommandGoService, Depends(get_command_go_service)],
    commandCommendService: Annotated[CommandCommendService, Depends(get_command_commend_service)] ,
    commandDizService: Annotated[CommandDizService, Depends(get_command_diz_service)],
    ) -> CommandHandler:
    return CommandHandler(
        commandGoService,
        commandCommendService,
        commandDizService
    )

def get_event_handler_manager(
        command_handler: Annotated[CommandHandler, Depends(get_command_handler)]
    ) -> EventHandlerManager:
    return EventHandlerManager([
        command_handler,
    ])




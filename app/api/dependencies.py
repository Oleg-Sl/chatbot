from typing import Annotated, AsyncGenerator
from fastapi import Depends
from sqlalchemy.ext.asyncio import async_sessionmaker, AsyncSession

from app.database.uow import IUnitOfWork, UnitOfWork
from app.database.session import AsyncSessionMaker
from app.clients.sender_client import SenderClient
from app.clients.dialog_client import DialogClient
from app.clients.bx24_client import BitrixClient
from app.handlers.event_handler_manager import EventHandlerManager
from app.handlers.dialog_session_manager import DialogSessionHandlerManager
from app.handlers.command_handler import CommandHandler
from app.services.command.command_go import CommandGoService
from app.services.command.command_commend import CommandCommendService
from app.services.command.command_diz import CommandDizService
from app.services.command.command_pause import CommandPauseService
from app.services.command.command_createtask import CommandCreateTaskService
from app.services.dialog_session.message_add import MessageAddService
from app.services.dialog_session.session_start import SessionStartService
from app.services.dialog_session.session_finish import SessionFinishService


def get_session_factory() -> async_sessionmaker[AsyncSession]:
    return AsyncSessionMaker


async def get_uow(session_factory = Depends(get_session_factory)) -> AsyncGenerator[IUnitOfWork, None]:
    async with UnitOfWork(session_factory) as uow:
        yield uow


UOWDep = Annotated[IUnitOfWork, Depends(get_uow)]


def get_bitrix_client(uow: UOWDep):
    return BitrixClient(uow)


def get_sender_client(client: Annotated[BitrixClient, Depends(get_bitrix_client)]):
    return SenderClient(client)


def  get_dialog_client(client: Annotated[BitrixClient, Depends(get_bitrix_client)]):
    return DialogClient(client)


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


def get_command_pause_service(
    uow: UOWDep,
    ) -> CommandPauseService:
    return CommandPauseService(uow)


def get_command_createtask_service(
    uow: UOWDep,
    ) -> CommandCreateTaskService:
    return CommandCreateTaskService(uow)


def get_command_handler(
    command_go_service: Annotated[CommandGoService, Depends(get_command_go_service)],
    command_commend_service: Annotated[CommandCommendService, Depends(get_command_commend_service)] ,
    command_diz_service: Annotated[CommandDizService, Depends(get_command_diz_service)],
    command_pause_service: Annotated[CommandPauseService, Depends(get_command_pause_service)],
    command_create_task_service: Annotated[CommandCreateTaskService, Depends(get_command_createtask_service)],
    ) -> CommandHandler:
    return CommandHandler(
        command_go_service,
        command_commend_service,
        command_diz_service,
        command_pause_service,
        command_create_task_service
    )

def get_event_handler_manager(
        command_handler: Annotated[CommandHandler, Depends(get_command_handler)]
    ) -> EventHandlerManager:
    return EventHandlerManager([
        command_handler,
    ])


def get_message_add_service(
    uow: UOWDep,
    dialog_client: Annotated[DialogClient, Depends(get_dialog_client)]
    ) -> MessageAddService:
    return MessageAddService(uow, dialog_client)


def get_session_start_service(
    uow: UOWDep,
    dialog_client: Annotated[DialogClient, Depends(get_dialog_client)]
    ) -> SessionStartService:
    return SessionStartService(uow, dialog_client)


def get_session_finish_service(
    uow: UOWDep,
    dialog_client: Annotated[DialogClient, Depends(get_dialog_client)]
    ) -> SessionFinishService:
    return SessionFinishService(uow, dialog_client)



def get_session_dialog_handler(
    message_add_service: Annotated[MessageAddService, Depends(get_message_add_service)],
    session_start_service: Annotated[SessionStartService, Depends(get_session_start_service)],
    session_finish_service: Annotated[SessionFinishService, Depends(get_session_finish_service)],
    ) -> DialogSessionHandlerManager:
    return DialogSessionHandlerManager(
        message_add_service,
        session_start_service,
        session_finish_service
    )


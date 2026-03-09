from .bitrix import router as bitrix_router
from .event import router as event_router
from .dialog_session_event import router as dialog_session_router


all_routers = [
    bitrix_router,
    event_router,
    dialog_session_router,
]

from .bitrix import router as bitrix_router
from .event import router as event_router


all_routers = [
    bitrix_router,
    event_router,
]

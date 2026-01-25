from .bitrix import router as bitrix_router
from .bot import router as bot_router


all_routers = [
    bitrix_router,
    bot_router,
]

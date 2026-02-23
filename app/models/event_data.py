from typing import Optional
from pydantic import BaseModel


class EventData(BaseModel):
    domain: str
    event_type: str
    message: str
    dialog_id: str
    bot_id: int
    command: Optional[str]
    from_user_id: Optional[int]
    command_params: Optional[str]


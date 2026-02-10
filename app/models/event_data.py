from pydantic import BaseModel


class EventData(BaseModel):
    domain: str
    event_type: str
    message: str
    dialog_id: str
    bot_id: int

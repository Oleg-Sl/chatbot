from enum import Enum
from typing import Optional
from pydantic import BaseModel, ConfigDict, Field


class SessionStatus(Enum):
    STARTED='started'
    CLOSED='closed'


# class DialogEventSchema(BaseModel):
#     model_config = ConfigDict(populate_by_name=True)


class DialogInputSchema(BaseModel):
    model_config = ConfigDict(populate_by_name=True)

    # id: int
    connector_id: str
    connector_line_id: str
    connector_chat_id: str
    connector_user_id: str
    chat_id: str
    user_id: str

    # contact_id: str
    # session_status: SessionStatus
    # manager_message_exists: bool
    # client_message_exists: bool

from datetime import datetime
from typing import Optional
from pydantic import BaseModel, ConfigDict, Field


class TaskRemindersSchema(BaseModel):
    model_config = ConfigDict(populate_by_name=True, from_attributes=True)

    id: int
    domain: str
    bot_id: int = Field(..., gt=0)
    dialog_id: str
    delay: int = Field(..., gt=0)
    deadline: datetime
    created_at: datetime
    message: str
    to_user_id: int = Field(..., gt=0)
    state: str


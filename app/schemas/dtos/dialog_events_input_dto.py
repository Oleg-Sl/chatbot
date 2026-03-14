from typing import Optional
from dataclasses import dataclass


@dataclass
class DialogEventInputDTO:
    event: str

    connector_id: str
    connector_line_id: int
    connector_chat_id: Optional[int]
    connector_user_id: int
    bitrix_chat_id: Optional[int]
    from_user_id: Optional[int]

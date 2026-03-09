from typing import Optional
from dataclasses import dataclass



@dataclass
class AddMessageInputDTO:
    connector_id: str
    connector_line_id: str
    connector_chat_id: str
    connector_user_id: str
    user_id: Optional[str]
    chat_id: Optional[str]

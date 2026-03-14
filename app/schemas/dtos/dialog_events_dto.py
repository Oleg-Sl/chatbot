import enum
from typing import Optional
from dataclasses import dataclass
from sqlalchemy import String, Enum


class DialogStatus(enum.Enum):
    PENDING='pending',
    PROCESSED='processed',
    SUCCESS='success',
    FAILURE='failure'


@dataclass
class DialogEventDTO:
    ident: int
    domain: str
    event: str
    connector_id: str
    connector_line_id: int
    connector_chat_id: Optional[int]
    connector_user_id: int
    bitrix_chat_id: Optional[int]
    from_user_id: Optional[int]
    status: DialogStatus

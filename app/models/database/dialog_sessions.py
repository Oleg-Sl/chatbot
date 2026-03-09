import enum
from datetime import datetime, timedelta

from sqlalchemy import String, Enum, CheckConstraint, DateTime, func
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy.ext.hybrid import hybrid_property

from .base import Base


# class SessionStatus(enum.Enum):
#     STARTED='started'
#     CLOSED='closed'


class DialogSessions(Base):
    __tablename__ = "dialog_sessions"

    class SessionStatus(enum.Enum):
        STARTED='started'
        CLOSED='closed'
        
    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    
    connector_id: Mapped[str] = mapped_column(String(100), nullable=False)
    connector_line_id: Mapped[str] = mapped_column(String(25), nullable=False)
    connector_chat_id: Mapped[str] = mapped_column(String(25), nullable=False)
    connector_user_id: Mapped[str] = mapped_column(String(25), nullable=False)
    chat_id: Mapped[str] = mapped_column(String(25), nullable=False)
    contact_id: Mapped[str] = mapped_column(String(25), nullable=True)

    session_status: Mapped[SessionStatus] = mapped_column(Enum(SessionStatus), default=SessionStatus.STARTED, nullable=False)
    manager_message_exists: Mapped[bool]
    client_message_exists: Mapped[bool]

    def __repr__(self) -> str:
        return f"DialogSessions(id={self.id}, connector_id={self.connector_id}, connector_line_id={self.connector_line_id}, connector_chat_id={self.connector_chat_id}, connector_user_id={self.connector_user_id}, chat_id={self.chat_id})"

import enum
from sqlalchemy import String, Enum
from sqlalchemy.orm import Mapped, mapped_column

from .base import Base


class DialogSessions(Base):
    __tablename__ = "dialog_sessions"

    class SessionStatus(enum.Enum):
        STARTED='started'
        CLOSED='closed'

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    
    connector_id: Mapped[str] = mapped_column(String(100), nullable=False)
    connector_line_id: Mapped[str] = mapped_column(String(25), nullable=False)
    connector_chat_id: Mapped[str] = mapped_column(String(25), nullable=False, index=True)
    connector_user_id: Mapped[str] = mapped_column(String(25), nullable=False, index=True)
    chat_id: Mapped[str] = mapped_column(String(25), nullable=False)
    contact_id: Mapped[str] = mapped_column(String(25), nullable=True)

    session_status: Mapped[SessionStatus] = mapped_column(Enum(SessionStatus), default=SessionStatus.STARTED, nullable=False, index=True)

    manager_message_exists: Mapped[bool] = mapped_column(default=False)
    client_message_exists: Mapped[bool] = mapped_column(default=False)

    def __repr__(self) -> str:
        return (
            f"DialogSessions(id={self.id}, connector_id={self.connector_id}, "
            f"connector_line_id={self.connector_line_id}, connector_chat_id={self.connector_chat_id}, "
            f"connector_user_id={self.connector_user_id}, chat_id={self.chat_id})"
        )

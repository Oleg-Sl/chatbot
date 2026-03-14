import enum
from sqlalchemy import String, Enum
from sqlalchemy.orm import Mapped, mapped_column

from .base import Base


class DialogEvents(Base):
    __tablename__ = "dialog_events"

    class Events(enum.Enum):
        ONSESSIONSTART='ONSESSIONSTART'
        ONSESSIONFINISH='ONSESSIONFINISH'
        ONOPENLINEMESSAGEADD='ONOPENLINEMESSAGEADD'
    
    class Status(enum.Enum):
        PENDING='pending',
        PROCESSED='processed',
        SUCCESS='success',
        FAILURE='failure'

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    
    event: Mapped[Events] = mapped_column(Enum(Events), nullable=False)
    domain: Mapped[str] = mapped_column(String(100), nullable=False)

    connector_id: Mapped[str] = mapped_column(String(100), nullable=False)
    connector_line_id: Mapped[int] = mapped_column(nullable=False)
    connector_chat_id: Mapped[int] = mapped_column(nullable=True)
    connector_user_id: Mapped[int] = mapped_column(nullable=False)
    bitrix_chat_id: Mapped[int] = mapped_column(nullable=True)

    from_user_id: Mapped[int] = mapped_column(nullable=True)

    status: Mapped[Status] = mapped_column(Enum(Status), default=Status.PENDING, nullable=False)

    def __repr__(self) -> str:
        return (
            f"DialogEvents(id={self.id}, connector_id={self.connector_id}, "
            f"connector_line_id={self.connector_line_id}, connector_chat_id={self.connector_chat_id}, "
            f"connector_user_id={self.connector_user_id}, domain={self.domain})"
        )

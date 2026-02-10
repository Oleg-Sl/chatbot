import enum
from datetime import datetime, timezone, timedelta

from sqlalchemy import String, Enum, CheckConstraint, func
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy.ext.hybrid import hybrid_property

from .base import Base


class TaskState(enum.Enum):
    PENDING='pending',
    PROCESSED='processed',
    SUCCESS='success',
    FAILURE='failure'


class TaskReminders(Base):
    __tablename__ = "task_reminders"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    domain: Mapped[str] = mapped_column(String(100), nullable=False)
    bot_id: Mapped[int] = mapped_column(CheckConstraint("bot_id > 0"), nullable=False)
    dialog_id: Mapped[str] = mapped_column(String(100), nullable=False)
    delay: Mapped[int] = mapped_column(CheckConstraint("delay > 0"), nullable=False)
    created_at: Mapped[datetime] = mapped_column(default=datetime.now(timezone.utc))
    message: Mapped[str] = mapped_column(String(100), default='', nullable=False)
    to_user_id:  Mapped[int] = mapped_column(CheckConstraint("delay > 0"), nullable=True)
    state: Mapped[TaskState] = mapped_column(Enum(TaskState), default=TaskState.PENDING, nullable=False)

    @hybrid_property
    def deadline(self) -> datetime:
        return self.created_at + timedelta(minutes=self.delay)

    def __repr__(self) -> str:
        return f"TaskReminders(id={self.id}, domain={self.domain}, bot_id={self.bot_id}, dialog_id={self.dialog_id}, delay={self.delay}, created_at={self.created_at})"

from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column

from .base import Base


class Credentials(Base):
    __tablename__ = "credentials"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    domain: Mapped[str] = mapped_column(String(100))
    auth_token: Mapped[str] = mapped_column(String(100))
    refresh_token: Mapped[str] = mapped_column(String(100))
    client_id: Mapped[str] = mapped_column(String(100), nullable=True)
    client_secret: Mapped[str] = mapped_column(String(100), nullable=True)
    application_token: Mapped[str] = mapped_column(String(100), nullable=True)

    def __repr__(self) -> str:
        return f"Credentials(id={self.id}, domain={self.domain}, client_id={self.client_id})"

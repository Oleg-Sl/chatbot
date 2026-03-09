
from enum import Enum
from typing import Optional
from dataclasses import dataclass


class SessionStatus(Enum):
    STARTED='started'
    CLOSED='closed'
        

class Dialog:
    def __init__(
            self,
            ident: Optional[int] = None,
            connector_id: Optional[str] = None,
            connector_line_id: Optional[str] = None,
            connector_chat_id: Optional[str] = None,
            connector_user_id: Optional[str] = None,
            chat_id: Optional[str] = None,
            contact_id: Optional[str] = None,
            session_status: SessionStatus = SessionStatus.STARTED,
            manager_message_exists: bool = False,
            client_message_exists: bool = False
        ):
        self.id = ident
        self.connector_id = connector_id
        self.connector_line_id = connector_line_id
        self.connector_chat_id = connector_chat_id
        self.connector_user_id = connector_user_id
        self.chat_id = chat_id
        self.contact_id = contact_id
        self.session_status = session_status
        self.manager_message_exists = manager_message_exists
        self.client_message_exists = client_message_exists
    
    def is_taken(self) -> bool:
        return self.manager_message_exists and self.client_message_exists
    
    def is_open(self) -> bool:
        return self.session_status == SessionStatus.STARTED

    def is_closed(self) -> bool:
        return self.session_status == SessionStatus.CLOSED

    def add_message(self, from_user_id: str):
        if self.connector_user_id == from_user_id:
            self.client_message_exists = True
        else:
            self.manager_message_exists = True

    def start_dialog(self):
        self.session_status = SessionStatus.STARTED
        self.manager_message_exists = False
        self.client_message_exists = False
    
    def closed_dialog(self):
        self.session_status = SessionStatus.CLOSED

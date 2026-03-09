from dataclasses import dataclass


@dataclass
class ClosedDialogInputDTO:
    connector_id: str
    connector_line_id: str
    connector_user_id: str
    chat_id: str

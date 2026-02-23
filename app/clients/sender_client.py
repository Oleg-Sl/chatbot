from typing import Optional, List, Dict, Any
from app.clients.bx24_client import BitrixClient


class SenderClient:
    def __init__(self, client: BitrixClient):
        self.client = client

    async def send_message(
        self,
        domain: str,
        bot_id: int,
        dialog_id: str,
        message: str,
        keyboards: Optional[List[Dict[str, Any]]]
        ) -> bool:
        response = await self.client.call(
            domain,
            'im.message.add',
            {
                'DIALOG_ID': dialog_id,
                'MESSAGE': message,
                'KEYBOARD': keyboards if keyboards else None
            }
        )
        print('Message send response:', response)
        print('>>> ', [
            domain,
            'im.message.add',
            {
                'DIALOG_ID': dialog_id,
                'MESSAGE': message,
                'KEYBOARD': keyboards if keyboards else None
            }
        ])
        return True

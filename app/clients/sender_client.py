import re
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
        keyboards: Optional[List[Dict[str, Any]]] = None
        ) -> bool:
        response = await self.client.call(
            domain,
            'imbot.message.add',
            {
                'BOT_ID': bot_id,
                'DIALOG_ID': dialog_id,
                'MESSAGE': message,
                'KEYBOARD': keyboards if keyboards else None
            }
        )
        
        chat_id = re.search(r'\d+', dialog_id)
        if response.get('error') == 'CANCELED' and chat_id:
            await self.client.call(
                domain,
                'im.chat.user.add',
                {
                    'CHAT_ID': chat_id.group(),
                    "USERS": [bot_id, ]
                }
            )
            response = await self.client.call(
                domain,
                # 'im.message.add',
                'imbot.message.add',
                {
                    'BOT_ID': bot_id,
                    'DIALOG_ID': dialog_id,
                    'MESSAGE': message,
                    'KEYBOARD': keyboards if keyboards else None
                }
            )

        return True

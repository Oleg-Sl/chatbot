import pprint
from typing import Optional

from app.clients.bx24_client import BitrixClient


class DialogClient:
    def __init__(self, client: BitrixClient):
        self.client = client

    async def get_dialog_data(
        self,
        domain: str,
        dialog_id: Optional[str] = None,
        user_code: Optional[str] = None
        ) -> dict:

        fields = {}
        if dialog_id:
            fields['DIALOG_ID'] = dialog_id
        if user_code:
            fields['USER_CODE'] = user_code

        response = await self.client.call(
            domain,
            'imopenlines.dialog.get',
            fields
        )

        result = response.get('result', {})

        return {
            "bitrix_chat_id": str(result.get('id')),
            "entity_id": result.get('entity_id'),
            "entity_data_1": result.get('entity_data_1'),
            "entity_data_2": result.get('entity_data_2'),
            "entity_data_3": result.get('entity_data_3'),
        }

    async def update_contact(self, domain: str, contact_id: str, date_communication: str) -> bool:
        response = await self.client.call(
            domain,
            'crm.contact.update',
            {
                'id': contact_id,
                'fields': {
                    'UF_CRM_1687673321747': date_communication
                }
            }
        )

        return response.get('result', False)

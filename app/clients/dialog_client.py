
from app.clients.bx24_client import BitrixClient


class DialogClient:
    def __init__(self, client: BitrixClient):
        self.client = client

    async def get_dialog_data(
        self,
        domain: str,
        dialog_id: str
        ) -> dict:

        response = await self.client.call(
            domain,
            'imopenlines.dialog.get',
            {
                'DIALOG_ID': dialog_id
            }
        )

        result = response.get('result', {})

        return {
            "entity_id": result.get('entity_id'),
            "entity_data_1": result.get('entity_data_1'),
            "entity_data_2": result.get('entity_data_2'),
            "entity_data_3": result.get('entity_data_3'),
        }

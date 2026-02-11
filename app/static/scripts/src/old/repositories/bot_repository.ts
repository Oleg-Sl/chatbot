import type { IApiClient } from '../old/api/types.js';
import type { IBotData, IBotDictionary, IBotCreation } from '../types/bitrix_response.js';


export default class BotRepository {
    private bitrixApiClient: IApiClient;

    constructor(bitrixApiClient: IApiClient) {
        this.bitrixApiClient = bitrixApiClient;
    }

    async getBots(): Promise<IBotDictionary> {
        try {
            const bots = await this.bitrixApiClient?.callMethod<IBotDictionary>('imbot.bot.list');
            return bots;
        } catch (err) {
            console.log(`Failed to fetch bots: ${err}`);
            throw new Error(`Failed to fetch bots: ${err instanceof Error ? err.message : 'Unknown error'}`)
        }
    }

    async createBot(botData: IBotCreation): Promise<number> {
        try {
            const result = await this.bitrixApiClient?.callMethod<number>(
                'imbot.register',
                botData
            );
            // console.log('result = ', result);
            return result as number;
        } catch (err) {
            console.log(`Failed to create bot: ${err}`);
            throw new Error(`Failed to create bot: ${err instanceof Error ? err.message : 'Unknown error'}`)
        }
    }

    async updateBot(botId: number, botNewData: IBotCreation): Promise<boolean> {
        try {
            const result = await this.bitrixApiClient?.callMethod(
                'imbot.update',
                {
                    BOT_ID: botId,
                    FIELDS: botNewData
                }
                
            );
            console.log('result = ', result);
            return true;
        } catch (err) {
            console.log(`Failed to update bot: ${err}`);
            throw new Error(`Failed to update bot: ${err instanceof Error ? err.message : 'Unknown error'}`)
        }
    }

    async deleteBot(botId: number): Promise<boolean> {
        try {
            const result = await this.bitrixApiClient?.callMethod(
                'imbot.unregister',
                {
                    BOT_ID: botId,
                }
                
            );
            console.log('result = ', result);
            return true;
        } catch (err) {
            console.log(`Failed to delete bot: ${err}`);
            throw new Error(`Failed to delete bot: ${err instanceof Error ? err.message : 'Unknown error'}`)
        }
    }
}

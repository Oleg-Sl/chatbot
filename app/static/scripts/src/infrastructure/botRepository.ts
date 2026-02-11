import { type IApiClient } from '../infrastructure/iApiClient.js';
import { type IBotRepository } from '../infrastructure/iBorRepository.js';
import { type IBotData, Bot, type IBotCreation, type IBotUpdate } from '../domain/bot.js';


export class BotRepository implements IBotRepository {
    constructor(private apiClient: IApiClient) {}

    async getBots(): Promise<Bot[]> {
        try {
            const botDataList = await this.apiClient?.callMethod<{ [botId: number]: IBotData }>('imbot.bot.list');
            return Object.values(botDataList).map(botData => Bot.fromData(botData));
        } catch (err) {
            console.log(`Failed to fetch bots: ${err}`);
            throw new Error(`Failed to fetch bots: ${err instanceof Error ? err.message : 'Unknown error'}`)
        }
    }

    async createBot(botData: IBotCreation): Promise<number> {
        try {
            const result = await this.apiClient?.callMethod<number>(
                'imbot.register',
                botData
            );
            return result as number;
        } catch (err) {
            console.log(`Failed to create bot: ${err}`);
            throw new Error(`Failed to create bot: ${err instanceof Error ? err.message : 'Unknown error'}`)
        }
    }

    async updateBot(botId: number, botNewData: IBotUpdate): Promise<boolean> {
        try {
            const result = await this.apiClient?.callMethod<boolean>(
                'imbot.update',
                {
                    BOT_ID: botId,
                    FIELDS: botNewData
                }
                
            );
            return result;
        } catch (err) {
            console.log(`Failed to update bot: ${err}`);
            throw new Error(`Failed to update bot: ${err instanceof Error ? err.message : 'Unknown error'}`)
        }
    }

    async deleteBot(botId: number): Promise<boolean> {
        try {
            const result = await this.apiClient?.callMethod<boolean>(
                'imbot.unregister',
                {
                    BOT_ID: botId,
                }
            );
            return result;
        } catch (err) {
            console.log(`Failed to delete bot: ${err}`);
            throw new Error(`Failed to delete bot: ${err instanceof Error ? err.message : 'Unknown error'}`)
        }
    }
}

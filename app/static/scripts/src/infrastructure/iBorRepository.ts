import { Bot, type IBotCreation, type IBotUpdate } from '../domain/bot.js';


export interface IBotRepository {
    getBots(): Promise<Array<Bot>>;
    createBot(data: IBotCreation): Promise<number>;
    updateBot(botId: number, data: IBotUpdate): Promise<boolean>;
    deleteBot(botId: number): Promise<boolean>;
}

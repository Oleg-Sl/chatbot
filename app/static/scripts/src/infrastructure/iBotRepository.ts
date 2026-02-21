import { Bot, type IBotCreation, type IBotUpdate, type IBotData } from '../domain/bot.js';


export interface IBotRepository {
    getBot(filterData: Partial<IBotData>): Promise<Bot | undefined>;
    getBots(): Promise<Array<Bot>>;
    createBot(data: IBotCreation): Promise<number>;
    updateBot(botId: number, data: IBotUpdate): Promise<boolean>;
    deleteBot(botId: number): Promise<boolean>;
}

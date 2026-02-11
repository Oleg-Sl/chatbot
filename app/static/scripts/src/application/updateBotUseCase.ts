import { type IBotUpdate } from '../domain/bot.js'; 
import { type IBotRepository } from '../infrastructure/iBorRepository.js';


export class UpdateBotUseCase {
    constructor(
        private botRepository: IBotRepository
    ) {}

    async execute(botId: number, data: IBotUpdate): Promise<boolean> {
        return await this.botRepository.updateBot(botId, data);
    }

}

import { type IBotUpdate } from '../../domain/bot.js'; 
import { type IBotRepository } from '../../infrastructure/iBotRepository.js';
import { Repositories } from '../../infrastructure/repositories.js';


export class UpdateBotUseCase {
    private botRepository: IBotRepository

    constructor(repositories: Repositories) {
        this.botRepository = repositories.botRepository;
    }

    async execute(botId: number, data: IBotUpdate): Promise<boolean> {
        return await this.botRepository.updateBot(botId, data);
    }
}

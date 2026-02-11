import { type IBotCreation } from '../domain/bot.js'; 
import { type IBotRepository } from '../infrastructure/iBorRepository.js';


export class CreateBotUseCase {
    constructor(
        private botRepository: IBotRepository
    ) {}

    async execute(data: IBotCreation): Promise<number> {
        return await this.botRepository.createBot(data);
    }

}

import { Bot } from '../domain/bot.js';
import { type IBotRepository } from '../infrastructure/iBorRepository.js';


export class GetBotsUseCase {
    constructor(
        private botRepository: IBotRepository
    ) {}

    async execute(): Promise<Bot[]> {
        return await this.botRepository.getBots();
    }
}

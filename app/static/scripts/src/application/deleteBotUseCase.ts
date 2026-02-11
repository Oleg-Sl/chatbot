import { type IBotRepository } from '../infrastructure/iBorRepository.js';


export class DeleteBotUseCase {
    constructor(
        private botRepository: IBotRepository
    ) {}

    async execute(botId: number): Promise<boolean> {
        return await this.botRepository.deleteBot(botId);
    }

}

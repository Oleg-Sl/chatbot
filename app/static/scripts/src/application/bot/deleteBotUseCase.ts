import { type IBotRepository } from '../../infrastructure/iBotRepository.js';
import { type ISettingsRepository } from '../../infrastructure/iSettingsRepository.js';
import { Repositories } from '../../infrastructure/repositories.js';


export class DeleteBotUseCase {
    private botRepository: IBotRepository
    private settingsRepository: ISettingsRepository

    constructor(repositories: Repositories) {
        this.botRepository = repositories.botRepository;
        this.settingsRepository = repositories.settingsRepository;
    }

    async execute(botId: number): Promise<boolean> {
        const result = await this.botRepository.deleteBot(botId);
        if (result) {
            return await this.settingsRepository.deleteSetting('bot_id');
        }
        return false;
    }
}

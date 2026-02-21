import { BOT_DATA_CONFIG } from '../../configs/bot.js';
import { type IBotCreation } from '../../domain/bot.js'; 
import { type IBotRepository } from '../../infrastructure/iBotRepository.js';
import { type ISettingsRepository } from '../../infrastructure/iSettingsRepository.js';
import { Repositories } from '../../infrastructure/repositories.js';


export class CreateBotUseCase {
    private botRepository: IBotRepository
    private settingsRepository: ISettingsRepository

    constructor(repositories: Repositories) {
        this.botRepository = repositories.botRepository;
        this.settingsRepository = repositories.settingsRepository;
    }

    async execute(): Promise<boolean> {
        const data = JSON.parse(JSON.stringify(BOT_DATA_CONFIG));
        const botId = await this.botRepository.createBot(data);
        if (botId) {
            return await this.settingsRepository.createSetting('bot_id', String(botId));
        }
        return false;
    }
}

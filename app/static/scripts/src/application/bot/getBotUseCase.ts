import { Bot } from '../../domain/bot.js';
import { type IBotRepository } from '../../infrastructure/iBotRepository.js';
import { type ISettingsRepository } from '../../infrastructure/iSettingsRepository.js';
import { Repositories } from '../../infrastructure/repositories.js';


export class GetBotUseCase {
    private botRepository: IBotRepository
    private settingsRepository: ISettingsRepository

    constructor(repositories: Repositories) {
        this.botRepository = repositories.botRepository;
        this.settingsRepository = repositories.settingsRepository;
    }

    async execute(): Promise<Bot | undefined> {
        const botId = await this.settingsRepository.getSetting('bot_id');
        // const botId = 22843;
        if (botId) {
            return await this.botRepository.getBot({ ID: Number(botId) });
        }
    }
}

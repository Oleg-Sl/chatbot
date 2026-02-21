import { type IApiClient } from '../clients/iApiClient.js';
import { type IBotRepository } from './iBotRepository.js';
import { type ICommandRepository } from './iCommandRepository.js';
import { type ISettingsRepository } from './iSettingsRepository.js';
import { BotRepository} from './botRepository.js';
import { CommandRepository } from './commandRepository.js';
import { SettingsRepository } from './settingsRepository.js';


export class Repositories {
    public botRepository: IBotRepository
    public commandRepository: ICommandRepository
    public settingsRepository: ISettingsRepository

    constructor(apiClient: IApiClient) {
        this.botRepository = new BotRepository(apiClient);
        this.commandRepository = new CommandRepository(apiClient);
        this.settingsRepository = new SettingsRepository(apiClient);
    }
}

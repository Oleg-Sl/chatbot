import { type ICommandRepository } from '../../infrastructure/iCommandRepository.js';
import { type ISettingsRepository } from '../../infrastructure/iSettingsRepository.js';
import { Repositories } from '../../infrastructure/repositories.js';


export class UpdateCommandUseCase {
    private commandRepository: ICommandRepository
    private settingsRepository: ISettingsRepository

    constructor(repositories: Repositories) {
        this.commandRepository = repositories.commandRepository;
        this.settingsRepository = repositories.settingsRepository;
    }

    async execute(): Promise<boolean> {
        return false;
    }
}

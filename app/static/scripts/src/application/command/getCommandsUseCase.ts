import { COMMAND_FORM_CONFIG } from '../../configs/commands.js';
import { type ICommandCreation, type ICommandData, type ICommandSettings } from '../../domain/command.js';
import { type ICommandRepository } from '../../infrastructure/iCommandRepository.js';
import { type ISettingsRepository } from '../../infrastructure/iSettingsRepository.js';
import { Repositories } from '../../infrastructure/repositories.js';


export class GetCommandsUseCase {
    private commandRepository: ICommandRepository
    private settingsRepository: ISettingsRepository
    private availableCommands: ICommandCreation[]

    constructor(repositories: Repositories) {
        this.commandRepository = repositories.commandRepository;
        this.settingsRepository = repositories.settingsRepository;
        this.availableCommands = JSON.parse(JSON.stringify(COMMAND_FORM_CONFIG));
    }

    async execute(): Promise<ICommandData[] | undefined> {
        const registeredCommandsJSON = await this.settingsRepository.getSetting('bot_commands');
        // const registeredCommandsJSON = '{"ID":124,"COMMAND":"go"}';

        const registeredCommands = this._parseRegisteredCommands(registeredCommandsJSON);
        console.log('registeredCommands = ', registeredCommands);
        
        try {
            const commands = this._addRegistrationStatus(registeredCommands);
            return commands;
        } catch (err) {
            console.error(`Error getting list of bot commands: `, err);
        }
    }

    _parseRegisteredCommands(registeredCommandsJSON: string | undefined): ICommandSettings[] {
        if (!registeredCommandsJSON) {
            return [];
        }

        try {
            const registeredCommands = JSON.parse(registeredCommandsJSON)
            
            if (Array.isArray(registeredCommands)) {
                return registeredCommands as ICommandSettings[];
            }

            if (registeredCommands && typeof registeredCommands === 'object') {
                return [registeredCommands as ICommandSettings];
            }

            return [];
        } catch (err) {
            return [];
        }
    }

    _addRegistrationStatus(registeredCommands: ICommandSettings[]): ICommandData[] {
        const registeredMap = new Map(
            registeredCommands.map(cmd => [cmd.COMMAND, cmd])
        )

        return this.availableCommands.map(command => {
            const registeredCommand = registeredMap.get(command.COMMAND) || {}
            return { ...command, ...registeredCommand } as ICommandData;
        });
    }
}

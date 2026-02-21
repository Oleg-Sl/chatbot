import { COMMAND_FORM_CONFIG } from '../../configs/commands.js';
import { type ICommandCreation, type ICommandSettings } from '../../domain/command.js'; 
import { type ICommandRepository } from '../../infrastructure/iCommandRepository.js';
import { type ISettingsRepository } from '../../infrastructure/iSettingsRepository.js';
import { Repositories } from '../../infrastructure/repositories.js';


export class CreateCommandUseCase {
    private commandRepository: ICommandRepository
    private settingsRepository: ISettingsRepository
    private availableCommands: ICommandCreation[]

    constructor(repositories: Repositories) {
        this.commandRepository = repositories.commandRepository;
        this.settingsRepository = repositories.settingsRepository;
        this.availableCommands = JSON.parse(JSON.stringify(COMMAND_FORM_CONFIG));
    }

    async execute(botId: number | undefined, commandName: string | undefined): Promise<number> {
        if (!botId || !commandName) {
            throw new Error('Bot ID and command name are required');
        }
        const commandData = this._getCommandData(commandName);
        if (!commandData) {
            console.log(`Data for command = "${commandName}" is not found`)
            throw new Error(`Data for command = "${commandName}" is not found`);
        }
        commandData.BOT_ID = botId;

        try {
            const commandId = await this.commandRepository.createCommand(commandData);
            console.log('commandId = ', commandId);
            if (!commandId) {
                throw new Error('Failed to create command.');
            }

            const registeredCommandsJSON = await this.settingsRepository.getSetting('bot_commands');
            const registeredCommands = this._parseRegisteredCommands(registeredCommandsJSON);
            registeredCommands.push({ ID: commandId, COMMAND: commandName })
            
            console.log('registeredCommands = ', registeredCommands);
            const result = await this.settingsRepository.createSetting('bot_commands', JSON.stringify(registeredCommands));
            console.log('result of registeredCommands = ', result);
            return commandId;
        } catch (err) {
            console.error(`Unexpected error creating command: ${err instanceof Error ? err.message : '' }`);
            throw new Error(`Unexpected error creating command: ${err instanceof Error ? err.message : '' }`);
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

    _getCommandData(commandName: string): ICommandCreation | undefined {
        return this.availableCommands.find(cmd => cmd.COMMAND === commandName);
    }
    
}

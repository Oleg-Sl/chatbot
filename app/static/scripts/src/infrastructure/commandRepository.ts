import { type IApiClient } from '../infrastructure/iApiClient.js';
import { type ICommandRepository } from '../infrastructure/iCommandRepository.js';
import { type ICommandCreation, type ICommandUpdate } from '../domain/command.js';


export class CommandRepository implements ICommandRepository {
    constructor(private apiClient: IApiClient) {}

    async createCommand(data: ICommandCreation): Promise<number> {
        try {
            const result = await this.apiClient?.callMethod<number>(
                'imbot.command.register',
                data
            );
            // console.log('result = ', result);
            return result;
        } catch (err) {
            console.log(`Failed to create command: ${err}`);
            throw new Error(`Failed to create command: ${err instanceof Error ? err.message : 'Unknown error'}`)
        }
    }

    async updateCommand(commandId: number, data: ICommandUpdate): Promise<boolean> {
        try {
            const result = await this.apiClient?.callMethod<boolean>(
                'imbot.command.update',
                {
                    COMMAND_ID: commandId,
                    FIELDS: data
                }
                
            );
            console.log('result = ', result);
            return result;
        } catch (err) {
            console.log(`Failed to update bot: ${err}`);
            throw new Error(`Failed to update bot: ${err instanceof Error ? err.message : 'Unknown error'}`)
        }
    }

    async deleteCommand(commandId: number, clientId: string): Promise<boolean> {
        try {
            const result = await this.apiClient?.callMethod<boolean>(
                'imbot.unregister',
                {
                    COMMAND_ID: commandId,
                    CLIENT_ID: clientId
                }
                
            );
            console.log('result = ', result);
            return result;
        } catch (err) {
            console.log(`Failed to delete bot: ${err}`);
            throw new Error(`Failed to delete bot: ${err instanceof Error ? err.message : 'Unknown error'}`)
        }
    }
}

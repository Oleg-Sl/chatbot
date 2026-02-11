import type { IApiClient } from '../old/api/types.js';
import type { ICommandCreation, ICommandUpdation } from '../types/command.js';


export class CommandRepository {
    private bitrixApiClient: IApiClient;

    constructor(bitrixApiClient: IApiClient) {
        this.bitrixApiClient = bitrixApiClient;
    }

    async create(data: ICommandCreation): Promise<number> {
        try {
            const result = await this.bitrixApiClient?.callMethod<number>(
                'imbot.command.register',
                data
            );
            console.log('result = ', result);
            return result;
        } catch (err) {
            console.log(`Failed to create command: ${err}`);
            throw new Error(`Failed to create command: ${err instanceof Error ? err.message : 'Unknown error'}`)
        }
    }

    async update(commandId: number, data: ICommandUpdation): Promise<boolean> {
        try {
            const result = await this.bitrixApiClient?.callMethod<boolean>(
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

    async delete(commandId: number, clientId: string): Promise<boolean> {
        try {
            const result = await this.bitrixApiClient?.callMethod<boolean>(
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

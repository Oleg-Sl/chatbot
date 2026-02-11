import { type ICommandCreation, type ICommandUpdate } from '../domain/command.js';


export interface ICommandRepository {
    createCommand(data: ICommandCreation): Promise<number>;
    updateCommand(commandId: number, data: ICommandUpdate): Promise<boolean>;
    deleteCommand(commandId: number, clientId: string): Promise<boolean>;
}

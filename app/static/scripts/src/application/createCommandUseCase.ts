import { type ICommandCreation } from '../domain/command.js'; 
import { type ICommandRepository } from '../infrastructure/iCommandRepository.js';


export class CreateCommandUseCase {
    constructor(
        private commandRepository: ICommandRepository
    ) {}

    async execute(data: ICommandCreation): Promise<number> {
        return await this.commandRepository.createCommand(data);
    }

}

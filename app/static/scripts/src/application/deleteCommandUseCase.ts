import { type ICommandRepository } from '../infrastructure/iCommandRepository.js';


export class DeleteCommandUseCase {
    constructor(
        private commandRepository: ICommandRepository
    ) {}

}

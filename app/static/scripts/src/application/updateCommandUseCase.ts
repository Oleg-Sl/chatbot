import { type ICommandRepository } from '../infrastructure/iCommandRepository.js';


export class UpdateCommandUseCase {
    constructor(
        private commandRepository: ICommandRepository
    ) {}

}

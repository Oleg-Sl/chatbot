import { FakeApiClient } from './infrastructure/fakeApiClient.js';
import { BotRepository } from './infrastructure/botRepository.js';
import { CommandRepository } from './infrastructure/commandRepository.js';

import { GetBotsUseCase } from './application/getBotsUseCase.js';
import { CreateBotUseCase } from './application/createBotUseCase.js';
import { UpdateBotUseCase } from './application/updateBotUseCase.js';
import { DeleteBotUseCase } from './application/deleteBotUseCase.js';
import { CreateCommandUseCase } from './application/createCommandUseCase.js';
import { UpdateCommandUseCase } from './application/updateCommandUseCase.js';
import { DeleteCommandUseCase } from './application/deleteCommandUseCase.js';

// import { BotManagerPresenter } from './presentation/botManagerPresenter.js';
// import { CreateBotModalView } from './presentation/createBotModalView.js';
import { ManagerPresenter } from './presentation/managerPresenter.js';


class App {
    async initialize() {
        const apiClient = new FakeApiClient();
        const botRepository = new BotRepository(apiClient);
        const commandRepository = new CommandRepository(apiClient);

        const getBotsUseCase = new GetBotsUseCase(botRepository);
        const createBotUseCase = new CreateBotUseCase(botRepository);
        const updateBotUseCase = new UpdateBotUseCase(botRepository);
        const deleteBotUseCase = new DeleteBotUseCase(botRepository);
        
        const createCommandUseCase = new CreateCommandUseCase(commandRepository);
        const updateCommandUseCase = new UpdateCommandUseCase(commandRepository);
        const deleteCommandUseCase = new DeleteCommandUseCase(commandRepository);

        const managePresenter = new ManagerPresenter(
            getBotsUseCase,
            createBotUseCase,
            updateBotUseCase,
            deleteBotUseCase,
            createCommandUseCase,
            updateCommandUseCase,
            deleteCommandUseCase
        );
        managePresenter.initialize();

    }
}


const app = new App();

document.addEventListener("DOMContentLoaded", () => {
    // BX24.ready(function() {
    //     app.initialize();
    // })
    app.initialize();
})


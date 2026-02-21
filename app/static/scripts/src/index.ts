// import { FakeApiClient } from './clients/fakeApiClient.js';
import { ApiClient } from './clients/apiClient.js';

import { Repositories } from './infrastructure/repositories.js';

import { GetBotUseCase } from './application/bot/getBotUseCase.js';
import { CreateBotUseCase } from './application/bot/createBotUseCase.js';
import { UpdateBotUseCase } from './application/bot/updateBotUseCase.js';
import { DeleteBotUseCase } from './application/bot/deleteBotUseCase.js';
import { GetCommandsUseCase } from './application/command/getCommandsUseCase.js';
import { CreateCommandUseCase } from './application/command/createCommandUseCase.js';
import { UpdateCommandUseCase } from './application/command/updateCommandUseCase.js';
import { DeleteCommandUseCase } from './application/command/deleteCommandUseCase.js';

import { ManagerPresenter } from './presentation/managerPresenter.js';


class App {
    async initialize() {
        const apiClient = new ApiClient();
        const repositories = new Repositories(apiClient);

        const getBotUseCase = new GetBotUseCase(repositories);
        const createBotUseCase = new CreateBotUseCase(repositories);
        const updateBotUseCase = new UpdateBotUseCase(repositories);
        const deleteBotUseCase = new DeleteBotUseCase(repositories);

        const getCommandsUseCase = new GetCommandsUseCase(repositories);
        const createCommandUseCase = new CreateCommandUseCase(repositories);
        const updateCommandUseCase = new UpdateCommandUseCase(repositories);
        const deleteCommandUseCase = new DeleteCommandUseCase(repositories);

        const managePresenter = new ManagerPresenter(
            getBotUseCase,
            createBotUseCase,
            updateBotUseCase,
            deleteBotUseCase,
            getCommandsUseCase,
            createCommandUseCase,
            updateCommandUseCase,
            deleteCommandUseCase
        );

        managePresenter.initialize();
    }

    run() {
    }
}


const app = new App();

document.addEventListener("DOMContentLoaded", () => {
    // BX24.ready(function() {
    //     app.initialize();
    // })
    app.initialize();
    app.run();
})


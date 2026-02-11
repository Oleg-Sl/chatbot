// import ApiClient from './api/fake_api_client.js';
// import BotRepository from './repositories/bot_repository.js';
// import { CommandRepository } from './repositories/command_repository.js';
// import { BotListView } from './view/bot_list_view.js';
// import { BotFormView } from './view/bot_form_view.js';
// import { CommandFormView } from './view/command_form_view.js';
// import type { IBotData, IBotDictionary, IBotCreation, IBotUpdation } from './types/bitrix_response.js';


class App {
    async initialize() {
        // const bitrixApiClient = new ApiClient();
        // const botRepository = new BotRepository(bitrixApiClient);
        // const commandRepository = new CommandRepository(bitrixApiClient);

        // const botListView = new BotListView('botListId');
        // const botFormView = new BotFormView('createBotId', botRepository);
        // const commandFormView = new CommandFormView('createCommandId', commandRepository);


        // const bots = await botRepository.getBots();
        // botListView.render(Object.values(bots).sort((a, b) => +a - +b));


        // const btnCreateBot = document.getElementById('btnCreateBotId');
        // const form = document.getElementById('createBotForm');
        // document.querySelector('form')?.reportValidity()
        // document.forms['createBotForm'].reportValidity();

        // btnCreateBot?.addEventListener('click', () => {
        // });
        // console.log('Fetched bots:', bots);
        // await botRepository.createBot({
        //     CODE: 'Chat bot',
        //     TYPE: 'O',
        //     EVENT_HANDLER: 'tammam.ru',
        //     EVENT_MESSAGE_ADD: 'tammam.ru',
        //     EVENT_WELCOME_MESSAGE: 'tammam.ru',
        //     EVENT_BOT_DELETE: 'tammam.ru',
        //     OPENLINE: 'Y',
        //     PROPERTIES: {
        //         NAME: 'Имя бота',
        //         LAST_NAME: '',
        //         COLOR: 'GREEN',
        //     },
        // });
    }
}


const app = new App();

document.addEventListener("DOMContentLoaded", () => {
    // BX24.ready(function() {
    //     app.initialize();
    // })
    app.initialize();
})


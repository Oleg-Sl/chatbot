import { BotListView } from './botListView.js';
import { CreateBotModalView } from './createBotModalView.js';
import { CreateCommandModalView } from './createCommandModalView.js';
import { EditBotModalView } from './editBotModalView.js';
import { EditCommandModalView } from './editCommandModalView.js';

import { GetBotsUseCase } from '../application/getBotsUseCase.js';
import { CreateBotUseCase } from '../application/createBotUseCase.js';
import { UpdateBotUseCase } from '../application/updateBotUseCase.js';
import { DeleteBotUseCase } from '../application/deleteBotUseCase.js';
import { CreateCommandUseCase } from '../application/createCommandUseCase.js';
import { UpdateCommandUseCase } from '../application/updateCommandUseCase.js';
import { DeleteCommandUseCase } from '../application/deleteCommandUseCase.js';


export class ManagerPresenter {
    private botListView: BotListView;
    private createBotModalView: CreateBotModalView;
    private createCommandModalView: CreateCommandModalView;
    private editBotModalView: EditBotModalView;
    private editCommandModalView: EditCommandModalView;

    private getBotsUseCase: GetBotsUseCase;
    private createBotUseCase: CreateBotUseCase;
    private updateBotUseCase: UpdateBotUseCase;
    private deleteBotUseCase: DeleteBotUseCase;
    private createCommandUseCase: CreateCommandUseCase;
    private updateCommandUseCase: UpdateCommandUseCase;
    private deleteCommandUseCase: DeleteCommandUseCase;

    constructor(
        getBotsUseCase: GetBotsUseCase,
        createBotUseCase: CreateBotUseCase,
        updateBotUseCase: UpdateBotUseCase,
        deleteBotUseCase: DeleteBotUseCase,
        createCommandUseCase: CreateCommandUseCase,
        updateCommandUseCase: UpdateCommandUseCase,
        deleteCommandUseCase: DeleteCommandUseCase
    ) {
        this.getBotsUseCase = getBotsUseCase;
        this.createBotUseCase = createBotUseCase;
        this.updateBotUseCase = updateBotUseCase;
        this.deleteBotUseCase = deleteBotUseCase;
        this.createCommandUseCase = createCommandUseCase;
        this.updateCommandUseCase = updateCommandUseCase;
        this.deleteCommandUseCase = deleteCommandUseCase;

        this.botListView = new BotListView('botListId');
        this.createBotModalView = new CreateBotModalView('createBotModal');
        this.createCommandModalView = new CreateCommandModalView('createCommandModal');
        this.editBotModalView = new EditBotModalView('editBotModal');
        this.editCommandModalView = new EditCommandModalView('editCommandModal');
    }

    initialize() {
        this.createBotModalView.initialize();
        this.createCommandModalView.initialize();
        this.editBotModalView.initialize();
        this.editCommandModalView.initialize();

        this.render();
        this.bindEvents();
    }

    private bindEvents() {
        const btnOpenBotCreationWindow = document.getElementById('openBotCreationWindow');
        const btnOpenCommandCreationWindow = document.getElementById('openCommandCreationWindow');
        const btnOpenCommandUpdateWindow = document.getElementById('openCommandUpdateWindow');
        
        if (btnOpenBotCreationWindow) {
            btnOpenBotCreationWindow.addEventListener('click', () => {
                this.createBotModalView.show();
            });
        }
        if (btnOpenCommandCreationWindow) {
            btnOpenCommandCreationWindow.addEventListener('click', () => {
                this.createCommandModalView.show()
            });
        }
        if (btnOpenCommandUpdateWindow) {
            btnOpenCommandUpdateWindow.addEventListener('click', () => {
                this.editCommandModalView.show()
            });
        }

        this.botListView.onEditBot = (botId: number) => {
            this.editBotModalView.show(botId);
        }

        this.createBotModalView.onAction = async () => {
            const isValid = this.createBotModalView.validateForm();

            if (!isValid) {
                return false;
            }
            let formData = await this.createBotModalView.getFormData();
            console.log('formData = ', formData);
            // const result = await this.createBotUseCase.execute(formData);
            // console.log('result = ', result);
            return true;
        }

        this.createCommandModalView.onAction = async () => {
            const isValid = this.createCommandModalView.validateForm();

            if (!isValid) {
                return false;
            }
            let formData = await this.createCommandModalView.getFormData();
            console.log('formData = ', formData);
            // const result = await this.createCommandUseCase.execute(formData);
            // console.log('result = ', result);
            return true;
        }
    }

    private async render() {
        const bots = await this.getBotsUseCase.execute();
        this.botListView.render(bots);
        this.createBotModalView.setAvailableBots(bots);
        this.createCommandModalView.setAvailableBots(bots);
        this.editBotModalView.setAvailableBots(bots);
        this.editCommandModalView.setAvailableBots(bots);
    }
}

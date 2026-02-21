import { Bot } from '../domain/bot.js';

import { BotView } from './views/botView.js';
import { CommandView } from './views/commandView.js';
import { ScreenView } from './views/screen.js';


import { GetBotUseCase } from '../application/bot/getBotUseCase.js';
import { CreateBotUseCase } from '../application/bot/createBotUseCase.js';
import { UpdateBotUseCase } from '../application/bot/updateBotUseCase.js';
import { DeleteBotUseCase } from '../application/bot/deleteBotUseCase.js';
import { GetCommandsUseCase } from '../application/command/getCommandsUseCase.js';
import { CreateCommandUseCase } from '../application/command/createCommandUseCase.js';
import { UpdateCommandUseCase } from '../application/command/updateCommandUseCase.js';
import { DeleteCommandUseCase } from '../application/command/deleteCommandUseCase.js';


export class ManagerPresenter {
    public botId: number | undefined;
 
    private botView: BotView;
    private commandView: CommandView;
    private screenView: ScreenView;

    private getBotUseCase: GetBotUseCase;
    private createBotUseCase: CreateBotUseCase;
    private updateBotUseCase: UpdateBotUseCase;
    private deleteBotUseCase: DeleteBotUseCase;
    private getCommandsUseCase: GetCommandsUseCase;
    private createCommandUseCase: CreateCommandUseCase;
    private updateCommandUseCase: UpdateCommandUseCase;
    private deleteCommandUseCase: DeleteCommandUseCase;

    constructor(
        getBotUseCase: GetBotUseCase,
        createBotUseCase: CreateBotUseCase,
        updateBotUseCase: UpdateBotUseCase,
        deleteBotUseCase: DeleteBotUseCase,
        getCommandsUseCase: GetCommandsUseCase,
        createCommandUseCase: CreateCommandUseCase,
        updateCommandUseCase: UpdateCommandUseCase,
        deleteCommandUseCase: DeleteCommandUseCase
    ) {
        this.getBotUseCase = getBotUseCase;
        this.createBotUseCase = createBotUseCase;
        this.updateBotUseCase = updateBotUseCase;
        this.deleteBotUseCase = deleteBotUseCase;
        this.getCommandsUseCase = getCommandsUseCase;
        this.createCommandUseCase = createCommandUseCase;
        this.updateCommandUseCase = updateCommandUseCase;
        this.deleteCommandUseCase = deleteCommandUseCase;

        this.botView = new BotView('botDescriptionContainer');
        this.commandView = new CommandView('commandListContainer');
        this.screenView = new ScreenView('setupScreen', 'appScreen');

        this.botId = undefined;
    }

    async initialize() {
        let bot = await this.getBotUseCase.execute();

        if (!bot) {
            console.log('Bot is not exist. Start bot installation.');
            this.screenView.showScreen('setup');
            const resultCreating = await this.createBotUseCase.execute();
            console.log('resultCreating = ', resultCreating)
            bot = await this.getBotUseCase.execute();
        }

        console.log('Bot = ', bot);
        this.screenView.showScreen('app');
        this.render(bot);
        this.bindEvents();
    }

    private bindEvents() {
        this.commandView.getContainer().addEventListener('click', (event) => {
            const target = event.target as HTMLElement;
            if (target.classList.contains('botCommandInstall') ) {
                this.handleCommandInstall(target.dataset.command);
            }
        })
    }

    private async render(bot: Bot | undefined) {
        // const bot = await this.getBotUseCase.execute();
        // console.log('Render bot data: ', bot);

        this.botView.render(bot);
        this.botId = bot?.ID;

        const commands = await this.getCommandsUseCase.execute();
        console.log('Render commands data: ', commands);
        
        this.commandView.render(commands);

    }

    async handleCommandInstall(commandName: string | undefined) {
        if (commandName) {
            this.commandView.setState(commandName, 'registering');

            const commandId = await this.createCommandUseCase.execute(this.botId, commandName);

            this.commandView.setState(commandName, 'registered');
            this.commandView.setCommandId(commandName, commandId);
        }

    }
}

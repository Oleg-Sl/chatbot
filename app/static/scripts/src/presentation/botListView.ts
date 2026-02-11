import { type IBotData } from '../domain/bot.js';


export class BotListView {
    private container: HTMLElement;
    public onEditBot: ((botId: number) => void) | null = null;

    constructor(containerId: string) {
        const container = document.getElementById(containerId);
        if (!container) {
            throw new Error(`Element with id = "${containerId}" is not found`);
        }
        this.container = container;
        this.bindEvents();
    }

    render(bots: IBotData[]): void {
        this.container.innerHTML = `
            <table class="table table-bordered align-middle">
                <caption>Список ботов</caption>
                <thead class="align-middle">
                    <tr>
                        <th class="col-1">Идентификатор</th>
                        <th class="col">Имя</th>
                        <th class="col">Внутренний код</th>
                        <th class="col-2">Поддержка "Открытых линий"</th>
                        <th class="col-1"></th>
                    </tr>
                </thead>
                <tbody>
                    ${bots.map(bot => this.getRowTemplate(bot)).join('')}
                </tbody>
            </table>
        `;
    }

    private getRowTemplate(botData: IBotData): string {
        const botOpenLine = botData.OPENLINE === 'Y' ? 'Да' : 'Нет';
        return `
            <tr data-bot-id="${botData.ID}">
                <td>${botData.ID}</td>
                <td>${botData.NAME}</td>
                <td>${botData.CODE}</td>
                <td>${botOpenLine}</td>
                <td>
                    <div class="d-flex justify-content-center align-items-center">
                        <button class="btn btn-light me-1 btn-edit-bot" title='Редактировать бота "${botData.NAME}"' data-bot-id="${botData.ID}">
                            <i class="bi bi-pencil-square"></i>
                        </button>
                        <button class="btn btn-light me-1 btn-delete-bot" title='Удалить бота "${botData.NAME}"' data-bot-id="${botData.ID}">
                            <i class="bi bi-trash3-fill"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `;
    }

    private bindEvents() {
        this.container.addEventListener('click', this.handleBotEdit.bind(this));
    }
    
    private handleBotEdit(event: Event) {
        const target = event.target as HTMLElement;
        const button = target.closest('.btn-edit-bot') as HTMLElement;
        if (!button) {
            return;
        }
        const botId = button.dataset.botId;
        if (!botId) {
            console.error('Bot ID not found on edit button');
            return;
        }
        console.log(`Edit bot with ID: ${botId}`);
        if (this.onEditBot) {
            this.onEditBot(Number(botId));
        }
    }
}

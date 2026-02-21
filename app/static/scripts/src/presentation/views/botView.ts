import { type IBotData } from '../../domain/bot.js';


export class BotView {
    private container: HTMLElement;

    constructor(containerId: string) {
        const container = document.getElementById(containerId);
        if (!container) {
            throw new Error(`Element with id = "${containerId}" is not found`);
        }
        this.container = container;
    }

    render(bot: IBotData | undefined): void {
        if (!bot) {
            return;
        }

        this.container.innerHTML = `
            <table class="table table-bordered table-sm">
                <tbody>
                    <tr>
                        <th scope="row">Идентификатор</th>
                        <td>${bot.ID}</td>
                    </tr>
                    <tr>
                        <th scope="row">Имя</th>
                        <td>${bot.NAME}</td>
                    </tr>
                    <tr>
                        <th scope="row">Внутренний код</th>
                        <td>${bot.CODE}</td>
                    </tr>
                    <tr>
                        <th scope="row">Поддержка "Открытых линий"</th>
                        <td>${bot.OPENLINE === 'Y' ? 'Да' : 'Нет'}</td>
                    </tr>
                </tbody>
            </table>
        `;
    }
}

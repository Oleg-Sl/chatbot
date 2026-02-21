import { type ICommandData } from '../../domain/command.js';


export class CommandView {
    private container: HTMLElement;

    constructor(containerId: string) {
        const container = document.getElementById(containerId);
        if (!container) {
            throw new Error(`Element with id = "${containerId}" is not found`);
        }
        this.container = container;
    }

    getContainer() {
        return this.container;
    }

    render(commands: ICommandData[] | undefined): void {
        if (!commands) {
            return;
        }

        this.container.innerHTML = `
            <table class="table table-bordered table-sm">
                <tbody>
                    ${commands.map(cmd => this._getCommandHTML(cmd)).join('\n')}
                </tbody>
            </table>
        `;
    }

    setState(commandName: string, state: 'registered' | 'available' | 'registering') {
        const trs = this.container.querySelectorAll('tr');
        const tr = Array.from(trs).find(tr => tr.dataset.commandName === commandName);
        console.log('tr = ', tr);
        const cellStateCommand = tr?.querySelector('.command-state');
        console.log('cellStateCommand = ', cellStateCommand);
        if (!cellStateCommand) {
            return;
        }
        console.log('state = ', state);

        if (state == 'registering') {
            cellStateCommand.innerHTML = `
                <div class="spinner-border spinner-border-sm text-primary" role="status">
                    <span class="visually-hidden">Загрузка...</span>
                </div>
            `;
        } else if (state == 'available') {
            cellStateCommand.innerHTML = `<a class="link-opacity-100 botCommandInstall" href="#" data-command="${commandName}">Установить</a>`;
        } else if (state == 'registered') {
            cellStateCommand.innerHTML = 'Установлена';
        }
    }

    setCommandId(commandName: string, commandId: number) {
        if (!commandName || !commandId) {
            return;
        }

        const trs = this.container.querySelectorAll('tr');
        const tr = Array.from(trs).find(tr => tr.dataset.commandName === commandName);
        const cellCommandId = tr?.querySelector('.command-id');
        if (!cellCommandId) {
            return;
        }

        cellCommandId.innerHTML = `${commandId}`;
    }

    _getCommandHTML(command: ICommandData): string {
        return `
            <tr data-command-id="${command.ID}" data-command-name="${command.COMMAND}">
                <th scope="row" class="command-id">${command.ID || '-'}</th>
                <td>${command.COMMAND}</td>
                <td>${command.LANG?.[0]?.TITLE}</td>
                <td>${command.HIDDEN === 'Y' ? 'Закрытая команда' : 'Открытая команда'}</td>
                <td class="command-state">${this._getStateCommandHTML(command)}</td>
            </tr>
        `;
    }

    _getStateCommandHTML(command: ICommandData): string {
        if (command.ID) {
            return 'Установлена';
        }
        return `<a class="link-opacity-100 botCommandInstall" href="#" data-command="${command.COMMAND}">Установить</a>`;
    }
}

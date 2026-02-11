declare const bootstrap: any;


export class ModalWindow {
    private modalElement: HTMLElement;
    protected modalBodyElement: HTMLElement | null;
    protected errorElement: HTMLElement | null; 
    private buttonActionElement: HTMLButtonElement | null;
    protected modal: any;
    public onHideModal?: () => void;
    public onShowModal?: () => void;
    public onAction?: () => Promise<boolean>;

    constructor(modalId: string) {
        this.createModal(modalId);
        const modalElement = document.getElementById(modalId);
        if (!modalElement) {
            throw new Error(`Modal with id = ${modalId} not found`);
        }
        this.modalElement = modalElement;
        this.modalBodyElement = this.modalElement.querySelector('.modal-body');
        this.errorElement = this.modalElement.querySelector('.alert-danger');
        this.buttonActionElement = this.modalElement?.querySelector('.btn-action');

        this.modal = new bootstrap.Modal(`#${modalId}`, {})

        this.bindEvents();
    }

    public show(botId: number = 22673) {
        this.setCurrentBot(botId);
        this.modal.show();
    }

    public hide() {
        this.modal.hide();
    }

    public showError(errorMessage: string) {
        if (this.errorElement) {
            this.errorElement.innerText = errorMessage;
            this.errorElement.classList.remove('d-none');
        }
    }

    public hideError() {
        if (this.errorElement) {
            this.errorElement.innerText = '';
            this.errorElement.classList.remove('d-none');
        }
    }

    public setTitle(title: string): void {
        const titleElement = this.modalElement?.querySelector('.modal-title');
        if (titleElement) {
            titleElement.textContent = title;
        }
    }

    public setButtonName(name: string): void {
        const element = this.buttonActionElement?.querySelector('div');
        if (this.buttonActionElement) {
            // element.textContent = name;
            this.buttonActionElement.innerHTML = `
                <span class="spinner-border spinner-border-sm d-none" role="status" aria-hidden="true"></span>
                ${name}
            `;
        }
    }

    protected setCurrentBot(botId?: number) {
    }

    private createModal(modalId: string) {
        document.body.insertAdjacentHTML('beforeend', `
            <div class="modal modal-lg fade" id="${modalId}" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="createBotLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="createBotLabel">Создание нового чат-бота</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Закрыть"></button>
                        </div>

                        <div class="modal-body"></div>
                        <div class="alert alert-danger d-none" role="alert"></div>

                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Закрыть</button>
                            <button type="button action-button" class="btn btn-primary btn-action"></button>
                        </div>
                    </div>
                </div>
            </div>
        `);
    }

    private async bindEvents() {
        this.buttonActionElement?.addEventListener('click', async () => {
            if (this.onAction) {
                this.startLoading();
                try {
                    const isCompleate = await this.onAction?.();
                    if (isCompleate) {
                        this.hide();
                    }
                } finally {
                    this.stopLoading();
                }
            }
        });

        this.modalElement.addEventListener('hide.bs.modal', () => {
            this.onHideModal?.();
        })

        this.modalElement.addEventListener('show.bs.modal', () => {
            this.onShowModal?.();
        })
    }

    private startLoading() {
        if (this.buttonActionElement) {
            this.buttonActionElement.disabled = true;
            this.buttonActionElement.querySelector('span')?.classList.remove('d-none');
        }
    }

    private stopLoading() {
        if (this.buttonActionElement) {
            this.buttonActionElement.disabled = false;
            this.buttonActionElement.querySelector('span')?.classList.add('d-none');
        }
    }

}

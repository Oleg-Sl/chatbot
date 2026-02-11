declare const bootstrap: any;

import { CommandRepository } from '../repositories/command_repository.js';
import { FIELDS_OF_COMMAND_CREATION_FORM } from '../constants/fields_of_command_cretion_form.js';
import { type IField } from '../old/types/common.js';
import { type ICommandCreation } from '../old/types/command.js';


export class CommandFormView {
    private modalId: string;
    private modalElement: HTMLElement;
    private formElement: HTMLFormElement;
    private errorElement: HTMLElement;
    private fieldsElements: (HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement)[];
    private modal: any;
    private repository: CommandRepository;
    
    constructor(modalId: string, repository: CommandRepository) {
        this.modalId = modalId;
        this.repository = repository;
        this.fieldsElements = [];

        this.createForm();

        const modalElement = document.getElementById(this.modalId);
        const formContainer = document.getElementById('createCommandForm');
        const errorElement = document.getElementById('createCommandAlertError');

        if (!modalElement || !formContainer || !errorElement) {
            throw new Error(`Container "Creating form" with id = "createCommandForm" not found`);
        }

        this.modalElement = modalElement;
        this.formElement = formContainer as HTMLFormElement;
        this.errorElement = errorElement;
        this.fieldsElements = Array.from(this.formElement.querySelectorAll('input, textarea, select'));

        this.modal = new bootstrap.Modal(`#${this.modalId}`, {})

        this.bindEvents();
    }

    bindEvents() {
        document.querySelector('#btnCreateCommand')?.addEventListener('click', this.handleCreteCommand.bind(this));

        this.modalElement.addEventListener('hide.bs.modal', () => {
            this.formElement.reset();
        })

        this.modalElement.addEventListener('show.bs.modal', () => {
            this.formElement.reset();
        })
    }

    async handleCreteCommand() {
        console.log('handleCreteCommand');
        if (!this.validateForm()) {
            return;
        }
        const data = this.getFormData();
        console.log(data);
        try {
            const result = await this.repository.create(data);
            console.log(result);
            this.resetError();
        } catch(err) {
            console.log(err);
            this.showError(`Failed to delete bot: ${err instanceof Error ? err.message : 'Unknown error'}`);
        }
    }

    validateForm() {
        let isValidate = true;
        for (const elem of this.fieldsElements) {
            if (!elem.checkValidity()) {
                elem.classList.add('is-invalid');
                isValidate = false;
            } else {
                elem.classList.add('is-valid');
            }
        }
        return isValidate;
    }

    resetForm() {
        this.fieldsElements.map(elem => elem.classList.remove('is-valid', 'is-invalid'));
    }

    showError(errorMessage: string) {
        this.errorElement.innerText = errorMessage;
        this.errorElement.classList.remove('d-none');
    }

    resetError() {
        this.resetForm();
        this.errorElement.classList.add('d-none');
    }

    private getFormData(): ICommandCreation {
        const botId = this.formElement.querySelector<HTMLInputElement>('[name=BOT_ID]')?.value;
        if (!botId) {
            throw new Error('');
        }
        let data: ICommandCreation = {
            BOT_ID: +botId,
            COMMAND: this.formElement.querySelector<HTMLInputElement>('[name=COMMAND]')?.value || '',
            COMMON: this.formElement.querySelector<HTMLInputElement>('[name=COMMON]')?.value || '',
            HIDDEN: this.formElement.querySelector<HTMLInputElement>('[name=HIDDEN]')?.value || '',
            CLIENT_ID: this.formElement.querySelector<HTMLInputElement>('[name=CLIENT_ID]')?.value || '',
            LANG: [
                {
                    LANGUAGE_ID: 'ru',
                    TITLE: 'Получить тестовое ссобщение',
                    PARAMS: this.formElement.querySelector<HTMLInputElement>('[name=LANG__RU]')?.value || '',
                },
                {
                    LANGUAGE_ID: 'en',
                    TITLE: 'Get test message',
                    PARAMS: this.formElement.querySelector<HTMLInputElement>('[name=LANG__EN]')?.value || '',
                },
            ],
            EVENT_COMMAND_ADD: this.formElement.querySelector<HTMLInputElement>('[name=EVENT_COMMAND_ADD]')?.value || '',
        };

        return data;
    }

    private createForm(formData: Array<IField> = FIELDS_OF_COMMAND_CREATION_FORM) {
        document.body.insertAdjacentHTML('beforeend', `
            <div class="modal modal-lg fade" id="${this.modalId}" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="createCommandLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="createCommandLabel">Создание новой команды</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Закрыть"></button>
                        </div>
                        <div class="modal-body">
                            <div>
                                <form id="createCommandForm">
                                    ${formData.map(field => this.getFieldTemplate(field)).join('')}
                                </form>
                                <div class="alert alert-danger d-none" id="createCommandAlertError" role="alert">Error</div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Закрыть</button>
                            <button type="button" class="btn btn-primary" id="btnCreateCommand">Создать</button>
                        </div>
                    </div>
                </div>
            </div>
        `);
    }

    private getFieldTemplate(field: IField): string {
        switch (field.type) {
            case 'text':
            case 'number':
            case 'file':
                return this.renderInputField(field);
            case 'select':
                return this.renderSelectField(field);
            default:
                throw new Error('Unknown field type: ' + field.type);
        }
    }

    private renderInputField(field: IField): string {
        const requiredAttr = field.required ? 'required' : '';
        return `
            <div class="mb-3">
                <label for="field__${field.name}" class="form-label">${field.label}</label>
                <input type="${field.type}" class="form-control form-control-sm" id="field__${field.name}" aria-describedby="emailHelp" data-field="${field.name}" name="${field.name}" ${requiredAttr}>
                <div class="invalid-feedback">${field.invalidFeedback || ''}</div>
            </div>
        `;
    }

    private renderSelectField(field: IField): string {
        const requiredAttr = field.required ? 'required' : '';
        
        const optionsHTML = field.options?.map(option => `
            <option selected value="${option.value}">${option.label}</option>
        `).join('');

        return `
            <div class="mb-3">
                <label for="field_${field.name}" class="form-label">${field.label}</label>
                <select class="form-select form-control-sm" id="field_${field.name}" aria-label="" data-field="${field.name}" name="${field.name}" ${requiredAttr}>
                    ${optionsHTML}
                </select>
                <div class="invalid-feedback">${field.invalidFeedback}</div>
            </div>
        `;
    }
}

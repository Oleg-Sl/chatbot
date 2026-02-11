import { ModalWindow } from './baseModalView.js';
import { type IFieldConfig } from '../../domain/forms/iFormFieldConfig.js';
import { type IBotData } from '../../domain/bot.js';


export class BaseFormModalView extends ModalWindow {
    private formElement: HTMLFormElement;
    private fieldsData: IFieldConfig[];
    private bots?: IBotData[] | null;

    constructor(modalId: string, formId: string, fieldsData: IFieldConfig[]) {
        super(modalId);
        console.log(fieldsData);

        this.fieldsData = fieldsData;
        this.createForm(formId);

        const formElement = this.modalBodyElement?.querySelector(`#${formId}`);
        if (!formElement) {
            throw new Error(`Form with id = ${formId} not found`);
        }
        this.formElement = formElement as HTMLFormElement;

        this.bindFormEvents();
    }

    createForm(formId: string) {
        if (this.modalBodyElement) {
            this.modalBodyElement.innerHTML = `
            <form id="${formId}">
                ${this.fieldsData.map(field => this.getFieldTemplate(field)).join('')}
            </form>
            `;
        }
    }

    setAvailableBots(bots: IBotData[]): void {
        this.bots = bots;
        this.updateBotListField();
    }

    override setCurrentBot(botId: number) {
        const select = this.formElement.querySelector('#field_BOT_ID') as HTMLSelectElement;
        if (select) {
            select.value = String(botId);
        }
    }

    protected bindFormEvents() {
        this.onHideModal = () => {
            this.resetForm();
        };
    }

    private resetForm() {
        Array.from(this.formElement.querySelectorAll<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>('input, textarea, select')).map(elem => {
            elem.classList.remove('is-valid', 'is-invalid');
            elem.value = '';
        });
    }

    private getFieldTemplate(field: IFieldConfig): string {
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

    private renderInputField(field: IFieldConfig): string {
        const requiredAttr = field.required ? 'required' : '';
        return `
            <div class="mb-3">
                <label for="field__${field.name}" class="form-label">${field.label}</label>
                <input type="${field.type}" class="form-control form-control-sm" id="field__${field.name}" aria-describedby="emailHelp" data-field="${field.name}" name="${field.name}" ${requiredAttr}>
                <div class="invalid-feedback">${field.invalidFeedback || ''}</div>
            </div>
        `;
    }

    private renderSelectField(field: IFieldConfig): string {
        const requiredAttr = field.required ? 'required' : '';
        let optionsHTML = '';
        if (field.options) {
            optionsHTML = field.options.map(option => `
                <option selected value="${option.value}">${option.label}</option>
            `).join('');
        } else if (this.bots) {
            optionsHTML = this.bots?.map(bot => `
                <option selected value="${bot.ID}">${bot.NAME}</option>
            `).join('');
        }

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

    private updateBotListField() {
        const select = this.formElement.querySelector('#field_BOT_ID');
        if (select) {
            select.innerHTML = this.bots?.map(bot => `
                <option selected value="${bot.ID}">${bot.NAME}</option>
            `).join('') || '';
        }
    }

    validateForm() {
        this.resetErrorForm();
        const fields = this.formElement.querySelectorAll<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>('input, textarea, select');
        let isValid = true;
        for (const elem of fields) {
            if (!elem.checkValidity()) {
                elem.classList.add('is-invalid');
                isValid = false;
            } else {
                elem.classList.add('is-valid');
            }
        }
        return isValid;
    }

    resetErrorForm() {
        Array.from(this.formElement.querySelectorAll<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>('input, textarea, select')).map(
            elem => elem.classList.remove('is-valid', 'is-invalid')
        );
    }

    async getFormData(): Promise<Record<string, any>> {
        const formData = new FormData(this.formElement);
        let result: Record<string, any> = {};
  
        for (const [key, value] of formData.entries()) {
            if (value instanceof File) {
                if (value.size > 0) {
                    result[key] = await this.fileToBase64(value);
                } else {
                    result[key] = '';
                }
            } else {
                result[key] = value;
            }
        }
        return result;
    }

    private async fileToBase64(file: File): Promise<string> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = error => reject(error);
        });
    }
}

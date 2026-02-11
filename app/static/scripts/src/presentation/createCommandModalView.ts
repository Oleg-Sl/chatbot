import { BaseFormModalView } from './base/baseFormModalView.js';
import { CommandFormConfigFactory } from '../domain/forms/commandFormConfigFactory.js';
import { type ICommandCreation } from '../domain/command.js';


export class CreateCommandModalView extends BaseFormModalView {
    constructor(modalId: string) {
        const fieldsData = CommandFormConfigFactory.getFormConfig('create')
        super(
            modalId,
            'createCommandWindow',
            fieldsData
        );
        // this.modal.show();
    }

    initialize() {
        this.setTitle('Создание команды');
        this.setButtonName('Создать');
    }

    override async getFormData() {
        const formData = await super.getFormData();
        let data: ICommandCreation = {
            BOT_ID: +formData.BOT_ID,
            COMMAND: formData.COMMAND,
            COMMON: formData.COMMON,
            HIDDEN: formData.HIDDEN,
            CLIENT_ID: formData.CLIENT_ID,
            LANG: [
                {
                    LANGUAGE_ID: formData.LANG__RU,
                    TITLE: formData.LANG__RU,
                    PARAMS: formData.LANG__RU,
                },
                {
                    LANGUAGE_ID: formData.LANG__EN,
                    TITLE: formData.LANG__EN,
                    PARAMS: formData.LANG__EN,
                },
            ],
            EVENT_COMMAND_ADD: formData.EVENT_COMMAND_ADD,
        }

        return data;
    }
}

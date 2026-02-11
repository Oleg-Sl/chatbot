import { BaseFormModalView } from './base/baseFormModalView.js';
import { BotFormConfigFactory } from '../domain/forms/botFormConfigFactory.js';
import { type IBotCreation } from '../domain/bot.js';


export class CreateBotModalView extends BaseFormModalView {
    constructor(modalId: string) {
        const fieldsData = BotFormConfigFactory.getFormConfig('create')
        super(
            modalId,
            'createBotWindow',
            fieldsData
        );
        // this.bindCreateBotEvents();
    }

    initialize() {
        this.setTitle('Создание чат-бота');
        this.setButtonName('Создать');
    }

    public bindCreateBotEvents() {
        this.onAction = async () => {
            const isValid = this.validateForm();
            return isValid;
        };
    }

    override async getFormData() {
        const formData = await super.getFormData();
        let data: IBotCreation = {
            CODE: formData.CODE,
            EVENT_HANDLER: formData.EVENT_HANDLER,
            PROPERTIES: {
                NAME: formData.PROPERTIES__NAME,
            },
        }
        if (formData.TYPE) { data.TYPE = formData.TYPE }
        if (formData.EVENT_MESSAGE_ADD) { data.EVENT_MESSAGE_ADD = formData.EVENT_MESSAGE_ADD }
        if (formData.EVENT_WELCOME_MESSAGE) { data.EVENT_WELCOME_MESSAGE = formData.EVENT_WELCOME_MESSAGE }
        if (formData.EVENT_BOT_DELETE) { data.EVENT_BOT_DELETE = formData.EVENT_BOT_DELETE }
        if (formData.OPENLINE) { data.OPENLINE = formData.OPENLINE }
        if (formData.CLIENT_ID) { data.CLIENT_ID = formData.CLIENT_ID }
        if (formData.PROPERTIES__LAST_NAME) { data.PROPERTIES.LAST_NAME = formData.PROPERTIES__LAST_NAME }
        if (formData.PROPERTIES__COLOR) { data.PROPERTIES.COLOR = formData.PROPERTIES__COLOR }
        if (formData.PROPERTIES__PERSONAL_PHOTO) { data.PROPERTIES.PERSONAL_PHOTO = formData.PROPERTIES__PERSONAL_PHOTO }

        return data;
    }

}

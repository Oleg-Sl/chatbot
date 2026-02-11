import { BaseFormModalView } from './base/baseFormModalView.js';
import { BotFormConfigFactory } from '../domain/forms/botFormConfigFactory.js';


export class EditBotModalView extends BaseFormModalView {
    constructor(modalId: string) {
        const fieldsData = BotFormConfigFactory.getFormConfig('edit')
        super(
            modalId,
            'editBotWindow',
            fieldsData
        );
        // this.modal.show();
    }

    initialize() {
        this.setTitle('Редактирование чат-бота');
        this.setButtonName('Изменить');
    }
}

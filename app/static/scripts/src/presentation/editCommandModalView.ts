import { BaseFormModalView } from './base/baseFormModalView.js';
import { CommandFormConfigFactory } from '../domain/forms/commandFormConfigFactory.js';


export class EditCommandModalView extends BaseFormModalView {
    constructor(modalId: string) {
        const fieldsData = CommandFormConfigFactory.getFormConfig('edit')
        super(
            modalId,
            'editCommandWindow',
            fieldsData
        );
        // this.modal.show();
    }
    
    initialize() {
        this.setTitle('Редактирование команды');
        this.setButtonName('Изменить');
    }

}

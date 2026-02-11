import type { IFieldConfig } from './iFormFieldConfig.js';
import { BOT_FORM_CONFIG } from './botFormConfig.js';


export class BotFormConfigFactory {
    static getFormConfig(mode: 'create' | 'edit'): IFieldConfig[] {
        if (mode === 'create') {
            return BOT_FORM_CONFIG.filter(command => command.createForm === true);
        } else if (mode === 'edit') {
            return BOT_FORM_CONFIG.filter(command => command.editForm === true);
        }

        throw new Error(`The field configuration with mode = "${mode}" is not allowed.`);
    }
};

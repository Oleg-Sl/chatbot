import type { IFieldConfig } from './iFormFieldConfig';
import { COMMAND_FORM_CONFIG } from './commandFormConfig.js';


export class CommandFormConfigFactory {
    static getFormConfig(mode: 'create' | 'edit'): IFieldConfig[] {
        if (mode === 'create') {
            return COMMAND_FORM_CONFIG.filter(command => command.createForm === true);
        } else if (mode === 'edit') {
            return COMMAND_FORM_CONFIG.filter(command => command.editForm === true);
        }

        throw new Error(`The field configuration with mode = "${mode}" is not allowed.`);
    }
};

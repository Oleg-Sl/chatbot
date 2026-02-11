
interface IFieldOptions {
    value: string,
    label: string
};


type IFieldType = 'number' | 'text' | 'file' | 'select';


interface IFieldConfig {
    name: string,
    label: string,
    type: IFieldType,
    required: boolean,
    invalidFeedback: string,
    options?: IFieldOptions[] | null,
    createForm?: boolean,
    editForm: boolean,
};


export type { IFieldConfig, IFieldType, IFieldOptions };

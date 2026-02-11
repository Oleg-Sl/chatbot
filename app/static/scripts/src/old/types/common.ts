
interface IFieldOptions {
    value: string,
    label: string
}

interface IField {
    name: string,
    label: string,
    type: string,
    required: boolean,
    invalidFeedback: string,
    options?: IFieldOptions[],
    creationForm?: boolean,
}

export type { IFieldOptions, IField };

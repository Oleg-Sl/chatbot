
type ILangItem = {
    LANGUAGE_ID: string,
    TITLE: string,
    PARAMS: string,
};

type ICommandCreation = {
    BOT_ID: number,
    COMMAND: string,
    COMMON: string,
    HIDDEN: string,
    CLIENT_ID: string,
    LANG: Array<ILangItem>,
    EVENT_COMMAND_ADD?: string,
};

type ICommandUpdation = {
    HIDDEN: string,
    CLIENT_ID: string,
    LANG: Array<Array<ILangItem>>,
    EVENT_COMMAND_ADD?: string,
};




export type { ILangItem, ICommandCreation, ICommandUpdation, };

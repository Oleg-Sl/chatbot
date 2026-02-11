
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

type ICommandUpdate = Pick<
    ICommandCreation,
    'HIDDEN' | 'CLIENT_ID' | 'LANG' | 'EVENT_COMMAND_ADD'
>;


export { type ILangItem, type ICommandCreation, type ICommandUpdate, };

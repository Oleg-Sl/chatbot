type ILangItem = {
    LANGUAGE_ID: string,
    TITLE: string,
    PARAMS: string,
};


type ICommandData = {
    ID: number
    BOT_ID: number,
    COMMAND: string,
    COMMON: string,
    HIDDEN: string,
    LANG: Array<ILangItem>,
    EVENT_COMMAND_ADD?: string,
};


type ICommandCreation = Omit<ICommandData, 'ID'>


type ICommandUpdate = Pick<
    ICommandData,
    'HIDDEN' | 'LANG' | 'EVENT_COMMAND_ADD'
>;


type ICommandSettings = Pick<ICommandData, 'ID' | 'COMMAND'>;


//  {
//     BOT_ID: number,
//     COMMAND: string,
//     COMMON: string,
//     HIDDEN: string,
//     LANG: Array<ILangItem>,
//     EVENT_COMMAND_ADD?: string,
// };

// type ICommandData = ICommandCreation & {
//     ID: number
// };

// type ICommandUpdate = Pick<
//     ICommandCreation,
//     'HIDDEN' | 'LANG' | 'EVENT_COMMAND_ADD'
// >;


export { type ILangItem, type ICommandCreation, type ICommandUpdate, type ICommandData, type ICommandSettings};

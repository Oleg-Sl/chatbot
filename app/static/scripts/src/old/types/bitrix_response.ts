
type IBotData = {
    ID: number,
    CODE: string,
    NAME: string,
    OPENLINE: string
};

type IBotDictionary = {
    [botId: number]: IBotData;
};

type IBotCreation = {
    CODE: string,
    TYPE?: string,
    EVENT_HANDLER: string,
    EVENT_MESSAGE_ADD?: string,
    EVENT_WELCOME_MESSAGE?: string,
    EVENT_BOT_DELETE?: string,
    OPENLINE?: string,
    CLIENT_ID?: string,
    PROPERTIES: {
        NAME?: string,
        LAST_NAME?: string,
        COLOR?: string,
        PERSONAL_PHOTO?: string
    },
};

type IBotUpdation = {
    CODE: string,
    EVENT_HANDLER: string,
    EVENT_MESSAGE_ADD?: string,
    EVENT_WELCOME_MESSAGE?: string,
    EVENT_BOT_DELETE?: string,
    PROPERTIES: {
        NAME?: string,
        LAST_NAME?: string,
        COLOR?: string,
        PERSONAL_PHOTO?: string
    },
};

export type { IBotData, IBotDictionary, IBotCreation, IBotUpdation, };

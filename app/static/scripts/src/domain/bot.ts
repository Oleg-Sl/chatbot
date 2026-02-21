type IBotData = {
    ID: number,
    CODE: string,
    NAME: string,
    OPENLINE: string
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

type IBotUpdate = Pick<
    IBotCreation, 
    'CODE' | 'EVENT_HANDLER' | 'EVENT_WELCOME_MESSAGE' | 'EVENT_BOT_DELETE' | 'PROPERTIES'
>


class Bot {
    constructor(
        public ID: number,
        public CODE: string,
        public NAME: string,
        public OPENLINE: string
    ) {}
    
    static fromData(data: IBotData): Bot {
        return new Bot(
            data.ID,
            data.CODE,
            data.NAME,
            data.OPENLINE
        );
    }
}

export { type IBotData, type IBotCreation, type IBotUpdate, Bot};

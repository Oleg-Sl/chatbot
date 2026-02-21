import type { ICommandCreation } from '../domain/command.js';


export const COMMAND_FORM_CONFIG: ICommandCreation[] = [
    {
        BOT_ID: 0,
        COMMAND: 'go',
        COMMON: 'Y',
        HIDDEN: 'N',
        LANG: [
            {
                LANGUAGE_ID: 'ru',
                TITLE: 'Полезные ссылки (База знаний/Прайс)',
                PARAMS: '',
            },
            {
                LANGUAGE_ID: 'en',
                TITLE: 'Useful links (Knowledge base/Price list)',
                PARAMS: '',
            },
        ],
        EVENT_COMMAND_ADD: 'https://database.tamamm.ru/chatbot/bot/event',
    },
    {
        BOT_ID: 0,
        COMMAND: 'commend',
        COMMON: 'Y',
        HIDDEN: 'N',
        LANG: [
            {
                LANGUAGE_ID: 'ru',
                TITLE: 'Задачи и напоминания',
                PARAMS: '',
            },
            {
                LANGUAGE_ID: 'en',
                TITLE: 'Tasks and reminders',
                PARAMS: '',
            },
        ],
        EVENT_COMMAND_ADD: 'https://database.tamamm.ru/chatbot/bot/event',
    },
    {
            BOT_ID: 0,
            COMMAND: 'diz',
            COMMON: 'Y',
            HIDDEN: 'N',
            LANG: [
                {
                    LANGUAGE_ID: 'ru',
                    TITLE: 'Сформировать данные',
                    PARAMS: '',
                },
                {
                    LANGUAGE_ID: 'en',
                    TITLE: 'Generate data',
                    PARAMS: '',
                },
            ],
            EVENT_COMMAND_ADD: 'https://database.tamamm.ru/chatbot/bot/event',
    },
    // {
    //         BOT_ID: 0,
    //         COMMAND: 'diz',
    //         COMMON: 'Y',
    //         HIDDEN: 'N',
    //         LANG: [
    //             {
    //                 LANGUAGE_ID: 'ru',
    //                 TITLE: 'Сформировать данные',
    //                 PARAMS: '',
    //             },
    //             {
    //                 LANGUAGE_ID: 'en',
    //                 TITLE: 'Generate data',
    //                 PARAMS: '',
    //             },
    //         ],
    //         EVENT_COMMAND_ADD: 'https://database.tamamm.ru/chatbot/bot/event',
    // },

];

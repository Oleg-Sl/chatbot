import type { IBotCreation } from '../domain/bot.js';


export const BOT_DATA_CONFIG: IBotCreation = {
    CODE: 'chatbot_assistent',
    TYPE: 'O',
    EVENT_HANDLER: 'https://database.tamamm.ru/chatbot/bot/event',
    EVENT_MESSAGE_ADD: 'https://database.tamamm.ru/chatbot/bot/event',
    EVENT_WELCOME_MESSAGE: 'https://database.tamamm.ru/chatbot/bot/event',
    EVENT_BOT_DELETE: 'https://database.tamamm.ru/chatbot/bot/event',
    OPENLINE: 'Y',
    PROPERTIES: {
        NAME: 'Чат-бот открытых линий (ТЕСТ)',
        LAST_NAME: '',
        COLOR: 'LIGHT_BLUE',
        PERSONAL_PHOTO: ''
    },
};

import { type IField } from '../types/common.js';


const FIELDS_OF_COMMAND_CREATION_FORM: IField[] = [
    {
        name: 'BOT_ID',
        label: 'Идентификатор чат-бота владельца команды',
        type: 'number',
        required: true,
        invalidFeedback: 'Укажите идентификатор бота',
        creationForm: true,      
    },
    {
        name: 'COMMAND',
        label: 'Текст команды, которую пользователь будет вводить в чатах',
        type: 'text',
        required: true,
        invalidFeedback: 'Можно использовать только латинские буквы и цифры. Не принимает пробелы и спецсимволы',
        creationForm: true,    
    },
    {
        name: 'COMMON',
        label: 'Доступность команды',
        type: 'select',
        required: true,
        invalidFeedback: 'Укажите доступность команды',
        creationForm: true,    
        options: [
            { value: 'Y', label: 'Доступна во всех чатах' },
            { value: 'N', label: 'Доступна только в тех чатах, где присутствует чат-бот'},
        ]
    },
    {
        name: 'HIDDEN',
        label: 'Скрытая команда или нет',
        type: 'select',
        required: true,
        invalidFeedback: 'Укажите тип команды',
        creationForm: false,    
        options: [
            { value: 'Y', label: 'Скрытая команда' },
            { value: 'N', label: 'Открытая команда'},
        ]
    },
    {
        name: 'CLIENT_ID',
        label: 'Строковый идентификатор чат-бота, используется только в режиме Вебхуков',
        type: 'text',
        required: true,
        invalidFeedback: 'Укажите идентификатор чат-бота',
        creationForm: false,    
    },
    {
        name: 'LANG__RU',
        label: 'Расшифровка команды на русском',
        type: 'text',
        required: true,
        invalidFeedback: 'Укажите расшифровку',
        creationForm: false,    
    },
    {
        name: 'LANG__EN',
        label: 'Расшифровка команды на английском',
        type: 'text',
        required: true,
        invalidFeedback: 'Укажите расшифровку',
        creationForm: false,    
    },
    {
        name: 'EVENT_COMMAND_ADD',
        label: 'Ссылка на обработчик для команд',
        type: 'text',
        required: true,
        invalidFeedback: 'Укажите ссылку',
        creationForm: false,    
    },
];


export { FIELDS_OF_COMMAND_CREATION_FORM };

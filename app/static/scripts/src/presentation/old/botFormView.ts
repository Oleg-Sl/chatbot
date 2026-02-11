// declare const bootstrap: any;

// // import BotRepository from '../repositories/bot_repository.js';
// // import { type IBotCreation } from '../old/types/bitrix_response.js';


// // interface IFieldOptions {
// //     value: string,
// //     label: string
// // }


// // interface IField {
// //     name: string,
// //     label: string,
// //     type: string,
// //     required: boolean,
// //     invalidFeedback: string,
// //     options?: IFieldOptions[]
// // }


// const CREATION_BOT_FIELDS: IField[] = [
//     {
//         name: 'CODE',
//         label: 'Строковой идентификатор бота, уникальный в рамках приложения',
//         type: 'text',
//         required: true,
//         invalidFeedback: 'Укажите идентификатор бота',
//     },
//     {
//         name: 'TYPE',
//         label: 'Тип чат-бота',
//         type: 'select',
//         required: true,
//         invalidFeedback: 'Укажите тип бота',
//         options: [
//             { value: 'O', label: 'Чат-бот для Открытых линий' },
//             { value: 'B', label: 'Чат-бот, ответы поступают сразу'},
//             { value: 'S', label: 'Чат-бот с повышенными привилегиями'}
//         ]
//     },
//     {
//         name: 'EVENT_HANDLER',
//         label: 'Ссылка на обработчик события отправки сообщения чат-боту',
//         type: 'text',
//         required: true,
//         invalidFeedback: 'Укажите ссылку',
//     },
//     {
//         name: 'EVENT_WELCOME_MESSAGE',
//         label: 'Ссылка на обработчик события открытия диалога с чат-ботом или приглашения его в групповой чат',
//         type: 'text',
//         required: false,
//         invalidFeedback: 'Укажите ссылку',
//     },
//     {
//         name: 'EVENT_BOT_DELETE',
//         label: 'Ссылка на обработчик события удаления чат-бота со стороны клиента',
//         type: 'text',
//         required: false,
//         invalidFeedback: 'Укажите ссылку',
//     },
//     {
//         name: 'OPENLINE',
//         label: 'Включение режима поддержки Открытых линий',
//         type: 'select',
//         required: true,
//         invalidFeedback: 'Укажите режим',
//         options: [
//             { value: 'Y', label: 'Да' },
//             { value: 'N', label: 'Нет'},
//         ]
//     },
//     {
//         name: 'CLIENT_ID',
//         label: 'Строковый идентификатор клиента',
//         type: 'text',
//         required: true,
//         invalidFeedback: 'Укажите строковый идентификатор клиента',
//     },
//     {
//         name: 'PROPERTIES__NAME',
//         label: 'Имя чат-бота',
//         type: 'text',
//         required: true,
//         invalidFeedback: 'Укажите имя бота',
//     },
//     {
//         name: 'PROPERTIES__LAST_NAME',
//         label: 'Фамилия чат-бота',
//         type: 'text',
//         required: false,
//         invalidFeedback: 'Укажите фамилию бота',
//     },
//     {
//         name: 'PROPERTIES__COLOR',
//         label: 'Цвет для мобильного приложения',
//         type: 'select',
//         required: false,
//         invalidFeedback: 'Укажите цвет',
//         options: [
//             { value: 'RED', label: 'Красный' },
//             { value: 'GREEN', label: 'Зеленый' },
//             { value: 'MINT', label: 'Мятный' },
//             { value: 'LIGHT_BLUE', label: 'Голубой' },
//             { value: 'DARK_BLUE', label: 'Темно-синий' },
//             { value: 'PURPLE', label: 'Фиолетовый' },
//             { value: 'AQUA', label: 'Аквамариновый' },
//             { value: 'PINK', label: 'Розовый' },
//             { value: 'LIME', label: 'Лаймовый' },
//             { value: 'BROWN', label: 'Коричневый' },
//             { value: 'AZURE', label: 'Лазурный' },
//             { value: 'KHAKI', label: 'Хаки' },
//             { value: 'SAND', label: 'Песочный' },
//             { value: 'MARENGO', label: 'Маренго' },
//             { value: 'GRAY', label: 'Серый' },
//             { value: 'GRAPHITE', label: 'Графитовый' },
//         ]
//     },
//     {
//         name: 'PROPERTIES__PERSONAL_PHOTO',
//         label: 'Аватар',
//         type: 'file',
//         required: false,
//         invalidFeedback: 'Укажите аватар',
//     },
// ]


// export class BotFormView {
//     private modalId: string;
//     private modalElement: HTMLElement;
//     private formElement: HTMLFormElement;
//     private errorElement: HTMLElement;
//     private fieldsElements: (HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement)[];
//     private fieldsData: Array<IField>;
//     private modal: any;
//     private botRepository: BotRepository;

//     constructor(modalId: string, botRepository: BotRepository) {
//         this.modalId = modalId;
//         this.botRepository = botRepository;
//         this.fieldsData = CREATION_BOT_FIELDS;
//         this.fieldsElements = [];

//         this.createForm();

//         const modalElement = document.getElementById(this.modalId);
//         const formContainer = document.getElementById('createBotForm');
//         const errorElement = document.getElementById('createBotAlertError');

//         if (!modalElement || !formContainer || !errorElement) {
//             throw new Error(`Container "Creating form" with id = "createBotForm" not found`);
//         }

//         this.modalElement = modalElement;
//         this.formElement = formContainer as HTMLFormElement;
//         this.errorElement = errorElement;
//         this.fieldsElements = Array.from(this.formElement.querySelectorAll('input, textarea, select'));
//         console.log(this.fieldsElements);

//         this.modal = new bootstrap.Modal(`#${this.modalId}`, {})

//         this.bindEvents();
//     }

//     bindEvents() {
//         document.querySelector('#btnCreateBot')?.addEventListener('click', this.handleCreteBot.bind(this));

//         this.modalElement.addEventListener('hide.bs.modal', () => {
//             this.formElement.reset();
//         })

//         this.modalElement.addEventListener('show.bs.modal', () => {
//             this.formElement.reset();
//         })
//     }

//     async handleCreteBot() {
//         console.log('handleCreteBot');
//         if (!this.validateForm()) {
//             return;
//         }
//         const botData = this.getFormData();
//         console.log(botData);
//         try {
//             const result = await this.botRepository.createBot(botData);
//             console.log(result);
//             this.resetError();
//         } catch(err) {
//             console.log(err);
//             this.showError(`Failed to delete bot: ${err instanceof Error ? err.message : 'Unknown error'}`);
//         }
//     }

//     validateForm() {
//         let isValidate = true;
//         for (const elem of this.fieldsElements) {
//             if (!elem.checkValidity()) {
//                 elem.classList.add('is-invalid');
//                 isValidate = false;
//             } else {
//                 elem.classList.add('is-valid');
//             }
//         }
//         return isValidate;
//     }

//     resetForm() {
//         this.fieldsElements.map(elem => elem.classList.remove('is-valid', 'is-invalid'));
//     }

//     showError(errorMessage: string) {
//         this.errorElement.innerText = errorMessage;
//         this.errorElement.classList.remove('d-none');
//     }

//     resetError() {
//         this.resetForm();
//         this.errorElement.classList.add('d-none');
//     }

//     private getFormData(): IBotCreation {
//         let botData: IBotCreation = {
//             CODE: this.formElement.querySelector<HTMLInputElement>('[name=CODE]')?.value || '',
//             TYPE: this.formElement.querySelector<HTMLSelectElement>('[name=TYPE]')?.value || '',
//             EVENT_HANDLER: this.formElement.querySelector<HTMLInputElement>('[name=EVENT_HANDLER]')?.value || '',
//             OPENLINE: this.formElement.querySelector<HTMLSelectElement>('[name=OPENLINE]')?.value || '',
//             CLIENT_ID: this.formElement.querySelector<HTMLInputElement>('[name=CLIENT_ID]')?.value || '',
//             PROPERTIES: {
//                 NAME: this.formElement.querySelector<HTMLInputElement>('[name=PROPERTIES__NAME]')?.value || '',
//                 // LAST_NAME: '',
//                 // COLOR: '',
//                 // PERSONAL_PHOTO: ''
//             },
//         };
//         const eventWelcomeMessage = this.formElement.querySelector<HTMLInputElement>('[name=EVENT_WELCOME_MESSAGE]')?.value.trim();
//         if (eventWelcomeMessage) {
//             botData.EVENT_WELCOME_MESSAGE = eventWelcomeMessage;
//         }
//         const eventBotDelete = this.formElement.querySelector<HTMLInputElement>('[name=EVENT_BOT_DELETE]')?.value.trim();
//         if (eventBotDelete) {
//             botData.EVENT_BOT_DELETE = eventBotDelete;
//         }
//         const propertiesLastName = this.formElement.querySelector<HTMLInputElement>('[name=PROPERTIES__LAST_NAME]')?.value.trim();
//         if (propertiesLastName) {
//             botData.PROPERTIES.LAST_NAME = propertiesLastName;
//         }
//         const propertiesColor = this.formElement.querySelector<HTMLInputElement>('[name=PROPERTIES__COLOR]')?.value.trim();
//         if (propertiesColor) {
//             botData.PROPERTIES.COLOR = propertiesColor;
//         }
//         const propertiesPersonalPhoto = this.formElement.querySelector<HTMLInputElement>('[name=PROPERTIES__PERSONAL_PHOTO]')?.value;
//         if (propertiesPersonalPhoto) {
//             botData.PROPERTIES.PERSONAL_PHOTO = propertiesPersonalPhoto;
//         }
        
//         return botData;
//     }

//     private createForm() {
//         document.body.insertAdjacentHTML('beforeend', `
//             <div class="modal modal-lg fade" id="${this.modalId}" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="createBotLabel" aria-hidden="true">
//                 <div class="modal-dialog">
//                     <div class="modal-content">
//                         <div class="modal-header">
//                             <h1 class="modal-title fs-5" id="createBotLabel">Создание нового чат-бота</h1>
//                             <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Закрыть"></button>
//                         </div>
//                         <div class="modal-body">
//                             <div>
//                                 <form id="createBotForm">
//                                     ${this.fieldsData.map(field => this.getFieldTemplate(field)).join('')}
//                                 </form>
//                                 <div class="alert alert-danger d-none" id="createBotAlertError" role="alert">Error</div>
//                             </div>
//                         </div>
//                         <div class="modal-footer">
//                             <button type="button" class="btn btn-secondary" id="btnCloseModalCreateBot" data-bs-dismiss="modal">Закрыть</button>
//                             <button type="button" class="btn btn-primary" id="btnCreateBot">Создать</button>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         `);
//     }

//     private getFieldTemplate(field: IField): string {
//         switch (field.type) {
//             case 'text':
//             case 'number':
//             case 'file':
//                 return this.renderInputField(field);
//             case 'select':
//                 return this.renderSelectField(field);
//             default:
//                 throw new Error('Unknown field type: ' + field.type);
//         }
//     }

//     private renderInputField(field: IField): string {
//         const requiredAttr = field.required ? 'required' : '';
//         return `
//             <div class="mb-3">
//                 <label for="field__${field.name}" class="form-label">${field.label}</label>
//                 <input type="${field.type}" class="form-control form-control-sm" id="field__${field.name}" aria-describedby="emailHelp" data-field="${field.name}" name="${field.name}" ${requiredAttr}>
//                 <div class="invalid-feedback">${field.invalidFeedback || ''}</div>
//             </div>
//         `;
//     }

//     private renderSelectField(field: IField): string {
//         const requiredAttr = field.required ? 'required' : '';
        
//         const optionsHTML = field.options?.map(option => `
//             <option selected value="${option.value}">${option.label}</option>
//         `).join('');


//         return `
//             <div class="mb-3">
//                 <label for="field_${field.name}" class="form-label">${field.label}</label>
//                 <select class="form-select form-control-sm" id="field_${field.name}" aria-label="" data-field="${field.name}" name="${field.name}" ${requiredAttr}>
//                     ${optionsHTML}
//                 </select>
//                 <div class="invalid-feedback">${field.invalidFeedback}</div>
//             </div>
//         `;
//     }
// }

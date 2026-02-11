import { type IBotData, } from '../types/bitrix_response.js';

export class Bot {
    id: number;
    name: string;
    code: string;
    openline: string;

    constructor(botData: IBotData) {
        this.id = botData.ID;
        this.name = botData.NAME;
        this.code = botData.CODE;
        this.openline = botData.OPENLINE;
    }
}

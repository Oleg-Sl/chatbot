import { type IApiClient } from './types.js';


const API_URL = "https://99frank.bitrix24.ru/rest/21387/eixzayevj6gia21q/";


export default class ApiClient implements IApiClient {
    apiUrl: String
    // settingsData: Record<string, string | number>;

    constructor(apiUrl: string = API_URL) {
        this.apiUrl = apiUrl;
    }

    async callMethod<T = unknown>(method: string, body?: unknown): Promise<T> {
        const response = await fetch(`${this.apiUrl}${method}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });

        if (!response.ok) {
            throw new Error(`API request failed: ${response.status} ${response.statusText}. Error data: ${await response.text()}`);
        }

        const result = await response.json();

        return result?.result as T;
    }

    // async runBP(bizProcId: number, documentId: ['crm', string, string], parameters: unknown): Promise<unknown> {
    //     const result = await this.callMethod("bizproc.workflow.start", {
    //         TEMPLATE_ID: bizProcId,
    //         DOCUMENT_ID: documentId,
    //         PARAMETERS: parameters
    //     });
    //     return result;
    // }

    // async runSmartProcessBP(bpId: number, entityTypeId: number, entityId: number, params: unknown = {}): Promise<unknown> {
    //     return await this.runBP(
    //         bpId,
    //         ['crm', 'Bitrix\\Crm\\Integration\\BizProc\\Document\\Dynamic', `DYNAMIC_${entityTypeId}_${entityId}`],
    //         params
    //     )
    // }
}

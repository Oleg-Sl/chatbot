declare const BX24: any;

import { type IApiClient } from './iApiClient.js';


export class ApiClient implements IApiClient {

    async callMethod<T = unknown>(method: string, params: unknown = {}): Promise<T> {
        return new Promise((resolve, reject) => {
            BX24.callMethod(
                method,
                params,
                (response: any) => {
                    if(response.error()) {
                        const errorMessage = `${response.error()} (callMethod ${method}: ${JSON.stringify(params)})`;
                        reject(errorMessage);
                    }
                    resolve(response.data() as T);
                }
            );
        })
    }

    async setSettings(options: { [key: string]: string }): Promise<boolean> {
        return this.callMethod<boolean>(
            'app.option.set',
            {
                options: options
            }
        );
    }

    async getSettings(key: string): Promise<string | undefined> {
        return this.callMethod<string | undefined>(
            'app.option.get',
            {
                option: key
            }
        );
    }
}

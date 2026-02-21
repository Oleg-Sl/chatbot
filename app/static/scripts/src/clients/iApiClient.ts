
export interface IApiClient {
    callMethod<T = unknown>(method: string, body?: unknown): Promise<T>;
    setSettings(options: { [key: string]: string }): Promise<boolean>;
    getSettings(key: string): Promise<string | undefined>;
}

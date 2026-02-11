
export interface IApiClient {
    callMethod<T = unknown>(method: string, body?: unknown): Promise<T>;
}

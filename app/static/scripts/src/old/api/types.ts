
export interface IApiClient {
    callMethod<T = unknown>(method: string, body?: unknown): Promise<T>;
    // runSmartProcessBP(bpId: number, entityTypeId: number, entityId: number, params: unknown): Promise<unknown>;
}


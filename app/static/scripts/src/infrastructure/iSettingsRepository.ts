
export interface ISettingsRepository {
    getSetting(key: string): Promise<string | undefined>;
    createSetting(key: string, value: string): Promise<boolean>;
    updateSetting(key: string, value: string): Promise<boolean>;
    deleteSetting(key: string): Promise<boolean>;
}

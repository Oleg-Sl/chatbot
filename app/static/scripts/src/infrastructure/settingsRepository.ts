import { type ISettingsRepository } from './iSettingsRepository.js';


import { type IApiClient } from '../clients/iApiClient.js';
import { type IBotRepository } from './iBotRepository.js';
import { type IBotData, Bot, type IBotCreation, type IBotUpdate } from '../domain/bot.js';


export class SettingsRepository implements ISettingsRepository {
    constructor(private apiClient: IApiClient) {
    }

    async getSetting(key: string): Promise<string | undefined> {
        try {
            return await this.apiClient?.getSettings(key);
        } catch (err) {
            console.log(`Failed to fetch settings: ${err}`);
            throw new Error(`Failed to fetch settings: ${err instanceof Error ? err.message : 'Unknown error'}`)
        }
    }

    async createSetting(key: string, value: string): Promise<boolean> {
        try {
            return await this.apiClient?.setSettings({ [key]: value });
        } catch (err) {
            console.log(`Failed to create data to settings: ${err}`);
            throw new Error(`Failed to crate data to settings: ${err instanceof Error ? err.message : 'Unknown error'}`)
        }
    }

    async updateSetting(key: string, value: string): Promise<boolean> {
        try {
            return await this.apiClient?.setSettings({ [key]: value });
        } catch (err) {
            console.log(`Failed to update data to settings: ${err}`);
            throw new Error(`Failed to update data to settings: ${err instanceof Error ? err.message : 'Unknown error'}`)
        }
    }

    async deleteSetting(key: string): Promise<boolean> {
        try {
            return await this.apiClient?.setSettings({ [key]: '' });
        } catch (err) {
            console.log(`Failed to delete data from settings: ${err}`);
            throw new Error(`Failed to delete data from settings: ${err instanceof Error ? err.message : 'Unknown error'}`)
        }
    }
}

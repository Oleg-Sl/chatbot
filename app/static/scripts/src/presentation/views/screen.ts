

export class ScreenView {
    private setupScreen: HTMLElement;
    private appScreen: HTMLElement;

    constructor(setupScreenId: string, appScreenId: string) {
        const setupScreen = document.getElementById(setupScreenId);
        const appScreen = document.getElementById(appScreenId);
        if (!setupScreen || !appScreen) {
            throw new Error(`Element with id = "${setupScreenId}" or id = "${appScreenId}" is not found`);
        }
        this.setupScreen = setupScreen;
        this.appScreen = appScreen;
    }

    showScreen(screen: 'setup' | 'app') {
        if (screen === 'setup') {
            this.appScreen.classList.add('d-none');
            this.setupScreen.classList.remove('d-none');
        }

        if (screen === 'app') {
            this.appScreen.classList.remove('d-none');
            this.setupScreen.classList.add('d-none');
        }
    }
}

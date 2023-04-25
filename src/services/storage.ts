export class ChromeStorage {
    private static storage = chrome.storage.local;

    static get(items: string[]) {
        return new Promise((resolve, reject) => {
            ChromeStorage.storage.get(items, (result) => {
                if (chrome.runtime.lastError) {
                    reject(chrome.runtime.lastError);
                } else {
                    resolve(result);
                }
            });
        });
    }

    static set(items: Object) {
        return new Promise((resolve, reject) => {
            ChromeStorage.storage.set(items, () => {
                if (chrome.runtime.lastError) {
                    reject(chrome.runtime.lastError);
                } else {
                    resolve(items);
                }
            });
        });
    }
}
// import type IApiClient from './interface_api_client';


// declare const BX24: any;


// export default class ApiClient implements IApiClient {
//     async setSettingsApp(key: string, value: string | number): Promise<boolean> {
//         try {
//             return await new Promise((resolve, reject) => {
//                 BX24.appOption.set(key, value, (response) => {
//                     if (response.error()) {
//                         reject(response.error());
//                     }
//                     resolve(true);
//                 });
//             });
//         } catch (error) {
//             const errorMessage = `An error occurred in setSettingsAppByKey: ${error}`;
//             throw new Error(errorMessage);
//         }
//     }

//     // async getSettingsApp(key) {
//     //     const value = await BX24.appOption.get(key);
//     //     return value;
//     // }

//     // async openPath(path) {
//     //     try {
//     //         await new Promise((resolve, reject) => {
//     //             BX24.openPath(path, (response) => {
//     //                 resolve();
//     //             });
//     //         });
//     //     } catch (error) {
//     //         console.error(`An error occurred in openPath: ${error}`);
//     //     }
//     // }

//     // async callMethod(method, body) {
//     //     try {
//     //         const response = await fetch(`${this.api}${method}`, {
//     //             method: 'POST',
//     //             headers: {
//     //                 'Content-Type': 'application/json'
//     //             },
//     //             body: JSON.stringify(body)
//     //         });
    
//     //         if (!response.ok) {
//     //             const errorMessage = await response.text();
//     //             console.error(`Ошибка: ${response.status} ${response.statusText}`, errorMessage);
//     //             return null;
//     //         }
    
//     //         const result = await response.json();
//     //         return result?.result;
//     //     } catch (error) {
//     //         console.error('Не удалось выполнить запрос:', error);
//     //         return null;
//     //     }
//     // }

//     // async callMethodJS(method, params = {}) {
//     //     try {
//     //         const result = await new Promise((resolve, reject) => {
//     //             BX24.callMethod(method, params, response => {
//     //                 if (response.status !== 200 || response.error()) {
//     //                     const errorMessage = `${response.error()} (callMethod ${method}: ${JSON.stringify(params)})`;
//     //                     console.error(errorMessage);
//     //                     reject(errorMessage);
//     //                 }
//     //                 resolve(response.data());
//     //             });
//     //         });

//     //         return result;
//     //     } catch (error) {
//     //         const errorMessage = `An error occurred in callMethod: ${error}`;
//     //         console.error(errorMessage);
//     //         return null;
//     //     }
//     // }

    
//     // async runBP(bizProcId, documentId, parameters) {
//     //     const result = await this.callMethod("bizproc.workflow.start", {
//     //         TEMPLATE_ID: bizProcId,
//     //         DOCUMENT_ID: documentId,
//     //         PARAMETERS: parameters
//     //     });
//     //     return result;
//     // }

//     // async runSmartProcessBP(bpId, entityTypeId, entityId, params = {}) {
//     //     return await this.runBP(
//     //         bpId,
//     //         ['crm', 'Bitrix\\Crm\\Integration\\BizProc\\Document\\Dynamic', `DYNAMIC_${entityTypeId}_${entityId}`],
//     //         params
//     //     )
//     // }

//     // async uploadFile(folderId, file) {
//     //     try {
//     //         const base64Data = await this.readFileAsBase64(file);
//     //         const result = await this.callMethod("disk.folder.uploadfile", {
//     //             id: folderId,
//     //             data: {
//     //                 NAME: file.name
//     //             },
//     //             fileContent: base64Data,
//     //             generateUniqueName: true
//     //         });
//     //         return result;
//     //     } catch (error) {
//     //         console.error('Error uploading file: ', error);
//     //         throw error;
//     //     }
//     // }

//     // async readFileAsBase64(file) {
//     //     return new Promise((resolve, reject) => {
//     //         const reader = new FileReader();

//     //         reader.onload = () => {
//     //             const base64Data = reader.result.split(',')[1];
//     //             resolve(base64Data);
//     //         };

//     //         reader.onerror = (error) => {
//     //             reject(error);
//     //         };

//     //         reader.readAsDataURL(file);
//     //     });
//     // }

//     // async loadFileToBase64FromUrl(url) {
//     //     return new Promise((resolve, reject) => {
//     //         const xhr = new XMLHttpRequest();
//     //         xhr.open('GET', url);
//     //         xhr.responseType = 'blob';
    
//     //         xhr.onload = () => {
//     //             const reader = new FileReader();
//     //             reader.onload = () => {
//     //                 const base64Data = reader.result.split(',')[1];
//     //                 resolve(base64Data);
//     //             };
//     //             reader.onerror = () => {
//     //                 reject(new Error('Ошибка при чтении данных из URL'));
//     //             };
//     //             reader.readAsDataURL(xhr.response);
//     //         };
    
//     //         xhr.onerror = () => {
//     //             reject(new Error('Ошибка при загрузке данных из URL'));
//     //         };
    
//     //         xhr.send();
//     //     });
//     // }

//     // async loadFileToBase64FromProxy(urlSrc) {
//     //     const url = portalUrl + '/get-image/?url=' + encodeURIComponent(urlSrc);

//     //     return new Promise((resolve, reject) => {
//     //         const xhr = new XMLHttpRequest();
//     //         xhr.open('GET', url);
//     //         xhr.responseType = 'blob';
    
//     //         xhr.onload = () => {
//     //             const reader = new FileReader();
//     //             reader.onload = () => {
//     //                 const base64Data = reader.result.split(',')[1];
//     //                 resolve(base64Data);
//     //             };
//     //             reader.onerror = () => {
//     //                 reject();
//     //             };
//     //             reader.readAsDataURL(xhr.response);
//     //         };
    
//     //         xhr.onerror = () => {
//     //             reject();
//     //         };
    
//     //         xhr.send();
//     //     });
//     // }
// }

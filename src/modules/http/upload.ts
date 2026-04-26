/**
 * @file src/modules/http/upload.ts
 * @version 2.0.0
 * @since 2.3.0
 * @license GPL-3.0-or-later
 * @copyright Sven Minio 2026
 * @author Sven Minio <https://sven-minio.de>
 * @category HTTP
 * * @description
 * * Abstraction for HTTP POST requests.
 */

/**
 * * Performs a multipart/form-data upload with precise progress tracking.
 * * Uses XMLHttpRequest under the hood because the Fetch API lacks upload progress support.
 * @example
 * const fileInput = document.querySelector('input[type="file"]');
 * if (fileInput.files.length > 0) {
 *     await upload('/upload', fileInput.files[0], (percentage, loaded, total) => {
 *         console.log(`Upload progress: ${percentage}%`);
 *     });
 * }
 * @template T The expected response type (Generic).
 * @param url The target endpoint.
 * @param data A FormData object or a single File.
 * @param onProgress Optional callback receiving the progress percentage (0-100).
 * @returns A Promise resolving to the parsed JSON response.
 */
export async function upload<T>(url: string, data: FormData | File, onProgress?: (percentage: number, loaded: number, total: number) => void): Promise<T> {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', url);
        if (onProgress) {
            xhr.upload.onprogress = (event) => {
                if (event.lengthComputable) {
                    const percentage = Math.round((event.loaded / event.total) * 100);
                    onProgress(percentage, event.loaded, event.total);
                }
            };
        }
        xhr.onload = () => {
            if (xhr.status >= 200 && xhr.status < 300) {
                const text = xhr.responseText;
                try {
                    resolve(text ? JSON.parse(text) : {} as T);
                } catch (e) {
                    resolve(text as unknown as T);
                }
            } else {
                reject(new Error(`HTTP Error: ${xhr.status}`));
            }
        };
        xhr.onerror = () => {
            reject(new Error('Network Error during upload'));
        };
        let payload: FormData;
        if (data instanceof File) {
            payload = new FormData();
            payload.append('file', data);
        } else {
            payload = data;
        }
        xhr.send(payload);
    });
}
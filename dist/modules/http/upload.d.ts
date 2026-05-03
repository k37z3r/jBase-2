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
 * * Uses XMLHttpRequest under the hood because the native Fetch API lacks upload progress support.
 * @example
 * const fileInput = $('input[type="file"]')[0] as HTMLInputElement;
 * if (fileInput && fileInput.files?.length) {
 *     await $.http.upload('/upload', fileInput.files[0], (percentage) => {
 *         // Update a progress bar using jBase
 *         $('#progress-bar').css('width', `${percentage}%`);
 *     });
 * }
 * @template T The expected response type (Generic).
 * @param url The target endpoint.
 * @param data A FormData object or a single File.
 * @param onProgress Optional callback receiving the progress percentage (0-100), loaded bytes, and total bytes.
 * @returns A Promise resolving to the parsed JSON response.
 */
export declare function upload<T>(url: string, data: FormData | File, onProgress?: (percentage: number, loaded: number, total: number) => void): Promise<T>;
//# sourceMappingURL=upload.d.ts.map
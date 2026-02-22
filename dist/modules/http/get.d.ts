/**
 * @file src/modules/http/get.ts
 * @version 2.0.4
 * @since 2.0.0
 * @license GPL-3.0-or-later
 * @copyright Sven Minio 2026
 * @author Sven Minio <https://sven-minio.de>
 * @category HTTP
 * @description
 * * Abstraction for HTTP GET requests.
 * @requires ../../core
 * * Depends on the core jBase class for type definitions.
 */
/**
 * * Performs an asynchronous HTTP GET request and expects a JSON response. Includes an automatic timeout of 5000ms to avoid hanging requests.
 * @template T
 * * The expected type of the response data (Generic).
 * @param url
 * * The target URL for the request.
 * @param option
 * * Optional RequestInit object to customize the fetch request.
 * @returns
 * * A Promise resolving with the typed JSON data.
 * @throws
 * * Error if HTTP status is not in success range (200-299) or a timeout occurs.
 */
export declare function get<T>(url: string, option?: RequestInit): Promise<T>;
/**
 * * Performs an asynchronous HTTP GET request and returns the raw text content. Ideal for loading HTML fragments (Server-Side Rendering Partials) or plain text.
 * @param url
 * * The target URL for the request.
 * @param option
 * * Optional RequestInit object to customize the fetch request.
 * @returns
 * * A Promise containing the response body as a string.
 * @throws
 * * Error if HTTP status is not in success range (200-299).
 */
export declare function getText<T = string>(url: string, option?: RequestInit): Promise<T>;
//# sourceMappingURL=get.d.ts.map
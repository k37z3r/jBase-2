/**
 * @file src/modules/http/post.ts
 * @version 2.0.4
 * @since 2.0.2
 * @license GPL-3.0-or-later
 * @copyright Sven Minio 2026
 * @author Sven Minio <https://sven-minio.de>
 * @category HTTP
 * * @description
 * * Abstraction for HTTP POST requests.
 */
/**
 * * Performs an asynchronous HTTP POST request to the specified URL. Automatically sets the 'Content-Type' header to 'application/json' and serializes the body.
 * @example const response = await post('/api/login', { username: 'user', password: 'pass' });
 * @template T The expected response type (Generic).
 * @param url The target URL for the request.
 * @param body The data to send (automatically JSON serialized). Default is {}.
 * @param option Optional RequestInit object to customize the fetch request.
 * @returns A Promise resolving with the deserialized JSON response of type T.
 * @throws Error if the HTTP status code is not in the range 200-299.
 */
export declare function post<T>(url: string, body?: any, option?: RequestInit): Promise<T>;
//# sourceMappingURL=post.d.ts.map
/**
 * @file src/modules/http/get.ts
 * @version 2.0.5
 * @since 2.0.0
 * @license GPL-3.0-or-later
 * @copyright Sven Minio 2026
 * @author Sven Minio <https://sven-minio.de>
 * @category HTTP
 * @description
 * * Abstraction for HTTP GET requests.
 */

/**
 * * Performs an asynchronous HTTP GET request and expects a JSON response. Includes an automatic timeout of 5000ms to avoid hanging requests.
 * @example const data = await get<UserData>('/api/user/1'); => Fetches user data from the specified endpoint and parses it as JSON.
 * @example const data = await get('/api/user/1', { signal: customAbortSignal }); => Fetches user data with a custom abort signal for cancellation.
 * @template T The expected type of the response data (Generic).
 * @param url The target URL for the request.
 * @param option Optional RequestInit object to customize the fetch request.
 * @returns A Promise resolving with the typed JSON data.
 * @throws Error if HTTP status is not in success range (200-299) or a timeout occurs.
 */
export async function get<T>(url: string, option?: RequestInit): Promise<T> {
    const fetchOptions: RequestInit = { ...option };
    if (fetchOptions.method?.toLowerCase() === 'post') {
        fetchOptions.method = 'GET';
    }
    if (!fetchOptions.signal) {
        fetchOptions.signal = AbortSignal.timeout(5000);
    }
    const response = await fetch(url, {
        ...fetchOptions
    });
    if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
    }
    const text = await response.text();
    return text ? JSON.parse(text) : {} as T;
}

/**
 * * Performs an asynchronous HTTP GET request and returns the raw text content. Ideal for loading HTML fragments (Server-Side Rendering Partials) or plain text.
 * @example const html = await getText('/templates/modal.html'); => Fetches an HTML template as a string for later insertion into the DOM.
 * @example const text = await getText('/api/status'); => Fetches a plain text status message from the server.
 * @example const html = await getText('/templates/modal.html', { signal: customAbortSignal }); => Fetches an HTML template with a custom abort signal for cancellation.
 * @template T The expected type of the response data (Generic, defaults to string).
 * @param url The target URL for the request.
 * @param option Optional RequestInit object to customize the fetch request.
 * @returns A Promise containing the response body as a string.
 * @throws Error if HTTP status is not in success range (200-299).
 */
export async function getText<T = string>(url: string, option?: RequestInit): Promise<T> {
    const fetchOptions: RequestInit = { ...option };
    
    if (fetchOptions.method?.toLowerCase() !== 'get') {
        fetchOptions.method = 'GET';
    }
    if (!fetchOptions.signal) {
        fetchOptions.signal = AbortSignal.timeout(5000);
    }
    
    const response = await fetch(url, {
        ...fetchOptions
    });
    
    if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
    }
    
    const text = await response.text();
    return text as unknown as T; 
}
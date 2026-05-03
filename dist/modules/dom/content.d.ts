/**
 * @file src/modules/dom/content.ts
 * @version 2.1.0
 * @since 2.0.0
 * @license GPL-3.0-or-later
 * @copyright Sven Minio 2026
 * @author Sven Minio <https://sven-minio.de>
 * @category DOM
 * @description
 * * Methods for getting and setting element content (html, text, empty, replaceWith).
 * @requires ../../core
 * * Depends on the core jBase class for type definitions.
 */
import { jBase } from '../../core';
/**
 * * Gets the HTML content of the first element, or sets the HTML content of all matched elements.
 * @example html() => Returns the innerHTML of the first element.
 * @example html('<div>New</div>') => Sets safe HTML for all matched elements.
 * @example html('<script>alert("Hi")</script>', { executeScripts: true }) => Injects and executes scripts.
 * @param content The HTML string to set. If undefined, acts as a getter.
 * @param options Security and execution options.
 * @returns HTML string (getter) or the current jBase instance (setter).
 */
export declare function html(this: jBase, content?: string, options?: {
    executeScripts?: boolean;
}): string | jBase;
/**
 * * Gets the text content of the first element or sets it for all elements. Safe against XSS attacks.
 * @example text('Hello World') => Sets the text content of all matched elements to 'Hello World'.
 * @example text() => Returns the text content of the first matched element.
 * @param content (Optional) The text content to set.
 * @returns The text content (getter) or the current jBase instance (setter).
 */
export declare function text(this: jBase, content?: string): string | jBase;
/**
 * * Loads HTML from a server and injects it into the matched elements.
 * * This is now a clean wrapper around $.http.getText() and this.html().
 * @example $('#content').load('/pages/about.html')
 * @param url The URL to fetch the HTML from.
 * @param options Fetch options extended with jBase specific settings (e.g., executeScripts).
 * @returns A Promise resolving to the current jBase instance.
 */
export declare function load(this: jBase, url: string, options?: RequestInit & {
    executeScripts?: boolean;
}): Promise<jBase>;
//# sourceMappingURL=content.d.ts.map
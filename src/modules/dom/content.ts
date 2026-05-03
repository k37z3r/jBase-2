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
import { getText } from '../http/get';
import { sanitizeDangerousAttributes } from '../../utils';

/**
 * * Internal Helper: Extracts and executes <script> tags found within an HTML string.
 * * Creates new script elements, injects them into the document head to trigger execution,
 * * and immediately removes them to keep the DOM clean.
 * @private
 * @param htmlStr The raw HTML string containing potential <script> tags.
 * @param doc The document context used for element creation and script injection.
 * @returns The remaining HTML string with the original (dead) <script> tags removed.
 */
function extractAndExecuteScripts(htmlStr: string, doc: Document): string {
    const tempDiv = doc.createElement('div');
    tempDiv.innerHTML = htmlStr;

    const scripts = tempDiv.querySelectorAll('script');
    
    scripts.forEach(oldScript => {
        const newScript = doc.createElement('script');
        Array.from(oldScript.attributes).forEach(attr => {
            newScript.setAttribute(attr.name, attr.value);
        });
        if (oldScript.textContent) {
            newScript.textContent = oldScript.textContent;
        }
        doc.head.appendChild(newScript);
        doc.head.removeChild(newScript);
        oldScript.remove();
    });

    return tempDiv.innerHTML;
}

/**
 * * Gets the HTML content of the first element, or sets the HTML content of all matched elements.
 * @example html() => Returns the innerHTML of the first element.
 * @example html('<div>New</div>') => Sets safe HTML for all matched elements.
 * @example html('<script>alert("Hi")</script>', { executeScripts: true }) => Injects and executes scripts.
 * @param content The HTML string to set. If undefined, acts as a getter.
 * @param options Security and execution options.
 * @returns HTML string (getter) or the current jBase instance (setter).
 */
export function html(this: jBase, content?: string, options?: { executeScripts?: boolean }): string | jBase {
    if (content === undefined) {
        const el = this[0];
        return (el instanceof Element) ? el.innerHTML : '';
    }

    let finalHtml = content;
    const execute = options?.executeScripts === true;

    this.each(function(el) {
        if (el instanceof Element) {
            const doc = el.ownerDocument || document;
            const processedHtml = execute ? extractAndExecuteScripts(finalHtml, doc) : sanitizeDangerousAttributes(finalHtml);

            el.innerHTML = processedHtml;
        }
    });

    return this;
}

/**
 * * Gets the text content of the first element or sets it for all elements. Safe against XSS attacks.
 * @example text('Hello World') => Sets the text content of all matched elements to 'Hello World'.
 * @example text() => Returns the text content of the first matched element.
 * @param content (Optional) The text content to set.
 * @returns The text content (getter) or the current jBase instance (setter).
 */
export function text(this: jBase, content?: string): string | jBase {
    if (content === undefined) {
        const el = this[0];
        return (el instanceof Node) ? (el.textContent || '') : '';
    }
    this.each(function(el) {
        if (el instanceof HTMLElement) {
            el.textContent = content;
        }
    });
    return this;
}

/**
 * * Loads HTML from a server and injects it into the matched elements.
 * * This is now a clean wrapper around $.http.getText() and this.html().
 * @example $('#content').load('/pages/about.html')
 * @param url The URL to fetch the HTML from.
 * @param options Fetch options extended with jBase specific settings (e.g., executeScripts).
 * @returns A Promise resolving to the current jBase instance.
 */
export async function load(this: jBase, url: string, options?: RequestInit & { executeScripts?: boolean }): Promise<jBase> {
    try {
        const fetchOptions = { ...options };
        delete fetchOptions.executeScripts; 

        const htmlStr = await getText(url, fetchOptions);
        this.html(htmlStr, { executeScripts: options?.executeScripts });

    } catch (error) {
        console.error(`jBase .load() failed to fetch: ${url}`, error);
        throw error;
    }
    return this;
}
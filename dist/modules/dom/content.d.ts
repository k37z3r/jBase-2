/**
 * @file src/modules/dom/content.ts
 * @version 2.0.3
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
 * * Gets the HTML content of the first element or sets the HTML content for all elements in the selection.
 * @example html('<div>New Content</div>') => Sets the inner HTML of all matched elements to '<div>New Content</div>'.
 * @example html() => Returns the inner HTML of the first matched element.
 * @param content (Optional) The HTML string to set.
 * @returns The HTML string (getter) or the current jBase instance (setter).
 */
export declare function html(this: jBase, content?: string): string | jBase;
/**
 * * Gets the text content of the first element or sets it for all elements. Safe against XSS attacks.
 * @example text('Hello World') => Sets the text content of all matched elements to 'Hello World'.
 * @example text() => Returns the text content of the first matched element.
 * @param content (Optional) The text content to set.
 * @returns The text content (getter) or the current jBase instance (setter).
 */
export declare function text(this: jBase, content?: string): string | jBase;
//# sourceMappingURL=content.d.ts.map
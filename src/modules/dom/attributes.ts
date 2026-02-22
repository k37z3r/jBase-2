/**
 * @file src/modules/dom/attributes.ts
 * @version 2.1.0
 * @since 2.0.0
 * @license GPL-3.0-or-later
 * @copyright Sven Minio 2026
 * @author Sven Minio <https://sven-minio.de>
 * @category DOM
 * @description
 * * Methods for getting and setting HTML attributes and properties (attr, data, val).
 * @requires ../../core
 * * Depends on the core jBase class for type definitions.
 */

import { jBase } from '../../core';

/**
 * * Gets an attribute from the first element or sets it for all elements in the selection.
 * @param name
 * * The name of the attribute (e.g., 'href', 'data-id').
 * @param value
 * * (Optional) The value to set. If undefined, acts as a getter.
 * @returns
 * * The attribute value (string/null) when reading, or the jBase instance when writing.
 */
export function attr(this: jBase, name: string, value?: string): string | null | jBase {
    if (value === undefined) {
        const el = this[0];
        return (el instanceof Element) ? el.getAttribute(name) : null;
    }

    this.forEach(el => {
        if (el instanceof Element) el.setAttribute(name, value);
    });
    return this;
}

/**
 * * Gets the 'value' from the first form element or sets it for all elements. Supports Input, Textarea, and Select elements.
 * @param value
 * * (Optional) The value to set. If undefined, acts as a getter.
 * @returns
 * * The current value as a string when reading, or the jBase instance when writing.
 */
export function val(this: jBase, value?: string): string | jBase {
    if (value === undefined) {
        const el = this[0];
        if (el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement || el instanceof HTMLSelectElement) {
            return el.value;
        }
        return '';
    }

    this.forEach(el => {
        if (el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement || el instanceof HTMLSelectElement) {
            el.value = value;
        }
    });
    return this;
}

/**
 * * Removes an attribute from all elements in the selection.
 * @param name
 * * The name of the attribute to remove (e.g., 'disabled', 'readonly').
 * @returns
 * * The jBase instance for chaining.
 */
export function removeAttr(this: jBase, name: string): jBase {
    this.forEach(el => {
        if (el instanceof Element) el.removeAttribute(name);
    });
    return this;
}

/**
 * * Gets a property from the first element or sets it for all elements in the selection.
 * * Useful for DOM properties that don't directly map to HTML attributes (like 'checked' or 'selectedIndex').
 * @param name
 * * The name of the property (e.g., 'checked', 'disabled').
 * @param value
 * * (Optional) The value to set. If undefined, acts as a getter.
 * @returns
 * * The property value when reading, or the jBase instance when writing.
 */
export function prop(this: jBase, name: string, value?: any): any | jBase {
    if (value === undefined) {
        const el = this[0];
        return (el instanceof Element) ? (el as any)[name] : undefined;
    }

    this.forEach(el => {
        if (el instanceof Element) {
            (el as any)[name] = value;
        }
    });
    return this;
}
/**
 * @file src/modules/dom/attributes.ts
 * @version 2.1.1
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
 * @example attr('href', 'https://example.com') => Sets the 'href' attribute to 'https://example.com' for all matched elements.
 * @example attr('href') => Returns the 'href' attribute value of the first matched element.
 * @param name The name of the attribute (e.g., 'href', 'data-id').
 * @param value (Optional) The value to set. If undefined, acts as a getter.
 * @returns The attribute value (string/null) when reading, or the jBase instance when writing.
 */
export function attr(this: jBase, name: string, value?: string): string | null | jBase {
    if (value === undefined) {
        const el = this[0];
        return (el instanceof Element) ? el.getAttribute(name) : null;
    }

    this.each(function(el) {
        if (el instanceof Element) el.setAttribute(name, value);
    });
    return this;
}

/**
 * * Gets the 'value' from the first form element or sets it for all elements. Supports Input, Textarea, and Select elements.
 * @example val('Hello') => Sets the value of all matched form elements to 'Hello'.
 * @example val() => Returns the value of the first matched form element.
 * @param value (Optional) The value to set. If undefined, acts as a getter.
 * @returns The current value as a string when reading, or the jBase instance when writing.
 */
export function val(this: jBase, value?: string): string | jBase {
    if (value === undefined) {
        const el = this[0];
        if (el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement || el instanceof HTMLSelectElement) {
            return el.value;
        }
        return '';
    }

    this.each(function(el) {
        if (el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement || el instanceof HTMLSelectElement) {
            el.value = value;
        }
    });
    return this;
}

/**
 * * Removes an attribute from all elements in the selection.
 * @example removeAttr('disabled') => Removes the 'disabled' attribute from all matched elements.
 * @param name The name of the attribute to remove (e.g., 'disabled', 'readonly').
 * @returns The jBase instance for chaining.
 */
export function removeAttr(this: jBase, name: string): jBase {
    this.each(function(el) {
        if (el instanceof Element) el.removeAttribute(name);
    });
    return this;
}

/**
 * * Gets a property from the first element or sets it for all elements in the selection.
 * * Useful for DOM properties that don't directly map to HTML attributes (like 'checked' or 'selectedIndex').
 * @example prop('checked', true) => Sets the 'checked' property to true for all matched elements (e.g., checkboxes).
 * @example prop('checked') => Returns the 'checked' property value of the first matched element.
 * @example prop('selectedIndex', 2) => Sets the 'selectedIndex' property to 2 for all matched <select> elements.
 * @param name The name of the property (e.g., 'checked', 'disabled').
 * @param value (Optional) The value to set. If undefined, acts as a getter.
 * @returns The property value when reading, or the jBase instance when writing.
 */
export function prop(this: jBase, name: string, value?: any): any | jBase {
    if (value === undefined) {
        const el = this[0];
        return (el instanceof Element) ? (el as any)[name] : undefined;
    }

    this.each(function(el) {
        if (el instanceof Element) {
            (el as any)[name] = value;
        }
    });
    return this;
}
/**
 * @file src/modules/css/styles.ts
 * @version 2.0.4
 * @since 2.0.0
 * @license GPL-3.0-or-later
 * @copyright Sven Minio 2026
 * @author Sven Minio <https://sven-minio.de>
 * @category CSS
 * @description
 * * Methods for getting and setting inline CSS styles.
 * @requires ../../core
 * * Depends on the core jBase class for type definitions.
 */

import { jBase } from '../../core';

/**
 * * Gets a CSS property value from the first element or sets one/multiple CSS properties for all elements.
 * @example css('color', 'red') => Sets the 'color' style to 'red' for all matched elements.
 * @example css({ color: 'red', backgroundColor: 'blue' }) => Sets multiple styles for all matched elements.
 * @example css('color') => Returns the computed 'color' value of the first matched element.
 * @param property A CSS property name as a string, or an object of property-value pairs to set multiple styles.
 * @param value (Optional) The value to set if `property` is a string. If undefined and `property` is a string, acts as a getter.
 * @returns The CSS value as a string when reading, or the jBase instance when writing.
 */
export function css(this: jBase, property: string | Record<string, string | number>, value?: string | number): string | jBase {
    if (typeof property === 'object' && property !== null) {
        this.each(function(el) {
            if (el instanceof HTMLElement || el instanceof SVGElement) {
                for (const key in property) {
                    if (Object.prototype.hasOwnProperty.call(property, key)) {
                        if (key.includes('-')) {
                            el.style.setProperty(key, String(property[key]));
                        } else {
                            (el.style as any)[key] = property[key];
                        }
                    }
                }
            }
        });
        return this;
    }
    if (typeof property === 'string') {
        if (value === undefined) {
            const el = this[0];
            if (el instanceof HTMLElement || el instanceof SVGElement) {
                const doc = el.ownerDocument;
                const win = doc ? doc.defaultView : null;
                if (win) {
                    return win.getComputedStyle(el).getPropertyValue(property) || win.getComputedStyle(el)[property as any] || '';
                } else {
                    return (el.style as any)[property] || '';
                }
            }
            return '';
        }
        this.each(function(el) {
            if (el instanceof HTMLElement || el instanceof SVGElement) {
                if (property.includes('-')) {
                    el.style.setProperty(property, String(value));
                } else {
                    (el.style as any)[property] = value;
                }
            }
        });
    }

    return this;
}
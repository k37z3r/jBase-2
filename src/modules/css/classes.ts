/**
 * @file src/modules/css/classes.ts
 * @version 2.0.3
 * @since 2.0.0
 * @license GPL-3.0-or-later
 * @copyright Sven Minio 2026
 * @author Sven Minio <https://sven-minio.de>
 * @category CSS
 * @description
 * * Methods for manipulating CSS classes (add, remove, toggle, has).
 * @requires ../../core
 * * Depends on the core jBase class for type definitions.
 */

import { jBase } from '../../core';

/**
 * * Adds one or more CSS classes to each element in the collection.
 * @example addClass('active', 'highlight') => Adds the 'active' and 'highlight' classes to all matched elements.
 * @param classNames One or more class names to be added
 * @returns The current jBase instance for method chaining
 */
export function addClass(this: jBase, ...classNames: string[]): jBase {
    this.each(function(el) {
        if (el instanceof Element) el.classList.add(...classNames);
    });
    return this;
}

/**
 * * Removes one or more CSS classes from each element in the collection.
 * @example removeClass('active', 'highlight') => Removes the 'active' and 'highlight' classes from all matched elements.
 * @param classNames One or more class names to be removed
 * @returns The current jBase instance for method chaining
 */
export function removeClass(this: jBase, ...classNames: string[]): jBase {
    this.each(function(el) {
        if (el instanceof Element) el.classList.remove(...classNames);
    });
    return this;
}

/**
 * * Toggles a CSS class (adds if missing, removes if present) for each element.
 * @example toggleClass('active') => Toggles the 'active' class on all matched elements.
 * @param className The class name to toggle.
 * @returns The current jBase instance for method chaining.
 */
export function toggleClass(this: jBase, className: string): jBase {
    this.each(function(el) {
        if (el instanceof Element) el.classList.toggle(className);
    });
    return this;
}

/**
 * * Checks if at least one element in the collection has the specified class.
 * @example hasClass('active') => Returns true if at least one matched element has the 'active' class, otherwise false.
 * @param className The class name to check for.
 * @returns True if the class exists on at least one element, otherwise false.
 */
export function hasClass(this: jBase, className: string): boolean {
    return this.some(el => {
        return (el instanceof Element) && el.classList.contains(className);
    });
}
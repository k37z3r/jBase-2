/**
 * @file src/modules/dom/manipulation.ts
 * @version 2.0.4
 * @since 2.0.0
 * @license GPL-3.0-or-later
 * @copyright Sven Minio 2026
 * @author Sven Minio <https://sven-minio.de>
 * @category DOM
 * @description
 * * Methods for inserting, moving, and removing elements (append, prepend, remove).
 * @requires ../../core
 * * Depends on the core jBase class for type definitions.
 * @requires src/utils
 * * Depends on utility functions (e.g., each).
 */
import { jBase } from '../../core';
/**
 * * Removes the selected elements from the DOM.
 * @example remove() => Removes all matched elements from the DOM.
 * @returns The current jBase instance.
 */
export declare function remove(this: jBase): jBase;
/**
 * * Removes all child nodes and text content from the selected elements.
 * @example empty() => Empties the content of all matched elements, leaving them in the DOM.
 * @returns The current jBase instance.
 */
export declare function empty(this: jBase): jBase;
/**
 * * Replaces each element with a deep clone of itself. Useful for removing all event listeners ("Nuke" strategy).
 * @example replaceWithClone() => Replaces each matched element with a clone, effectively removing all event listeners.
 * @returns A new jBase instance containing the cloned elements.
 */
export declare function replaceWithClone(this: jBase): jBase;
/**
 * * Inserts content at the end of each selected element (inside).
 * @example append('<span>New</span>') => Appends a new <span> element to the end of each matched element.
 * @param content HTML string, DOM Node, or jBase collection.
 * @returns The current jBase instance.
 */
export declare function append(this: jBase, content: string | Node | jBase): jBase;
/**
 * * Inserts content at the beginning of each selected element (inside).
 * @example prepend('<span>New</span>') => Prepends a new <span> element to the beginning of each matched element.
 * @param content HTML string, DOM Node, or jBase collection.
 * @returns The current jBase instance.
 */
export declare function prepend(this: jBase, content: string | Node | jBase): jBase;
/**
 * * Inserts content before the element (outside).
 * @example before('<div>New</div>') => Inserts a new <div> element immediately before each matched element.
 * @param content HTML string, DOM Node, or jBase collection.
 * @returns The current jBase instance.
 */
export declare function before(this: jBase, content: string | Node | jBase): jBase;
/**
 * * Inserts content after the element (outside).
 * @example after('<div>New</div>') => Inserts a new <div> element immediately after each matched element.
 * @param content HTML string, DOM Node, or jBase collection.
 * @returns The current jBase instance.
 */
export declare function after(this: jBase, content: string | Node | jBase): jBase;
/**
 * * Replaces the element with new content.
 * @example replaceWith('<div>New</div>') => Replaces each matched element with a new <div> element.
 * @param content The new content.
 * @returns The current jBase instance.
 */
export declare function replaceWith(this: jBase, content: string | Node | jBase): jBase;
/**
 * * Appends the selected elements to the end of a target element.
 * @example appendTo('#container') => Appends all matched elements to the element with id 'container'.
 * @param target CSS selector or DOM element.
 * @returns The current jBase instance.
 */
export declare function appendTo(this: jBase, target: string | Element): jBase;
/**
 * * Prepends the selected elements to the beginning of a target element.
 * @example prependTo('#container') => Prepends all matched elements to the element with id 'container', before its existing content.
 * @param target CSS selector or DOM element.
 * @returns The current jBase instance.
 */
export declare function prependTo(this: jBase, target: string | Element): jBase;
/**
 * * Inserts the selected elements immediately before the target element.
 * @example insertBefore('#target') => Inserts all matched elements immediately before the element with id 'target'.
 * @param target CSS selector or DOM element.
 * @returns The current jBase instance.
 */
export declare function insertBefore(this: jBase, target: string | Element): jBase;
/**
 * * Inserts the selected elements immediately after the target element.
 * @example insertAfter('#target') => Inserts all matched elements immediately after the element with id 'target'.
 * @param target CSS selector or DOM element.
 * @returns The current jBase instance.
 */
export declare function insertAfter(this: jBase, target: string | Element): jBase;
/**
 * * Wraps each selected element with the specified HTML structure.
 * @example wrap('<div class="box"></div>') => Wraps each matched element with a <div class="box"></div> element.
 * @param wrapperHtml HTML string defining the wrapper (e.g., `<div class="box"></div>`).
 * @returns The current jBase instance.
 */
export declare function wrap(this: jBase, wrapperHtml: string): jBase;
/**
 * * Removes the direct parent of the selected elements from the DOM.
 * * @example unwrap() => Removes the parent element of each matched element, effectively "unwrapping" it from its container.
 * @returns The current jBase instance.
 */
export declare function unwrap(this: jBase): jBase;
//# sourceMappingURL=manipulation.d.ts.map
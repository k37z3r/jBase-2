/**
 * @file src/modules/dom/manipulation.ts
 * @version 2.0.3
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

import { each } from 'src/utils';
import { jBase } from '../../core';

/**
 * * Internal Helper: Parses a raw HTML string into a DOM element using a temporary container.^
 * @private
 * @param html The HTML string to parse.
 * @param doc The document context to use for creation (essential for SSR).
 * @returns The created HTMLElement.
 */
function parseHTML(html: string, doc: Document): HTMLElement {
    const tmp = doc.createElement('div');
    tmp.innerHTML = html.trim();
    return tmp.firstElementChild as HTMLElement;
}

/**
 * * Internal Helper: Retrieves the correct document context from a jBase collection.
 * * Ensures compatibility with Node.js/JSDOM by preferring the element's ownerDocument over the global document.
 * @private
 * @param collection The jBase instance to check.
 * @returns The found Document object or null (in strict Node environments without global context).
 */
function getDoc(collection: jBase): Document {
    if (collection.length > 0 && collection[0] instanceof Element) {
        return collection[0].ownerDocument;
    }
    return (typeof document !== 'undefined') ? document : (null as any);
}

/**
 * * Internal Helper: Normalizes various content types into a single DocumentFragment.
 * * Handles HTML strings (parsing), DOM Nodes, Arrays, NodeLists, and jBase collections recursively.
 * * Using a Fragment minimizes browser reflows during insertion.
 * @private
 * @param content The content to normalize (String, Node, Array, Collection).
 * @param doc The document context to use for element creation (essential for SSR).
 * @returns A DocumentFragment containing the processed DOM nodes.
 */
function normalizeToFragment(content: string | Node | jBase | (string | Node)[], doc: Document): DocumentFragment {
    const fragment = doc.createDocumentFragment();

    const add = (item: any) => {
        if (typeof item === 'string') {
            const temp = doc.createElement('div');
            temp.innerHTML = item.trim();
            while (temp.firstChild) {
                fragment.appendChild(temp.firstChild);
            }
        } else if (item instanceof Node) {
            fragment.appendChild(item);
        } else if (item instanceof jBase || Array.isArray(item) || item instanceof NodeList) {
            each(item as any, function(_index, child) { 
                add(child); 
            });
        }
    };
    add(content);
    return fragment;
}

/**
 * * Removes the selected elements from the DOM.
 * @example remove() => Removes all matched elements from the DOM.
 * @returns The current jBase instance.
 */
export function remove(this: jBase): jBase {
    this.each(function(el) {
        if (el instanceof Element) el.remove();
    });
    return this;
}

/**
 * * Removes all child nodes and text content from the selected elements.
 * @example empty() => Empties the content of all matched elements, leaving them in the DOM.
 * @returns The current jBase instance.
 */
export function empty(this: jBase): jBase {
    this.each(function(el) {
        if (el instanceof Element) el.innerHTML = '';
    });
    return this;
}

/**
 * * Replaces each element with a deep clone of itself. Useful for removing all event listeners ("Nuke" strategy).
 * @example replaceWithClone() => Replaces each matched element with a clone, effectively removing all event listeners.
 * @returns A new jBase instance containing the cloned elements.
 */
export function replaceWithClone(this: jBase): jBase {
    const newElements: Element[] = [];
    this.each(function(el) {
        if (el instanceof Element) {
            const clone = el.cloneNode(true) as Element;
            el.replaceWith(clone);
            newElements.push(clone);
        }
    });
    return new (this.constructor as any)(newElements);
}

/**
 * * Inserts content at the end of each selected element (inside).
 * @example append('<span>New</span>') => Appends a new <span> element to the end of each matched element.
 * @param content HTML string, DOM Node, or jBase collection.
 * @returns The current jBase instance.
 */
export function append(this: jBase, content: string | Node | jBase): jBase {
    if (typeof content === 'string') {
        this.each(function(el) {
            if (el instanceof Element) {
                el.insertAdjacentHTML('beforeend', content);
            }
        });
        return this;
    }
    const doc = getDoc(this);
    if (!doc)
        return this;
    const fragment = normalizeToFragment(content, doc);
    const len = this.length;
    this.each(function(el, i) {
        if (el instanceof Element) {
            const contentToInsert = (i < len - 1) ? fragment.cloneNode(true) : fragment;
            el.appendChild(contentToInsert);
        }
    });
    return this;
}

/**
 * * Inserts content at the beginning of each selected element (inside).
 * @example prepend('<span>New</span>') => Prepends a new <span> element to the beginning of each matched element.
 * @param content HTML string, DOM Node, or jBase collection.
 * @returns The current jBase instance.
 */
export function prepend(this: jBase, content: string | Node | jBase): jBase {
    if (typeof content === 'string') {
        this.each(function(el) {
            if (el instanceof Element) {
                el.insertAdjacentHTML('afterbegin', content);
            }
        });
        return this;
    }
    const doc = getDoc(this);
    if (!doc)
        return this;
    const fragment = normalizeToFragment(content, doc);
    const len = this.length;
    this.each(function(el, i) {
        if (el instanceof Element) {
            const contentToInsert = (i < len - 1) ? fragment.cloneNode(true) : fragment;
            el.prepend(contentToInsert);
        }
    });
    return this;
}

/**
 * * Inserts content before the element (outside).
 * @example before('<div>New</div>') => Inserts a new <div> element immediately before each matched element.
 * @param content HTML string, DOM Node, or jBase collection.
 * @returns The current jBase instance.
 */
export function before(this: jBase, content: string | Node | jBase): jBase {
    if (typeof content === 'string') {
        this.each(function(el) {
            if (el instanceof Element) {
                el.insertAdjacentHTML('beforebegin', content);
            }
        });
        return this;
    }
    const doc = getDoc(this);
    if (!doc)
        return this;
    const fragment = normalizeToFragment(content, doc);
    const len = this.length;
    this.each(function(el, i) {
        if (el instanceof Element) {
            const contentToInsert = (i < len - 1) ? fragment.cloneNode(true) : fragment;
            el.before(contentToInsert);
        }
    });
    return this;
}

/**
 * * Inserts content after the element (outside).
 * @example after('<div>New</div>') => Inserts a new <div> element immediately after each matched element.
 * @param content HTML string, DOM Node, or jBase collection.
 * @returns The current jBase instance.
 */
export function after(this: jBase, content: string | Node | jBase): jBase {
    if (typeof content === 'string') {
        this.each(function(el) {
            if (el instanceof Element) {
                el.insertAdjacentHTML('afterend', content);
            }
        });
        return this;
    }
    const doc = getDoc(this);
    if (!doc)
        return this;
    const fragment = normalizeToFragment(content, doc);
    const len = this.length;
    this.each(function(el, i) {
        if (el instanceof Element) {
            const contentToInsert = (i < len - 1) ? fragment.cloneNode(true) : fragment;
            el.after(contentToInsert);
        }
    });
    return this;
}

/**
 * * Replaces the element with new content.
 * @example replaceWith('<div>New</div>') => Replaces each matched element with a new <div> element.
 * @param content The new content.
 * @returns The current jBase instance.
 */
export function replaceWith(this: jBase, content: string | Node | jBase): jBase {
    const doc = getDoc(this);
    if (!doc)
        return this;
    const fragment = normalizeToFragment(content, doc);
    const len = this.length;
    this.each(function(el, i) {
        if (el instanceof Element) {
            const contentToInsert = (i < len - 1) ? fragment.cloneNode(true) : fragment;
            el.replaceWith(contentToInsert);
        }
    });
    return this;
}

/**
 * * Appends the selected elements to the end of a target element.
 * @example appendTo('#container') => Appends all matched elements to the element with id 'container'.
 * @param target CSS selector or DOM element.
 * @returns The current jBase instance.
 */
export function appendTo(this: jBase, target: string | Element): jBase {
    const doc = getDoc(this);
    if (!doc)
        return this;
    const parent = typeof target === 'string' ? doc.querySelector(target) : target;
    if (parent instanceof Element) {
        const fragment = doc.createDocumentFragment();
        this.each(function(el) {
            if (el instanceof Node) fragment.appendChild(el);
        });
        parent.appendChild(fragment);
    }
    return this;
}

/**
 * * Prepends the selected elements to the beginning of a target element.
 * @example prependTo('#container') => Prepends all matched elements to the element with id 'container', before its existing content.
 * @param target CSS selector or DOM element.
 * @returns The current jBase instance.
 */
export function prependTo(this: jBase, target: string | Element): jBase {
    const doc = getDoc(this);
    if (!doc)
        return this;
    const parent = typeof target === 'string' ? doc.querySelector(target) : target;
    if (parent instanceof Element) {
        const fragment = doc.createDocumentFragment();
        this.each(function(el) {
            if (el instanceof Node) fragment.appendChild(el);
        });
        parent.prepend(fragment);
    }
    return this;
}

/**
 * * Inserts the selected elements immediately before the target element.
 * @example insertBefore('#target') => Inserts all matched elements immediately before the element with id 'target'.
 * @param target CSS selector or DOM element.
 * @returns The current jBase instance.
 */
export function insertBefore(this: jBase, target: string | Element): jBase {
    const doc = getDoc(this);
    if (!doc)
        return this;
    const targetEl = typeof target === 'string' ? doc.querySelector(target) : target;
    if (targetEl instanceof Element) {
        const fragment = doc.createDocumentFragment();
        this.each(function(el) {
            if (el instanceof Node) fragment.appendChild(el);
        });
        targetEl.before(fragment);
    }
    return this;
}

/**
 * * Inserts the selected elements immediately after the target element.
 * @example insertAfter('#target') => Inserts all matched elements immediately after the element with id 'target'.
 * @param target CSS selector or DOM element.
 * @returns The current jBase instance.
 */
export function insertAfter(this: jBase, target: string | Element): jBase {
    const doc = getDoc(this);
    if (!doc)
        return this;
    const targetEl = typeof target === 'string' ? doc.querySelector(target) : target;
    if (targetEl instanceof Element) {
        const fragment = doc.createDocumentFragment();
        this.each(function(el) {
            if (el instanceof Node) fragment.appendChild(el);
        });
        targetEl.after(fragment);
    }
    return this;
}

/**
 * * Wraps each selected element with the specified HTML structure.
 * @example wrap('<div class="box"></div>') => Wraps each matched element with a <div class="box"></div> element.
 * @param wrapperHtml HTML string defining the wrapper (e.g., `<div class="box"></div>`).
 * @returns The current jBase instance.
 */
export function wrap(this: jBase, wrapperHtml: string): jBase {
    const doc = getDoc(this);
    if (!doc)
        return this;
    this.each(function(el) {
        if (el instanceof Element) {
            const wrapper = parseHTML(wrapperHtml, doc);
            if (el.parentNode) {
                el.parentNode.insertBefore(wrapper, el);
            }
            wrapper.appendChild(el);
        }
    });
    return this;
}

/**
 * * Removes the direct parent of the selected elements from the DOM.
 * * @example unwrap() => Removes the parent element of each matched element, effectively "unwrapping" it from its container.
 * @returns The current jBase instance.
 */
export function unwrap(this: jBase): jBase {
    const doc = getDoc(this);
    if (!doc) return this;
    const parents = new Set<Element>();
    this.each(function(el) {
        if (el instanceof Element && el.parentElement) {
            parents.add(el.parentElement);
        }
    });
    each(Array.from(parents), function(_index, parent) {
        const fragment = doc.createDocumentFragment();
        while (parent.firstChild) {
            fragment.appendChild(parent.firstChild);
        }
        parent.replaceWith(fragment);
    });
    return this;
}
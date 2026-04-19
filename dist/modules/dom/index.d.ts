/**
 * @file src/modules/dom/index.ts
 * @version 2.0.3
 * @since 2.0.0
 * @license GPL-3.0-or-later
 * @copyright Sven Minio 2026
 * @author Sven Minio <https://sven-minio.de>
 * @category DOM
 * @description
 * * Central entry point for DOM operations. Aggregates methods for attributes, content, manipulation, traversal, and states.
 * @requires ./attributes
 * * Attribute and value manipulation.
 * @requires ./content
 * * Content handling (html, text).
 * @requires ./manipulation
 * * DOM manipulation (append, remove, etc.).
 * @requires ./traversal
 * * Tree traversal (find, parent, children).
 * @requires ./states
 * * State checks (checked, disabled).
 */
/**
 * * Aggregation of all DOM methods. Bundles specialized sub-modules into a single interface. Used to extend the jBase prototype centrally via Object.assign.
 */
export declare const domMethods: {
    checked(this: import("../..").JBaseClass, state?: boolean): boolean | import("../..").JBaseClass;
    selected(this: import("../..").JBaseClass, state?: boolean): boolean | import("../..").JBaseClass;
    disabled(this: import("../..").JBaseClass, state?: boolean): boolean | import("../..").JBaseClass;
    closest(this: import("../..").JBaseClass, selector: string): import("../..").JBaseClass;
    parent(this: import("../..").JBaseClass): import("../..").JBaseClass;
    children(this: import("../..").JBaseClass, selector?: string): import("../..").JBaseClass;
    findAll(this: import("../..").JBaseClass, selector: string): import("../..").JBaseClass;
    descendants(this: import("../..").JBaseClass): import("../..").JBaseClass;
    parents(this: import("../..").JBaseClass, selector?: string): import("../..").JBaseClass;
    parentsUntil(this: import("../..").JBaseClass, selector: string, filter?: string): import("../..").JBaseClass;
    descendantsUntil(this: import("../..").JBaseClass, untilSelector: string, filter?: string): import("../..").JBaseClass;
    next(this: import("../..").JBaseClass, selector?: string): import("../..").JBaseClass;
    prev(this: import("../..").JBaseClass, selector?: string): import("../..").JBaseClass;
    nextSibling(this: import("../..").JBaseClass, selector?: string): import("../..").JBaseClass;
    prevSibling(this: import("../..").JBaseClass, selector?: string): import("../..").JBaseClass;
    sibling(this: import("../..").JBaseClass, selector?: string): import("../..").JBaseClass;
    nextAll(this: import("../..").JBaseClass, selector?: string): import("../..").JBaseClass;
    prevAll(this: import("../..").JBaseClass, selector?: string): import("../..").JBaseClass;
    siblings(this: import("../..").JBaseClass, selector?: string): import("../..").JBaseClass;
    nextUntil(this: import("../..").JBaseClass, untilSelector: string, filter?: string): import("../..").JBaseClass;
    prevUntil(this: import("../..").JBaseClass, untilSelector: string, filter?: string): import("../..").JBaseClass;
    eq(this: import("../..").JBaseClass, index: number): import("../..").JBaseClass;
    first(this: import("../..").JBaseClass): import("../..").JBaseClass;
    last(this: import("../..").JBaseClass): import("../..").JBaseClass;
    filterBy(this: import("../..").JBaseClass, selectorOrFn: string | ((index: number, element: Element) => boolean)): import("../..").JBaseClass;
    not(this: import("../..").JBaseClass, selectorOrFn: string | ((index: number, element: Element) => boolean)): import("../..").JBaseClass;
    remove(this: import("../..").JBaseClass): import("../..").JBaseClass;
    empty(this: import("../..").JBaseClass): import("../..").JBaseClass;
    replaceWithClone(this: import("../..").JBaseClass): import("../..").JBaseClass;
    append(this: import("../..").JBaseClass, content: string | Node | import("../..").JBaseClass): import("../..").JBaseClass;
    prepend(this: import("../..").JBaseClass, content: string | Node | import("../..").JBaseClass): import("../..").JBaseClass;
    before(this: import("../..").JBaseClass, content: string | Node | import("../..").JBaseClass): import("../..").JBaseClass;
    after(this: import("../..").JBaseClass, content: string | Node | import("../..").JBaseClass): import("../..").JBaseClass;
    replaceWith(this: import("../..").JBaseClass, content: string | Node | import("../..").JBaseClass): import("../..").JBaseClass;
    appendTo(this: import("../..").JBaseClass, target: string | Element): import("../..").JBaseClass;
    prependTo(this: import("../..").JBaseClass, target: string | Element): import("../..").JBaseClass;
    insertBefore(this: import("../..").JBaseClass, target: string | Element): import("../..").JBaseClass;
    insertAfter(this: import("../..").JBaseClass, target: string | Element): import("../..").JBaseClass;
    wrap(this: import("../..").JBaseClass, wrapperHtml: string): import("../..").JBaseClass;
    unwrap(this: import("../..").JBaseClass): import("../..").JBaseClass;
    html(this: import("../..").JBaseClass, content?: string): string | import("../..").JBaseClass;
    text(this: import("../..").JBaseClass, content?: string): string | import("../..").JBaseClass;
    attr(this: import("../..").JBaseClass, name: string, value?: string): string | null | import("../..").JBaseClass;
    val(this: import("../..").JBaseClass, value?: string): string | import("../..").JBaseClass;
    removeAttr(this: import("../..").JBaseClass, name: string): import("../..").JBaseClass;
    prop(this: import("../..").JBaseClass, name: string, value?: any): any | import("../..").JBaseClass;
};
//# sourceMappingURL=index.d.ts.map
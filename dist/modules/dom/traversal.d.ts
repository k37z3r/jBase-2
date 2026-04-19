/**
 * @file src/modules/dom/traversal.ts
 * @version 2.0.3
 * @since 2.0.0
 * @license GPL-3.0-or-later
 * @copyright Sven Minio 2026
 * @author Sven Minio <https://sven-minio.de>
 * @category DOM
 * @description
 * * Methods for navigating the DOM tree (find, parent, children, siblings).
 * @requires ../../core
 * * Depends on the core jBase class for type definitions.
 * @requires ../../utils
 * * Utility functions (e.g., `each` for iteration).
 */
import { jBase } from '../../core';
/**
 * * Traverses the parents (heading toward the document root) of each element and finds the first element that matches the specified selector.
 * @example closest('.container') => For each matched element, finds the nearest ancestor with the class 'container'.
 * @param selector A string containing a selector expression.
 * @returns A new jBase instance containing the matched elements.
 */
export declare function closest(this: jBase, selector: string): jBase;
/**
 * * Gets the direct parent of each element in the current set. Deduplicates results.
 * @example parent() => Returns a new jBase instance containing the parent elements of all matched elements, without duplicates.
 * @returns A new jBase instance containing the parent elements.
 */
export declare function parent(this: jBase): jBase;
/**
 * * Gets the direct children of each element in the set, optionally filtered by a selector.
 * @example children() => Returns a new jBase instance containing all direct children of the matched elements.
 * @example children('.item') => Returns a new jBase instance containing only the direct children that match the selector '.item'.
 * @param selector (Optional) Filter selector.
 * @returns A new jBase instance containing the children.
 */
export declare function children(this: jBase, selector?: string): jBase;
/**
 * * Finds descendants (deep) that match the selector using `querySelectorAll`.
 * @example findAll('.item') => Returns a new jBase instance containing all descendant elements that match the selector '.item'.
 * @param selector The CSS selector to search for.
 * @returns A new jBase instance with the found elements.
 */
export declare function findAll(this: jBase, selector: string): jBase;
/**
 * * Recursively gets ALL descendants (not just direct children).
 * @example descendants() => Returns a new jBase instance containing all descendant elements of the matched elements.
 * @returns A new jBase instance with all descendants.
 */
export declare function descendants(this: jBase): jBase;
/**
 * * Gets all ancestors (parents, grandparents...) up to the root. Optionally filtered.
 * @example parents() => Returns a new jBase instance containing all ancestors of the matched elements, without duplicates.
 * @example parents('.container') => Returns a new jBase instance containing only the ancestors that match the selector '.container'.
 * @param selector (Optional) Filter selector for ancestors.
 * @returns A new jBase instance with the ancestors.
 */
export declare function parents(this: jBase, selector?: string): jBase;
/**
 * * Gets all ancestors UP TO (but not including) an element matching the selector.
 * @example parentsUntil('.container') => Returns a new jBase instance containing all ancestors of the matched elements up to (but not including) the nearest ancestor that matches '.container'.
 * @example parentsUntil('.container', '.item') => Returns a new jBase instance containing ancestors up to '.container' that also match '.item'.
 * @param selector The selector where traversal stops.
 * @param filter (Optional) Filter for the collected elements.
 * @returns A new jBase instance.
 */
export declare function parentsUntil(this: jBase, selector: string, filter?: string): jBase;
/**
 * * Recursively finds descendants but stops traversing a branch if `untilSelector` is met. Useful for finding nested elements without going too deep (e.g., nested forms).
 * @example descendantsUntil('.stop-here') => Returns a new jBase instance containing all descendant elements of the matched elements, but does not include any elements that are descendants of an element matching '.stop-here'.
 * @example descendantsUntil('.stop-here', '.item') => Returns a new jBase instance containing descendant elements that match '.item', but does not include any elements that are descendants of an element matching '.stop-here'.
 * @param untilSelector The selector that stops recursion in a branch.
 * @param filter (Optional) Selector to filter collected elements.
 * @returns A new jBase instance.
 */
export declare function descendantsUntil(this: jBase, untilSelector: string, filter?: string): jBase;
/**
 * * Gets the immediately following sibling.
 * @example next() => Returns a new jBase instance containing the immediately following sibling of each matched element.
 * @example next('.item') => Returns a new jBase instance containing the immediately following sibling that matches the selector '.item'.
 * @param selector (Optional) Filter selector.
 * @returns A new jBase instance.
 */
export declare function next(this: jBase, selector?: string): jBase;
/**
 * * Gets the immediately preceding sibling.
 * @example prev() => Returns a new jBase instance containing the immediately preceding sibling of each matched element.
 * @example prev('.item') => Returns a new jBase instance containing the immediately preceding sibling that matches the selector '.item'.
 * @param selector (Optional) Filter selector.
 * @returns A new jBase instance.
 */
export declare function prev(this: jBase, selector?: string): jBase;
/**
 * * Alias for `next()`.
 */
export declare function nextSibling(this: jBase, selector?: string): jBase;
/**
 * * Alias for `prev()`.
 */
export declare function prevSibling(this: jBase, selector?: string): jBase;
/**
 * * Alias for `next()`.
 */
export declare function sibling(this: jBase, selector?: string): jBase;
/**
 * * Gets ALL following siblings.
 * @example nextAll() => Returns a new jBase instance containing all following siblings of each matched element.
 * @example nextAll('.item') => Returns a new jBase instance containing all following siblings that match the selector '.item'.
 * @param selector (Optional) Filter selector.
 * @returns A new jBase instance.
 */
export declare function nextAll(this: jBase, selector?: string): jBase;
/**
 * * Gets ALL preceding siblings.
 * @example prevAll() => Returns a new jBase instance containing all preceding siblings of each matched element.
 * @example prevAll('.item') => Returns a new jBase instance containing all preceding siblings that match the selector '.item'.
 * @param selector (Optional) Filter selector.
 * @returns A new jBase instance.
 */
export declare function prevAll(this: jBase, selector?: string): jBase;
/**
 * * Gets ALL siblings (previous and next), excluding itself.
 * @example siblings() => Returns a new jBase instance containing all siblings of each matched element, without duplicates.
 * @example siblings('.item') => Returns a new jBase instance containing all siblings that match the selector '.item', without duplicates.
 * @param selector (Optional) Filter selector.
 * @returns A new jBase instance.
 */
export declare function siblings(this: jBase, selector?: string): jBase;
/**
 * * Gets all following siblings UNTIL a selector is met (exclusive).
 * @example nextUntil('.stop-here') => Returns a new jBase instance containing all following siblings of the matched elements up to (but not including) the nearest sibling that matches '.stop-here'.
 * @example nextUntil('.stop-here', '.item') => Returns a new jBase instance containing following siblings that match '.item' up to (but not including) the nearest sibling that matches '.stop-here'.
 * @param untilSelector The selector that stops the search.
 * @param filter (Optional) Filter for the found elements.
 * @returns A new jBase instance.
 */
export declare function nextUntil(this: jBase, untilSelector: string, filter?: string): jBase;
/**
 * * Gets all preceding siblings UNTIL a selector is met (exclusive).
 * @example prevUntil('.stop-here') => Returns a new jBase instance containing all preceding siblings of the matched elements up to (but not including) the nearest sibling that matches '.stop-here'.
 * @example prevUntil('.stop-here', '.item') => Returns a new jBase instance containing preceding siblings that match '.item' up to (but not including) the nearest sibling that matches '.stop-here'.
 * @param untilSelector The selector that stops the search.
 * @param filter (Optional) Filter for the found elements.
 * @returns A new jBase instance.
 */
export declare function prevUntil(this: jBase, untilSelector: string, filter?: string): jBase;
/**
 * * Reduces the set to the element at the specified index. Supports negative indices.
 * @example eq(0) => Returns a new jBase instance containing only the first element of the matched set.
 * @example eq(-1) => Returns a new jBase instance containing only the last element of the matched set.
 * @param index The position (0-based). Negative values count from the end.
 * @returns A new jBase instance containing the single element (or empty).
 */
export declare function eq(this: jBase, index: number): jBase;
/**
 * * Reduces the set of matched elements to the first one in the collection.
 * @example first() => Returns a new jBase instance containing only the first element of the matched set.
 * @param selector (Optional) Filter selector to find the first matching element.
 * @returns A new jBase instance containing only the first element, allowing for further method chaining.
 */
export declare function first(this: jBase): jBase;
/**
 * * Reduces the set of matched elements to the final one in the collection.
 * @example last() => Returns a new jBase instance containing only the last element of the matched set.
 * @returns A new jBase instance containing only the last element, allowing for further method chaining.
 */
export declare function last(this: jBase): jBase;
/**
 * * Filters elements based on a selector or a function.
 * @example filterBy('.active') => Returns a new jBase instance containing only the elements that match the selector '.active'.
 * @example filterBy((index, el) => el.textContent.includes('Hello')) => Returns a new jBase instance containing only the elements for which the function returns true.
 * @param selectorOrFn CSS selector string or filter function.
 * @returns A new jBase instance with filtered elements.
 */
export declare function filterBy(this: jBase, selectorOrFn: string | ((index: number, element: Element) => boolean)): jBase;
/**
 * * Removes elements from the set that match the selector or function (Inverse of filterBy).
 * @example not('.active') => Returns a new jBase instance containing only the elements that do NOT match the selector '.active'.
 * @example not((index, el) => el.textContent.includes('Hello')) => Returns a new jBase instance containing only the elements for which the function returns false.
 * @param selectorOrFn CSS selector string or filter function.
 * @returns A new jBase instance with remaining elements.
 */
export declare function not(this: jBase, selectorOrFn: string | ((index: number, element: Element) => boolean)): jBase;
//# sourceMappingURL=traversal.d.ts.map
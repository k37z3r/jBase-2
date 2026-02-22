/**
 * @file src/index.ts
 * @version 2.1.1
 * @since 2.0.0
 * @license GPL-3.0-or-later
 * @copyright Sven Minio 2026
 * @author Sven Minio <https://sven-minio.de>
 * @category Entry Point
 * @description
 * * Main library entry point. Aggregates Core, Types, Utils, and all functional modules into a single export.
 * @requires ./core
 * * Core class logic and inheritance.
 * @requires ./types
 * * TypeScript type definitions and interfaces.
 * @requires ./utils
 * * Helper functions (throttle, debounce).
 * @requires ./modules/css
 * * Style manipulation methods.
 * @requires ./modules/events
 * * Event handling logic.
 * @requires ./modules/dom
 * * DOM traversal and manipulation.
 * @requires ./modules/effects
 * * Visual effects and animations.
 * @requires ./modules/http
 * * HTTP client for AJAX requests.
 * @requires ./modules/data
 * * Data structure utilities.
 */

import { jBase as JBaseClass } from './core';
import { JBaseInput, JBaseCSSProperty, JBaseEventMap } from './types';

import { cssMethods } from './modules/css';
import { eventMethods } from './modules/events';
import { domMethods } from './modules/dom';
import { effectMethods } from './modules/effects';
import { http } from './modules/http';
import { data } from './modules/data';

Object.assign(JBaseClass.prototype, cssMethods);
Object.assign(JBaseClass.prototype, eventMethods);
Object.assign(JBaseClass.prototype, domMethods);
Object.assign(JBaseClass.prototype, effectMethods);

/**
 * TypeScript Declaration Merging.
 */
declare module './core' {
    interface jBase {
        /* ==========================================================================
           CSS MODULE
           ========================================================================== */

        /**
         * * Adds one or more CSS classes to the selected elements.
         * @param classNames
         * * One or more class names to be added.
         * @returns
         * * The current jBase instance for method chaining.
         */
        addClass(...classNames: string[]): jBase;

        /**
         * * Removes one or more CSS classes from the selected elements.
         * @param classNames
         * * One or more class names to be removed.
         * @returns
         * * The current jBase instance for method chaining.
         */
        removeClass(...classNames: string[]): jBase;

        /**
         * * Toggles a CSS class (adds if missing, removes if present).
         * @param className
         * * The class name to toggle.
         * @returns
         * * The current jBase instance for method chaining.
         */
        toggleClass(className: string): jBase;

        /**
         * * Checks if at least one of the selected elements has the specified class.
         * @param className
         * * The class name to check for.
         * @returns
         * * True if the class exists on at least one element, otherwise false.
         */
        hasClass(className: string): boolean;

        /**
         * * Sets a CSS property for all selected elements.
         * @param property
         * * The CSS property name (camelCase).
         * @param value
         * * The value to set.
         * @returns
         * * The current jBase instance for method chaining.
         */
        css(property: JBaseCSSProperty, value: string | number): jBase;

        /**
         * * Gets the computed CSS value of the first element.
         * @param property
         * * The CSS property name (camelCase).
         * @returns
         * * The computed value as a string.
         */
        css(property: JBaseCSSProperty): string;

        /**
         * * Sets multiple CSS properties for all selected elements using an object.
         * @param properties
         * * An object containing CSS property-value pairs.
         * @returns
         * * The current jBase instance for method chaining.
         */
        css(properties: Record<string, string | number>): jBase;

        /* ==========================================================================
           EVENT MODULE
           ========================================================================== */

        /**
         * * Registers a typed event listener.
         * @param event
         * * The event name (e.g., 'click').
         * @param handler
         * * The callback function.
         * @returns
         * * The current jBase instance.
         */
        on<K extends keyof JBaseEventMap>(event: K, handler: (event: JBaseEventMap[K]) => void): jBase;

        /**
         * * Registers an event listener (string-based / custom events).
         * @param event
         * * The name of the custom event.
         * @param handler
         * * The event listener.
         * @returns
         * * The current jBase instance.
         */
        on(event: string, handler: EventListenerOrEventListenerObject): jBase;

        /**
         * * Removes a typed event listener.
         * @param event
         * * The event name.
         * @param handler
         * * The exact reference of the handler to remove.
         * @returns
         * * The current jBase instance.
         */
        off<K extends keyof JBaseEventMap>(event: K, handler: (event: JBaseEventMap[K]) => void): jBase;

        /**
         * * Removes an event listener (string-based).
         * @param event
         * * The name of the event.
         * @param handler
         * * The exact reference of the handler to remove.
         * @returns
         * * The current jBase instance.
         */
        off(event: string, handler: EventListenerOrEventListenerObject): jBase;

        /* --- Mouse Events --- */

        /**
         * * Triggers the 'click' event or binds a handler.
         * @param handler
         * * (Optional) The function to execute on click.
         * @returns
         * * The current jBase instance.
         */
        click(handler?: (event: Event) => void): jBase;

        /**
         * * Binds a handler to the 'mousemove' event.
         * @param handler
         * * The callback function.
         * @returns
         * * The current jBase instance.
         */
        mousemove(handler: (event: MouseEvent) => void): jBase;

        /**
         * * Binds a handler to the 'mouseleave' event.
         * @param handler
         * * The callback function.
         * @returns
         * * The current jBase instance.
         */
        mouseleave(handler: (event: MouseEvent) => void): jBase;

        /**
         * * Binds a handler to the 'mouseenter' event.
         * @param handler
         * * The callback function.
         * @returns
         * * The current jBase instance.
         */
        mouseenter(handler: (event: MouseEvent) => void): jBase;

        /**
         * * Binds a handler to the 'mousedown' event.
         * @param handler
         * * The callback function.
         * @returns
         * * The current jBase instance.
         */
        mousedown(handler: (event: MouseEvent) => void): jBase;

        /**
         * * Binds a handler to the 'mouseup' event.
         * @param handler
         * * The callback function.
         * @returns
         * * The current jBase instance.
         */
        mouseup(handler: (event: MouseEvent) => void): jBase;

        /**
         * * Triggers the 'dblclick' event or binds a handler.
         * @param handler
         * * (Optional) The callback function.
         * @returns
         * * The current jBase instance.
         */
        dblclick(handler: (event: MouseEvent) => void): jBase;

        /**
         * * Binds a handler to the 'mouseout' event.
         * @param handler
         * * The callback function.
         * @returns
         * * The current jBase instance.
         */
        mouseout(handler: (event: MouseEvent) => void): jBase;

        /**
         * * Binds a handler to the 'mouseover' event.
         * @param handler
         * * The callback function.
         * @returns
         * * The current jBase instance.
         */
        mouseover(handler: (event: MouseEvent) => void): jBase;

        /* --- Keyboard Events --- */

        /**
         * * Binds a handler to the 'keydown' event.
         * @param handler
         * * The callback function.
         * @returns
         * * The current jBase instance.
         */
        keydown(handler: (event: KeyboardEvent) => void): jBase;

        /**
         * * Binds a handler to the 'keyup' event.
         * @param handler
         * * The callback function.
         * @returns
         * * The current jBase instance.
         */
        keyup(handler: (event: KeyboardEvent) => void): jBase;

        /**
         * * Binds a handler to the 'keypress' event (Deprecated).
         * @deprecated Use keydown instead.
         * @param handler
         * * The callback function.
         * @returns
         * * The current jBase instance.
         */
        keypress(handler: (event: KeyboardEvent) => void): jBase;

        /**
         * * Binds a handler that fires only when a specific key is pressed.
         * @param handler
         * * The callback function.
         * @returns
         * * The current jBase instance.
         */
        pressedKey(handler: (event: KeyboardEvent) => void): jBase;

        /* --- Form Events --- */

        /**
         * * Binds a handler to the 'submit' event.
         * @param handler
         * * The callback function.
         * @returns
         * * The current jBase instance.
         */
        submit(handler: (event: SubmitEvent) => void): jBase;

        /**
         * * Binds a handler to the 'change' event.
         * @param handler
         * * The callback function.
         * @returns
         * * The current jBase instance.
         */
        change(handler: (event: Event) => void): jBase;

        /**
         * * Binds a handler to the 'input' event (real-time).
         * @param handler
         * * The callback function.
         * @returns
         * * The current jBase instance.
         */
        input(handler: (event: Event) => void): jBase;

        /**
         * * Sets focus on the element.
         * @returns
         * * The current jBase instance.
         */
        focus(): jBase;
        /**
         * * Binds a handler to the 'focus' event.
         * @param handler
         * * The callback function.
         * @returns
         * * The current jBase instance.
         */
        focus(handler: (event: FocusEvent) => void): jBase;

        /**
         * * Removes focus from the element.
         * @returns
         * * The current jBase instance.
         */
        blur(): jBase;
        /**
         * * Binds a handler to the 'blur' event.
         * @param handler
         * * The callback function.
         * @returns
         * * The current jBase instance.
         */
        blur(handler: (event: FocusEvent) => void): jBase;

        /* --- Touch Events --- */

        /**
         * * Binds a handler to the 'touchstart' event.
         * @param handler
         * * The callback function.
         * @returns
         * * The current jBase instance.
         */
        touchstart(handler: (event: TouchEvent) => void): jBase;

        /**
         * * Binds a handler to the 'touchend' event.
         * @param handler
         * * The callback function.
         * @returns
         * * The current jBase instance.
         */
        touchend(handler: (event: TouchEvent) => void): jBase;

        /**
         * * Binds a handler to the 'touchmove' event.
         * @param handler
         * * The callback function.
         * @returns
         * * The current jBase instance.
         */
        touchmove(handler: (event: TouchEvent) => void): jBase;

        /**
         * * Binds a handler to the 'touchcancel' event.
         * @param handler
         * * The callback function.
         * @returns
         * * The current jBase instance.
         */
        touchcancel(handler: (event: TouchEvent) => void): jBase;

        /* ==========================================================================
           DOM MODULE
           ========================================================================== */

        /**
         * * Gets the HTML content of the first element.
         * @returns
         * * The HTML content as a string.
         */
        html(): string;
        /**
         * * Sets the HTML content of all selected elements.
         * @param content
         * * The new HTML content.
         * @returns
         * * The current jBase instance.
         */
        html(content: string): jBase;

        /**
         * * Gets the text content of the first element.
         * @returns
         * * The text content as a string.
         */
        text(): string;
        /**
         * * Sets the text content of all selected elements (safe against XSS).
         * @param content
         * * The new text content.
         * @returns
         * * The current jBase instance.
         */
        text(content: string): jBase;

        /**
         * * Gets an attribute value from the first element.
         * @param name
         * * The name of the attribute.
         * @returns
         * * The attribute value or null.
         */
        attr(name: string): string | null;
        /**
         * * Sets an attribute for all selected elements.
         * @param name
         * * The name of the attribute.
         * @param value
         * * The value to set.
         * @returns
         * * The current jBase instance.
         */
        attr(name: string, value: string): jBase;

        /**
         * * Gets the value of the first form element.
         * @returns
         * * The value as a string.
         */
        val(): string;
        /**
         * * Sets the value for all selected form elements.
         * @param value
         * * The value to set.
         * @returns
         * * The current jBase instance.
         */
        val(value: string | number): jBase;

        /**
         * * Gets a property from the first element.
         * * Useful for DOM properties that don't directly map to HTML attributes.
         * @param name
         * * The name of the property (e.g., 'checked', 'disabled').
         * @returns
         * * The property value.
         */
        prop(name: string): any;
        /**
         * * Sets a property for all selected elements.
         * @param name
         * * The name of the property.
         * @param value
         * * The value to set.
         * @returns
         * * The current jBase instance.
         */
        prop(name: string, value: any): jBase;

        /**
         * * Removes an attribute from all selected elements.
         * @param name
         * * The name of the attribute to remove.
         * @returns
         * * The current jBase instance.
         */
        removeAttr(name: string): jBase;

        /* --- Manipulation --- */

        /**
         * * Replaces elements with a deep clone of themselves (removes listeners).
         * @returns
         * * The current jBase instance.
         */
        replaceWithClone(): jBase;

        /**
         * * Removes all selected elements from the DOM.
         * @returns
         * * The current jBase instance.
         */
        remove(): jBase;

        /**
         * * Removes all child nodes from the selected elements.
         * @returns
         * * The current jBase instance.
         */
        empty(): jBase;

        /**
         * * Finds the closest ancestor matching the selector.
         * @param selector
         * * The CSS selector to match.
         * @returns
         * * A new jBase instance containing the ancestor.
         */
        closest(selector: string): jBase;

        /**
         * * Executes the handler when the DOM is fully loaded.
         * @param handler
         * * The function to execute.
         * @returns
         * * The current jBase instance.
         */
        ready(handler: () => void): jBase;

        /**
         * * Inserts content at the end of the selected elements (inside).
         * @param content
         * * Content to insert (String, Node, or jBase).
         * @returns
         * * The current jBase instance.
         */
        append(content: string | Node | jBase): jBase;

        /**
         * * Inserts content at the beginning of the selected elements (inside).
         * @param content
         * * Content to insert (String, Node, or jBase).
         * @returns
         * * The current jBase instance.
         */
        prepend(content: string | Node | jBase): jBase;

        /**
         * * Inserts content before the selected elements (outside).
         * @param content
         * * Content to insert (String, Node, or jBase).
         * @returns
         * * The current jBase instance.
         */
        before(content: string | Node | jBase): jBase;

        /**
         * * Inserts content after the selected elements (outside).
         * @param content
         * * Content to insert (String, Node, or jBase).
         * @returns
         * * The current jBase instance.
         */
        after(content: string | Node | jBase): jBase;

        /**
         * * Replaces the selected elements with new content.
         * @param content
         * * Content to insert (String, Node, or jBase).
         * @returns
         * * The current jBase instance.
         */
        replaceWith(content: string | Node | jBase): jBase;

        /**
         * * Appends the selected elements to a target.
         * @param target
         * * Target element or selector.
         * @returns
         * * The current jBase instance.
         */
        appendTo(target: string | Element): jBase;

        /**
         * * Prepends the selected elements to a target.
         * @param target
         * * Target element or selector.
         * @returns
         * * The current jBase instance.
         */
        prependTo(target: string | Element): jBase;

        /**
         * * Inserts the selected elements before a target.
         * @param target
         * * Target element or selector.
         * @returns
         * * The current jBase instance.
         */
        insertBefore(target: string | Element): jBase;

        /**
         * * Inserts the selected elements after a target.
         * @param target
         * * Target element or selector.
         * @returns
         * * The current jBase instance.
         */
        insertAfter(target: string | Element): jBase;

        /**
         * * Wraps each selected element with the specified HTML structure.
         * @param wrapperHtml
         * * The HTML string for the wrapper.
         * @returns
         * * The current jBase instance.
         */
        wrap(wrapperHtml: string): jBase;

        /**
         * * Removes the direct parent of the selected elements.
         * @returns
         * * The current jBase instance.
         */
        unwrap(): jBase;

        /* --- Traversal --- */

        /**
         * * Gets the direct parents.
         * @returns
         * * A new jBase instance with parents.
         */
        parent(): jBase;

        /**
         * * Gets the direct children.
         * @param selector
         * * (Optional) Filter selector.
         * @returns
         * * A new jBase instance with children.
         */
        children(selector?: string): jBase;

        /**
         * * Finds descendants matching the selector (deep).
         * @param selector
         * * CSS selector to find.
         * @returns
         * * A new jBase instance.
         */
        findAll(selector: string): jBase;

        /**
         * * Gets all descendants recursively.
         * @returns
         * * A new jBase instance.
         */
        childrens(): jBase;

        /**
         * * Gets descendants recursively until a selector is met.
         * @param untilSelector
         * * Selector to stop at.
         * @param filter
         * * (Optional) Filter selector.
         * @returns
         * * A new jBase instance.
         */
        childrensUntil(untilSelector: string, filter?: string): jBase;

        /**
         * * Gets all ancestors up to the root.
         * @param selector
         * * (Optional) Filter selector.
         * @returns
         * * A new jBase instance.
         */
        parents(selector?: string): jBase;

        /**
         * * Gets all ancestors until a selector is met.
         * @param selector
         * * Selector to stop at.
         * @param filter
         * * (Optional) Filter selector.
         * @returns
         * * A new jBase instance.
         */
        parentsUntil(selector: string, filter?: string): jBase;

        /* --- Sibling Traversal --- */

        /**
         * * Gets the immediately following sibling.
         * @param selector
         * * (Optional) Filter selector.
         * @returns
         * * A new jBase instance.
         */
        next(selector?: string): jBase;

        /**
         * * Gets the immediately preceding sibling.
         * @param selector
         * * (Optional) Filter selector.
         * @returns
         * * A new jBase instance.
         */
        prev(selector?: string): jBase;

        /**
         * * Alias for `next()`.
         * @param selector
         * * (Optional) Filter selector.
         * @returns
         * * A new jBase instance.
         */
        sibling(selector?: string): jBase;

        /**
         * * Alias for `next()`.
         * @param selector
         * * (Optional) Filter selector.
         * @returns
         * * A new jBase instance.
         */
        nextSibling(selector?: string): jBase;

        /**
         * * Alias for `prev()`.
         * @param selector
         * * (Optional) Filter selector.
         * @returns
         * * A new jBase instance.
         */
        prevSibling(selector?: string): jBase;

        /**
         * * Gets all following siblings.
         * @param selector
         * * (Optional) Filter selector.
         * @returns
         * * A new jBase instance.
         */
        nextAll(selector?: string): jBase;

        /**
         * * Gets all preceding siblings.
         * @param selector
         * * (Optional) Filter selector.
         * @returns
         * * A new jBase instance.
         */
        prevAll(selector?: string): jBase;

        /**
         * * Gets all siblings (prev and next).
         * @param selector
         * * (Optional) Filter selector.
         * @returns
         * * A new jBase instance.
         */
        siblings(selector?: string): jBase;

        /**
         * * Gets following siblings until a selector is met.
         * @param untilSelector
         * * Selector to stop at.
         * @param filter
         * * (Optional) Filter selector.
         * @returns
         * * A new jBase instance.
         */
        nextUntil(untilSelector: string, filter?: string): jBase;

        /**
         * * Gets preceding siblings until a selector is met.
         * @param untilSelector
         * * Selector to stop at.
         * @param filter
         * * (Optional) Filter selector.
         * @returns
         * * A new jBase instance.
         */
        prevUntil(untilSelector: string, filter?: string): jBase;

        /* --- Filtering --- */

        /**
         * * Reduces the set to the element at the index.
         * @param index
         * * Index (negative values count from the end).
         * @returns
         * * A new jBase instance.
         */
        eq(index: number): jBase;

        /**
         * * Reduces the set to the first element.
         * @returns
         * * A new jBase instance.
         */
        first(): jBase;

        /**
         * * Reduces the set to the last element.
         * @returns
         * * A new jBase instance.
         */
        last(): jBase;

        /**
         * * Filters elements by selector.
         * @param selector
         * * CSS selector to filter by.
         * @returns
         * * A new jBase instance.
         */
        filterBy(selector: string): jBase;

        /**
         * * Filters elements by a callback function.
         * @param predicate
         * * Function that returns true to keep the element.
         * @returns
         * * A new jBase instance.
         */
        filterBy(predicate: (index: number, element: Element) => boolean): jBase;

        /**
         * * Removes elements matching the selector.
         * @param selector
         * * CSS selector to remove.
         * @returns
         * * A new jBase instance.
         */
        not(selector: string): jBase;

        /**
         * * Removes elements matching the callback function.
         * @param predicate
         * * Function that returns true to remove the element.
         * @returns
         * * A new jBase instance.
         */
        not(predicate: (index: number, element: Element) => boolean): jBase;

        /* ==========================================================================
           EFFECTS MODULE
           ========================================================================== */

        /**
         * * Slides the element into view (horizontal).
         * @param options
         * * Animation options.
         * @returns
         * * The current jBase instance.
         */
        slideIn(options?: { direction?: 'left' | 'right', duration?: number }): jBase;

        /**
         * * Slides the element out of view (horizontal).
         * @param options
         * * Animation options.
         * @returns
         * * The current jBase instance.
         */
        slideOut(options?: { direction?: 'left' | 'right', duration?: number }): jBase;

        /**
         * * Toggles between slideIn and slideOut.
         * @param options
         * * Animation options.
         * @returns
         * * The current jBase instance.
         */
        slideToggle(options?: { direction?: 'left' | 'right', duration?: number }): jBase;

        /**
         * * Slides the element down (Accordion).
         * @param options
         * * Animation options.
         * @returns
         * * The current jBase instance.
         */
        slideDown(options?: { duration?: number, displayType?: string }): jBase;

        /**
         * * Slides the element up.
         * @param options
         * * Animation options.
         * @returns
         * * The current jBase instance.
         */
        slideUp(options?: { duration?: number }): jBase;

        /**
         * * Toggles between slideDown and slideUp.
         * @param options
         * * Animation options.
         * @returns
         * * The current jBase instance.
         */
        slideToggleBox(options?: { duration?: number }): jBase;

        /**
         * * Fades the element in (Opacity).
         * @param options
         * * Animation options.
         * @returns
         * * The current jBase instance.
         */
        fadeIn(options?: { duration?: number, displayType?: string }): jBase;

        /**
         * * Fades the element out (Opacity).
         * @param options
         * * Animation options.
         * @returns
         * * The current jBase instance.
         */
        fadeOut(options?: { duration?: number }): jBase;

        /**
         * * Toggles between fadeIn and fadeOut.
         * @param options
         * * Animation options.
         * @returns
         * * The current jBase instance.
         */
        fadeToggle(options?: { duration?: number }): jBase;

        /* ==========================================================================
           STATES MODULE
           ========================================================================== */

        /**
         * * Checks the 'checked' state (Getter).
         * @returns
         * * True if checked.
         */
        checked(): boolean;
        /**
         * * Sets the 'checked' state (Setter).
         * @param state
         * * The new state.
         * @returns
         * * The current jBase instance.
         */
        checked(state: boolean): jBase;

        /**
         * * Checks the 'selected' state (Getter).
         * @returns
         * * True if selected.
         */
        selected(): boolean;
        /**
         * * Sets the 'selected' state (Setter).
         * @param state
         * * The new state.
         * @returns
         * * The current jBase instance.
         */
        selected(state: boolean): jBase;

        /**
         * * Checks the 'disabled' state (Getter).
         * @returns
         * * True if disabled.
         */
        disabled(): boolean;
        /**
         * * Sets the 'disabled' state and toggles CSS class (Setter).
         * @param state
         * * The new state.
         * @returns
         * * The current jBase instance.
         */
        disabled(state: boolean): jBase;
    }
}

/**
 * * Factory function to initialize a new jBase instance.
 * @param selector
 * * CSS selector, HTML string, DOM element, or collection.
 * @returns
 * * A new jBase collection.
 */
const init = (selector: JBaseInput): JBaseClass => {
    return new JBaseClass(selector);
};

export const bind = (window: Window) => {
    const doc = window.document;
    const boundInit = (selector: JBaseInput) => new JBaseClass(selector, doc);
    
    Object.assign(boundInit, {
        fn: JBaseClass.prototype,
        http,
        data,
    });

    return boundInit;
};

/**
 * * Export the factory under different aliases for maximum compatibility and convenience.
 */
export const $ = init;
export const jB = init;
export const _jB = init;
export const __jB = init;
export const _jBase = init;
export const __jBase = init;
export const jBase = init;
export const __ = init;

/**
 * * Utility for throttled function calls.
 */
export { throttle } from './utils';

/**
 * * Utility for debounced function calls.
 */
export { debounce } from './utils';

/**
 * * HTTP Client for AJAX requests.
 */
export { http } from './modules/http';

/**
 * * Data utilities for Arrays and Objects.
 */
export { data } from './modules/data';

/**
 * * The class itself, if needed for type checks.
 */
export { JBaseClass };
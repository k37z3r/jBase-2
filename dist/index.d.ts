/**
 * @file src/index.ts
 * @version 2.3.0
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
import { JBaseInput, JBaseCSSProperty, JBaseEventMap, JBaseElement } from './types';
import { debounce, each, throttle } from './utils';
/**
 * * TypeScript Declaration Merging.
 */
declare module './core' {
    interface jBase {
        /**
         * * Adds one or more CSS classes to the selected elements.
         * @example addClass('active', 'highlight'); => Adds the 'active' and 'highlight' classes to all selected elements.
         * @param classNames One or more class names to be added.
         * @returns The current jBase instance for method chaining.
         */
        addClass(...classNames: string[]): jBase;
        /**
         * * Removes one or more CSS classes from the selected elements.
         * @example removeClass('active', 'highlight'); => Removes the 'active' and 'highlight' classes from all selected elements.
         * @param classNames One or more class names to be removed.
         * @returns The current jBase instance for method chaining.
         */
        removeClass(...classNames: string[]): jBase;
        /**
         * * Toggles a CSS class (adds if missing, removes if present).
         * @example toggleClass('active'); => Toggles the 'active' class on all selected elements.
         * @param className The class name to toggle.
         * @returns The current jBase instance for method chaining.
         */
        toggleClass(className: string): jBase;
        /**
         * * Checks if at least one of the selected elements has the specified class.
         * @example hasClass('active'); => Checks if at least one selected element has the 'active' class.
         * @param className The class name to check for.
         * @returns True if the class exists on at least one element, otherwise false.
         */
        hasClass(className: string): boolean;
        /**
         * * Sets a CSS property for all selected elements.
         * @example css('color', 'red'); => Sets the 'color' style to 'red' for all selected elements.
         * @param property The CSS property name (camelCase).
         * @param value The value to set.
         * @returns The current jBase instance for method chaining.
         */
        css(property: JBaseCSSProperty, value: string | number): jBase;
        /**
         * * Gets the computed CSS value of the first element.
         * @example css('color'); => Returns the computed 'color' value of the first selected element.
         * @param property The CSS property name (camelCase).
         * @returns The computed value as a string.
         */
        css(property: JBaseCSSProperty): string;
        /**
         * * Sets multiple CSS properties for all selected elements using an object.
         * @example css({ color: 'red', backgroundColor: 'blue' }); => Sets the 'color' to 'red' and 'background-color' to 'blue' for all selected elements.
         * @param properties An object containing CSS property-value pairs.
         * @returns The current jBase instance for method chaining.
         */
        css(properties: Record<string, string | number>): jBase;
        /**
         * Iterates over the jBase collection in a highly performant manner.
         * Returning `false` within the callback breaks the loop early.
         * @example each((el, index) => { console.log(el); if (index === 5) return false; }); => Logs the first 6 matched elements to the console.
         * @param callback The function to execute for each element.
         * The context (`this`)
         * The first argument (`el`) are set to the current DOM element.
         * The second argument (`index`) provides the current loop index.
         * @returns The current jBase instance for method chaining.
         */
        each(callback: (this: JBaseElement, el: JBaseElement, index: number) => boolean | void): jBase;
        /**
         * * Registers a typed event listener.
         * @example on('click', event => { console.log(event); }); => Attaches a click event listener that logs the event object.
         * @param event The event name (e.g., 'click').
         * @param handler The callback function.
         * @returns The current jBase instance.
         */
        on<K extends keyof JBaseEventMap>(event: K, handler: (event: JBaseEventMap[K]) => void): jBase;
        /**
         * * Attaches an event handler function for one or more events to the selected elements.
         * @example on('click', handler) => Binds a click event handler to all matched elements.
         * @param events One or more space-separated event types (e.g., 'click', 'mouseenter mouseleave').
         * @param handler A function to execute when the event is triggered.
         * @returns The current jBase instance for method chaining.
         */
        on(events: string, handler: (event: any) => void): jBase;
        /**
         * * Attaches an event handler to the selected elements, passing custom data to the event object.
         * @example on('click', { key: 'value' }, handler) => Binds a click event handler and passes custom data to the event object.
         * @param events One or more space-separated event types.
         * @param data Custom data to be passed to the handler via `event.data`.
         * @param handler A function to execute when the event is triggered.
         * @returns The current jBase instance for method chaining.
         */
        on(events: string, data: any, handler: (event: any) => void): jBase;
        /**
         * * Attaches a delegated event handler. The handler is only executed if the event target matches the given selector.
         * * Highly performant for observing dynamically added child elements.
         * @example on('click', '.btn', handler) => Binds a click event handler to all current and future elements matching '.btn' within the matched elements.
         * @param events One or more space-separated event types.
         * @param selector A CSS selector string to filter the descendants of the selected elements.
         * @param handler A function to execute when the event is triggered.
         * @returns The current jBase instance for method chaining.
         */
        on(events: string, selector: string, handler: (event: any) => void): jBase;
        /**
         * * Attaches a delegated event handler and passes custom data to the event object.
         * @example on('click', '.btn', { key: 'value' }, handler) => Binds a click event handler to all current and future elements matching '.btn' and passes custom data to the event object.
         * @param events One or more space-separated event types.
         * @param selector A CSS selector string to filter the descendants of the selected elements.
         * @param data Custom data to be passed to the handler via `event.data`.
         * @param handler A function to execute when the event is triggered.
         * @returns The current jBase instance for method chaining.
         */
        on(events: string, selector: string, data: any, handler: (event: any) => void): jBase;
        /**
         * * Removes a typed event listener.
         * @example off('click', handler) => Removes a click event handler from all matched elements.
         * @param event The event name.
         * @param handler The exact reference of the handler to remove.
         * @returns The current jBase instance.
         */
        off<K extends keyof JBaseEventMap>(event: K, handler: (event: JBaseEventMap[K]) => void): jBase;
        /**
         * * Removes all or a specific event listener.
         * @example off('click') => Removes all click event handlers from all matched elements.
         * @param events One or more space-separated event types.
         * @param handler (Optional) The specific handler to remove.
         * @returns The current jBase instance for method chaining.
         */
        off(events: string, handler?: (event: any) => void): jBase;
        /**
         * * Removes a delegated event listener.
         * @example off('click', '.btn', handler) => Removes a delegated click event handler from all matched elements for the specified selector.
         * @param events One or more space-separated event types.
         * @param selector The CSS selector string originally used for delegation.
         * @param handler (Optional) The specific handler to remove.
         * @returns The current jBase instance for method chaining.
         */
        off(events: string, selector: string, handler?: (event: any) => void): jBase;
        /**
         * * Registers a typed event listener that executes only once.
         * @example once('click', event => { console.log(event); }); => Attaches a click event listener that executes only once and logs the event object.
         * @param event The event name.
         * @param handler The exact reference of the handler.
         * @returns The current jBase instance for method chaining.
         */
        once<K extends keyof JBaseEventMap>(event: K, handler: (event: JBaseEventMap[K]) => void): jBase;
        /**
         * * Registers an event listener that executes only once.
         * @example once('click', handler) => Binds a click event handler that executes only once for all matched elements.
         * @param events One or more space-separated event types.
         * @param handler A function to execute when the event is triggered.
         * @returns The current jBase instance for method chaining.
         */
        once(events: string, handler: (event: any) => void): jBase;
        /**
         * * Registers a one-time listener with custom data.
         * @example once('click', { key: 'value' }, handler) => Binds a click event handler that executes only once and passes custom data to the event object.
         * @param events One or more space-separated event types.
         * @param data Custom data to be passed to the handler via `event.data`.
         * @param handler A function to execute when the event is triggered.
         * @returns The current jBase instance for method chaining.
         */
        once(events: string, data: any, handler: (event: any) => void): jBase;
        /**
         * * Registers a one-time listener with event delegation.
         * @example once('click', '.btn', handler) => Binds a click event handler that executes only once for all current and future elements matching '.btn' within the matched elements.
         * @param events One or more space-separated event types.
         * @param selector A CSS selector string for event delegation.
         * @param handler A function to execute when the event is triggered.
         * @returns The current jBase instance for method chaining.
         */
        once(events: string, selector: string, handler: (event: any) => void): jBase;
        /**
         * * Registers a one-time listener with event delegation and custom data.
         * @example once('click', '.btn', { key: 'value' }, handler) => Binds a click event handler that executes only once for all current and future elements matching '.btn' and passes custom data to the event object.
         * @example once('click', { key: 'value' }, handler) => Binds a click event handler that executes only once and passes custom data to the event object.
         * @param events One or more space-separated event types.
         * @param selector A CSS selector string for event delegation.
         * @param data Custom data to be passed to the handler via `event.data`.
         * @param handler A function to execute when the event is triggered.
         * @returns The current jBase instance for method chaining.
         */
        once(events: string, selector: string, data: any, handler: (event: any) => void): jBase;
        /**
         * * Triggers an event on each element in the collection.
         * @example trigger('customEvent') => Triggers 'customEvent' on all matched elements.
         * @example trigger('customEvent', { key: 'value' }) => Triggers 'customEvent' on all matched elements and passes custom data to the event object.
         * @example trigger('click') => Programmatically triggers a click event on all matched elements.
         * @example trigger('click', { key: 'value' }) => Programmatically triggers a click event on all matched elements and passes custom data to the event object.
         * @param eventName The name of the event to trigger.
         * @param data Optional data to pass to the event (accessible via event.detail).
         * @returns The current jBase instance.
         */
        trigger(eventName: string, data?: any): jBase;
        /**
         * * Triggers the 'click' event or binds a handler.
         * @example click() => Triggers the 'click' event on all matched elements.
         * @example click(handler) => Binds a click event handler to all matched elements.
         * @param handler (Optional) The function to execute on click.
         * @returns The current jBase instance.
         */
        click(handler?: (event: Event) => void): jBase;
        /**
         * * Binds a handler to the 'mousemove' event.
         * @example mousemove(handler) => Binds a mousemove event handler to all matched elements.
         * @param handler The callback function.
         * @returns The current jBase instance.
         */
        mousemove(handler: (event: MouseEvent) => void): jBase;
        /**
         * * Binds a handler to the 'mouseleave' event.
         * @example mouseleave(handler) => Binds a mouseleave event handler to all matched elements.
         * @param handler The callback function.
         * @returns The current jBase instance.
         */
        mouseleave(handler: (event: MouseEvent) => void): jBase;
        /**
         * * Binds a handler to the 'mouseenter' event.
         * @example mouseenter(handler) => Binds a mouseenter event handler to all matched elements.
         * @param handler The callback function.
         * @returns The current jBase instance.
         */
        mouseenter(handler: (event: MouseEvent) => void): jBase;
        /**
         * * Binds a handler to the 'mousedown' event.
         * @example mousedown(handler) => Binds a mousedown event handler to all matched elements.
         * @param handler The callback function.
         * @returns The current jBase instance.
         */
        mousedown(handler: (event: MouseEvent) => void): jBase;
        /**
         * * Binds a handler to the 'mouseup' event.
         * @example mouseup(handler) => Binds a mouseup event handler to all matched elements.
         * @param handler The callback function.
         * @returns The current jBase instance.
         */
        mouseup(handler: (event: MouseEvent) => void): jBase;
        /**
         * * Triggers the 'dblclick' event or binds a handler.
         * @example dblclick() => Triggers the 'dblclick' event on all matched elements.
         * @example dblclick(handler) => Binds a dblclick event handler to all matched elements.
         * @param handler (Optional) The callback function.
         * @returns The current jBase instance.
         */
        dblclick(handler: (event: MouseEvent) => void): jBase;
        /**
         * * Binds a handler to the 'mouseout' event.
         * @example mouseout(handler) => Binds a mouseout event handler to all matched elements.
         * @param handler The callback function.
         * @returns The current jBase instance.
         */
        mouseout(handler: (event: MouseEvent) => void): jBase;
        /**
         * * Binds a handler to the 'mouseover' event.
         * @example mouseover(handler) => Binds a mouseover event handler to all matched elements.
         * @param handler The callback function.
         * @returns The current jBase instance.
         */
        mouseover(handler: (event: MouseEvent) => void): jBase;
        /**
         * * Binds handlers to both 'mouseenter' and 'mouseleave' events.
         * @example hover(handlerIn, handlerOut) => Binds handlerIn to mouseenter and handlerOut to mouseleave for all matched elements.
         * @param handlerIn Executed on mouseenter.
         * @param handlerOut Executed on mouseleave.
         * @returns The current jBase instance.
         */
        hover(handlerIn: (event: MouseEvent) => void, handlerOut: (event: MouseEvent) => void): jBase;
        /**
         * * Binds a handler to the 'keydown' event
         * @example keydown(handler) => Binds a keydown event handler to all matched elements.
         * @param handler The callback function.
         * @returns The current jBase instance.
         */
        keydown(handler: (event: KeyboardEvent) => void): jBase;
        /**
         * * Binds a handler to the 'keyup' event.
         * @example keyup(handler) => Binds a keyup event handler to all matched elements.
         * @param handler The callback function.
         * @returns The current jBase instance.
         */
        keyup(handler: (event: KeyboardEvent) => void): jBase;
        /**
         * * Binds a handler to the 'keypress' event (Deprecated).
         * @deprecated Use keydown instead.
         * @param handler The callback function.
         * @returns The current jBase instance.
         */
        keypress(handler: (event: KeyboardEvent) => void): jBase;
        /**
         * * Binds a handler that fires only when a specific key is pressed.
         * @example pressedKey(handler) => Binds a handler that executes only when a specific key is pressed.
         * @param handler The callback function.
         * @returns The current jBase instance.
         */
        pressedKey(handler: (event: KeyboardEvent) => void): jBase;
        /**
         * * Binds a handler to the 'submit' event.
         * @example submit(handler) => Binds a submit event handler to all matched forms.
         * @param handler The callback function.
         * @returns The current jBase instance.
         */
        submit(handler: (event: SubmitEvent) => void): jBase;
        /**
         * * Binds a handler to the 'change' event.
         * @example change(handler) => Binds a change event handler to all matched elements.
         * @param handler The callback function.
         * @returns The current jBase instance.
         */
        change(handler: (event: Event) => void): jBase;
        /**
         * * Binds a handler to the 'input' event (real-time).
         * @example input(handler) => Binds an input event handler to all matched elements.
         * @param handler The callback function.
         * @returns The current jBase instance.
         */
        input(handler: (event: Event) => void): jBase;
        /**
         * * Sets focus on the element.
         * @example focus() => Sets focus on the element.
         * @returns The current jBase instance.
         */
        focus(): jBase;
        /**
         * * Binds a handler to the 'focus' event.
         * @example focus(handler) => Binds a focus event handler to all matched elements.
         * @param handler The callback function.
         * @returns The current jBase instance.
         */
        focus(handler: (event: FocusEvent) => void): jBase;
        /**
         * * Removes focus from the element.
         * @example blur() => Removes focus from the element.
         * @returns The current jBase instance.
         */
        blur(): jBase;
        /**
         * * Binds a handler to the 'blur' event.
         * @example blur(handler) => Binds a blur event handler to all matched elements.
         * @param handler The callback function.
         * @returns The current jBase instance.
         */
        blur(handler: (event: FocusEvent) => void): jBase;
        /**
         * * Binds a handler to the 'touchstart' event.
         * @example touchstart(handler) => Binds a touchstart event handler to all matched elements.
         * @param handler The callback function.
         * @returns The current jBase instance.
         */
        touchstart(handler: (event: TouchEvent) => void): jBase;
        /**
         * * Binds a handler to the 'touchend' event.
         * @example touchend(handler) => Binds a touchend event handler to all matched elements.
         * @param handler The callback function.
         * @returns The current jBase instance.
         */
        touchend(handler: (event: TouchEvent) => void): jBase;
        /**
         * * Binds a handler to the 'touchmove' event.
         * @example touchmove(handler) => Binds a touchmove event handler to all matched elements.
         * @param handler The callback function.
         * @returns The current jBase instance.
         */
        touchmove(handler: (event: TouchEvent) => void): jBase;
        /**
         * * Binds a handler to the 'touchcancel' event.
         * @example touchcancel(handler) => Binds a touchcancel event handler to all matched elements.
         * @param handler The callback function.
         * @returns The current jBase instance.
         */
        touchcancel(handler: (event: TouchEvent) => void): jBase;
        /**
         * * Binds a handler to the 'swipeLeft' gesture.
         * @example swipeLeft(handler) => Binds a swipeLeft gesture handler to all matched elements.
         * @param handler The callback function.
         * @returns The current jBase instance.
         */
        swipeLeft(handler: (event: TouchEvent) => void): jBase;
        /**
         * * Binds a handler to the 'swipeRight' gesture.
         * @example swipeRight(handler) => Binds a swipeRight gesture handler to all matched elements.
         * @param handler The callback function.
         * @returns The current jBase instance.
         */
        swipeRight(handler: (event: TouchEvent) => void): jBase;
        /**
         * * Binds a handler to the 'swipeDown' gesture.
         * @example swipeDown(handler) => Binds a swipeDown gesture handler to all matched elements.
         * @param handler The callback function.
         * @returns The current jBase instance.
         */
        swipeDown(handler: (event: TouchEvent) => void): jBase;
        /**
         * * Binds a handler to the 'swipeUp' gesture.
         * @example swipeUp(handler) => Binds a swipeUp gesture handler to all matched elements.
         * @param handler The callback function.
         * @returns The current jBase instance.
         */
        swipeUp(handler: (event: TouchEvent) => void): jBase;
        /**
         * * Gets the HTML content of the first element.
         * @example html() => Returns the HTML content of the first matched element as a string.
         * @returns The HTML content as a string.
         */
        html(): string;
        /**
         * * Gets the HTML content of the first element, or sets the HTML content of all matched elements.
         * @example html() => Returns the innerHTML of the first element.
         * @example html('<div>New</div>') => Sets safe HTML for all matched elements.
         * @example html('<script>alert("Hi")</script>', { executeScripts: true }) => Injects and executes scripts.
         * @param content The HTML string to set. If undefined, acts as a getter.
         * @param options Security and execution options.
         * @returns HTML string (getter) or the current jBase instance (setter).
         */
        html(content: string, options?: {
            executeScripts?: boolean;
        }): jBase;
        /**
         * * Gets the text content of the first element.
         * @example text() => Returns the text content of the first matched element as a string.
         * @returns The text content as a string.
         */
        text(): string;
        /**
         * * Sets the text content of all selected elements (safe against XSS).
         * @example text('New text content') => Sets the text content of all matched elements to 'New text content'.
         * @param content The new text content.
         * @returns The current jBase instance.
         */
        text(content: string): jBase;
        /**
         * * Loads HTML from a server and injects it into the matched elements.
         * @example $('#content').load('/pages/about.html')
         * @example $('#content').load('/pages/widget.html', { executeScripts: true })
         * @param url The URL to fetch the HTML from.
         * @param options Fetch options extended with jBase specific settings (e.g., executeScripts).
         * @returns A Promise resolving to the current jBase instance.
         */
        load(url: string, options?: RequestInit & {
            executeScripts?: boolean;
        }): Promise<jBase>;
        /**
         * * Gets an attribute value from the first element.
         * @example attr('href') => Returns the value of the 'href' attribute from the first matched element or null if it doesn't exist.
         * @param name The name of the attribute.
         * @returns The attribute value or null.
         */
        attr(name: string): string | null;
        /**
         * * Sets an attribute for all selected elements.
         * @example attr('data-id', '123') => Sets the 'data-id' attribute to '123' for all matched elements.
         * @param name The name of the attribute.
         * @param value The value to set.
         * @returns The current jBase instance.
         */
        attr(name: string, value: string): jBase;
        /**
         * * Gets the value of the first form element.
         * @example val() => Returns the current value of the first matched form element as a string.
         * @returns The value as a string.
         */
        val(): string;
        /**
         * * Sets the value for all selected form elements.
         * @example val('New value') => Sets the value of all matched form elements to 'New value'.
         * @param value The value to set.
         * @returns The current jBase instance.
         */
        val(value: string | number): jBase;
        /**
         * * Gets a property from the first element.
         * * Useful for DOM properties that don't directly map to HTML attributes.
         * @example prop('checked') => Returns the checked property of the first matched element (true or false).
         * @param name The name of the property (e.g., 'checked', 'disabled').
         * @returns The property value.
         */
        prop(name: string): any;
        /**
         * * Sets a property for all selected elements.
         * @example prop('checked', true) => Sets the checked property to true for all matched elements.
         * @param name The name of the property.
         * @param value The value to set.
         * @returns The current jBase instance.
         */
        prop(name: string, value: any): jBase;
        /**
         * * Removes an attribute from all selected elements.
         * @example removeAttr('data-id') => Removes the 'data-id' attribute from all matched elements.
         * @param name The name of the attribute to remove.
         * @returns The current jBase instance.
         */
        removeAttr(name: string): jBase;
        /**
         * * Replaces elements with a deep clone of themselves (removes listeners).
         * @example replaceWithClone() => Replaces each matched element with a deep clone of itself, effectively removing all event listeners and data.
         * @returns The current jBase instance.
         */
        replaceWithClone(): jBase;
        /**
         * * Removes all selected elements from the DOM.
         * @example remove() => Removes all matched elements from the DOM.
         * @returns The current jBase instance.
         */
        remove(): jBase;
        /**
         * * Removes all child nodes from the selected elements.
         * @example empty() => Removes all child nodes from each matched element, leaving the elements themselves intact.
         * @returns The current jBase instance.
         */
        empty(): jBase;
        /**
         * * Finds the closest ancestor matching the selector.
         * @example closest('.container') => For each matched element, returns the closest ancestor that matches the '.container' selector.
         * @param selector The CSS selector to match.
         * @returns A new jBase instance containing the ancestor.
         */
        closest(selector: string): jBase;
        /**
         * * Executes the handler when the DOM is fully loaded.
         * @example ready(() => { console.log('DOM is ready'); }); => Executes the provided function when the DOM is fully loaded.
         * @param handler The function to execute.
         * @returns The current jBase instance.
         */
        ready(handler: () => void): jBase;
        /**
         * * Inserts content at the end of the selected elements (inside).
         * @example append('<span>New content</span>') => Appends a new <span> element with 'New content' inside each matched element.
         * @param content Content to insert (String, Node, or jBase).
         * @returns The current jBase instance.
         */
        append(content: string | Node | jBase): jBase;
        /**
         * * Inserts content at the beginning of the selected elements (inside).
         * @example prepend('<span>New content</span>') => Prepends a new <span> element with 'New content' inside each matched element.
         * @param content Content to insert (String, Node, or jBase).
         * @returns The current jBase instance.
         */
        prepend(content: string | Node | jBase): jBase;
        /**
         * * Inserts content before the selected elements (outside).
         * @example before('<span>New content</span>') => Inserts a new <span> element with 'New content' before each matched element.
         * @param content Content to insert (String, Node, or jBase).
         * @returns The current jBase instance.
         */
        before(content: string | Node | jBase): jBase;
        /**
         * * Inserts content after the selected elements (outside).
         * @example after('<span>New content</span>') => Inserts a new <span> element with 'New content' after each matched element.
         * @param content Content to insert (String, Node, or jBase).
         * @returns The current jBase instance.
         */
        after(content: string | Node | jBase): jBase;
        /**
         * * Replaces the selected elements with new content.
         * @example replaceWith('<span>New content</span>') => Replaces each matched element with a new <span> element containing 'New content'.
         * @param content Content to insert (String, Node, or jBase).
         * @returns The current jBase instance.
         */
        replaceWith(content: string | Node | jBase): jBase;
        /**
         * * Appends the selected elements to a target.
         * @example appendTo('#container') => Appends all matched elements to the element with id 'container'.
         * @param target Target element or selector.
         * @returns The current jBase instance.
         */
        appendTo(target: string | Element): jBase;
        /**
         * * Prepends the selected elements to a target.
         * @example prependTo('#container') => Prepends all matched elements to the element with id 'container'.
         * @param target Target element or selector.
         * @returns The current jBase instance.
         */
        prependTo(target: string | Element): jBase;
        /**
         * * Inserts the selected elements before a target.
         * @example insertBefore('#target') => Inserts all matched elements before the element with id 'target'.
         * @param target Target element or selector.
         * @returns The current jBase instance.
         */
        insertBefore(target: string | Element): jBase;
        /**
         * * Inserts the selected elements after a target.
         * @example insertAfter('#target') => Inserts all matched elements after the element with id 'target'.
         * @param target Target element or selector.
         * @returns The current jBase instance.
         */
        insertAfter(target: string | Element): jBase;
        /**
         * * Wraps each selected element with the specified HTML structure.
         * @example wrap('<div class="wrapper"></div>') => Wraps each matched element with a <div> element having the class 'wrapper'.
         * @param wrapperHtml The HTML string for the wrapper.
         * @returns The current jBase instance.
         */
        wrap(wrapperHtml: string): jBase;
        /**
         * * Removes the direct parent of the selected elements.
         * @example unwrap() => Removes the direct parent of each matched element, effectively unwrapping it from its parent.
         * @returns The current jBase instance.
         */
        unwrap(): jBase;
        /**
         * * Gets the direct parents.
         * @example parent() => Gets the direct parent of each matched element.
         * @returns A new jBase instance with parents.
         */
        parent(): jBase;
        /**
         * * Gets the direct children.
         * @example children() => Gets the direct children of each matched element.
         * @example children('.filter') => Gets the direct children of each matched element filtered by '.filter'.
         * @param selector (Optional) Filter selector.
         * @returns A new jBase instance with children.
         */
        children(selector?: string): jBase;
        /**
         * * Finds descendants matching the selector (deep).
         * @example find('.item') => Finds all descendant elements matching the '.item' selector for each matched element.
         * @param selector CSS selector to find.
         * @returns A new jBase instance.
         */
        findAll(selector: string): jBase;
        /**
         * * Gets all descendants recursively.
         * @example descendants() => Gets all descendant elements of each matched element, regardless of depth.
         * @returns A new jBase instance.
         */
        descendants(): jBase;
        /**
         * * Gets descendants recursively until a selector is met.
         * @example descendantsUntil('.stop') => Gets all descendant elements of each matched element until an element matching the '.stop' selector is encountered in the hierarchy.
         * @example descendantsUntil('.stop', '.filter') => Gets all descendant elements of each matched element until an element matching the '.stop' selector is encountered in the hierarchy, filtered by '.filter'.
         * @param untilSelector Selector to stop at.
         * @param filter (Optional) Filter selector.
         * @returns A new jBase instance.
         */
        descendantsUntil(untilSelector: string, filter?: string): jBase;
        /**
         * * Gets all ancestors up to the root.
         * @example parents() => Gets all ancestor elements of each matched element, up to the document root.
         * @example parents('.filter') => Gets all ancestor elements of each matched element, up to the document root, filtered by '.filter'.
         * @param selector (Optional) Filter selector.
         * @returns A new jBase instance.
         */
        parents(selector?: string): jBase;
        /**
         * * Gets all ancestors until a selector is met.
         * @example parentsUntil('.stop') => Gets all ancestor elements of each matched element until an element matching the '.stop' selector is encountered in the hierarchy.
         * @example parentsUntil('.stop', '.filter') => Gets all ancestor elements of each matched element until an element matching the '.stop' selector is encountered in the hierarchy, filtered by '.filter'.
         * @param selector Selector to stop at.
         * @param filter (Optional) Filter selector.
         * @returns A new jBase instance.
         */
        parentsUntil(selector: string, filter?: string): jBase;
        /**
         * * Gets the immediately following sibling.
         * @example next() => Gets the immediately following sibling of each matched element.
         * @example next('.filter') => Gets the immediately following sibling of each matched element filtered by '.filter'.
         * @param selector (Optional) Filter selector.
         * @returns A new jBase instance.
         */
        next(selector?: string): jBase;
        /**
         * * Gets the immediately preceding sibling.
         * @example prev() => Gets the immediately preceding sibling of each matched element.
         * @example prev('.filter') => Gets the immediately preceding sibling of each matched element filtered by '.filter'.
         * @param selector (Optional) Filter selector.
         * @returns A new jBase instance.
         */
        prev(selector?: string): jBase;
        /**
         * * Alias for `next()`.
         * @example sibling() => Gets the immediately following sibling of each matched element.
         * @example sibling('.filter') => Gets the immediately following sibling of each matched element filtered by '.filter'.
         * @param selector (Optional) Filter selector.
         * @returns A new jBase instance.
         */
        sibling(selector?: string): jBase;
        /**
         * * Alias for `next()`.
         * @example nextSibling() => Gets the immediately following sibling of each matched element.
         * @example nextSibling('.filter') => Gets the immediately following sibling of each matched element filtered by '.filter'.
         * @param selector (Optional) Filter selector.
         * @returns A new jBase instance.
         */
        nextSibling(selector?: string): jBase;
        /**
         * * Alias for `prev()`.
         * @example prevSibling() => Gets the immediately preceding sibling of each matched element.
         * @example prevSibling('.filter') => Gets the immediately preceding sibling of each matched element filtered by '.filter'.
         * @param selector (Optional) Filter selector.
         * @returns A new jBase instance.
         */
        prevSibling(selector?: string): jBase;
        /**
         * * Gets all following siblings.
         * @example nextAll() => Gets all following siblings of each matched element.
         * @example nextAll('.filter') => Gets all following siblings of each matched element filtered by '.filter'.
         * @param selector (Optional) Filter selector.
         * @returns A new jBase instance.
         */
        nextAll(selector?: string): jBase;
        /**
         * * Gets all preceding siblings.
         * @example prevAll() => Gets all preceding siblings of each matched element.
         * @example prevAll('.filter') => Gets all preceding siblings of each matched element filtered by '.filter'.
         * @param selector (Optional) Filter selector.
         * @returns A new jBase instance.
         */
        prevAll(selector?: string): jBase;
        /**
         * * Gets all siblings (prev and next).
         * @example siblings() => Gets all siblings (both previous and next) of each matched element.
         * @example siblings('.filter') => Gets all siblings of each matched element filtered by '.filter'.
         * @param selector (Optional) Filter selector.
         * @returns A new jBase instance.
         */
        siblings(selector?: string): jBase;
        /**
         * * Gets following siblings until a selector is met.
         * @example nextUntil('.stop') => Gets all following siblings of each matched element until an element matching the '.stop' selector is encountered in the hierarchy.
         * @example nextUntil('.stop', '.filter') => Gets all following siblings of each matched element until an element matching the '.stop' selector is encountered in the hierarchy, filtered by '.filter'.
         * @param untilSelector Selector to stop at.
         * @param filter (Optional) Filter selector.
         * @returns A new jBase instance.
         */
        nextUntil(untilSelector: string, filter?: string): jBase;
        /**
         * * Gets preceding siblings until a selector is met.
         * @example prevUntil('.stop') => Gets all preceding siblings of each matched element until an element matching the '.stop' selector is encountered in the hierarchy.
         * @example prevUntil('.stop', '.filter') => Gets all preceding siblings of each matched element until an element matching the '.stop' selector is encountered in the hierarchy, filtered by '.filter'.
         * @param untilSelector Selector to stop at.
         * @param filter (Optional) Filter selector.
         * @returns A new jBase instance.
         */
        prevUntil(untilSelector: string, filter?: string): jBase;
        /**
         * * Reduces the set to the element at the index.
         * @example eq(0) => Reduces the set to the first element.
         * @example eq(-1) => Reduces the set to the last element.
         * @param index Index (negative values count from the end).
         * @returns A new jBase instance.
         */
        eq(index: number): jBase;
        /**
         * * Reduces the set to the first element.
         * @example first() => Reduces the set to the first element.
         * @returns A new jBase instance.
         */
        first(): jBase;
        /**
         * * Reduces the set to the last element.
         * @example last() => Reduces the set to the last element.
         * @returns A new jBase instance.
         */
        last(): jBase;
        /**
         * * Filters elements by selector.
         * @example filterBy('.active') => Reduces the set to elements that match the '.active' selector.
         * @param selector CSS selector to filter by.
         * @returns A new jBase instance.
         */
        filterBy(selector: string): jBase;
        /**
         * * Filters the collection based on a custom callback function.
         * * Elements for which the callback returns `true` are kept in the new collection.
         * @example filterBy((index, element) => element.classList.contains('active')) => Reduces the set to elements for which the callback returns true (e.g., elements with the 'active' class).
         * @param predicate A function executed for each element in the current collection.
         * Receives the current `index` and the DOM `element` as arguments.
         * Return `true` to keep the element, or `false` to exclude it.
         * @returns A new jBase instance containing only the elements that passed the test.
         */
        filterBy(predicate: (index: number, element: Element) => boolean): jBase;
        /**
         * * Removes elements matching the selector.
         * @example not('.active') => Removes elements that match the '.active' selector from the set.
         * @param selector CSS selector to remove.
         * @returns A new jBase instance.
         */
        not(selector: string): jBase;
        /**
         * * Removes elements matching the callback function.
         * @example not((index, element) => element.classList.contains('active')) => Removes elements for which the callback returns true (e.g., elements with the 'active' class) from the set.
         * @param predicate Function that returns true to remove the element.
         * @returns A new jBase instance.
         */
        not(predicate: (index: number, element: Element) => boolean): jBase;
        /**
         * * Slides the element into view (horizontal).
         * @example slideIn() => Slides the element into view from the left with default duration.
         * @example slideIn({ direction: 'right', duration: 500 }) => Slides the element into view from the right over 500 milliseconds.
         * @param options Animation options.
         * @returns The current jBase instance.
         */
        slideIn(options?: {
            direction?: 'left' | 'right';
            duration?: number;
        }): jBase;
        /**
         * * Slides the element out of view (horizontal).
         * @example slideOut() => Slides the element out of view to the left with default duration.
         * @example slideOut({ direction: 'right', duration: 500 }) => Slides the element out of view to the right over 500 milliseconds.
         * @param options Animation options.
         * @returns The current jBase instance.
         */
        slideOut(options?: {
            direction?: 'left' | 'right';
            duration?: number;
        }): jBase;
        /**
         * * Toggles between slideIn and slideOut.
         * @example slideToggle() => Toggles between sliding the element into and out of view from the left with default duration.
         * @example slideToggle({ direction: 'right', duration: 500 }) => Toggles between sliding the element into and out of view from the right over 500 milliseconds.
         * @param options Animation options.
         * @returns The current jBase instance.
         */
        slideToggle(options?: {
            direction?: 'left' | 'right';
            duration?: number;
        }): jBase;
        /**
         * * Slides the element down (Accordion).
         * @example slideDown() => Slides the element down into view with default duration.
         * @example slideDown({ duration: 500, displayType: 'block' }) => Slides the element down into view over 500 milliseconds and sets display to 'block' when shown.
         * @param options Animation options.
         * @returns The current jBase instance.
         */
        slideDown(options?: {
            duration?: number;
            displayType?: string;
        }): jBase;
        /**
         * * Slides the element up.
         * @example slideUp() => Slides the element up out of view with default duration.
         * @example slideUp({ duration: 500 }) => Slides the element up out of view over 500 milliseconds.
         * @param options Animation options.
         * @returns The current jBase instance.
         */
        slideUp(options?: {
            duration?: number;
        }): jBase;
        /**
         * * Toggles between slideDown and slideUp.
         * @example slideToggleBox() => Toggles between sliding the element down into view and up out of view with default duration.
         * @example slideToggleBox({ duration: 500, displayType: 'block' }) => Toggles between sliding the element down into view and up out of view over 500 milliseconds, and sets display to 'block' when shown.
         * @param options Animation options.
         * @returns The current jBase instance.
         */
        slideToggleBox(options?: {
            duration?: number;
        }): jBase;
        /**
         * * Fades the element in (Opacity).
         * @example fadeIn() => Fades the element in with default duration.
         * @example fadeIn({ duration: 500, displayType: 'block' }) => Fades the element in over 500 milliseconds and sets display to 'block' when shown.
         * @param options Animation options.
         * @returns The current jBase instance.
         */
        fadeIn(options?: {
            duration?: number;
            displayType?: string;
        }): jBase;
        /**
         * * Fades the element out (Opacity).
         * @example fadeOut() => Fades the element out with default duration.
         * @example fadeOut({ duration: 500 }) => Fades the element out over 500 milliseconds.
         * @param options Animation options.
         * @returns The current jBase instance.
         */
        fadeOut(options?: {
            duration?: number;
        }): jBase;
        /**
         * * Toggles between fadeIn and fadeOut.
         * @example fadeToggle() => Toggles between fading the element in and out with default duration.
         * @example fadeToggle({ duration: 500 }) => Toggles between fading the element in and out over 500 milliseconds.
         * @param options Animation options.
         * @returns The current jBase instance.
         */
        fadeToggle(options?: {
            duration?: number;
        }): jBase;
        /**
         * * Checks the 'checked' state (Getter).
         * @example checked() => Returns true if the first matched element is checked (for checkboxes/radio buttons).
         * @returns True if checked.
         */
        checked(): boolean;
        /**
         * * Sets the 'checked' state (Setter).
         * @example checked(true) => Sets the checked state to true for all matched checkboxes/radio buttons.
         * @param state The new state.
         * @returns The current jBase instance.
         */
        checked(state: boolean): jBase;
        /**
         * * ALIAS for .checked(true). Checks the matched elements.
         * @example check() => Checks all matched checkboxes/radio buttons.
         * @returns The current jBase instance.
         */
        check(): jBase;
        /**
         * * ALIAS for .checked(false). Unchecks the matched elements.
         * @example uncheck() => Unchecks all matched checkboxes/radio buttons.
         * @returns The current jBase instance.
         */
        uncheck(): jBase;
        /**
         * * Checks the 'selected' state (Getter).
         * @example selected() => Returns true if the first matched element is selected (for options in a select element).
         * @returns True if selected.
         */
        selected(): boolean;
        /**
         * * Sets the 'selected' state (Setter).
         * @example selected(true) => Sets the selected state to true for all matched options in a select element.
         * @param state The new state.
         * @returns The current jBase instance.
         */
        selected(state: boolean): jBase;
        /**
         * * ALIAS for .selected(true). Selects the matched <option> elements.
         * @example select() => Selects all matched option elements.
         * @returns The current jBase instance.
         */
        select(): jBase;
        /**
         * * Checks the 'disabled' state (Getter).
         * @example disabled() => Returns true if the first matched element is disabled (for form elements).
         * @returns True if disabled.
         */
        disabled(): boolean;
        /**
         * * Sets the 'disabled' state and toggles CSS class (Setter).
         * @example disabled(true) => Sets the disabled state to true for all matched form elements and adds a 'disabled' CSS class.
         * @example disabled(false) => Sets the disabled state to false for all matched form elements and removes the 'disabled' CSS class.
         * @param state The new state.
         * @returns The current jBase instance.
         */
        disabled(state: boolean): jBase;
        /**
         * * ALIAS for .disabled(true). Disables the matched elements and adds the 'disabled' class.
         * @example disable() => Disables all matched elements.
         * @returns The current jBase instance.
         */
        disable(): jBase;
        /**
         * * ALIAS for .disabled(false). Enables the matched elements and removes the 'disabled' class.
         * @example enable() => Enables all matched elements.
         * @returns The current jBase instance.
         */
        enable(): jBase;
    }
}
/**
 * * Binds the factory function to a specific window/document context.
 * Useful for iframes or multiple document contexts.
 * @example const iframeFactory = bind(iframe.contentWindow); => Creates a new factory function bound to the iframe's window context.
 * @param window The window context to bind to.
 * @returns A factory function bound to the specified context.
 */
export declare const bind: (window: Window) => (selector: JBaseInput) => JBaseClass;
/**
 * * Export the factory under different aliases for maximum compatibility and convenience.
 */
export declare const $: ((selector: JBaseInput) => JBaseClass) & {
    http: {
        upload<T>(url: string, data: FormData | File, onProgress?: (percentage: number, loaded: number, total: number) => void): Promise<T>;
        post<T>(url: string, body?: any, option?: RequestInit): Promise<T>;
        get<T>(url: string, option?: RequestInit): Promise<T>;
        getText<T = string>(url: string, option?: RequestInit): Promise<T>;
    };
    data: {
        arr: typeof import("./modules/data/arrays");
        obj: typeof import("./modules/data/objects");
        chunk: {
            <T>(array: T[], size: number): T[][];
            <T extends Record<string, any>>(object: T, size: number): Partial<T>[];
        };
        merge: {
            (...arrays: any[][]): any[];
            (target: any, ...sources: any[]): any;
        };
        add: {
            <T>(array: T[], item: T, index?: number): T[];
            <T extends Record<string, any>>(object: T, key: string, value: any, index?: number): T & Record<string, any>;
        };
        clear: {
            <T>(array: T[]): T[];
            <T extends Record<string, any>>(object: T): Partial<T>;
        };
        empty: {
            <T>(array: T[]): T[];
            <T extends Record<string, any>>(object: T): Partial<T>;
        };
        pick: {
            <T>(array: T[], indices: number[]): T[];
            <T extends object, K extends keyof T>(object: T, keys: K[]): Pick<T, K>;
        };
        omit: {
            <T>(array: T[], indices: number[]): T[];
            <T extends object, K extends keyof T>(object: T, keys: K[]): Omit<T, K>;
        };
        get: {
            (array: any[], path: string): any;
            (object: any, path: string): any;
        };
        set: {
            (array: any[], path: string, value: any): void;
            (object: any, path: string, value: any): void;
        };
        remove: {
            at: {
                <T>(array: T[], index: number): T[];
                <T extends Record<string, any>>(object: T, index: number): Partial<T>;
            };
            first: {
                <T>(array: T[]): T[];
                <T extends Record<string, any>>(object: T): Partial<T>;
            };
            last: {
                <T>(array: T[]): T[];
                <T extends Record<string, any>>(object: T): Partial<T>;
            };
            byKey: {
                <T>(array: T[], index: number): T[];
                <T extends Record<string, any>>(object: T, key: string): Partial<T>;
            };
            byValue: {
                <T>(array: T[], value: T): T[];
                <T extends Record<string, any>>(object: T, value: any): Partial<T>;
            };
            byMatch: {
                <T>(array: T[], query: string | number, mode?: import("./modules/data/types").MatchMode, key?: keyof T): T[];
                <T extends Record<string, any>>(object: T, query: string | number, mode?: import("./modules/data/types").MatchMode, searchBy?: "key" | "value"): Partial<T>;
            };
            all: {
                <T>(array: T[]): T[];
                <T extends Record<string, any>>(object: T): Partial<T>;
            };
        };
        find: {
            at: {
                <T>(array: T[], query: string | number, mode?: import("./modules/data/types").MatchMode, key?: keyof T): number;
                (object: any, index: number): [string, any] | undefined;
            };
            all: {
                <T>(array: T[], query: string | number, mode?: import("./modules/data/types").MatchMode, key?: keyof T): T[];
                <T extends Record<string, any>>(object: T, query: string | number, mode?: import("./modules/data/types").MatchMode, searchBy?: "key" | "value"): Partial<T>;
            };
            first: {
                <T>(array: T[], query: string | number, mode?: import("./modules/data/types").MatchMode, key?: keyof T): T | undefined;
                (object: any, query: string | number, mode?: import("./modules/data/types").MatchMode, searchBy?: "key" | "value"): [string, any] | undefined;
            };
            last: {
                <T>(array: T[], query: string | number, mode?: import("./modules/data/types").MatchMode, key?: keyof T): T | undefined;
                (object: any, query: string | number, mode?: import("./modules/data/types").MatchMode, searchBy?: "key" | "value"): [string, any] | undefined;
            };
            key: {
                <T>(array: T[], query: string, mode?: import("./modules/data/types").MatchMode): string[];
                (object: any, query: string, mode?: import("./modules/data/types").MatchMode): string[];
            };
            value: {
                <T>(array: T[], query: string, mode?: import("./modules/data/types").MatchMode): T[];
                (object: any, query: string, mode?: import("./modules/data/types").MatchMode): any[];
            };
            byMatch: {
                <T>(array: T[], query: string | number, mode?: import("./modules/data/types").MatchMode, key?: keyof T): number | undefined;
                (object: any, query: string | number, mode?: import("./modules/data/types").MatchMode, searchBy?: "key" | "value"): string | undefined;
            };
        };
    };
    each: typeof each;
    throttle: typeof throttle;
    debounce: typeof debounce;
    fn: JBaseClass;
};
export declare const jB: ((selector: JBaseInput) => JBaseClass) & {
    http: {
        upload<T>(url: string, data: FormData | File, onProgress?: (percentage: number, loaded: number, total: number) => void): Promise<T>;
        post<T>(url: string, body?: any, option?: RequestInit): Promise<T>;
        get<T>(url: string, option?: RequestInit): Promise<T>;
        getText<T = string>(url: string, option?: RequestInit): Promise<T>;
    };
    data: {
        arr: typeof import("./modules/data/arrays");
        obj: typeof import("./modules/data/objects");
        chunk: {
            <T>(array: T[], size: number): T[][];
            <T extends Record<string, any>>(object: T, size: number): Partial<T>[];
        };
        merge: {
            (...arrays: any[][]): any[];
            (target: any, ...sources: any[]): any;
        };
        add: {
            <T>(array: T[], item: T, index?: number): T[];
            <T extends Record<string, any>>(object: T, key: string, value: any, index?: number): T & Record<string, any>;
        };
        clear: {
            <T>(array: T[]): T[];
            <T extends Record<string, any>>(object: T): Partial<T>;
        };
        empty: {
            <T>(array: T[]): T[];
            <T extends Record<string, any>>(object: T): Partial<T>;
        };
        pick: {
            <T>(array: T[], indices: number[]): T[];
            <T extends object, K extends keyof T>(object: T, keys: K[]): Pick<T, K>;
        };
        omit: {
            <T>(array: T[], indices: number[]): T[];
            <T extends object, K extends keyof T>(object: T, keys: K[]): Omit<T, K>;
        };
        get: {
            (array: any[], path: string): any;
            (object: any, path: string): any;
        };
        set: {
            (array: any[], path: string, value: any): void;
            (object: any, path: string, value: any): void;
        };
        remove: {
            at: {
                <T>(array: T[], index: number): T[];
                <T extends Record<string, any>>(object: T, index: number): Partial<T>;
            };
            first: {
                <T>(array: T[]): T[];
                <T extends Record<string, any>>(object: T): Partial<T>;
            };
            last: {
                <T>(array: T[]): T[];
                <T extends Record<string, any>>(object: T): Partial<T>;
            };
            byKey: {
                <T>(array: T[], index: number): T[];
                <T extends Record<string, any>>(object: T, key: string): Partial<T>;
            };
            byValue: {
                <T>(array: T[], value: T): T[];
                <T extends Record<string, any>>(object: T, value: any): Partial<T>;
            };
            byMatch: {
                <T>(array: T[], query: string | number, mode?: import("./modules/data/types").MatchMode, key?: keyof T): T[];
                <T extends Record<string, any>>(object: T, query: string | number, mode?: import("./modules/data/types").MatchMode, searchBy?: "key" | "value"): Partial<T>;
            };
            all: {
                <T>(array: T[]): T[];
                <T extends Record<string, any>>(object: T): Partial<T>;
            };
        };
        find: {
            at: {
                <T>(array: T[], query: string | number, mode?: import("./modules/data/types").MatchMode, key?: keyof T): number;
                (object: any, index: number): [string, any] | undefined;
            };
            all: {
                <T>(array: T[], query: string | number, mode?: import("./modules/data/types").MatchMode, key?: keyof T): T[];
                <T extends Record<string, any>>(object: T, query: string | number, mode?: import("./modules/data/types").MatchMode, searchBy?: "key" | "value"): Partial<T>;
            };
            first: {
                <T>(array: T[], query: string | number, mode?: import("./modules/data/types").MatchMode, key?: keyof T): T | undefined;
                (object: any, query: string | number, mode?: import("./modules/data/types").MatchMode, searchBy?: "key" | "value"): [string, any] | undefined;
            };
            last: {
                <T>(array: T[], query: string | number, mode?: import("./modules/data/types").MatchMode, key?: keyof T): T | undefined;
                (object: any, query: string | number, mode?: import("./modules/data/types").MatchMode, searchBy?: "key" | "value"): [string, any] | undefined;
            };
            key: {
                <T>(array: T[], query: string, mode?: import("./modules/data/types").MatchMode): string[];
                (object: any, query: string, mode?: import("./modules/data/types").MatchMode): string[];
            };
            value: {
                <T>(array: T[], query: string, mode?: import("./modules/data/types").MatchMode): T[];
                (object: any, query: string, mode?: import("./modules/data/types").MatchMode): any[];
            };
            byMatch: {
                <T>(array: T[], query: string | number, mode?: import("./modules/data/types").MatchMode, key?: keyof T): number | undefined;
                (object: any, query: string | number, mode?: import("./modules/data/types").MatchMode, searchBy?: "key" | "value"): string | undefined;
            };
        };
    };
    each: typeof each;
    throttle: typeof throttle;
    debounce: typeof debounce;
    fn: JBaseClass;
};
export declare const _jB: ((selector: JBaseInput) => JBaseClass) & {
    http: {
        upload<T>(url: string, data: FormData | File, onProgress?: (percentage: number, loaded: number, total: number) => void): Promise<T>;
        post<T>(url: string, body?: any, option?: RequestInit): Promise<T>;
        get<T>(url: string, option?: RequestInit): Promise<T>;
        getText<T = string>(url: string, option?: RequestInit): Promise<T>;
    };
    data: {
        arr: typeof import("./modules/data/arrays");
        obj: typeof import("./modules/data/objects");
        chunk: {
            <T>(array: T[], size: number): T[][];
            <T extends Record<string, any>>(object: T, size: number): Partial<T>[];
        };
        merge: {
            (...arrays: any[][]): any[];
            (target: any, ...sources: any[]): any;
        };
        add: {
            <T>(array: T[], item: T, index?: number): T[];
            <T extends Record<string, any>>(object: T, key: string, value: any, index?: number): T & Record<string, any>;
        };
        clear: {
            <T>(array: T[]): T[];
            <T extends Record<string, any>>(object: T): Partial<T>;
        };
        empty: {
            <T>(array: T[]): T[];
            <T extends Record<string, any>>(object: T): Partial<T>;
        };
        pick: {
            <T>(array: T[], indices: number[]): T[];
            <T extends object, K extends keyof T>(object: T, keys: K[]): Pick<T, K>;
        };
        omit: {
            <T>(array: T[], indices: number[]): T[];
            <T extends object, K extends keyof T>(object: T, keys: K[]): Omit<T, K>;
        };
        get: {
            (array: any[], path: string): any;
            (object: any, path: string): any;
        };
        set: {
            (array: any[], path: string, value: any): void;
            (object: any, path: string, value: any): void;
        };
        remove: {
            at: {
                <T>(array: T[], index: number): T[];
                <T extends Record<string, any>>(object: T, index: number): Partial<T>;
            };
            first: {
                <T>(array: T[]): T[];
                <T extends Record<string, any>>(object: T): Partial<T>;
            };
            last: {
                <T>(array: T[]): T[];
                <T extends Record<string, any>>(object: T): Partial<T>;
            };
            byKey: {
                <T>(array: T[], index: number): T[];
                <T extends Record<string, any>>(object: T, key: string): Partial<T>;
            };
            byValue: {
                <T>(array: T[], value: T): T[];
                <T extends Record<string, any>>(object: T, value: any): Partial<T>;
            };
            byMatch: {
                <T>(array: T[], query: string | number, mode?: import("./modules/data/types").MatchMode, key?: keyof T): T[];
                <T extends Record<string, any>>(object: T, query: string | number, mode?: import("./modules/data/types").MatchMode, searchBy?: "key" | "value"): Partial<T>;
            };
            all: {
                <T>(array: T[]): T[];
                <T extends Record<string, any>>(object: T): Partial<T>;
            };
        };
        find: {
            at: {
                <T>(array: T[], query: string | number, mode?: import("./modules/data/types").MatchMode, key?: keyof T): number;
                (object: any, index: number): [string, any] | undefined;
            };
            all: {
                <T>(array: T[], query: string | number, mode?: import("./modules/data/types").MatchMode, key?: keyof T): T[];
                <T extends Record<string, any>>(object: T, query: string | number, mode?: import("./modules/data/types").MatchMode, searchBy?: "key" | "value"): Partial<T>;
            };
            first: {
                <T>(array: T[], query: string | number, mode?: import("./modules/data/types").MatchMode, key?: keyof T): T | undefined;
                (object: any, query: string | number, mode?: import("./modules/data/types").MatchMode, searchBy?: "key" | "value"): [string, any] | undefined;
            };
            last: {
                <T>(array: T[], query: string | number, mode?: import("./modules/data/types").MatchMode, key?: keyof T): T | undefined;
                (object: any, query: string | number, mode?: import("./modules/data/types").MatchMode, searchBy?: "key" | "value"): [string, any] | undefined;
            };
            key: {
                <T>(array: T[], query: string, mode?: import("./modules/data/types").MatchMode): string[];
                (object: any, query: string, mode?: import("./modules/data/types").MatchMode): string[];
            };
            value: {
                <T>(array: T[], query: string, mode?: import("./modules/data/types").MatchMode): T[];
                (object: any, query: string, mode?: import("./modules/data/types").MatchMode): any[];
            };
            byMatch: {
                <T>(array: T[], query: string | number, mode?: import("./modules/data/types").MatchMode, key?: keyof T): number | undefined;
                (object: any, query: string | number, mode?: import("./modules/data/types").MatchMode, searchBy?: "key" | "value"): string | undefined;
            };
        };
    };
    each: typeof each;
    throttle: typeof throttle;
    debounce: typeof debounce;
    fn: JBaseClass;
};
export declare const __jB: ((selector: JBaseInput) => JBaseClass) & {
    http: {
        upload<T>(url: string, data: FormData | File, onProgress?: (percentage: number, loaded: number, total: number) => void): Promise<T>;
        post<T>(url: string, body?: any, option?: RequestInit): Promise<T>;
        get<T>(url: string, option?: RequestInit): Promise<T>;
        getText<T = string>(url: string, option?: RequestInit): Promise<T>;
    };
    data: {
        arr: typeof import("./modules/data/arrays");
        obj: typeof import("./modules/data/objects");
        chunk: {
            <T>(array: T[], size: number): T[][];
            <T extends Record<string, any>>(object: T, size: number): Partial<T>[];
        };
        merge: {
            (...arrays: any[][]): any[];
            (target: any, ...sources: any[]): any;
        };
        add: {
            <T>(array: T[], item: T, index?: number): T[];
            <T extends Record<string, any>>(object: T, key: string, value: any, index?: number): T & Record<string, any>;
        };
        clear: {
            <T>(array: T[]): T[];
            <T extends Record<string, any>>(object: T): Partial<T>;
        };
        empty: {
            <T>(array: T[]): T[];
            <T extends Record<string, any>>(object: T): Partial<T>;
        };
        pick: {
            <T>(array: T[], indices: number[]): T[];
            <T extends object, K extends keyof T>(object: T, keys: K[]): Pick<T, K>;
        };
        omit: {
            <T>(array: T[], indices: number[]): T[];
            <T extends object, K extends keyof T>(object: T, keys: K[]): Omit<T, K>;
        };
        get: {
            (array: any[], path: string): any;
            (object: any, path: string): any;
        };
        set: {
            (array: any[], path: string, value: any): void;
            (object: any, path: string, value: any): void;
        };
        remove: {
            at: {
                <T>(array: T[], index: number): T[];
                <T extends Record<string, any>>(object: T, index: number): Partial<T>;
            };
            first: {
                <T>(array: T[]): T[];
                <T extends Record<string, any>>(object: T): Partial<T>;
            };
            last: {
                <T>(array: T[]): T[];
                <T extends Record<string, any>>(object: T): Partial<T>;
            };
            byKey: {
                <T>(array: T[], index: number): T[];
                <T extends Record<string, any>>(object: T, key: string): Partial<T>;
            };
            byValue: {
                <T>(array: T[], value: T): T[];
                <T extends Record<string, any>>(object: T, value: any): Partial<T>;
            };
            byMatch: {
                <T>(array: T[], query: string | number, mode?: import("./modules/data/types").MatchMode, key?: keyof T): T[];
                <T extends Record<string, any>>(object: T, query: string | number, mode?: import("./modules/data/types").MatchMode, searchBy?: "key" | "value"): Partial<T>;
            };
            all: {
                <T>(array: T[]): T[];
                <T extends Record<string, any>>(object: T): Partial<T>;
            };
        };
        find: {
            at: {
                <T>(array: T[], query: string | number, mode?: import("./modules/data/types").MatchMode, key?: keyof T): number;
                (object: any, index: number): [string, any] | undefined;
            };
            all: {
                <T>(array: T[], query: string | number, mode?: import("./modules/data/types").MatchMode, key?: keyof T): T[];
                <T extends Record<string, any>>(object: T, query: string | number, mode?: import("./modules/data/types").MatchMode, searchBy?: "key" | "value"): Partial<T>;
            };
            first: {
                <T>(array: T[], query: string | number, mode?: import("./modules/data/types").MatchMode, key?: keyof T): T | undefined;
                (object: any, query: string | number, mode?: import("./modules/data/types").MatchMode, searchBy?: "key" | "value"): [string, any] | undefined;
            };
            last: {
                <T>(array: T[], query: string | number, mode?: import("./modules/data/types").MatchMode, key?: keyof T): T | undefined;
                (object: any, query: string | number, mode?: import("./modules/data/types").MatchMode, searchBy?: "key" | "value"): [string, any] | undefined;
            };
            key: {
                <T>(array: T[], query: string, mode?: import("./modules/data/types").MatchMode): string[];
                (object: any, query: string, mode?: import("./modules/data/types").MatchMode): string[];
            };
            value: {
                <T>(array: T[], query: string, mode?: import("./modules/data/types").MatchMode): T[];
                (object: any, query: string, mode?: import("./modules/data/types").MatchMode): any[];
            };
            byMatch: {
                <T>(array: T[], query: string | number, mode?: import("./modules/data/types").MatchMode, key?: keyof T): number | undefined;
                (object: any, query: string | number, mode?: import("./modules/data/types").MatchMode, searchBy?: "key" | "value"): string | undefined;
            };
        };
    };
    each: typeof each;
    throttle: typeof throttle;
    debounce: typeof debounce;
    fn: JBaseClass;
};
export declare const _jBase: ((selector: JBaseInput) => JBaseClass) & {
    http: {
        upload<T>(url: string, data: FormData | File, onProgress?: (percentage: number, loaded: number, total: number) => void): Promise<T>;
        post<T>(url: string, body?: any, option?: RequestInit): Promise<T>;
        get<T>(url: string, option?: RequestInit): Promise<T>;
        getText<T = string>(url: string, option?: RequestInit): Promise<T>;
    };
    data: {
        arr: typeof import("./modules/data/arrays");
        obj: typeof import("./modules/data/objects");
        chunk: {
            <T>(array: T[], size: number): T[][];
            <T extends Record<string, any>>(object: T, size: number): Partial<T>[];
        };
        merge: {
            (...arrays: any[][]): any[];
            (target: any, ...sources: any[]): any;
        };
        add: {
            <T>(array: T[], item: T, index?: number): T[];
            <T extends Record<string, any>>(object: T, key: string, value: any, index?: number): T & Record<string, any>;
        };
        clear: {
            <T>(array: T[]): T[];
            <T extends Record<string, any>>(object: T): Partial<T>;
        };
        empty: {
            <T>(array: T[]): T[];
            <T extends Record<string, any>>(object: T): Partial<T>;
        };
        pick: {
            <T>(array: T[], indices: number[]): T[];
            <T extends object, K extends keyof T>(object: T, keys: K[]): Pick<T, K>;
        };
        omit: {
            <T>(array: T[], indices: number[]): T[];
            <T extends object, K extends keyof T>(object: T, keys: K[]): Omit<T, K>;
        };
        get: {
            (array: any[], path: string): any;
            (object: any, path: string): any;
        };
        set: {
            (array: any[], path: string, value: any): void;
            (object: any, path: string, value: any): void;
        };
        remove: {
            at: {
                <T>(array: T[], index: number): T[];
                <T extends Record<string, any>>(object: T, index: number): Partial<T>;
            };
            first: {
                <T>(array: T[]): T[];
                <T extends Record<string, any>>(object: T): Partial<T>;
            };
            last: {
                <T>(array: T[]): T[];
                <T extends Record<string, any>>(object: T): Partial<T>;
            };
            byKey: {
                <T>(array: T[], index: number): T[];
                <T extends Record<string, any>>(object: T, key: string): Partial<T>;
            };
            byValue: {
                <T>(array: T[], value: T): T[];
                <T extends Record<string, any>>(object: T, value: any): Partial<T>;
            };
            byMatch: {
                <T>(array: T[], query: string | number, mode?: import("./modules/data/types").MatchMode, key?: keyof T): T[];
                <T extends Record<string, any>>(object: T, query: string | number, mode?: import("./modules/data/types").MatchMode, searchBy?: "key" | "value"): Partial<T>;
            };
            all: {
                <T>(array: T[]): T[];
                <T extends Record<string, any>>(object: T): Partial<T>;
            };
        };
        find: {
            at: {
                <T>(array: T[], query: string | number, mode?: import("./modules/data/types").MatchMode, key?: keyof T): number;
                (object: any, index: number): [string, any] | undefined;
            };
            all: {
                <T>(array: T[], query: string | number, mode?: import("./modules/data/types").MatchMode, key?: keyof T): T[];
                <T extends Record<string, any>>(object: T, query: string | number, mode?: import("./modules/data/types").MatchMode, searchBy?: "key" | "value"): Partial<T>;
            };
            first: {
                <T>(array: T[], query: string | number, mode?: import("./modules/data/types").MatchMode, key?: keyof T): T | undefined;
                (object: any, query: string | number, mode?: import("./modules/data/types").MatchMode, searchBy?: "key" | "value"): [string, any] | undefined;
            };
            last: {
                <T>(array: T[], query: string | number, mode?: import("./modules/data/types").MatchMode, key?: keyof T): T | undefined;
                (object: any, query: string | number, mode?: import("./modules/data/types").MatchMode, searchBy?: "key" | "value"): [string, any] | undefined;
            };
            key: {
                <T>(array: T[], query: string, mode?: import("./modules/data/types").MatchMode): string[];
                (object: any, query: string, mode?: import("./modules/data/types").MatchMode): string[];
            };
            value: {
                <T>(array: T[], query: string, mode?: import("./modules/data/types").MatchMode): T[];
                (object: any, query: string, mode?: import("./modules/data/types").MatchMode): any[];
            };
            byMatch: {
                <T>(array: T[], query: string | number, mode?: import("./modules/data/types").MatchMode, key?: keyof T): number | undefined;
                (object: any, query: string | number, mode?: import("./modules/data/types").MatchMode, searchBy?: "key" | "value"): string | undefined;
            };
        };
    };
    each: typeof each;
    throttle: typeof throttle;
    debounce: typeof debounce;
    fn: JBaseClass;
};
export declare const __jBase: ((selector: JBaseInput) => JBaseClass) & {
    http: {
        upload<T>(url: string, data: FormData | File, onProgress?: (percentage: number, loaded: number, total: number) => void): Promise<T>;
        post<T>(url: string, body?: any, option?: RequestInit): Promise<T>;
        get<T>(url: string, option?: RequestInit): Promise<T>;
        getText<T = string>(url: string, option?: RequestInit): Promise<T>;
    };
    data: {
        arr: typeof import("./modules/data/arrays");
        obj: typeof import("./modules/data/objects");
        chunk: {
            <T>(array: T[], size: number): T[][];
            <T extends Record<string, any>>(object: T, size: number): Partial<T>[];
        };
        merge: {
            (...arrays: any[][]): any[];
            (target: any, ...sources: any[]): any;
        };
        add: {
            <T>(array: T[], item: T, index?: number): T[];
            <T extends Record<string, any>>(object: T, key: string, value: any, index?: number): T & Record<string, any>;
        };
        clear: {
            <T>(array: T[]): T[];
            <T extends Record<string, any>>(object: T): Partial<T>;
        };
        empty: {
            <T>(array: T[]): T[];
            <T extends Record<string, any>>(object: T): Partial<T>;
        };
        pick: {
            <T>(array: T[], indices: number[]): T[];
            <T extends object, K extends keyof T>(object: T, keys: K[]): Pick<T, K>;
        };
        omit: {
            <T>(array: T[], indices: number[]): T[];
            <T extends object, K extends keyof T>(object: T, keys: K[]): Omit<T, K>;
        };
        get: {
            (array: any[], path: string): any;
            (object: any, path: string): any;
        };
        set: {
            (array: any[], path: string, value: any): void;
            (object: any, path: string, value: any): void;
        };
        remove: {
            at: {
                <T>(array: T[], index: number): T[];
                <T extends Record<string, any>>(object: T, index: number): Partial<T>;
            };
            first: {
                <T>(array: T[]): T[];
                <T extends Record<string, any>>(object: T): Partial<T>;
            };
            last: {
                <T>(array: T[]): T[];
                <T extends Record<string, any>>(object: T): Partial<T>;
            };
            byKey: {
                <T>(array: T[], index: number): T[];
                <T extends Record<string, any>>(object: T, key: string): Partial<T>;
            };
            byValue: {
                <T>(array: T[], value: T): T[];
                <T extends Record<string, any>>(object: T, value: any): Partial<T>;
            };
            byMatch: {
                <T>(array: T[], query: string | number, mode?: import("./modules/data/types").MatchMode, key?: keyof T): T[];
                <T extends Record<string, any>>(object: T, query: string | number, mode?: import("./modules/data/types").MatchMode, searchBy?: "key" | "value"): Partial<T>;
            };
            all: {
                <T>(array: T[]): T[];
                <T extends Record<string, any>>(object: T): Partial<T>;
            };
        };
        find: {
            at: {
                <T>(array: T[], query: string | number, mode?: import("./modules/data/types").MatchMode, key?: keyof T): number;
                (object: any, index: number): [string, any] | undefined;
            };
            all: {
                <T>(array: T[], query: string | number, mode?: import("./modules/data/types").MatchMode, key?: keyof T): T[];
                <T extends Record<string, any>>(object: T, query: string | number, mode?: import("./modules/data/types").MatchMode, searchBy?: "key" | "value"): Partial<T>;
            };
            first: {
                <T>(array: T[], query: string | number, mode?: import("./modules/data/types").MatchMode, key?: keyof T): T | undefined;
                (object: any, query: string | number, mode?: import("./modules/data/types").MatchMode, searchBy?: "key" | "value"): [string, any] | undefined;
            };
            last: {
                <T>(array: T[], query: string | number, mode?: import("./modules/data/types").MatchMode, key?: keyof T): T | undefined;
                (object: any, query: string | number, mode?: import("./modules/data/types").MatchMode, searchBy?: "key" | "value"): [string, any] | undefined;
            };
            key: {
                <T>(array: T[], query: string, mode?: import("./modules/data/types").MatchMode): string[];
                (object: any, query: string, mode?: import("./modules/data/types").MatchMode): string[];
            };
            value: {
                <T>(array: T[], query: string, mode?: import("./modules/data/types").MatchMode): T[];
                (object: any, query: string, mode?: import("./modules/data/types").MatchMode): any[];
            };
            byMatch: {
                <T>(array: T[], query: string | number, mode?: import("./modules/data/types").MatchMode, key?: keyof T): number | undefined;
                (object: any, query: string | number, mode?: import("./modules/data/types").MatchMode, searchBy?: "key" | "value"): string | undefined;
            };
        };
    };
    each: typeof each;
    throttle: typeof throttle;
    debounce: typeof debounce;
    fn: JBaseClass;
};
export declare const jBase: ((selector: JBaseInput) => JBaseClass) & {
    http: {
        upload<T>(url: string, data: FormData | File, onProgress?: (percentage: number, loaded: number, total: number) => void): Promise<T>;
        post<T>(url: string, body?: any, option?: RequestInit): Promise<T>;
        get<T>(url: string, option?: RequestInit): Promise<T>;
        getText<T = string>(url: string, option?: RequestInit): Promise<T>;
    };
    data: {
        arr: typeof import("./modules/data/arrays");
        obj: typeof import("./modules/data/objects");
        chunk: {
            <T>(array: T[], size: number): T[][];
            <T extends Record<string, any>>(object: T, size: number): Partial<T>[];
        };
        merge: {
            (...arrays: any[][]): any[];
            (target: any, ...sources: any[]): any;
        };
        add: {
            <T>(array: T[], item: T, index?: number): T[];
            <T extends Record<string, any>>(object: T, key: string, value: any, index?: number): T & Record<string, any>;
        };
        clear: {
            <T>(array: T[]): T[];
            <T extends Record<string, any>>(object: T): Partial<T>;
        };
        empty: {
            <T>(array: T[]): T[];
            <T extends Record<string, any>>(object: T): Partial<T>;
        };
        pick: {
            <T>(array: T[], indices: number[]): T[];
            <T extends object, K extends keyof T>(object: T, keys: K[]): Pick<T, K>;
        };
        omit: {
            <T>(array: T[], indices: number[]): T[];
            <T extends object, K extends keyof T>(object: T, keys: K[]): Omit<T, K>;
        };
        get: {
            (array: any[], path: string): any;
            (object: any, path: string): any;
        };
        set: {
            (array: any[], path: string, value: any): void;
            (object: any, path: string, value: any): void;
        };
        remove: {
            at: {
                <T>(array: T[], index: number): T[];
                <T extends Record<string, any>>(object: T, index: number): Partial<T>;
            };
            first: {
                <T>(array: T[]): T[];
                <T extends Record<string, any>>(object: T): Partial<T>;
            };
            last: {
                <T>(array: T[]): T[];
                <T extends Record<string, any>>(object: T): Partial<T>;
            };
            byKey: {
                <T>(array: T[], index: number): T[];
                <T extends Record<string, any>>(object: T, key: string): Partial<T>;
            };
            byValue: {
                <T>(array: T[], value: T): T[];
                <T extends Record<string, any>>(object: T, value: any): Partial<T>;
            };
            byMatch: {
                <T>(array: T[], query: string | number, mode?: import("./modules/data/types").MatchMode, key?: keyof T): T[];
                <T extends Record<string, any>>(object: T, query: string | number, mode?: import("./modules/data/types").MatchMode, searchBy?: "key" | "value"): Partial<T>;
            };
            all: {
                <T>(array: T[]): T[];
                <T extends Record<string, any>>(object: T): Partial<T>;
            };
        };
        find: {
            at: {
                <T>(array: T[], query: string | number, mode?: import("./modules/data/types").MatchMode, key?: keyof T): number;
                (object: any, index: number): [string, any] | undefined;
            };
            all: {
                <T>(array: T[], query: string | number, mode?: import("./modules/data/types").MatchMode, key?: keyof T): T[];
                <T extends Record<string, any>>(object: T, query: string | number, mode?: import("./modules/data/types").MatchMode, searchBy?: "key" | "value"): Partial<T>;
            };
            first: {
                <T>(array: T[], query: string | number, mode?: import("./modules/data/types").MatchMode, key?: keyof T): T | undefined;
                (object: any, query: string | number, mode?: import("./modules/data/types").MatchMode, searchBy?: "key" | "value"): [string, any] | undefined;
            };
            last: {
                <T>(array: T[], query: string | number, mode?: import("./modules/data/types").MatchMode, key?: keyof T): T | undefined;
                (object: any, query: string | number, mode?: import("./modules/data/types").MatchMode, searchBy?: "key" | "value"): [string, any] | undefined;
            };
            key: {
                <T>(array: T[], query: string, mode?: import("./modules/data/types").MatchMode): string[];
                (object: any, query: string, mode?: import("./modules/data/types").MatchMode): string[];
            };
            value: {
                <T>(array: T[], query: string, mode?: import("./modules/data/types").MatchMode): T[];
                (object: any, query: string, mode?: import("./modules/data/types").MatchMode): any[];
            };
            byMatch: {
                <T>(array: T[], query: string | number, mode?: import("./modules/data/types").MatchMode, key?: keyof T): number | undefined;
                (object: any, query: string | number, mode?: import("./modules/data/types").MatchMode, searchBy?: "key" | "value"): string | undefined;
            };
        };
    };
    each: typeof each;
    throttle: typeof throttle;
    debounce: typeof debounce;
    fn: JBaseClass;
};
export declare const __: ((selector: JBaseInput) => JBaseClass) & {
    http: {
        upload<T>(url: string, data: FormData | File, onProgress?: (percentage: number, loaded: number, total: number) => void): Promise<T>;
        post<T>(url: string, body?: any, option?: RequestInit): Promise<T>;
        get<T>(url: string, option?: RequestInit): Promise<T>;
        getText<T = string>(url: string, option?: RequestInit): Promise<T>;
    };
    data: {
        arr: typeof import("./modules/data/arrays");
        obj: typeof import("./modules/data/objects");
        chunk: {
            <T>(array: T[], size: number): T[][];
            <T extends Record<string, any>>(object: T, size: number): Partial<T>[];
        };
        merge: {
            (...arrays: any[][]): any[];
            (target: any, ...sources: any[]): any;
        };
        add: {
            <T>(array: T[], item: T, index?: number): T[];
            <T extends Record<string, any>>(object: T, key: string, value: any, index?: number): T & Record<string, any>;
        };
        clear: {
            <T>(array: T[]): T[];
            <T extends Record<string, any>>(object: T): Partial<T>;
        };
        empty: {
            <T>(array: T[]): T[];
            <T extends Record<string, any>>(object: T): Partial<T>;
        };
        pick: {
            <T>(array: T[], indices: number[]): T[];
            <T extends object, K extends keyof T>(object: T, keys: K[]): Pick<T, K>;
        };
        omit: {
            <T>(array: T[], indices: number[]): T[];
            <T extends object, K extends keyof T>(object: T, keys: K[]): Omit<T, K>;
        };
        get: {
            (array: any[], path: string): any;
            (object: any, path: string): any;
        };
        set: {
            (array: any[], path: string, value: any): void;
            (object: any, path: string, value: any): void;
        };
        remove: {
            at: {
                <T>(array: T[], index: number): T[];
                <T extends Record<string, any>>(object: T, index: number): Partial<T>;
            };
            first: {
                <T>(array: T[]): T[];
                <T extends Record<string, any>>(object: T): Partial<T>;
            };
            last: {
                <T>(array: T[]): T[];
                <T extends Record<string, any>>(object: T): Partial<T>;
            };
            byKey: {
                <T>(array: T[], index: number): T[];
                <T extends Record<string, any>>(object: T, key: string): Partial<T>;
            };
            byValue: {
                <T>(array: T[], value: T): T[];
                <T extends Record<string, any>>(object: T, value: any): Partial<T>;
            };
            byMatch: {
                <T>(array: T[], query: string | number, mode?: import("./modules/data/types").MatchMode, key?: keyof T): T[];
                <T extends Record<string, any>>(object: T, query: string | number, mode?: import("./modules/data/types").MatchMode, searchBy?: "key" | "value"): Partial<T>;
            };
            all: {
                <T>(array: T[]): T[];
                <T extends Record<string, any>>(object: T): Partial<T>;
            };
        };
        find: {
            at: {
                <T>(array: T[], query: string | number, mode?: import("./modules/data/types").MatchMode, key?: keyof T): number;
                (object: any, index: number): [string, any] | undefined;
            };
            all: {
                <T>(array: T[], query: string | number, mode?: import("./modules/data/types").MatchMode, key?: keyof T): T[];
                <T extends Record<string, any>>(object: T, query: string | number, mode?: import("./modules/data/types").MatchMode, searchBy?: "key" | "value"): Partial<T>;
            };
            first: {
                <T>(array: T[], query: string | number, mode?: import("./modules/data/types").MatchMode, key?: keyof T): T | undefined;
                (object: any, query: string | number, mode?: import("./modules/data/types").MatchMode, searchBy?: "key" | "value"): [string, any] | undefined;
            };
            last: {
                <T>(array: T[], query: string | number, mode?: import("./modules/data/types").MatchMode, key?: keyof T): T | undefined;
                (object: any, query: string | number, mode?: import("./modules/data/types").MatchMode, searchBy?: "key" | "value"): [string, any] | undefined;
            };
            key: {
                <T>(array: T[], query: string, mode?: import("./modules/data/types").MatchMode): string[];
                (object: any, query: string, mode?: import("./modules/data/types").MatchMode): string[];
            };
            value: {
                <T>(array: T[], query: string, mode?: import("./modules/data/types").MatchMode): T[];
                (object: any, query: string, mode?: import("./modules/data/types").MatchMode): any[];
            };
            byMatch: {
                <T>(array: T[], query: string | number, mode?: import("./modules/data/types").MatchMode, key?: keyof T): number | undefined;
                (object: any, query: string | number, mode?: import("./modules/data/types").MatchMode, searchBy?: "key" | "value"): string | undefined;
            };
        };
    };
    each: typeof each;
    throttle: typeof throttle;
    debounce: typeof debounce;
    fn: JBaseClass;
};
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
/**
 * * Generic, highly performant iterator utility for arrays, objects, and NodeLists.
 */
export { each } from './utils';
//# sourceMappingURL=index.d.ts.map
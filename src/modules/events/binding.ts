/**
 * @file src/modules/events/binding.ts
 * @version 2.1.0
 * @since 2.0.0
 * @license GPL-3.0-or-later
 * @copyright Sven Minio 2026
 * @author Sven Minio <https://sven-minio.de>
 * @category Events
 * @description
 * * Core event binding methods (on, off, trigger). Handles event registration and removal.
 * @requires ../../core
 * * Depends on the core jBase class for type definitions.
 * @requires ../../utils
 * * Uses utility functions for iteration and environment checks.
 */

import { each } from '../../utils';
import { jBase } from '../../core';

const JB_EVENTS = '__jb_events';

/**
 * * Attaches an event handler function for one or more events to the selected elements.
 * * This core method handles dynamic event delegation and allows passing custom data.
 * @example on('click', handler) => Binds a click event handler to all matched elements.
 * @example on('click', '.btn', handler) => Binds a click event handler to all current and future elements matching '.btn' within the matched elements.
 * @example on('click', { key: 'value' }, handler) => Binds a click event handler and passes custom data to the event object.
 * @param events One or more space-separated event types (e.g., 'click', 'mouseenter mouseleave').
 * @param selectorOrDataOrHandler A CSS selector string for delegation, custom data, or the callback function.
 * @param dataOrHandler Custom data to pass to `event.data`, or the callback function.
 * @param handlerOrUndefined The callback function to execute when the event is triggered.
 * @returns The current jBase instance for method chaining.
 */
export function on(this: jBase, events: string, selectorOrDataOrHandler: any, dataOrHandler?: any, handlerOrUndefined?: any): jBase {
    let selector: string | undefined;
    let data: any;
    let handler: Function;
    if (typeof selectorOrDataOrHandler === 'string') {
        selector = selectorOrDataOrHandler;
        if (typeof dataOrHandler === 'function') {
            handler = dataOrHandler;
        } else {
            data = dataOrHandler;
            handler = handlerOrUndefined;
        }
    } else if (typeof selectorOrDataOrHandler === 'function') {
        handler = selectorOrDataOrHandler;
    } else {
        data = selectorOrDataOrHandler;
        handler = dataOrHandler;
    }
    if (!handler) return this;
    const eventTypes = events.split(' ');
    this.each(function (el) {
        if (!(el instanceof EventTarget)) return;
        const registry = (el as any)[JB_EVENTS] || ((el as any)[JB_EVENTS] = []);
        each(eventTypes, function(_index, eventType) {
            const wrappedHandler = function (e: Event) {
                let targetContext: EventTarget = el;
                if (selector) {
                    const target = e.target instanceof Element ? e.target : (e.target as Node)?.parentElement;
                    const match = (target instanceof Element && target.closest) ? target.closest(selector) : null;
                    if (!match || !(el as Element).contains(match)) {
                        return; 
                    }
                    targetContext = match;
                }
                if (data !== undefined) {
                    (e as any).data = data;
                }
                handler.call(targetContext, e);
            };
            registry.push({
                type: eventType,
                original: handler,
                wrapped: wrappedHandler,
                selector: selector
            });
            el.addEventListener(eventType, wrappedHandler);
        });
    });
    return this;
}

/**
 * * Removes an event handler previously attached with `.on()`.
 * * Can remove all handlers for an event, or specific ones by selector or handler reference.
 * @example off('click') => Removes all click handlers from the matched elements.
 * @example off('click', '.btn') => Removes all click handlers that were delegated to '.btn' within the matched elements.
 * @example off('click', handler) => Removes the specific click handler function from the matched elements.
 * @example off('click', '.btn', handler) => Removes the specific click handler function that was delegated to '.btn' within the matched elements.
 * @param events One or more space-separated event types (e.g., 'click').
 * @param selectorOrHandler A CSS selector string originally used for delegation, or the specific handler function.
 * @param handlerOrUndefined The specific handler function to remove.
 * @returns The current jBase instance for method chaining.
 */
export function off(this: jBase, events: string, selectorOrHandler?: any, handlerOrUndefined?: any): jBase {
    let selector: string | undefined;
    let handler: Function | undefined;
    if (typeof selectorOrHandler === 'string') {
        selector = selectorOrHandler;
        handler = handlerOrUndefined;
    } else if (typeof selectorOrHandler === 'function') {
        handler = selectorOrHandler;
    }
    const eventTypes = events.split(' ');
    this.each(function (el) {
        if (!(el instanceof EventTarget)) return;
        const registry = (el as any)[JB_EVENTS];
        if (!registry) return;
        each(eventTypes, function(_index, eventType) {
            for (let i = registry.length - 1; i >= 0; i--) {
                const record = registry[i];
                const matchType = record.type === eventType;
                const matchSelector = selector ? record.selector === selector : true;
                const matchHandler = handler ? record.original === handler : true;
                if (matchType && matchSelector && matchHandler) {
                    el.removeEventListener(eventType, record.wrapped);
                    registry.splice(i, 1);
                }
            }
        });
    });
    return this;
}

/**
 * * Attaches an event handler that will be executed at most once per element and event type.
 * * Automatically unbinds itself after the first execution. Supports event delegation and custom data.
 * @example once('click', handler) => Binds a click event handler that executes only once for all matched elements.
 * @example once('click', '.btn', handler) => Binds a click event handler that executes only once for all current and future elements matching '.btn' within the matched elements.
 * @example once('click', { key: 'value' }, handler) => Binds a click event handler that executes only once and passes custom data to the event object.
 * @param events One or more space-separated event types.
 * @param selectorOrDataOrHandler A CSS selector string for delegation, custom data, or the callback function.
 * @param dataOrHandler Custom data to pass to `event.data`, or the callback function.
 * @param handlerOrUndefined The callback function to execute when the event is triggered.
 * @returns The current jBase instance for method chaining.
 */
export function once(this: jBase, events: string, selectorOrDataOrHandler: any, dataOrHandler?: any, handlerOrUndefined?: any): jBase {
    const self = this;
    const handleOnce = function(this: any, e: any) {
        self.off(events, selectorOrDataOrHandler, handleOnce);
        let realHandler: Function;
        if (typeof selectorOrDataOrHandler === 'function') {
            realHandler = selectorOrDataOrHandler;
        } else if (typeof dataOrHandler === 'function') {
            realHandler = dataOrHandler;
        } else {
            realHandler = handlerOrUndefined;
        }
        return realHandler.apply(this, arguments);
    };
    if (typeof selectorOrDataOrHandler === 'string') {
        if (typeof dataOrHandler === 'function') {
            return this.on(events, selectorOrDataOrHandler, handleOnce);
        } else {
            return this.on(events, selectorOrDataOrHandler, dataOrHandler, handleOnce);
        }
    } else if (typeof selectorOrDataOrHandler === 'function') {
        return this.on(events, handleOnce);
    } else {
        return this.on(events, selectorOrDataOrHandler, handleOnce);
    }
}

/**
 * * Triggers an event on each element in the collection.
 * @example trigger('customEvent') => Triggers 'customEvent' on all matched elements.
 * @example trigger('customEvent', { key: 'value' }) => Triggers 'customEvent' on all matched elements and passes custom data to the event object.
 * @example trigger('click') => Programmatically triggers a click event on all matched elements.
 * @example trigger('click', { key: 'value' }) => Programmatically triggers a click event on all matched elements and passes custom data to the event object.
 * @param eventName The name of the event to trigger.
 * @param data Optional data to pass to the event (accessible via event.detail).
 */
export function trigger(this: jBase, eventName: string, data?: any): jBase {
    return this.each(function(el) {
        if (!(el instanceof EventTarget)) return;
        const event = new CustomEvent(eventName, {
            bubbles: true,
            cancelable: true,
            detail: data
        });
        el.dispatchEvent(event);
    });
}
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
import { jBase } from '../../core';
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
export declare function on(this: jBase, events: string, selectorOrDataOrHandler: any, dataOrHandler?: any, handlerOrUndefined?: any): jBase;
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
export declare function off(this: jBase, events: string, selectorOrHandler?: any, handlerOrUndefined?: any): jBase;
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
export declare function once(this: jBase, events: string, selectorOrDataOrHandler: any, dataOrHandler?: any, handlerOrUndefined?: any): jBase;
/**
 * * Triggers an event on each element in the collection.
 * @example trigger('customEvent') => Triggers 'customEvent' on all matched elements.
 * @example trigger('customEvent', { key: 'value' }) => Triggers 'customEvent' on all matched elements and passes custom data to the event object.
 * @example trigger('click') => Programmatically triggers a click event on all matched elements.
 * @example trigger('click', { key: 'value' }) => Programmatically triggers a click event on all matched elements and passes custom data to the event object.
 * @param eventName The name of the event to trigger.
 * @param data Optional data to pass to the event (accessible via event.detail).
 */
export declare function trigger(this: jBase, eventName: string, data?: any): jBase;
//# sourceMappingURL=binding.d.ts.map
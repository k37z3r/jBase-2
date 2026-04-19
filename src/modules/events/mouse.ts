/**
 * @file src/modules/events/mouse.ts
 * @version 2.1.0
 * @since 2.0.0
 * @license GPL-3.0-or-later
 * @copyright Sven Minio 2026
 * @author Sven Minio <https://sven-minio.de>
 * @category Events
 * @description
 * * Methods for handling mouse events (click, dblclick, hover, mouseenter, mouseleave).
 * @requires ../../core
 * * Depends on the core jBase class for type definitions.
 */

import { jBase } from '../../core';

/**
 * * Binds an event handler to the "click" JavaScript event, or triggers that event on an element.
 * * If no handler is provided, it programmatically triggers a native click on all matched elements.
 * @example click(handler) => Binds a click event handler to all matched elements.
 * @example click() => Programmatically triggers a click event on all matched elements.
 * @param handler (Optional) A function to execute each time the click event is triggered.
 * @returns The current jBase instance for method chaining.
 */
export function click(this: jBase, handler?: (event: Event) => void): jBase {
    if (handler) {
        return this.on('click', handler);
    } else {
        this.each(function(el) {
            if (el instanceof HTMLElement) el.click();
        });
        return this;
    }
}

/**
 * * Binds an event handler to the 'mousemove' event. Fires continuously while the pointer moves inside the element.
 * @example mousemove(handler) => Binds a mousemove event handler to all matched elements.
 * @param handler The callback function.
 * @returns The current jBase instance.
 */
export function mousemove(this: jBase, handler: (event: MouseEvent) => void): jBase {
    return this.on('mousemove', handler as EventListener);
}

/**
 * * Binds an event handler to the 'mouseleave' event. Fires when the pointer leaves the element (does not bubble).
 * @example mouseleave(handler) => Binds a mouseleave event handler to all matched elements.
 * @param handler The callback function.
 * @returns The current jBase instance.
 */
export function mouseleave(this: jBase, handler: (event: MouseEvent) => void): jBase {
    return this.on('mouseleave', handler as EventListener);
}

/**
 * * Binds an event handler to the 'mouseenter' event. Fires when the pointer enters the element (does not bubble).
 * @example mouseenter(handler) => Binds a mouseenter event handler to all matched elements.
 * @param handler The callback function.
 * @returns The current jBase instance.
 */
export function mouseenter(this: jBase, handler: (event: MouseEvent) => void): jBase {
    return this.on('mouseenter', handler as EventListener);
}

/**
 * * Binds an event handler to the 'mousedown' event. Fires as soon as a mouse button is pressed over the element.
 * @example mousedown(handler) => Binds a mousedown event handler to all matched elements.
 * @param handler The callback function.
 * @returns The current jBase instance.
 */
export function mousedown(this: jBase, handler: (event: MouseEvent) => void): jBase {
    return this.on('mousedown', handler as EventListener);
}

/**
 * * Binds an event handler to the 'mouseup' event. Fires when a mouse button is released over the element.
 * @example mouseup(handler) => Binds a mouseup event handler to all matched elements.
 * @param handler The callback function.
 * @returns The current jBase instance.
 */
export function mouseup(this: jBase, handler: (event: MouseEvent) => void): jBase {
    return this.on('mouseup', handler as EventListener);
}

/**
 * * Binds an event handler to the 'dblclick' event or triggers it manually.
 * @example dblclick(handler) => Binds a dblclick event handler to all matched elements.
 * @param handler (Optional) The callback function.
 * @returns The current jBase instance.
 */
export function dblclick(this: jBase, handler?: (event: MouseEvent) => void): jBase {
    if (handler) {
        return this.on('dblclick', handler as EventListener);
    } else {
        this.each(function(el) {
            if (el instanceof HTMLElement) {
                el.dispatchEvent(new MouseEvent('dblclick', {
                    bubbles: true,
                    cancelable: true,
                    view: window
                }));
            }
        });
        return this;
    }
}

/**
 * * Binds an event handler to the 'mouseout' event. Fires when the pointer leaves the element OR one of its children (bubbles).
 * @example mouseout(handler) => Binds a mouseout event handler to all matched elements.
 * @param handler The callback function.
 * @returns The current jBase instance.
 */
export function mouseout(this: jBase, handler: (event: MouseEvent) => void): jBase {
    return this.on('mouseout', handler as EventListener);
}

/**
 * * Binds an event handler to the 'mouseover' event. Fires when the pointer enters the element OR one of its children (bubbles).
 * @example mouseover(handler) => Binds a mouseover event handler to all matched elements.
 * @param handler The callback function.
 * @returns The current jBase instance.
 */
export function mouseover(this: jBase, handler: (event: MouseEvent) => void): jBase {
    return this.on('mouseover', handler as EventListener);
}

/**
 * * Binds two handlers to the matched elements, to be executed when the mouse pointer enters and leaves the elements.
 * * This is a highly convenient shorthand for chaining `.mouseenter()` and `.mouseleave()`.
 * @example hover(handlerIn, handlerOut) => Binds handlerIn to mouseenter and handlerOut to mouseleave for all matched elements.
 * @param handlerIn A function to execute when the mouse pointer enters the element.
 * @param handlerOut A function to execute when the mouse pointer leaves the element.
 * @returns The current jBase instance for method chaining.
 */
export function hover(this: jBase, handlerIn: (event: MouseEvent) => void, handlerOut: (event: MouseEvent) => void): jBase {
    return this.mouseenter(handlerIn).mouseleave(handlerOut);
}
/**
 * @file src/modules/events/touch.ts
 * @version 2.1.0
 * @since 2.0.0
 * @license GPL-3.0-or-later
 * @copyright Sven Minio 2026
 * @author Sven Minio <https://sven-minio.de>
 * @category Events
 * @description
 * * Methods for handling touch events (touchstart, touchend, touchmove).
 * @requires ../../core
 * * Depends on the core jBase class for type definitions.
 */

import { jBase } from '../../core';

/**
 * * Binds an event handler to the 'touchstart' event. Triggered when a touch point is placed on the touch surface.
 * @example touchstart(handler) => Binds a touchstart event handler to all matched elements.
 * @param handler The callback function executed on touch start.
 * @returns The current jBase instance for method chaining.
 */
export function touchstart(this: jBase, handler: (event: TouchEvent) => void): jBase {
    return this.on('touchstart', handler as EventListener);
}

/**
 * * Binds an event handler to the 'touchend' event. Triggered when a touch point is removed from the touch surface.
 * @example touchend(handler) => Binds a touchend event handler to all matched elements.
 * @param handler The callback function executed on touch end.
 * @returns The current jBase instance for method chaining.
 */
export function touchend(this: jBase, handler: (event: TouchEvent) => void): jBase {
    return this.on('touchend', handler as EventListener);
}

/**
 * * Binds an event handler to the 'touchmove' event. Triggered when a touch point moves along the touch surface. Important for swipe gestures or Drag & Drop.
 * @example touchmove(handler) => Binds a touchmove event handler to all matched elements.
 * @param handler The callback function executed on movement.
 * @returns The current jBase instance for method chaining.
 */
export function touchmove(this: jBase, handler: (event: TouchEvent) => void): jBase {
    return this.on('touchmove', handler as EventListener);
}

/**
 * * Binds an event handler to the 'touchcancel' event. Triggered when a touch point has been disrupted by the system (e.g., too many touch points or a UI popup).
 * @example touchcancel(handler) => Binds a touchcancel event handler to all matched elements.
 * @param handler The callback function executed on cancellation.
 * @returns The current jBase instance for method chaining.
 */
export function touchcancel(this: jBase, handler: (event: TouchEvent) => void): jBase {
    return this.on('touchcancel', handler as EventListener);
}

/**
 * * Binds an event handler to be executed when the user swipes left across the selected elements.
 * * The swipe must cover a minimum distance of 50 pixels to trigger.
 * @example swipeLeft(handler) => Binds a handler to execute when a left swipe gesture is detected on all matched elements.
 * @param handler A function to execute when the left swipe gesture is detected.
 * @returns The current jBase instance for method chaining.
 */
export function swipeLeft(this: jBase, handler: (e: TouchEvent) => void): jBase {
    return this.each(function(el) { if (el instanceof Element) handleSwipe.call(this, el, 'left', handler); });
}

/**
 * * Binds an event handler to be executed when the user swipes right across the selected elements.
 * * The swipe must cover a minimum distance of 50 pixels to trigger.
 * @example swipeRight(handler) => Binds a handler to execute when a right swipe gesture is detected on all matched elements.
 * @param handler A function to execute when the right swipe gesture is detected.
 * @returns The current jBase instance for method chaining.
 */
export function swipeRight(this: jBase, handler: (e: TouchEvent) => void): jBase {
    return this.each(function(el) { if (el instanceof Element) handleSwipe.call(this, el, 'right', handler); });
}

/**
 * * Binds an event handler to be executed when the user swipes up across the selected elements.
 * * The swipe must cover a minimum distance of 50 pixels to trigger.
 * @example swipeUp(handler) => Binds a handler to execute when an upward swipe gesture is detected on all matched elements.
 * @param handler A function to execute when the upward swipe gesture is detected.
 * @returns The current jBase instance for method chaining.
 */
export function swipeUp(this: jBase, handler: (e: TouchEvent) => void): jBase {
    return this.each(function(el) { if (el instanceof Element) handleSwipe.call(this, el, 'up', handler); });
}

/**
 * * Binds an event handler to be executed when the user swipes down across the selected elements.
 * * The swipe must cover a minimum distance of 50 pixels to trigger.
 * @example swipeDown(handler) => Binds a handler to execute when a downward swipe gesture is detected on all matched elements.
 * @param handler A function to execute when the downward swipe gesture is detected.
 * @returns The current jBase instance for method chaining.
 */
export function swipeDown(this: jBase, handler: (e: TouchEvent) => void): jBase {
    return this.each(function(el) { if (el instanceof Element) handleSwipe.call(this, el, 'down', handler); });
}

/**
 * * Internal helper function to detect swipe gestures on touch devices.
 * * Calculates the distance between 'touchstart' and 'touchend' coordinates.
 * * Triggers the handler only if the movement exceeds the 50px threshold in the specified direction.
 * @private
 * @example handleSwipe(el, 'left', handler) => Attaches swipe detection for left swipes on the specified element.
 * @param el The DOM element to attach the touch listeners to.
 * @param direction The target swipe direction ('left', 'right', 'up', 'down').
 * @param handler The callback function to execute when a valid swipe is detected.
 */
function handleSwipe(this: any, el: HTMLElement | Element, direction: 'left' | 'right' | 'up' | 'down', handler: (e: TouchEvent) => void) {
    let startX = 0, startY = 0;
    
    el.addEventListener('touchstart', (e: any) => {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
    }, { passive: true });

    el.addEventListener('touchend', (e: any) => {
        const diffX = e.changedTouches[0].clientX - startX;
        const diffY = e.changedTouches[0].clientY - startY;
        const threshold = 50;

        if (Math.abs(diffX) > Math.abs(diffY)) {
            if (Math.abs(diffX) > threshold) {
                if (diffX > 0 && direction === 'right') handler.call(el, e);
                if (diffX < 0 && direction === 'left') handler.call(el, e);
            }
        } else {
            if (Math.abs(diffY) > threshold) {
                if (diffY > 0 && direction === 'down') handler.call(el, e);
                if (diffY < 0 && direction === 'up') handler.call(el, e);
            }
        }
    }, { passive: true });
}
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
export declare function touchstart(this: jBase, handler: (event: TouchEvent) => void): jBase;
/**
 * * Binds an event handler to the 'touchend' event. Triggered when a touch point is removed from the touch surface.
 * @example touchend(handler) => Binds a touchend event handler to all matched elements.
 * @param handler The callback function executed on touch end.
 * @returns The current jBase instance for method chaining.
 */
export declare function touchend(this: jBase, handler: (event: TouchEvent) => void): jBase;
/**
 * * Binds an event handler to the 'touchmove' event. Triggered when a touch point moves along the touch surface. Important for swipe gestures or Drag & Drop.
 * @example touchmove(handler) => Binds a touchmove event handler to all matched elements.
 * @param handler The callback function executed on movement.
 * @returns The current jBase instance for method chaining.
 */
export declare function touchmove(this: jBase, handler: (event: TouchEvent) => void): jBase;
/**
 * * Binds an event handler to the 'touchcancel' event. Triggered when a touch point has been disrupted by the system (e.g., too many touch points or a UI popup).
 * @example touchcancel(handler) => Binds a touchcancel event handler to all matched elements.
 * @param handler The callback function executed on cancellation.
 * @returns The current jBase instance for method chaining.
 */
export declare function touchcancel(this: jBase, handler: (event: TouchEvent) => void): jBase;
/**
 * * Binds an event handler to be executed when the user swipes left across the selected elements.
 * * The swipe must cover a minimum distance of 50 pixels to trigger.
 * @example swipeLeft(handler) => Binds a handler to execute when a left swipe gesture is detected on all matched elements.
 * @param handler A function to execute when the left swipe gesture is detected.
 * @returns The current jBase instance for method chaining.
 */
export declare function swipeLeft(this: jBase, handler: (e: TouchEvent) => void): jBase;
/**
 * * Binds an event handler to be executed when the user swipes right across the selected elements.
 * * The swipe must cover a minimum distance of 50 pixels to trigger.
 * @example swipeRight(handler) => Binds a handler to execute when a right swipe gesture is detected on all matched elements.
 * @param handler A function to execute when the right swipe gesture is detected.
 * @returns The current jBase instance for method chaining.
 */
export declare function swipeRight(this: jBase, handler: (e: TouchEvent) => void): jBase;
/**
 * * Binds an event handler to be executed when the user swipes up across the selected elements.
 * * The swipe must cover a minimum distance of 50 pixels to trigger.
 * @example swipeUp(handler) => Binds a handler to execute when an upward swipe gesture is detected on all matched elements.
 * @param handler A function to execute when the upward swipe gesture is detected.
 * @returns The current jBase instance for method chaining.
 */
export declare function swipeUp(this: jBase, handler: (e: TouchEvent) => void): jBase;
/**
 * * Binds an event handler to be executed when the user swipes down across the selected elements.
 * * The swipe must cover a minimum distance of 50 pixels to trigger.
 * @example swipeDown(handler) => Binds a handler to execute when a downward swipe gesture is detected on all matched elements.
 * @param handler A function to execute when the downward swipe gesture is detected.
 * @returns The current jBase instance for method chaining.
 */
export declare function swipeDown(this: jBase, handler: (e: TouchEvent) => void): jBase;
//# sourceMappingURL=touch.d.ts.map
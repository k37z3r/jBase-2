/**
 * @file src/modules/events/keyboard.ts
 * @version 2.0.3
 * @since 2.0.0
 * @license GPL-3.0-or-later
 * @copyright Sven Minio 2026
 * @author Sven Minio <https://sven-minio.de>
 * @category Events
 * @description
 * * Methods for handling keyboard events (keydown, keyup, keypress).
 * @requires ../../core
 * * Depends on the core jBase class for type definitions.
 */
import { jBase } from '../../core';
/**
 * * Binds an event handler to the 'keydown' event. Fires immediately when a key is pressed (repeats if held).
 * @example keydown(handler) => Binds a keydown event handler to all matched elements.
 * @param handler The callback function receiving the KeyboardEvent.
 * @returns The current jBase instance for method chaining.
 */
export declare function keydown(this: jBase, handler: (event: KeyboardEvent) => void): jBase;
/**
 * * Binds an event handler to the 'keyup' event. Fires when a key is released.
 * @example keyup(handler) => Binds a keyup event handler to all matched elements.
 * @param handler The callback function receiving the KeyboardEvent.
 * @returns The current jBase instance for method chaining.
 */
export declare function keyup(this: jBase, handler: (event: KeyboardEvent) => void): jBase;
/**
 * * Binds an event handler to the 'keypress' event. Deprecated in modern standards.
 * @deprecated Use keydown or input instead.
 * @param handler The callback function receiving the KeyboardEvent.
 * @returns The current jBase instance for method chaining.
 */
export declare function keypress(this: jBase, handler: (event: KeyboardEvent) => void): jBase;
/**
 * * Binds an event handler for a specific key (case-insensitive).
 * @example pressedKey('Enter', handler) => Binds a handler that executes when the Enter key is pressed on any matched element.
 * @param targetKey The key to react to (e.g., 'm', 'Enter', 'Escape').
 * @param handler The callback function.
 * @returns The current jBase instance.
 */
export declare function pressedKey(this: jBase, targetKey: string, handler: (event: KeyboardEvent) => void): jBase;
//# sourceMappingURL=keyboard.d.ts.map
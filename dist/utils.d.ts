/**
 * @file src/utils.ts
 * @version 2.1.0
 * @since 2.0.0
 * @license GPL-3.0-or-later
 * @copyright Sven Minio 2026
 * @author Sven Minio <https://sven-minio.de>
 * @category Utilities
 * @description
 * * General utility functions and helpers (e.g., debounce, throttle, type checks).
 */
/**
 * * Creates a throttled version of the provided function. The function is executed at most once within the specified time interval, regardless of how often it is called.
 * Use case: Performance optimization for high-frequency events (e.g., Scroll, Resize, Mousemove).
 * @example const throttledScroll = throttle(() => { console.log('Scroll event'); }, 200); => Creates a throttled scroll event handler that logs at most once every 200 milliseconds.
 * @template T The type of the original function.
 * @param func The function to be throttled.
 * @param limit The time interval in milliseconds during which at most one execution is permitted.
 * @returns A new function that throttles calls.
 */
export declare function throttle<T extends (...args: any[]) => any>(func: T, limit: number): (...args: Parameters<T>) => void;
/**
 * * Creates a debounced version of the provided function. Execution is delayed until `delay` milliseconds have passed since the last invocation.
 * Use case: Waiting for user input (e.g., Live Search, Validation) to avoid unnecessary calculations.
 * @example const debouncedInput = debounce(() => { console.log('Input event'); }, 300); => Creates a debounced input event handler that logs only after the user has stopped typing for 300 milliseconds.
 * @template T The type of the original function.
 * @param func The function to be debounced.
 * @param delay The waiting time in milliseconds after the last call.
 * @returns A new function that delays execution.
 */
export declare function debounce<T extends (...args: any[]) => any>(func: T, delay: number): (...args: Parameters<T>) => void;
/**
 * * Checks if the code is running in a browser environment.
 * * Verifies the existence of `window` and `requestAnimationFrame` to ensure animation support.
 * * Used to safely guard DOM-dependent logic (Effects, Events) during Server-Side Rendering (SSR).
 * @example const isBrowserEnv = isBrowser(); => Checks if the code is running in a browser environment.
 * @returns `true` if running in a browser with animation support, otherwise `false`.
 */
export declare function isBrowser(): boolean;
/**
 * * A generic iterator function, which can be used to seamlessly iterate over both objects and arrays.
 * * Arrays and array-like objects with a length property are iterated by numeric index.
 * * Objects are iterated via their named properties.
 * * Returning 'false' in the callback breaks the loop early.
 * @example each([1, 2, 3], (index, value) => { console.log(index, value); }) => Logs the index and value of each item in the array.
 * @example each({ a: 1, b: 2 }, (key, value) => { console.log(key, value); }) => Logs the key and value of each property in the object.
 * @template T The type of the items in the collection.
 * @param collection The array, array-like object, or plain object to iterate over.
 * @param callback The function that will be executed on every object.
 */
export declare function each<T>(collection: T[] | ArrayLike<T> | Record<string, T>, callback: (this: T, indexOrKey: any, value: T) => boolean | void): collection is T[] | ArrayLike<T> | Record<string, T>;
//# sourceMappingURL=utils.d.ts.map
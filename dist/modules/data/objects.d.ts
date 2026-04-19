/**
 * @file src/modules/data/objects.ts
 * @version 2.0.3
 * @since 2.0.0
 * @license GPL-3.0-or-later
 * @copyright Sven Minio 2026
 * @author Sven Minio <https://sven-minio.de>
 * @category Data
 * @description
 * * Utility functions for object manipulation (e.g., deep merging, extension).
 * @requires ./types
 * * Depends on types.
 * @requires src/utils
 * * Depends on utility functions (e.g., each).
 */
import { MatchMode } from './types';
/**
 * * Recursively merges multiple objects (Deep Merge).
 * @example mergeObjects({ a: 1, b: { x: 1 } }, { b: { y: 2 } }) => { a: 1, b: { x: 1, y: 2 } }
 * @param target The target object (will be modified!).
 * @param sources One or more source objects.
 * @returns The modified target object.
 */
export declare function mergeObjects(target: any, ...sources: any[]): any;
/**
 * * Creates a new object containing only the specified keys (Allowlist).
 * @example pick({ a: 1, b: 2, c: 3 }, ['a', 'c']) => { a: 1, c: 3 }
 * @param obj The source object.
 * @param keys Array of keys to keep.
 * @returns A new object with selected keys.
 */
export declare function pick<T extends object, K extends keyof T>(obj: T, keys: K[]): Pick<T, K>;
/**
 * * Creates a new object containing all keys EXCEPT the specified ones (Blocklist).
 * @example omit({ a: 1, b: 2, c: 3 }, ['b']) => { a: 1, c: 3 }
 * @param obj The source object.
 * @param keys Array of keys to remove.
 * @returns A new object without the specified keys.
 */
export declare function omit<T, K extends keyof T>(obj: T, keys: K[]): Omit<T, K>;
/**
 * * Safely retrieves a value from a nested object (Safe Navigation).
 * @example get(config, 'settings.theme.color') => Returns the value of config.settings.theme.color or undefined if any part is missing.
 * @param obj The object.
 * @param path The path as a dot-notation string.
 * @returns The found value or undefined.
 */
export declare function get(obj: any, path: string): any;
/**
 * * Sets a value deeply within a nested object. Creates missing intermediate objects automatically.
 * @example set(config, 'settings.theme.color', 'dark') => Sets config.settings.theme.color to 'dark', creating objects if needed.
 * @param obj The object to modify.
 * @param path The path as a string (e.g., 'settings.theme.color').
 * @param value The value to set.
 */
export declare function set(obj: any, path: string, value: any): void;
/**
 * * Searches keys or values in the object.
 */
export declare const find: {
    /**
     * * Returns the n-th entry of an object as a [key, value] pair. Supports negative indices.
     * @example find.at({ a: 1, b: 2 }, 1) => ['b', 2]
     * @param obj The object to search.
     * @param index The index (0-based, negative counts from the back).
     * @returns A [key, value] tuple or undefined.
     */
    at(obj: any, index: number): [string, any] | undefined;
    /**
     * * Finds the first entry where the key or value matches the query.
     * @example find.first(config, 'admin', 'exact', 'key')
     * @param obj The object to search.
     * @param query The search query.
     * @param mode The comparison mode ('exact', 'contains', 'startsWith', 'endsWith').
     * @param searchBy Whether to search by 'key' or 'value'.
     * @returns The first matching [key, value] pair or undefined.
     */
    first(obj: any, query: string | number, mode?: MatchMode, searchBy?: "key" | "value"): [string, any] | undefined;
    /**
     * * Finds the last entry where the key or value matches the query.
     * @example find.last(config, '.php', 'endsWith', 'key')
     * @param obj The object to search.
     * @param query The search query.
     * @param mode The comparison mode ('exact', 'contains', 'startsWith', 'endsWith').
     * @param searchBy Whether to search by 'key' or 'value'.
     * @returns The last matching [key, value] pair or undefined.
     */
    last(obj: any, query: string | number, mode?: MatchMode, searchBy?: "key" | "value"): [string, any] | undefined;
    /**
     * * Finds all keys matching the query.
     * @example find.key(config, 'api_', 'startsWith')
     * @param obj The object to search.
     * @param query The search query.
     * @param mode The comparison mode ('exact', 'contains', 'startsWith', 'endsWith').
     * @returns An array of matching keys.
     */
    key(obj: any, query: string, mode?: MatchMode): string[];
    /**
     * * Finds all values matching the query.
     * @example find.value(config, 'enabled', 'exact')
     * @param obj The object to search.
     * @param query The search query.
     * @param mode The comparison mode ('exact', 'contains', 'startsWith', 'endsWith').
     * @returns An array of matching values.
     */
    value(obj: any, query: string, mode?: MatchMode): any[];
};
//# sourceMappingURL=objects.d.ts.map
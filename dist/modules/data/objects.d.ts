/**
 * @file src/modules/data/objects.ts
 * @version 2.1.0
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
 * * ALIAS for mergeObjects (Consistency with array.mergeArray)
 */
export declare const merge: typeof mergeObjects;
/**
 * * Splits an object into an array of smaller objects (chunks). Ideal for batched processing.
 * @example chunk({a: 1, b: 2, c: 3}, 2) => [{a: 1, b: 2}, {c: 3}]
 * @param obj The source object.
 * @param size The maximum number of keys per chunk.
 * @returns An array of partial objects.
 */
export declare function chunk<T extends Record<string, any>>(obj: T, size: number): Partial<T>[];
/**
 * * Safely adds a key-value pair at a specific index without mutating the original object (Immutable).
 * * Note: While JS object key order is generally insertion-based, relying on it is not always recommended.
 * @example add({a: 1, c: 3}, 'b', 2, 1) => {a: 1, b: 2, c: 3}
 * @param obj The object.
 * @param key The key to add.
 * @param value The value to add.
 * @param index The position (default: end). Negative values count from the back.
 * @returns A new object including the element at the specified position.
 */
export declare function add<T extends Record<string, any>>(obj: T, key: string, value: any, index?: number): T & Record<string, any>;
/**
 * * Clears the object and returns a new empty object (Immutable).
 * @example clear({ a: 1, b: 2 }) => {}
 * @template T The type of the object.
 * @param obj The object to clear.
 * @returns A new empty object.
 */
export declare function clear<T extends Record<string, any>>(obj: T): Partial<T>;
/**
 * * ALIAS for clear.
 */
export declare const empty: typeof clear;
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
 * * Removes elements from an object based on index or match logic (Immutable).
 * * Mirrors the array.remove API.
 */
export declare const remove: {
    /**
     * * Removes an entry at a specific index.
     * @example remove.at({a: 1, b: 2, c: 3}, -1) => {a: 1, b: 2}
     * @param obj The source object.
     * @param index The index (negative values allowed).
     * @returns A new object with the element removed.
     */
    at<T extends Record<string, any>>(obj: T, index: number): Partial<T>;
    /**
     * * Removes the first entry from the object.
     * @param obj The source object.
     * @returns A new object without the first entry.
     */
    first<T extends Record<string, any>>(obj: T): Partial<T>;
    /**
     * * Removes the last entry from the object.
     * @param obj The source object.
     * @returns A new object without the last entry.
     */
    last<T extends Record<string, any>>(obj: T): Partial<T>;
    /**
     * * Removes all entries matching a query condition.
     * @example remove.byMatch(config, 'hidden', 'exact', 'key')
     * @param obj The source object.
     * @param query The search query.
     * @param mode The comparison mode ('exact', 'contains', 'startsWith', 'endsWith').
     * @param searchBy Whether to search by 'key' or 'value' (default: 'key').
     * @returns A new object without the matching elements.
     */
    byMatch<T extends Record<string, any>>(obj: T, query: string | number, mode?: MatchMode, searchBy?: "key" | "value"): Partial<T>;
    /**
     * * Removes all entries that have a specific key.
     * @example remove.byKey({ a: 1, b: 2, c: 3 }, 'b') => { a: 1, c: 3 }
     * @param obj The source object.
     * @param key The key to remove.
     * @returns A new object without the specified key.
     */
    byKey<T extends Record<string, any>>(obj: T, key: string): Partial<T>;
    /**
     * * Removes all entries that match a specific value exactly (Strict Equality).
     * @example remove.byValue({ a: 1, b: 2, c: 1 }, 1) => { b: 2 }
     * @param obj The source object.
     * @param value The value to remove.
     * @returns A new object without the matching values.
     */
    byValue<T extends Record<string, any>>(obj: T, value: any): Partial<T>;
    /**
     * * ALIAS for clear. Removes all entries.
     * @param obj The source object.
     * @returns A new, empty object.
     */
    all<T extends Record<string, any>>(obj: T): Partial<T>;
};
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
     * * Returns a NEW OBJECT containing ALL elements matching the condition.
     * * Mirrors array.find.all() but returns a partial object.
     * @example find.all({a: 1, b: 2, c: 1}, 1, 'exact', 'value') => {a: 1, c: 1}
     * @param obj The object to search.
     * @param query The search query.
     * @param mode The comparison mode ('exact', 'contains', 'startsWith', 'endsWith').
     * @param searchBy Whether to search by 'key' or 'value' (default: 'key').
     * @returns A new object with only the matching elements.
     */
    all<T extends Record<string, any>>(obj: T, query: string | number, mode?: MatchMode, searchBy?: "key" | "value"): Partial<T>;
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
    /**
     * * Finds the key of the first match based on the query condition.
     * * Mirrors array.find.byMatch(). For objects, it returns the key instead of a numeric index.
     * @example find.byMatch(config, 'admin', 'exact', 'value') => 'role'
     * @param obj The object to search.
     * @param query The search query.
     * @param mode The comparison mode ('exact', 'contains', 'startsWith', 'endsWith').
     * @param searchBy Whether to search by 'key' or 'value' (default: 'key').
     * @returns The matched key as a string, or undefined if no match is found.
     */
    byMatch(obj: any, query: string | number, mode?: MatchMode, searchBy?: "key" | "value"): string | undefined;
};
//# sourceMappingURL=objects.d.ts.map
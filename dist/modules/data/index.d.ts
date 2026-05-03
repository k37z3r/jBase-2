/**
 * @file src/modules/data/index.ts
 * @version 2.1.0
 * @since 2.0.0
 * * @license GPL-3.0-or-later
 * @copyright Sven Minio 2026
 * @author Sven Minio <https://sven-minio.de>
 * @category Data
 * @description
 * * Central entry point for data manipulation.
 * * Features a dynamic, overloaded API router that automatically delegates
 * * to array or object utilities based on the input type.
 * @requires ./arrays
 * * Array manipulation methods.
 * @requires ./objects
 * * Object manipulation methods.
 */
import * as arr from './arrays';
import * as obj from './objects';
import { MatchMode } from './types';
/**
 * * Splits an array or object into smaller chunks (batched processing).
 * @param data The source array or object.
 * @param size The maximum size/length of each chunk.
 * @returns An array containing the chunked arrays or partial objects.
 */
declare function chunk<T>(array: T[], size: number): T[][];
declare function chunk<T extends Record<string, any>>(object: T, size: number): Partial<T>[];
/**
 * * Merges multiple arrays (flat) or objects (deep merge) into a single structure.
 * @param data The target array or object.
 * @param args The source arrays or objects to merge.
 * @returns The newly merged array or modified target object.
 */
declare function merge(...arrays: any[][]): any[];
declare function merge(target: any, ...sources: any[]): any;
/**
 * * Safely adds an element/property at a specific index without mutating the original structure (Immutable).
 * @param data The source array or object.
 * @param arg1 The item to add (array) or the key to add (object).
 * @param arg2 The index (array) or the value to add (object).
 * @param arg3 The index (object only).
 * @returns A new array or object including the added element.
 */
declare function add<T>(array: T[], item: T, index?: number): T[];
declare function add<T extends Record<string, any>>(object: T, key: string, value: any, index?: number): T & Record<string, any>;
/**
 * * Clears the array or object and returns a new empty one (Immutable).
 * @param data The array or object to clear.
 * @returns A new empty array `[]` or object `{}`.
 */
declare function clear<T>(array: T[]): T[];
declare function clear<T extends Record<string, any>>(object: T): Partial<T>;
/**
 * * Creates a new array or object containing ONLY the specified indices/keys (Allowlist).
 * @param data The source array or object.
 * @param keysOrIndices Array of keys (object) or indices (array) to keep.
 * @returns A new filtered array or object.
 */
declare function pick<T>(array: T[], indices: number[]): T[];
declare function pick<T extends object, K extends keyof T>(object: T, keys: K[]): Pick<T, K>;
/**
 * * Creates a new array or object containing all elements EXCEPT the specified indices/keys (Blocklist).
 * @param data The source array or object.
 * @param keysOrIndices Array of keys (object) or indices (array) to remove.
 * @returns A new filtered array or object.
 */
declare function omit<T>(array: T[], indices: number[]): T[];
declare function omit<T extends object, K extends keyof T>(object: T, keys: K[]): Omit<T, K>;
/**
 * * Safely retrieves a value from a nested array/object structure using dot-notation.
 * @param data The source array or object.
 * @param path The path string (e.g., 'settings.theme' or '0.profile.name').
 * @returns The found value or undefined if any part is missing.
 */
declare function get(array: any[], path: string): any;
declare function get(object: any, path: string): any;
/**
 * * Sets a value deeply within a nested structure. Creates missing objects/arrays automatically.
 * @param data The array or object to modify.
 * @param path The path string (e.g., 'settings.theme').
 * @param value The value to set.
 */
declare function set(array: any[], path: string, value: any): void;
declare function set(object: any, path: string, value: any): void;
/**
 * * Removes an entry/element at a specific index (Immutable).
 * @param data The source array or object.
 * @param index The index to remove (negative values count from the end).
 * @returns A new array or object without the specified element.
 */
declare function removeAt<T>(array: T[], index: number): T[];
declare function removeAt<T extends Record<string, any>>(object: T, index: number): Partial<T>;
/**
 * * Removes the first entry/element (Immutable).
 * @param data The source array or object.
 * @returns A new array or object without the first element.
 */
declare function removeFirst<T>(array: T[]): T[];
declare function removeFirst<T extends Record<string, any>>(object: T): Partial<T>;
/**
 * * Removes the last entry/element (Immutable).
 * @param data The source array or object.
 * @returns A new array or object without the last element.
 */
declare function removeLast<T>(array: T[]): T[];
declare function removeLast<T extends Record<string, any>>(object: T): Partial<T>;
/**
 * * Removes all entries/elements matching a query condition (Immutable). Acts as an inverse filter.
 * @param data The source array or object.
 * @param query The search term.
 * @param mode Comparison mode ('exact', 'contains', 'startsWith', 'endsWith').
 * @returns A new array or object containing only the non-matching elements.
 */
declare function removeByMatch<T>(array: T[], query: string | number, mode?: MatchMode, key?: keyof T): T[];
declare function removeByMatch<T extends Record<string, any>>(object: T, query: string | number, mode?: MatchMode, searchBy?: 'key' | 'value'): Partial<T>;
/**
 * * Removes a specific element by its index (arrays) or key (objects) (Immutable).
 * @param data The source array or object.
 * @param keyOrIndex The index or key string to remove.
 * @returns A new array or object without the specified property/element.
 */
declare function removeByKey<T>(array: T[], index: number): T[];
declare function removeByKey<T extends Record<string, any>>(object: T, key: string): Partial<T>;
/**
 * * Removes all elements/entries that match a specific value exactly (Immutable).
 * @param data The source array or object.
 * @param value The exact value to remove (strict equality).
 * @returns A new array or object without the matching values.
 */
declare function removeByValue<T>(array: T[], value: T): T[];
declare function removeByValue<T extends Record<string, any>>(object: T, value: any): Partial<T>;
/**
 * * Arrays: Finds the index of the first match. Objects: Returns the n-th [key, value] tuple.
 * @param data The array or object to search.
 * @param arg1 Query term (array) or numeric index (object).
 * @returns The index (array) or tuple (object), or undefined.
 */
declare function findAt<T>(array: T[], query: string | number, mode?: MatchMode, key?: keyof T): number;
declare function findAt(object: any, index: number): [string, any] | undefined;
/**
 * * Returns ALL elements/entries matching the condition. Similar to filter().
 * @param data The array or object to search.
 * @param query The search term.
 * @param mode Comparison mode ('exact', 'contains', 'startsWith', 'endsWith').
 * @returns A new array or partial object containing the matching elements.
 */
declare function findAll<T>(array: T[], query: string | number, mode?: MatchMode, key?: keyof T): T[];
declare function findAll<T extends Record<string, any>>(object: T, query: string | number, mode?: MatchMode, searchBy?: 'key' | 'value'): Partial<T>;
/**
 * * Returns the FIRST matching element (array) or [key, value] tuple (object).
 * @param data The array or object to search.
 * @param query The search term.
 * @returns The found element/tuple or undefined.
 */
declare function findFirst<T>(array: T[], query: string | number, mode?: MatchMode, key?: keyof T): T | undefined;
declare function findFirst(object: any, query: string | number, mode?: MatchMode, searchBy?: 'key' | 'value'): [string, any] | undefined;
/**
 * * Returns the LAST matching element (array) or [key, value] tuple (object). Searches in reverse.
 * @param data The array or object to search.
 * @param query The search term.
 * @returns The found element/tuple or undefined.
 */
declare function findLast<T>(array: T[], query: string | number, mode?: MatchMode, key?: keyof T): T | undefined;
declare function findLast(object: any, query: string | number, mode?: MatchMode, searchBy?: 'key' | 'value'): [string, any] | undefined;
/**
 * * Finds all matching indices (arrays) or keys (objects) based on the query.
 * @param data The array or object to search.
 * @param query The search term.
 * @returns An array of matching stringified keys/indices.
 */
declare function findKey<T>(array: T[], query: string, mode?: MatchMode): string[];
declare function findKey(object: any, query: string, mode?: MatchMode): string[];
/**
 * * Finds all matching values within the array or object.
 * @param data The array or object to search.
 * @param query The search term.
 * @returns An array of matching values.
 */
declare function findValue<T>(array: T[], query: string, mode?: MatchMode): T[];
declare function findValue(object: any, query: string, mode?: MatchMode): any[];
/**
 * * Finds the index (array) or key (object) of the first match based on the query condition.
 * @param data The array or object to search.
 * @param query The search term.
 * @returns The matching index/key or undefined.
 */
declare function findByMatch<T>(array: T[], query: string | number, mode?: MatchMode, key?: keyof T): number | undefined;
declare function findByMatch(object: any, query: string | number, mode?: MatchMode, searchBy?: 'key' | 'value'): string | undefined;
/**
 * * Central data utility object.
 * * Dynamically routes to array or object methods based on input.
 * * Backward compatibility for strict calls is maintained via `.arr` and `.obj`.
 */
export declare const data: {
    arr: typeof arr;
    obj: typeof obj;
    chunk: typeof chunk;
    merge: typeof merge;
    add: typeof add;
    clear: typeof clear;
    empty: typeof clear;
    pick: typeof pick;
    omit: typeof omit;
    get: typeof get;
    set: typeof set;
    remove: {
        at: typeof removeAt;
        first: typeof removeFirst;
        last: typeof removeLast;
        byKey: typeof removeByKey;
        byValue: typeof removeByValue;
        byMatch: typeof removeByMatch;
        all: typeof clear;
    };
    find: {
        at: typeof findAt;
        all: typeof findAll;
        first: typeof findFirst;
        last: typeof findLast;
        key: typeof findKey;
        value: typeof findValue;
        byMatch: typeof findByMatch;
    };
};
export {};
//# sourceMappingURL=index.d.ts.map
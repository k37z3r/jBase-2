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
function chunk<T>(array: T[], size: number): T[][];
function chunk<T extends Record<string, any>>(object: T, size: number): Partial<T>[];
function chunk(data: any, size: number): any {
    return Array.isArray(data) ? arr.chunk(data, size) : obj.chunk(data, size);
}

/**
 * * Merges multiple arrays (flat) or objects (deep merge) into a single structure.
 * @param data The target array or object.
 * @param args The source arrays or objects to merge.
 * @returns The newly merged array or modified target object.
 */
function merge(...arrays: any[][]): any[];
function merge(target: any, ...sources: any[]): any;
function merge(data: any, ...args: any[]): any {
    return Array.isArray(data) ? arr.merge(data, ...args) : obj.merge(data, ...args);
}

/**
 * * Safely adds an element/property at a specific index without mutating the original structure (Immutable).
 * @param data The source array or object.
 * @param arg1 The item to add (array) or the key to add (object).
 * @param arg2 The index (array) or the value to add (object).
 * @param arg3 The index (object only).
 * @returns A new array or object including the added element.
 */
function add<T>(array: T[], item: T, index?: number): T[];
function add<T extends Record<string, any>>(object: T, key: string, value: any, index?: number): T & Record<string, any>;
function add(data: any, arg1: any, arg2?: any, arg3?: any): any {
    return Array.isArray(data) ? arr.add(data, arg1, arg2) : obj.add(data, arg1, arg2, arg3);
}

/**
 * * Clears the array or object and returns a new empty one (Immutable).
 * @param data The array or object to clear.
 * @returns A new empty array `[]` or object `{}`.
 */
function clear<T>(array: T[]): T[];
function clear<T extends Record<string, any>>(object: T): Partial<T>;
function clear(data: any): any {
    return Array.isArray(data) ? arr.clear(data) : obj.clear(data);
}

/**
 * * Creates a new array or object containing ONLY the specified indices/keys (Allowlist).
 * @param data The source array or object.
 * @param keysOrIndices Array of keys (object) or indices (array) to keep.
 * @returns A new filtered array or object.
 */
function pick<T>(array: T[], indices: number[]): T[];
function pick<T extends object, K extends keyof T>(object: T, keys: K[]): Pick<T, K>;
function pick(data: any, keysOrIndices: any): any {
    return Array.isArray(data) ? arr.pick(data, keysOrIndices) : obj.pick(data, keysOrIndices);
}

/**
 * * Creates a new array or object containing all elements EXCEPT the specified indices/keys (Blocklist).
 * @param data The source array or object.
 * @param keysOrIndices Array of keys (object) or indices (array) to remove.
 * @returns A new filtered array or object.
 */
function omit<T>(array: T[], indices: number[]): T[];
function omit<T extends object, K extends keyof T>(object: T, keys: K[]): Omit<T, K>;
function omit(data: any, keysOrIndices: any): any {
    return Array.isArray(data) ? arr.omit(data, keysOrIndices) : obj.omit(data, keysOrIndices);
}

/**
 * * Safely retrieves a value from a nested array/object structure using dot-notation.
 * @param data The source array or object.
 * @param path The path string (e.g., 'settings.theme' or '0.profile.name').
 * @returns The found value or undefined if any part is missing.
 */
function get(array: any[], path: string): any;
function get(object: any, path: string): any;
function get(data: any, path: string): any {
    return Array.isArray(data) ? arr.get(data, path) : obj.get(data, path);
}

/**
 * * Sets a value deeply within a nested structure. Creates missing objects/arrays automatically.
 * @param data The array or object to modify.
 * @param path The path string (e.g., 'settings.theme').
 * @param value The value to set.
 */
function set(array: any[], path: string, value: any): void;
function set(object: any, path: string, value: any): void;
function set(data: any, path: string, value: any): void {
    return Array.isArray(data) ? arr.set(data, path, value) : obj.set(data, path, value);
}

// --- REMOVE NAMESPACE ---

/**
 * * Removes an entry/element at a specific index (Immutable).
 * @param data The source array or object.
 * @param index The index to remove (negative values count from the end).
 * @returns A new array or object without the specified element.
 */
function removeAt<T>(array: T[], index: number): T[];
function removeAt<T extends Record<string, any>>(object: T, index: number): Partial<T>;
function removeAt(data: any, index: number): any {
    return Array.isArray(data) ? arr.remove.at(data, index) : obj.remove.at(data, index);
}

/**
 * * Removes the first entry/element (Immutable).
 * @param data The source array or object.
 * @returns A new array or object without the first element.
 */
function removeFirst<T>(array: T[]): T[];
function removeFirst<T extends Record<string, any>>(object: T): Partial<T>;
function removeFirst(data: any): any {
    return Array.isArray(data) ? arr.remove.first(data) : obj.remove.first(data);
}

/**
 * * Removes the last entry/element (Immutable).
 * @param data The source array or object.
 * @returns A new array or object without the last element.
 */
function removeLast<T>(array: T[]): T[];
function removeLast<T extends Record<string, any>>(object: T): Partial<T>;
function removeLast(data: any): any {
    return Array.isArray(data) ? arr.remove.last(data) : obj.remove.last(data);
}

/**
 * * Removes all entries/elements matching a query condition (Immutable). Acts as an inverse filter.
 * @param data The source array or object.
 * @param query The search term.
 * @param mode Comparison mode ('exact', 'contains', 'startsWith', 'endsWith').
 * @returns A new array or object containing only the non-matching elements.
 */
function removeByMatch<T>(array: T[], query: string | number, mode?: MatchMode, key?: keyof T): T[];
function removeByMatch<T extends Record<string, any>>(object: T, query: string | number, mode?: MatchMode, searchBy?: 'key' | 'value'): Partial<T>;
function removeByMatch(data: any, query: any, mode?: any, keyOrSearchBy?: any): any {
    return Array.isArray(data) ? arr.remove.byMatch(data, query, mode, keyOrSearchBy) : obj.remove.byMatch(data, query, mode, keyOrSearchBy);
}

/**
 * * Removes a specific element by its index (arrays) or key (objects) (Immutable).
 * @param data The source array or object.
 * @param keyOrIndex The index or key string to remove.
 * @returns A new array or object without the specified property/element.
 */
function removeByKey<T>(array: T[], index: number): T[];
function removeByKey<T extends Record<string, any>>(object: T, key: string): Partial<T>;
function removeByKey(data: any, keyOrIndex: any): any {
    return Array.isArray(data) ? arr.remove.byKey(data, keyOrIndex as number) : obj.remove.byKey(data, keyOrIndex as string);
}

/**
 * * Removes all elements/entries that match a specific value exactly (Immutable).
 * @param data The source array or object.
 * @param value The exact value to remove (strict equality).
 * @returns A new array or object without the matching values.
 */
function removeByValue<T>(array: T[], value: T): T[];
function removeByValue<T extends Record<string, any>>(object: T, value: any): Partial<T>;
function removeByValue(data: any, value: any): any {
    return Array.isArray(data) ? arr.remove.byValue(data, value) : obj.remove.byValue(data, value);
}

// --- FIND NAMESPACE ---

/**
 * * Arrays: Finds the index of the first match. Objects: Returns the n-th [key, value] tuple.
 * @param data The array or object to search.
 * @param arg1 Query term (array) or numeric index (object).
 * @returns The index (array) or tuple (object), or undefined.
 */
function findAt<T>(array: T[], query: string | number, mode?: MatchMode, key?: keyof T): number;
function findAt(object: any, index: number): [string, any] | undefined;
function findAt(data: any, arg1: any, arg2?: any, arg3?: any): any {
    return Array.isArray(data) ? arr.find.at(data, arg1, arg2, arg3) : obj.find.at(data, arg1);
}

/**
 * * Returns ALL elements/entries matching the condition. Similar to filter().
 * @param data The array or object to search.
 * @param query The search term.
 * @param mode Comparison mode ('exact', 'contains', 'startsWith', 'endsWith').
 * @returns A new array or partial object containing the matching elements.
 */
function findAll<T>(array: T[], query: string | number, mode?: MatchMode, key?: keyof T): T[];
function findAll<T extends Record<string, any>>(object: T, query: string | number, mode?: MatchMode, searchBy?: 'key' | 'value'): Partial<T>;
function findAll(data: any, query: any, mode?: any, keyOrSearchBy?: any): any {
    return Array.isArray(data) ? arr.find.all(data, query, mode, keyOrSearchBy) : obj.find.all(data, query, mode, keyOrSearchBy);
}

/**
 * * Returns the FIRST matching element (array) or [key, value] tuple (object).
 * @param data The array or object to search.
 * @param query The search term.
 * @returns The found element/tuple or undefined.
 */
function findFirst<T>(array: T[], query: string | number, mode?: MatchMode, key?: keyof T): T | undefined;
function findFirst(object: any, query: string | number, mode?: MatchMode, searchBy?: 'key' | 'value'): [string, any] | undefined;
function findFirst(data: any, query: any, mode?: any, keyOrSearchBy?: any): any {
    return Array.isArray(data) ? arr.find.first(data, query, mode, keyOrSearchBy) : obj.find.first(data, query, mode, keyOrSearchBy);
}

/**
 * * Returns the LAST matching element (array) or [key, value] tuple (object). Searches in reverse.
 * @param data The array or object to search.
 * @param query The search term.
 * @returns The found element/tuple or undefined.
 */
function findLast<T>(array: T[], query: string | number, mode?: MatchMode, key?: keyof T): T | undefined;
function findLast(object: any, query: string | number, mode?: MatchMode, searchBy?: 'key' | 'value'): [string, any] | undefined;
function findLast(data: any, query: any, mode?: any, keyOrSearchBy?: any): any {
    return Array.isArray(data) ? arr.find.last(data, query, mode, keyOrSearchBy) : obj.find.last(data, query, mode, keyOrSearchBy);
}

/**
 * * Finds all matching indices (arrays) or keys (objects) based on the query.
 * @param data The array or object to search.
 * @param query The search term.
 * @returns An array of matching stringified keys/indices.
 */
function findKey<T>(array: T[], query: string, mode?: MatchMode): string[];
function findKey(object: any, query: string, mode?: MatchMode): string[];
function findKey(data: any, query: string, mode?: MatchMode): string[] {
    return Array.isArray(data) ? arr.find.key(data, query, mode) : obj.find.key(data, query, mode);
}

/**
 * * Finds all matching values within the array or object.
 * @param data The array or object to search.
 * @param query The search term.
 * @returns An array of matching values.
 */
function findValue<T>(array: T[], query: string, mode?: MatchMode): T[];
function findValue(object: any, query: string, mode?: MatchMode): any[];
function findValue(data: any, query: string, mode?: MatchMode): any[] {
    return Array.isArray(data) ? arr.find.value(data, query, mode) : obj.find.value(data, query, mode);
}

/**
 * * Finds the index (array) or key (object) of the first match based on the query condition.
 * @param data The array or object to search.
 * @param query The search term.
 * @returns The matching index/key or undefined.
 */
function findByMatch<T>(array: T[], query: string | number, mode?: MatchMode, key?: keyof T): number | undefined;
function findByMatch(object: any, query: string | number, mode?: MatchMode, searchBy?: 'key' | 'value'): string | undefined;
function findByMatch(data: any, query: any, mode?: any, keyOrSearchBy?: any): any {
    return Array.isArray(data) ? arr.find.byMatch(data, query, mode, keyOrSearchBy) : obj.find.byMatch(data, query, mode, keyOrSearchBy);
}

/**
 * * Central data utility object. 
 * * Dynamically routes to array or object methods based on input.
 * * Backward compatibility for strict calls is maintained via `.arr` and `.obj`.
 */
export const data = {
    arr,
    obj,
    chunk,
    merge,
    add,
    clear,
    empty: clear,
    pick,
    omit,
    get,
    set,
    remove: {
        at: removeAt,
        first: removeFirst,
        last: removeLast,
        byKey: removeByKey,
        byValue: removeByValue,
        byMatch: removeByMatch,
        all: clear
    },
    find: {
        at: findAt,
        all: findAll,
        first: findFirst,
        last: findLast,
        key: findKey,
        value: findValue,
        byMatch: findByMatch
    }
};
/**
 * @file src/modules/data/arrays.ts
 * @version 2.1.0
 * @since 2.0.0
 * @license GPL-3.0-or-later
 * @copyright Sven Minio 2026
 * @author Sven Minio <https://sven-minio.de>
 * @category Data
 * @description
 * * Utility functions for array manipulation and data processing.
 * @requires ./types
 * * Depends on types.
 */

import { MatchMode } from './types';

/**
 * * Splits an array into smaller groups (chunks). Ideal for pagination or grid layouts.
 * @example chunk([1, 2, 3, 4, 5], 2) => [[1, 2], [3, 4], [5]]
 * @template T The type of the items in the array.
 * @param array The source array.
 * @param size The size of each chunk.
 * @returns An array of arrays.
 */
export function chunk<T>(array: T[], size: number): T[][] {
    const chunks: T[][] = [];
    for (let i = 0; i < array.length; i += size) {
        chunks.push(array.slice(i, i + size));
    }
    return chunks;
}

/**
 * * Merges multiple arrays into a single flat array.
 * @example mergeArray([1, 2], [3, 4], [5]) => [1, 2, 3, 4, 5]
 * @template T The type of the items in the arrays.
 * @param arrays A list of arrays.
 * @returns A new, merged array.
 */
export function mergeArray<T>(...arrays: T[][]): T[] {
    return [].concat(...(arrays as any));
}

/**
 * * ALIAS for mergeArray (Consistency with object.merge)
 */
export const merge = mergeArray;

/**
 * * Safely adds an element at a specific position without mutating the original array (Immutable).
 * @example add([1, 2, 4], 3, 2) => [1, 2, 3, 4]
 * @template T The type of the items in the array.
 * @param array The array.
 * @param item The item to add.
 * @param index The position (default: end). Negative values count from the back (-1 = before the last one).
 * @returns A new array including the element.
 */
export function add<T>(array: T[], item: T, index: number = array.length): T[] {
    const copy = [...array];
    const idx = index < 0 ? array.length + index + 1 : index;
    copy.splice(idx, 0, item);
    return copy;
}

/**
 * * Clears the array and returns a new empty array (Immutable).
 * @example clear([1, 2, 3]) => []
 * @template T The type of the items in the array.
 * @param array The array to clear.
 * @returns A new empty array.
 */
export function clear<T>(array: T[]): T[] {
    return [];
}

/**
 * * ALIAS for clear.
 */
export const empty = clear;

/**
 * * Creates a new array containing only the elements at the specified indices (Allowlist).
 * * Mirrors object.pick.
 * @example pick(['a', 'b', 'c', 'd'], [0, 2]) => ['a', 'c']
 * @template T The type of the items in the array.
 * @param array The source array.
 * @param indices Array of indices to keep.
 * @returns A new array with selected elements.
 */
export function pick<T>(array: T[], indices: number[]): T[] {
    return array.filter((_, index) => indices.includes(index));
}

/**
 * * Creates a new array containing all elements EXCEPT those at the specified indices (Blocklist).
 * * Mirrors object.omit.
 * @example omit(['a', 'b', 'c', 'd'], [1, 3]) => ['a', 'c']
 * @template T The type of the items in the array.
 * @param array The source array.
 * @param indices Array of indices to remove.
 * @returns A new array without the specified elements.
 */
export function omit<T>(array: T[], indices: number[]): T[] {
    return array.filter((_, index) => !indices.includes(index));
}

/**
 * * Safely retrieves a value from a nested array/object structure (Safe Navigation).
 * * Mirrors object.get.
 * @example get(users, '0.profile.name') => Returns the name of the first user.
 * @param array The array.
 * @param path The path as a dot-notation string.
 * @returns The found value or undefined.
 */
export function get(array: any[], path: string): any {
    return path.split('.').reduce((acc, part) => acc && acc[part as keyof typeof acc], array);
}

/**
 * * Sets a value deeply within a nested array/object structure.
 * * Mirrors object.set.
 * @example set(users, '0.profile.name', 'Sven')
 * @param array The array to modify.
 * @param path The path as a string (e.g., '0.profile.name').
 * @param value The value to set.
 */
export function set(array: any[], path: string, value: any): void {
    const parts = path.split('.');
    let current: any = array;
    for (let i = 0; i < parts.length - 1; i++) {
        const part = parts[i];
        if (!current[part]) {
            current[part] = isNaN(Number(parts[i + 1])) ? {} : [];
        }
        current = current[part];
    }
    current[parts[parts.length - 1]] = value;
}

/**
 * * Removes elements based on index or match logic.
 */
export const remove = {
    /**
     * * Removes an element at a specific index.
     * @example remove.at([1, 2, 3, 4], -2) => [1, 2, 4]
     * @template T The type of the items in the array.
     * @param array The array.
     * @param index The index (negative values allowed).
     * @returns A new array with the element removed.
     */
    at<T>(array: T[], index: number): T[] {
        const copy = [...array];
        const idx = index < 0 ? array.length + index : index;
        if (idx >= 0 && idx < copy.length) {
            copy.splice(idx, 1);
        }
        return copy;
    },

    /**
     * * Removes the first element.
     * @example remove.first([1, 2, 3]) => [2, 3]
     * @template T The type of the items in the array.
     * @param array The array.
     */
    first<T>(array: T[]): T[] { return array.slice(1); },

    /**
     * * Removes the last element.
     * @example remove.last([1, 2, 3]) => [1, 2]
     * @template T The type of the items in the array.
     * @param array The array.
     */
    last<T>(array: T[]): T[] { return array.slice(0, -1); },

    /**
     * * Removes all elements matching a query condition.
     * @example remove.byMatch(users, 'Admin', 'exact', 'role')
     * @template T The type of the items in the array.
     * @param array The array.
     * @param query The search query.
     * @param mode The comparison mode ('exact', 'contains', 'startsWith', 'endsWith').
     * @param key (Optional) The object key if it is an array of objects.
     */
    byMatch<T>(array: T[], query: string | number, mode: MatchMode = 'exact', key?: keyof T): T[] {
        const queryStr = String(query).toLowerCase();
        return array.filter(item => {
            const val = key ? item[key] : item;
            const valStr = String(val).toLowerCase();
            switch (mode) {
                case 'exact': return valStr === queryStr;
                case 'startsWith': return valStr.startsWith(queryStr);
                case 'endsWith': return valStr.endsWith(queryStr);
                case 'contains': return valStr.includes(queryStr);
                default: return false;
            }
        });
    },

    /**
     * * Removes the element at a specific index.
     * * Mirrors object.remove.byKey.
     * @example remove.byKey(['a', 'b', 'c'], 1) => ['a', 'c']
     * @template T The type of the items in the array.
     * @param array The source array.
     * @param index The index (key) to remove.
     * @returns A new array without the specified index.
     */
    byKey<T>(array: T[], index: number): T[] {
        return this.at(array, index);
    },

    /**
     * * Removes all elements that match a specific value exactly (Strict Equality).
     * * Mirrors object.remove.byValue.
     * @example remove.byValue([1, 2, 1, 3], 1) => [2, 3]
     * @template T The type of the items in the array.
     * @param array The source array.
     * @param value The value to remove.
     * @returns A new array without the matching values.
     */
    byValue<T>(array: T[], value: T): T[] {
        return array.filter(item => item !== value);
    },

    /**
     * * ALIAS for clear. Removes all elements.
     * @param array The source array.
     * @returns A new, empty array.
     */
    all<T>(array: T[]): T[] {
        return clear(array);
    },
};

/**
 * * Searches for elements in the array.
 */
export const find = {
    /**
     * * Finds the index of the first match.
     * @example find.at(['apple', 'banana', 'cherry'], 'an', 'contains') => 1
     * @template T The type of the items in the array.
     * @param array The array.
     * @param query The search query.
     * @param mode The comparison mode ('exact', 'contains', 'startsWith', 'endsWith').
     * @param key (Optional) The object key if it is an array of objects.
     * @returns Index or -1.
     */
    at<T>(array: T[], query: string | number, mode: MatchMode = 'exact', key?: keyof T): number {
        const queryStr = String(query).toLowerCase();
        return array.findIndex(item => {
            const val = key ? item[key] : item;
            const valStr = String(val).toLowerCase();
            switch (mode) {
                case 'exact': return valStr === queryStr;
                case 'startsWith': return valStr.startsWith(queryStr);
                case 'endsWith': return valStr.endsWith(queryStr);
                case 'contains': return valStr.includes(queryStr);
                default: return false;
            }
        });
    },

    /**
     * * Returns all elements matching the condition (Filter).
     * @example find.all(['apple', 'banana', 'cherry'], 'a', 'contains') => ['apple', 'banana']
     * @template T The type of the items in the array.
     * @param array The array.
     * @param query The search query.
     * @param mode The comparison mode ('exact', 'contains', 'startsWith', 'endsWith').
     * @param key (Optional) The object key if it is an array of objects.
     * @returns All matching elements or -1.
     */
    all<T>(array: T[], query: string | number, mode: MatchMode = 'exact', key?: keyof T): T[] {
        const queryStr = String(query).toLowerCase();
        return array.filter(item => {
            const val = key ? item[key] : item;
            const valStr = String(val).toLowerCase();
            switch (mode) {
                case 'exact': return valStr === queryStr;
                case 'startsWith': return valStr.startsWith(queryStr);
                case 'endsWith': return valStr.endsWith(queryStr);
                case 'contains': return valStr.includes(queryStr);
                default: return false;
            }
        });
    },

    /**
     * * Returns the first matching element (or undefined).
     * @example find.first(['apple', 'banana', 'cherry'], 'a', 'contains') => 'apple'
     * @template T The type of the items in the array.
     * @param array The array.
     * @param query The search query.
     * @param mode The comparison mode ('exact', 'contains', 'startsWith', 'endsWith').
     * @param key (Optional) The object key if it is an array of objects.
     * @returns Index or -1.
     */
    first<T>(array: T[], query: string | number, mode: MatchMode = 'exact', key?: keyof T): T | undefined {
        const queryStr = String(query).toLowerCase();
        return array.find(item => {
            const val = key ? item[key] : item;
            const valStr = String(val).toLowerCase();
            switch (mode) {
                case 'exact': return valStr === queryStr;
                case 'startsWith': return valStr.startsWith(queryStr);
                case 'endsWith': return valStr.endsWith(queryStr);
                case 'contains': return valStr.includes(queryStr);
                default: return false;
            }
        });
    },

    /**
     * * Returns the last matching element (or undefined).
     * @example find.last(['apple', 'banana', 'cherry'], 'a', 'contains') => 'banana'
     * @template T The type of the items in the array.
     * @param array The array.
     * @param query The search query.
     * @param mode The comparison mode ('exact', 'contains', 'startsWith', 'endsWith').
     * @param key (Optional) The object key if it is an array of objects.
     * @returns Index or -1.
     */
    last<T>(array: T[], query: string | number, mode: MatchMode = 'exact', key?: keyof T): T | undefined {
        const queryStr = String(query).toLowerCase();
        return [...array].reverse().find(item => {
            const val = key ? item[key] : item;
            const valStr = String(val).toLowerCase();
            switch (mode) {
                case 'exact': return valStr === queryStr;
                case 'startsWith': return valStr.startsWith(queryStr);
                case 'endsWith': return valStr.endsWith(queryStr);
                case 'contains': return valStr.includes(queryStr);
                default: return false;
            }
        });
    },

    /**
     * * Finds all indices (keys) matching the query.
     * * Mirrors object.find.key(). For arrays, keys are the indices.
     * @param array The array to search.
     * @param query The search query.
     * @param mode The comparison mode.
     * @returns An array of matching indices as strings.
     */
    key<T>(array: T[], query: string, mode: MatchMode = 'exact'): string[] {
        const queryStr = String(query).toLowerCase();
        return Object.keys(array).filter(indexKey => {
            const valStr = String(indexKey).toLowerCase();
            switch (mode) {
                case 'exact': return valStr === queryStr;
                case 'startsWith': return valStr.startsWith(queryStr);
                case 'endsWith': return valStr.endsWith(queryStr);
                case 'contains': return valStr.includes(queryStr);
                default: return false;
            }
        });
    },

    /**
     * * Finds all values matching the query.
     * * Mirrors object.find.value(). Identical to find.all() for flat arrays.
     * @param array The array to search.
     * @param query The search query.
     * @param mode The comparison mode.
     * @returns An array of matching values.
     */
    value<T>(array: T[], query: string, mode: MatchMode = 'exact'): T[] {
        return this.all(array, query, mode);
    },

    /**
     * * Finds the key of the first match based on the query condition.
     * @example find.byMatch(users, 'Admin', 'exact', 'role') => 0
     * @template T The type of the items in the array.
     * @param array The array.
     * @param query The search query.
     * @param mode The comparison mode ('exact', 'contains', 'startsWith', 'endsWith').
     * @param key (Optional) The object key if it is an array of objects.
     * @returns Index or -1.
     */
    byMatch<T>(array: T[], query: string | number, mode: MatchMode = 'exact', key?: keyof T): number | undefined {
        const queryStr = String(query).toLowerCase();
        return array.findIndex(item => {
            const val = key ? item[key] : item;
            const valStr = String(val).toLowerCase();
            switch (mode) {
                case 'exact': return valStr === queryStr;
                case 'startsWith': return valStr.startsWith(queryStr);
                case 'endsWith': return valStr.endsWith(queryStr);
                case 'contains': return valStr.includes(queryStr);
                default: return false;
            }
        });
    }
};
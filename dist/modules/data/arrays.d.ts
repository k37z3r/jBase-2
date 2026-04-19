/**
 * @file src/modules/data/arrays.ts
 * @version 2.0.3
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
export declare function chunk<T>(array: T[], size: number): T[][];
/**
 * * Merges multiple arrays into a single flat array.
 * @example mergeArray([1, 2], [3, 4], [5]) => [1, 2, 3, 4, 5]
 * @template T The type of the items in the arrays.
 * @param arrays A list of arrays.
 * @returns A new, merged array.
 */
export declare function mergeArray<T>(...arrays: T[][]): T[];
/**
 * * Safely adds an element at a specific position without mutating the original array (Immutable).
 * @example add([1, 2, 4], 3, 2) => [1, 2, 3, 4]
 * @template T The type of the items in the array.
 * @param array The array.
 * @param item The item to add.
 * @param index The position (default: end). Negative values count from the back (-1 = before the last one).
 * @returns A new array including the element.
 */
export declare function add<T>(array: T[], item: T, index?: number): T[];
/**
 * * Removes elements based on index or match logic.
 */
export declare const remove: {
    /**
     * * Removes an element at a specific index.
     * @example remove.at([1, 2, 3, 4], -2) => [1, 2, 4]
     * @template T The type of the items in the array.
     * @param array The array.
     * @param index The index (negative values allowed).
     * @returns A new array with the element removed.
     */
    at<T>(array: T[], index: number): T[];
    /**
     * * Removes the first element.
     * @example remove.first([1, 2, 3]) => [2, 3]
     * @template T The type of the items in the array.
     * @param array The array.
     */
    first<T>(array: T[]): T[];
    /**
     * * Removes the last element.
     * @example remove.last([1, 2, 3]) => [1, 2]
     * @template T The type of the items in the array.
     * @param array The array.
     */
    last<T>(array: T[]): T[];
    /**
     * * Removes all elements matching a query condition.
     * @example remove.byMatch(users, 'Admin', 'exact', 'role')
     * @template T The type of the items in the array.
     * @param array The array.
     * @param query The search query.
     * @param mode The comparison mode ('exact', 'contains', 'startsWith', 'endsWith').
     * @param key (Optional) The object key if it is an array of objects.
     */
    byMatch<T>(array: T[], query: string | number, mode?: MatchMode, key?: keyof T): T[];
};
/**
 * * Searches for elements in the array.
 */
export declare const find: {
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
    at<T>(array: T[], query: string | number, mode?: MatchMode, key?: keyof T): number;
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
    all<T>(array: T[], query: string | number, mode?: MatchMode, key?: keyof T): T[];
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
    first<T>(array: T[], query: string | number, mode?: MatchMode, key?: keyof T): T | undefined;
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
    last<T>(array: T[], query: string | number, mode?: MatchMode, key?: keyof T): T | undefined;
    /**
     * * Removes all elements matching a query condition.
     * @example find.byMatch(users, 'Admin', 'exact', 'role') => 0
     * @template T The type of the items in the array.
     * @param array The array.
     * @param query The search query.
     * @param mode The comparison mode ('exact', 'contains', 'startsWith', 'endsWith').
     * @param key (Optional) The object key if it is an array of objects.
     * @returns Index or -1.
     */
    byMatch<T>(array: T[], query: string | number, mode?: MatchMode, key?: keyof T): number | undefined;
};
//# sourceMappingURL=arrays.d.ts.map
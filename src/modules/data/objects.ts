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

import { each } from 'src/utils';
import { MatchMode } from './types';

/**
 * * Checks if the provided value is a plain object (not null, not an array).
 * * Acts as a TypeScript Type Guard.
 * @private
 * @param item The value to check.
 * @returns True if the value is a plain object.
 */
function isObject(item: any): item is Record<string, any> {
    return (item && typeof item === 'object' && !Array.isArray(item));
}

/**
 * * Recursively merges multiple objects (Deep Merge).
 * @example mergeObjects({ a: 1, b: { x: 1 } }, { b: { y: 2 } }) => { a: 1, b: { x: 1, y: 2 } }
 * @param target The target object (will be modified!).
 * @param sources One or more source objects.
 * @returns The modified target object.
 */
export function mergeObjects(target: any, ...sources: any[]): any {
    if (!sources.length)
        return target;
    const source = sources.shift();

    if (isObject(target) && isObject(source)) {
        for (const key in source) {
            if (key === '__proto__' || key === 'constructor')
                continue;
            if (isObject(source[key])) {
                if (!target[key]) target[key] = {};
                mergeObjects(target[key], source[key]);
            } else {
                target[key] = source[key];
            }
        }
    }
    return mergeObjects(target, ...sources);
}

/**
 * * ALIAS for mergeObjects (Consistency with array.mergeArray)
 */
export const merge = mergeObjects;

/**
 * * Splits an object into an array of smaller objects (chunks). Ideal for batched processing.
 * @example chunk({a: 1, b: 2, c: 3}, 2) => [{a: 1, b: 2}, {c: 3}]
 * @param obj The source object.
 * @param size The maximum number of keys per chunk.
 * @returns An array of partial objects.
 */
export function chunk<T extends Record<string, any>>(obj: T, size: number): Partial<T>[] {
    const entries = Object.entries(obj);
    const chunks: Partial<T>[] = [];
    for (let i = 0; i < entries.length; i += size) {
        const slice = entries.slice(i, i + size);
        chunks.push(Object.fromEntries(slice) as Partial<T>);
    }
    return chunks;
}

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
export function add<T extends Record<string, any>>(obj: T, key: string, value: any, index: number = Object.keys(obj).length): T & Record<string, any> {
    const entries = Object.entries(obj);
    const idx = index < 0 ? entries.length + index + 1 : index;
    entries.splice(idx, 0, [key, value]);
    return Object.fromEntries(entries) as T & Record<string, any>;
}

/**
 * * Clears the object and returns a new empty object (Immutable).
 * @example clear({ a: 1, b: 2 }) => {}
 * @template T The type of the object.
 * @param obj The object to clear.
 * @returns A new empty object.
 */
export function clear<T extends Record<string, any>>(obj: T): Partial<T> {
    return {} as Partial<T>;
}

/**
 * * ALIAS for clear.
 */
export const empty = clear;

/**
 * * Creates a new object containing only the specified keys (Allowlist).
 * @example pick({ a: 1, b: 2, c: 3 }, ['a', 'c']) => { a: 1, c: 3 }
 * @param obj The source object.
 * @param keys Array of keys to keep.
 * @returns A new object with selected keys.
 */
export function pick<T extends object, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
    const ret: any = {};
    each(keys, function(_index, key) {
        if (key in obj) ret[key] = obj[key];
    });
    return ret as Pick<T, K>;
}

/**
 * * Creates a new object containing all keys EXCEPT the specified ones (Blocklist).
 * @example omit({ a: 1, b: 2, c: 3 }, ['b']) => { a: 1, c: 3 }
 * @param obj The source object.
 * @param keys Array of keys to remove.
 * @returns A new object without the specified keys.
 */
export function omit<T, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> {
    const ret = { ...obj };
    each(keys, function(_index, key) {
        delete ret[key];
    });
    return ret as Omit<T, K>;
}

/**
 * * Safely retrieves a value from a nested object (Safe Navigation).
 * @example get(config, 'settings.theme.color') => Returns the value of config.settings.theme.color or undefined if any part is missing.
 * @param obj The object.
 * @param path The path as a dot-notation string.
 * @returns The found value or undefined.
 */
export function get(obj: any, path: string): any {
    return path.split('.').reduce((acc, part) => acc && acc[part], obj);
}

/**
 * * Sets a value deeply within a nested object. Creates missing intermediate objects automatically.
 * @example set(config, 'settings.theme.color', 'dark') => Sets config.settings.theme.color to 'dark', creating objects if needed.
 * @param obj The object to modify.
 * @param path The path as a string (e.g., 'settings.theme.color').
 * @param value The value to set.
 */
export function set(obj: any, path: string, value: any): void {
    const parts = path.split('.');
    let current = obj;
    for (let i = 0; i < parts.length - 1; i++) {
        const part = parts[i];
        if (!current[part]) current[part] = {};
        current = current[part];
    }
    current[parts[parts.length - 1]] = value;
}

/**
 * * Removes elements from an object based on index or match logic (Immutable).
 * * Mirrors the array.remove API.
 */
export const remove = {
    /**
     * * Removes an entry at a specific index.
     * @example remove.at({a: 1, b: 2, c: 3}, -1) => {a: 1, b: 2}
     * @param obj The source object.
     * @param index The index (negative values allowed).
     * @returns A new object with the element removed.
     */
    at<T extends Record<string, any>>(obj: T, index: number): Partial<T> {
        const entries = Object.entries(obj);
        const idx = index < 0 ? entries.length + index : index;
        if (idx >= 0 && idx < entries.length) {
            entries.splice(idx, 1);
        }
        return Object.fromEntries(entries) as Partial<T>;
    },

    /**
     * * Removes the first entry from the object.
     * @param obj The source object.
     * @returns A new object without the first entry.
     */
    first<T extends Record<string, any>>(obj: T): Partial<T> {
        const entries = Object.entries(obj).slice(1);
        return Object.fromEntries(entries) as Partial<T>;
    },

    /**
     * * Removes the last entry from the object.
     * @param obj The source object.
     * @returns A new object without the last entry.
     */
    last<T extends Record<string, any>>(obj: T): Partial<T> {
        const entries = Object.entries(obj).slice(0, -1);
        return Object.fromEntries(entries) as Partial<T>;
    },

    /**
     * * Removes all entries matching a query condition.
     * @example remove.byMatch(config, 'hidden', 'exact', 'key')
     * @param obj The source object.
     * @param query The search query.
     * @param mode The comparison mode ('exact', 'contains', 'startsWith', 'endsWith').
     * @param searchBy Whether to search by 'key' or 'value' (default: 'key').
     * @returns A new object without the matching elements.
     */
    byMatch<T extends Record<string, any>>(obj: T, query: string | number, mode: MatchMode = 'exact', searchBy: 'key' | 'value' = 'key'): Partial<T> {
        const queryStr = String(query).toLowerCase();
        const filteredEntries = Object.entries(obj).filter(([key, val]) => {
            const target = searchBy === 'key' ? key : val;
            const valStr = String(target).toLowerCase();
            switch (mode) {
                case 'exact': return valStr !== queryStr;
                case 'startsWith': return !valStr.startsWith(queryStr);
                case 'endsWith': return !valStr.endsWith(queryStr);
                case 'contains': return !valStr.includes(queryStr);
                default: return true;
            }
        });
        return Object.fromEntries(filteredEntries) as Partial<T>;
    },

    /**
     * * Removes all entries that have a specific key.
     * @example remove.byKey({ a: 1, b: 2, c: 3 }, 'b') => { a: 1, c: 3 }
     * @param obj The source object.
     * @param key The key to remove.
     * @returns A new object without the specified key.
     */
    byKey<T extends Record<string, any>>(obj: T, key: string): Partial<T> {
        const ret = { ...obj };
        delete ret[key];
        return ret as Partial<T>;
    },

    /**
     * * Removes all entries that match a specific value exactly (Strict Equality).
     * @example remove.byValue({ a: 1, b: 2, c: 1 }, 1) => { b: 2 }
     * @param obj The source object.
     * @param value The value to remove.
     * @returns A new object without the matching values.
     */
    byValue<T extends Record<string, any>>(obj: T, value: any): Partial<T> {
        const filteredEntries = Object.entries(obj).filter(([_key, val]) => val !== value);
        return Object.fromEntries(filteredEntries) as Partial<T>;
    },

    /**
     * * ALIAS for clear. Removes all entries.
     * @param obj The source object.
     * @returns A new, empty object.
     */
    all<T extends Record<string, any>>(obj: T): Partial<T> {
        return clear(obj);
    },
};

/**
 * * Searches keys or values in the object.
 */
export const find = {
    /**
     * * Returns the n-th entry of an object as a [key, value] pair. Supports negative indices.
     * @example find.at({ a: 1, b: 2 }, 1) => ['b', 2]
     * @param obj The object to search.
     * @param index The index (0-based, negative counts from the back).
     * @returns A [key, value] tuple or undefined.
     */
    at(obj: any, index: number): [string, any] | undefined {
        const entries = Object.entries(obj);
        const idx = index < 0 ? entries.length + index : index;
        return entries[idx];
    },

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
    all<T extends Record<string, any>>(obj: T, query: string | number, mode: MatchMode = 'exact', searchBy: 'key' | 'value' = 'key'): Partial<T> {
        const queryStr = String(query).toLowerCase();
        const filteredEntries = Object.entries(obj).filter(([key, val]) => {
            const target = searchBy === 'key' ? key : val;
            const valStr = String(target).toLowerCase();
            switch (mode) {
                case 'exact': return valStr === queryStr;
                case 'startsWith': return valStr.startsWith(queryStr);
                case 'endsWith': return valStr.endsWith(queryStr);
                case 'contains': return valStr.includes(queryStr);
                default: return false;
            }
        });
        return Object.fromEntries(filteredEntries) as Partial<T>;
    },

    /**
     * * Finds the first entry where the key or value matches the query.
     * @example find.first(config, 'admin', 'exact', 'key')
     * @param obj The object to search.
     * @param query The search query.
     * @param mode The comparison mode ('exact', 'contains', 'startsWith', 'endsWith').
     * @param searchBy Whether to search by 'key' or 'value'.
     * @returns The first matching [key, value] pair or undefined.
     */
    first(obj: any, query: string | number, mode: MatchMode = 'exact', searchBy: 'key' | 'value' = 'key'): [string, any] | undefined {
        const entries = Object.entries(obj);
        const queryStr = String(query).toLowerCase();
        
        return entries.find(([key, val]) => {
            const target = searchBy === 'key' ? key : val;
            const valStr = String(target).toLowerCase();
            
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
     * * Finds the last entry where the key or value matches the query.
     * @example find.last(config, '.php', 'endsWith', 'key')
     * @param obj The object to search.
     * @param query The search query.
     * @param mode The comparison mode ('exact', 'contains', 'startsWith', 'endsWith').
     * @param searchBy Whether to search by 'key' or 'value'.
     * @returns The last matching [key, value] pair or undefined.
     */
    last(obj: any, query: string | number, mode: MatchMode = 'exact', searchBy: 'key' | 'value' = 'key'): [string, any] | undefined {
        const entries = Object.entries(obj);
        const queryStr = String(query).toLowerCase();

        return [...entries].reverse().find(([key, val]) => {
            const target = searchBy === 'key' ? key : val;
            const valStr = String(target).toLowerCase();
            
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
     * * Finds all keys matching the query.
     * @example find.key(config, 'api_', 'startsWith')
     * @param obj The object to search.
     * @param query The search query.
     * @param mode The comparison mode ('exact', 'contains', 'startsWith', 'endsWith').
     * @returns An array of matching keys.
     */
    key(obj: any, query: string, mode: MatchMode = 'exact'): string[] {
        const queryStr = String(query).toLowerCase();
        
        return Object.keys(obj).filter(key => {
            const valStr = String(key).toLowerCase();
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
     * @example find.value(config, 'enabled', 'exact')
     * @param obj The object to search.
     * @param query The search query.
     * @param mode The comparison mode ('exact', 'contains', 'startsWith', 'endsWith').
     * @returns An array of matching values.
     */
    value(obj: any, query: string, mode: MatchMode = 'exact'): any[] {
        const queryStr = String(query).toLowerCase();

        return Object.values(obj).filter(val => {
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
     * * Finds the key of the first match based on the query condition.
     * * Mirrors array.find.byMatch(). For objects, it returns the key instead of a numeric index.
     * @example find.byMatch(config, 'admin', 'exact', 'value') => 'role'
     * @param obj The object to search.
     * @param query The search query.
     * @param mode The comparison mode ('exact', 'contains', 'startsWith', 'endsWith').
     * @param searchBy Whether to search by 'key' or 'value' (default: 'key').
     * @returns The matched key as a string, or undefined if no match is found.
     */
    byMatch(obj: any, query: string | number, mode: MatchMode = 'exact', searchBy: 'key' | 'value' = 'key'): string | undefined {
        const queryStr = String(query).toLowerCase();
        const entries = Object.entries(obj);
        
        const found = entries.find(([key, val]) => {
            const target = searchBy === 'key' ? key : val;
            const valStr = String(target).toLowerCase();
            
            switch (mode) {
                case 'exact': return valStr === queryStr;
                case 'startsWith': return valStr.startsWith(queryStr);
                case 'endsWith': return valStr.endsWith(queryStr);
                case 'contains': return valStr.includes(queryStr);
                default: return false;
            }
        });
        
        return found ? found[0] : undefined;
    }
};
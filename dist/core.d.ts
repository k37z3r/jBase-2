/**
 * @file src/core.ts
 * @version 2.2.0
 * @since 2.0.0
 * @license GPL-3.0-or-later
 * @copyright Sven Minio 2026
 * @author Sven Minio <https://sven-minio.de>
 * @category Core
 * @description
 * * The main jBase class. Handles the selection engine, initialization, and plugin architecture.
 * @requires ./types
 * * Type definitions for the core class and its methods.
 */
import { JBaseElement, JBaseInput } from './types';
/**
 * * The core class of the framework, inheriting from the native Array class. Acts as a wrapper around DOM elements and enables chainable methods (Fluent Interface).
 */
export declare class jBase extends Array<JBaseElement> {
    /**
     * * The original selector string or input type used to create this instance.
     */
    selectorSource: string;
    /**
     * * The document context this instance is bound to (supports SSR via jsdom).
     */
    doc: Document;
    /**
     * * Initializes a new jBase instance. Analyzes the provided selector and populates the internal array with found or created DOM elements.
     * @param selector The input selector (CSS selector, HTML string, DOM element, or collection).
     * @param context An optional specific Document or Window context (essential for SSR).
     */
    constructor(selector?: JBaseInput, context?: Document | Window);
    /**
     * * Custom serializer for JSON.stringify. Prevents circular references and huge outputs by returning a simplified preview.
     * @example toJson() => { meta: 'jBase Wrapper', query: '#myId', count: 1, preview: ['div'] }
     * @returns A simplified object representation for debugging.
     */
    toJSON(): {
        meta: string;
        query: string;
        count: number;
        preview: string[];
    };
}
//# sourceMappingURL=core.d.ts.map
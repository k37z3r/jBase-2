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
import { sanitizeDangerousAttributes } from './utils';

/**
 * * The core class of the framework, inheriting from the native Array class. Acts as a wrapper around DOM elements and enables chainable methods (Fluent Interface).
 */
export class jBase extends Array<JBaseElement> {
    /**
     * * The original selector string or input type used to create this instance.
     */
    public selectorSource: string = '';

    /**
     * * The document context this instance is bound to (supports SSR via jsdom).
     */
    public doc: Document;

    /**
     * * Initializes a new jBase instance. Analyzes the provided selector and populates the internal array with found or created DOM elements.
     * @param selector The input selector (CSS selector, HTML string, DOM element, or collection).
     * @param context An optional specific Document or Window context (essential for SSR).
     */
    constructor(selector?: JBaseInput, context?: Document | Window) {
        super();

        if (context instanceof Document) {
            this.doc = context;
        } else if (context && (context as Window).document) {
            this.doc = (context as Window).document;
        } else {
            this.doc = (typeof document !== 'undefined') ? document : (null as any);
        }
        if (typeof document === 'undefined') {
            return;
        }
        this.selectorSource = typeof selector === 'string' ? selector : '<DOM Object/Array>';
        
        if (!selector)
            return;

        if (selector instanceof HTMLElement || selector === document || selector === window || selector instanceof Element) {
            this.push(selector);
        }
        else if (typeof selector === 'string') {
            const trimmed = selector.trim();
            if (trimmed.startsWith('<') && trimmed.endsWith('>')) {
                const tempDiv = this.doc.createElement('div');
                tempDiv.innerHTML = sanitizeDangerousAttributes(trimmed);
                this.push(...Array.from(tempDiv.children));
            }
            else if (trimmed.startsWith('#') && !trimmed.includes(' ') && !trimmed.includes('.')) {
                const el = this.doc.getElementById(trimmed.slice(1));
                if (el)
                    this.push(el);
            }
            else if (trimmed.startsWith('.') && !trimmed.includes(' ') && !/[:\[#]/.test(trimmed)) {
                const els = this.doc.getElementsByClassName(trimmed.slice(1));
                for (let i = 0; i < els.length; i++) {
                    this.push(els[i] as HTMLElement);
                }
            }
            else if (/^[a-zA-Z0-9]+$/.test(trimmed)) {
                const els = this.doc.getElementsByTagName(trimmed);
                for (let i = 0; i < els.length; i++) {
                    this.push(els[i] as HTMLElement);
                }
            }
            else {
                try {
                    this.push(...Array.from(this.doc.querySelectorAll(selector)));
                } catch (e) {
                    console.warn(`jBase: Invalid selector "${selector}"`, e);
                }
            }
        }
        else if (selector instanceof NodeList || Array.isArray(selector)) {
            this.push(...Array.from(selector as ArrayLike<JBaseElement>));
        }
    }

    /**
     * * Custom serializer for JSON.stringify. Prevents circular references and huge outputs by returning a simplified preview.
     * @example toJson() => { meta: 'jBase Wrapper', query: '#myId', count: 1, preview: ['div'] }
     * @returns A simplified object representation for debugging.
     */
    toJSON() {
        return {
            meta: 'jBase Wrapper',
            query: this.selectorSource,
            count: this.length,
            preview: this.slice(0, 10).map(el => {
                if (el instanceof Element)
                    return el.tagName.toLowerCase();
                return typeof el;
            })
        };
    }

    /**
     * * High-performance iteration over matched elements.
     * * Returning 'false' in the callback breaks the loop early.
     * @example each((el, index) => { console.log(el); if (index === 5) return false; }) => Logs the first 6 matched elements to the console.
     * @param callback The function to execute for each element. Context (`this`) is set to the current element.
     * @returns The current jBase instance for chaining.
     */
    each(callback: (this: JBaseElement, el: JBaseElement, index: number) => boolean | void): this {
        for (let i = 0, len = this.length; i < len; i++) {
            if (callback.call(this[i], this[i], i) === false) {
                break;
            }
        }
        return this;
    }
}
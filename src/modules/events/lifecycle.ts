/**
 * @file src/modules/events/lifecycle.ts
 * @version 2.0.3
 * @since 2.0.0
 * @license GPL-3.0-or-later
 * @copyright Sven Minio 2026
 * @author Sven Minio <https://sven-minio.de>
 * @category Events
 * @description
 * * Methods for handling DOM lifecycle events (e.g., ready).
 * @requires ../../core
 * * Depends on the core jBase class for type definitions.
 */

import { jBase } from '../../core';

/**
 * * Executes the handler as soon as the DOM is fully loaded and parsed. If the document is already ready (readyState 'interactive' or 'complete'), the handler executes immediately to avoid race conditions.
 * @example ready(handler) => Binds a handler to execute when the DOM is ready.
 * @param handler The callback function to execute when the DOM is ready.
 * @returns The current jBase instance for method chaining.
 */
export function ready(this: jBase, handler: () => void): jBase {
    const doc = window.document;
    if (doc.readyState === 'complete' || doc.readyState === 'interactive') {
        handler();
    } else {
        this.on('DOMContentLoaded', handler);
    }
    return this;
}
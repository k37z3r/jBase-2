/**
 * @file src/browser.ts
 * @version 2.2.1
 * @since 2.0.0
 * @license GPL-3.0-or-later
 * @copyright Sven Minio 2026
 * @author Sven Minio <https://sven-minio.de>
 * @category Browser
 * @description
 * * Browser Entry Point. Attaches the jBase library and utilities to the global window object 
 * * so they can be accessed via `$` or `jBase` (and other aliases) in inline scripts.
 * @requires ./index
 * * The core jBase class and its aliases are imported to be attached to the window object.
 */

import { $, jBase, jB, _jB, __jB, _jBase, __jBase, __ } from './index';

/**
 * * TypeScript declaration merging to extend the global Window interface.
 * * Ensures strict typing when accessing jBase aliases on the window object.
 */
declare global {
    interface Window {
        $: typeof $;
        jBase: typeof jBase;
        jB: typeof jB;
        _jB: typeof _jB;
        __jB: typeof __jB;
        _jBase: typeof _jBase;
        __jBase: typeof __jBase;
        __: typeof __;
    }
}

/**
 * * Expose the framework instance and its aliases to the global window object.
 */
(window as any).$ = $;
(window as any).jBase = jBase;
(window as any).jB = jB;
(window as any)._jB = _jB;
(window as any).__jB = __jB;
(window as any)._jBase = _jBase;
(window as any).__jBase = __jBase;
(window as any).__ = __;

console.log("jBase initialized and ready!");
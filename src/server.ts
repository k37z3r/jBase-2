/**
 * @file src/index.ts
 * @version 2.0.3
 * @since 2.0.0
 * @license GPL-3.0-or-later
 * @copyright Sven Minio 2026
 * @author Sven Minio <https://sven-minio.de>
 * @category Entry Point
 * @description
 * * Server-Side Rendering (SSR) utilities using JSDOM.
 */
import { JSDOM } from 'jsdom';
import { bind } from './index';

/**
 * * Parses an HTML string on the server, allowing DOM manipulation.
 * @param html The raw HTML string.
 * @returns An object containing the window, document, and the jBase instance setup.
 */
export function parseHTML(html: string) {
    const dom = new JSDOM(html);
    const win = dom.window as unknown as Window;
    const my$ = bind(win);
    return {
        $: my$,
        document: win.document,
        window: win,
        html: () => dom.serialize(),
        close: () => win.close()
    };
}
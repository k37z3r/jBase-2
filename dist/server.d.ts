/**
 * * Parses an HTML string on the server, allowing DOM manipulation.
 * @param html The raw HTML string.
 * @returns An object containing the window, document, and the jBase instance setup.
 */
export declare function parseHTML(html: string): {
    $: (selector: import("./types").JBaseInput) => import("./core").jBase;
    document: Document;
    window: Window;
    html: () => string;
    close: () => void;
};
//# sourceMappingURL=server.d.ts.map
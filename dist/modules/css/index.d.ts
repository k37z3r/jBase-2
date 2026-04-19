/**
 * @file src/modules/css/index.ts
 * @version 2.0.3
 * @since 2.0.0
 * @license GPL-3.0-or-later
 * @copyright Sven Minio 2026
 * @author Sven Minio <https://sven-minio.de>
 * @category CSS
 * @description
 * * Central entry point for CSS operations. Aggregates class and style manipulation methods.
 * @requires ./classes
 * * Class manipulation methods (addClass, removeClass, etc.).
 * @requires ./styles
 * * Style manipulation methods (css).
 */
/**
 * * Aggregation of all CSS methods. This object bundles functions for class manipulation and style manipulation. It is exported to extend the jBase prototype centrally via Object.assign.
 */
export declare const cssMethods: {
    css(this: import("../..").JBaseClass, property: string | Record<string, string | number>, value?: string | number): string | import("../..").JBaseClass;
    addClass(this: import("../..").JBaseClass, ...classNames: string[]): import("../..").JBaseClass;
    removeClass(this: import("../..").JBaseClass, ...classNames: string[]): import("../..").JBaseClass;
    toggleClass(this: import("../..").JBaseClass, className: string): import("../..").JBaseClass;
    hasClass(this: import("../..").JBaseClass, className: string): boolean;
};
//# sourceMappingURL=index.d.ts.map
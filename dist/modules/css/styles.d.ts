/**
 * @file src/modules/css/styles.ts
 * @version 2.0.3
 * @since 2.0.0
 * @license GPL-3.0-or-later
 * @copyright Sven Minio 2026
 * @author Sven Minio <https://sven-minio.de>
 * @category CSS
 * @description
 * * Methods for getting and setting inline CSS styles.
 * @requires ../../core
 * * Depends on the core jBase class for type definitions.
 */
import { jBase } from '../../core';
/**
 * * Gets a CSS property value from the first element or sets one/multiple CSS properties for all elements.
 * @param property
 * * A CSS property name as a string, or an object of property-value pairs to set multiple styles.
 * @param value
 * * (Optional) The value to set if `property` is a string. If undefined and `property` is a string, acts as a getter.
 * @returns
 * * The CSS value as a string when reading, or the jBase instance when writing.
 */
export declare function css(this: jBase, property: string | Record<string, string | number>, value?: string | number): string | jBase;
//# sourceMappingURL=styles.d.ts.map
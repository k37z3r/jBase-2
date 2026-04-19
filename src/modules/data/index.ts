/**
 * @file src/modules/data/index.ts
 * @version 2.0.3
 * @since 2.0.0
 * * @license GPL-3.0-or-later
 * @copyright Sven Minio 2026
 * @author Sven Minio <https://sven-minio.de>
 * @category Data
 * @description
 * * Central entry point for data manipulation modules. Aggregates array and object utilities.
 * @requires ./arrays
 * * Array manipulation methods.
 * @requires ./objects
 * * Object manipulation methods.
 */

import * as arrayMethods from './arrays';
import * as objectMethods from './objects';

/**
 * * Central data utility object. Bundles array ('arr') and object ('obj') manipulation methods.
 */
export const data = {
    arr: arrayMethods,
    obj: objectMethods
};
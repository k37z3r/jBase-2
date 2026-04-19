/**
 * @file src/modules/dom/index.ts
 * @version 2.0.3
 * @since 2.0.0
 * @license GPL-3.0-or-later
 * @copyright Sven Minio 2026
 * @author Sven Minio <https://sven-minio.de>
 * @category DOM
 * @description
 * * Central entry point for DOM operations. Aggregates methods for attributes, content, manipulation, traversal, and states.
 * @requires ./attributes
 * * Attribute and value manipulation.
 * @requires ./content
 * * Content handling (html, text).
 * @requires ./manipulation
 * * DOM manipulation (append, remove, etc.).
 * @requires ./traversal
 * * Tree traversal (find, parent, children).
 * @requires ./states
 * * State checks (checked, disabled).
 */

import * as attributeMethods from './attributes';
import * as contentMethods from './content';
import * as manipulationMethods from './manipulation';
import * as traversalMethods from './traversal';
import * as stateMethods from './states';

/**
 * * Aggregation of all DOM methods. Bundles specialized sub-modules into a single interface. Used to extend the jBase prototype centrally via Object.assign.
 */
export const domMethods = {
    ...attributeMethods,
    ...contentMethods,
    ...manipulationMethods,
    ...traversalMethods,
    ...stateMethods
};
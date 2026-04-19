/**
 * @file src/modules/effects/index.ts
 * @version 2.0.3
 * @since 2.0.0
 * @license GPL-3.0-or-later
 * @copyright Sven Minio 2026
 * @author Sven Minio <https://sven-minio.de>
 * @category Effects
 * @description
 * * Central entry point for visual effects. Aggregates slide, fade, and vertical animation modules.
 * @requires ./slide
 * * Horizontal slide effects (slideIn, slideOut).
 * @requires ./vertical
 * * Vertical slide effects / Accordion (slideDown, slideUp).
 * @requires ./fade
 * * Opacity fade effects (fadeIn, fadeOut).
 */

import * as slideMethods from './slide';
import * as verticalMethods from './vertical';
import * as fadeMethods from './fade';

/**
 * * Aggregation of all visual effect methods. Bundles sliding and fading animations to extend the jBase prototype.
 */
export const effectMethods = {
    ...slideMethods,
    ...verticalMethods,
    ...fadeMethods
};
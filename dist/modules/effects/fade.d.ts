/**
 * @file src/modules/effects/fade.ts
 * @version 2.1.0
 * @since 2.0.0
 * @license GPL-3.0-or-later
 * @copyright Sven Minio 2026
 * @author Sven Minio <https://sven-minio.de>
 * @category Effects
 * @description
 * * Methods for fading elements in and out (fadeIn, fadeOut, fadeToggle).
 * @requires ../../core
 * * Depends on the core jBase class for type definitions.
 * @requires ../../utils
 * * Uses utility functions for environment checks.
 * @requires ./types
 * * Type definitions for fade options.
 */
import { jBase } from '../../core';
import { FadeOptions } from './types';
/**
 * * Fades an element in (Opacity 0 -> 1).
 * @example fadeIn() => Fades in all matched elements over 300ms with display: block.
 * @example fadeIn({ duration: 500, displayType: 'inline-block' }) => Fades in all matched elements over 500ms with display: inline-block.
 * @param options Duration in ms (default: 300) and display type (default: 'block').
 * @returns The current jBase instance.
 */
export declare function fadeIn(this: jBase, options?: FadeOptions): jBase;
/**
 * * Fades an element out (Opacity 1 -> 0) and sets display: none afterwards.
 * @example fadeOut() => Fades out all matched elements over 300ms with display: none.
 * @example fadeOut({ duration: 500 }) => Fades out all matched elements over 500ms with display: none.
 * @param options Duration in ms (default: 300).
 * @returns The current jBase instance.
 */
export declare function fadeOut(this: jBase, options?: FadeOptions): jBase;
/**
 * * Toggles between fadeIn and fadeOut based on the current display state.
 * @example fadeToggle() => Fades in hidden elements and fades out visible elements over 300ms.
 * @example fadeToggle({ duration: 500 }) => Fades in hidden elements and fades out visible elements over 500ms.
 * @param options Animation options.
 * @returns The current jBase instance.
 */
export declare function fadeToggle(this: jBase, options?: FadeOptions): jBase;
/**
 * * ALIAS for fadeIn.
 */
export declare const show: typeof fadeIn;
/**
 * * ALIAS for fadeOut.
 */
export declare const hide: typeof fadeOut;
/**
 * * ALIAS for fadeToggle.
 */
export declare const toggle: typeof fadeToggle;
//# sourceMappingURL=fade.d.ts.map
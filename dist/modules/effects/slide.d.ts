/**
 * @file src/modules/effects/slide.ts
 * @version 2.0.3
 * @since 2.0.0
 * @license GPL-3.0-or-later
 * @copyright Sven Minio 2026
 * @author Sven Minio <https://sven-minio.de>
 * @category Effects
 * @description
 * * Methods for horizontal sliding effects (slideIn, slideOut, slideToggle).
 * @requires ../../core
 * * Depends on the core jBase class for type definitions.
 * @requires ../../utils
 * * Uses utility functions for environment checks.
 * @requires ./types
 * * Type definitions for slide options.
 */
import { jBase } from '../../core';
import { SlideOptions } from './types';
/**
 * * Slides an element (e.g., a menu) into view. Sets `transform: translateX(0)`.
 * @example slideIn() => Slides in all matched elements over 300ms.
 * @example slideIn({ duration: 500 }) => Slides in all matched elements over 500ms.
 * @param options Direction ('left'|'right') and duration in ms.
 * @returns The current jBase instance.
 */
export declare function slideIn(this: jBase, options?: SlideOptions): jBase;
/**
 * * Slides an element out of view.
 * @example slideOut() => Slides out all matched elements to the left over 300ms.
 * @example slideOut({ direction: 'right', duration: 500 }) => Slides out all matched elements to the right over 500ms.
 * @param options Direction ('left'|'right') and duration in ms.
 * @returns The current jBase instance.
 */
export declare function slideOut(this: jBase, options?: SlideOptions): jBase;
/**
 * * Toggles between slideIn and slideOut based on the current state.
 * @example slideToggle() => Slides in hidden elements and slides out visible elements to the left over 300ms.
 * @example slideToggle({ direction: 'right', duration: 500 }) => Slides in hidden elements and slides out visible elements to the right over 500ms.
 * @param options Direction ('left'|'right') and duration in ms.
 * @returns The current jBase instance.
 */
export declare function slideToggle(this: jBase, options?: SlideOptions): jBase;
//# sourceMappingURL=slide.d.ts.map
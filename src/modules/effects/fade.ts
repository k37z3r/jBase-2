/**
 * @file src/modules/effects/fade.ts
 * @version 2.1.1
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
import { isBrowser } from '../../utils';
import { FadeOptions } from './types';

/**
 * * Fades an element in (Opacity 0 -> 1).
 * @example fadeIn() => Fades in all matched elements over 300ms with display: block.
 * @example fadeIn({ duration: 500, displayType: 'inline-block' }) => Fades in all matched elements over 500ms with display: inline-block.
 * @example fadeIn(500) => Fades in over 500ms.
 * @param options Duration in ms (default: 300) and display type (default: 'block').
 * @returns The current jBase instance.
 */
export function fadeIn(this: jBase, options: FadeOptions | number = {}): jBase {
    if (!isBrowser()) return this;
    const duration = typeof options === 'number' ? options : (options.duration || 300);
    const displayType = typeof options === 'object' && options.displayType ? options.displayType : 'block';
    let easing = typeof options === 'object' && options.easing ? options.easing : 'ease-in-out';
    if (typeof options === 'object' && options.bounce) {
        easing = 'cubic-bezier(0.175, 0.885, 0.32, 1.275)'; 
    }
    this.each((el) => {
        if (el instanceof HTMLElement) {
            if ((el as any)._jbaseFadeTimer) clearTimeout((el as any)._jbaseFadeTimer);

            el.style.opacity = '0';
            el.style.display = displayType;
            el.style.transition = `opacity ${duration}ms ${easing}, transform ${duration}ms ${easing}`;

            if (typeof options === 'object' && options.bounce) {
                el.style.transform = 'scale(0.95)';
            }

            void el.offsetHeight;
            
            requestAnimationFrame(() => {
                el.style.opacity = '1';
                el.style.transform = 'scale(1)';
            });

            (el as any)._jbaseFadeTimer = setTimeout(() => {
                el.style.transition = '';
                if (!(typeof options === 'object' && options.bounce)) el.style.transform = '';
                delete (el as any)._jbaseFadeTimer;
            }, duration);
        }
    });
    return this;
}

/**
 * * Fades an element out (Opacity 1 -> 0) and sets display: none afterwards.
 * @example fadeOut() => Fades out all matched elements over 300ms with display: none.
 * @example fadeOut({ duration: 500 }) => Fades out all matched elements over 500ms with display: none.
 * @example fadeOut(500) => Fades out over 500ms.
 * @param options Duration in ms (default: 300).
 * @returns The current jBase instance.
 */
export function fadeOut(this: jBase, options: FadeOptions | number = {}): jBase {
    if (!isBrowser()) return this;

    const duration = typeof options === 'number' ? options : (options.duration || 300);
    let easing = typeof options === 'object' && options.easing ? options.easing : 'ease-in-out';

    if (typeof options === 'object' && options.bounce) {
        easing = 'cubic-bezier(0.6, -0.28, 0.735, 0.045)';
    }

    this.each((el) => {
        if (el instanceof HTMLElement) {
            if ((el as any)._jbaseFadeTimer) clearTimeout((el as any)._jbaseFadeTimer);

            el.style.transition = `opacity ${duration}ms ${easing}, transform ${duration}ms ${easing}`;
            void el.offsetHeight;
            
            requestAnimationFrame(() => {
                el.style.opacity = '0';
                if (typeof options === 'object' && options.bounce) {
                    el.style.transform = 'scale(0.95)';
                }
            });

            (el as any)._jbaseFadeTimer = setTimeout(() => {
                el.style.display = 'none';
                el.style.transition = '';
                el.style.transform = '';
                delete (el as any)._jbaseFadeTimer;
            }, duration);
        }
    });
    return this;
}

/**
 * * Toggles between fadeIn and fadeOut based on the current display state.
 * @example fadeToggle() => Fades in hidden elements and fades out visible elements over 300ms.
 * @example fadeToggle({ duration: 500 }) => Fades in hidden elements and fades out visible elements over 500ms.
 * @example fadeToggle({ duration: 500, displayType: 'inline-block' }) => Fades in all matched elements over 500ms with display: inline-block.
 * @example fadeToggle(500) => Fades in over 500ms.
 * @param options Animation options.
 * @returns The current jBase instance.
 */
export function fadeToggle(this: jBase, options: FadeOptions | number = {}): jBase {
    if (!isBrowser()) return this;
    this.each((el) => {
        if (el instanceof HTMLElement) {
            const display = window.getComputedStyle(el).display;
            const wrapper = new (this.constructor as any)(el);
            if (display === 'none') {
                wrapper.fadeIn(options);
            } else {
                wrapper.fadeOut(options);
            }
        }
    });
    return this;
}

/**
 * * ALIAS for fadeIn.
 */
export const show = fadeIn;

/**
 * * ALIAS for fadeOut.
 */
export const hide = fadeOut;

/**
 * * ALIAS for fadeToggle.
 */
export const toggle = fadeToggle;

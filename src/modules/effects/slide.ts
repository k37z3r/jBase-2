/**
 * @file src/modules/effects/slide.ts
 * @version 2.0.4
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

import { isBrowser } from '../../utils';
import { jBase } from '../../core';
import { SlideOptions } from './types';



/**
 * * Slides an element (e.g., a menu) into view. Sets `transform: translateX(0)`.
 * @example slideIn() => Slides in all matched elements over 300ms.
 * @example slideIn({ duration: 500 }) => Slides in all matched elements over 500ms.
 * @example slideIn(500) => Slides in over 500ms.
 * @param options Direction ('left'|'right') and duration in ms.
 * @returns The current jBase instance.
 */
export function slideIn(this: jBase, options: SlideOptions | number = {}): jBase {
    if (!isBrowser()) return this;

    const duration = typeof options === 'number' ? options : (options.duration || 300);
    const direction = typeof options === 'object' && options.direction ? options.direction : 'left';
    const startTranslate = direction === 'left' ? '-100%' : '100%';

    let easing = typeof options === 'object' && options.easing ? options.easing : 'cubic-bezier(0.4, 0.0, 0.2, 1)';
    if (typeof options === 'object' && options.bounce) {
        easing = 'cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    }

    this.each((el) => {
        if (el instanceof HTMLElement) {
            el.style.willChange = 'transform';
            if (!el.style.transform || el.style.transform === 'translateX(0%)') {
                el.style.transition = 'none';
                el.style.transform = `translateX(${startTranslate})`;
                void el.offsetHeight;
            }
            el.style.transition = `transform ${duration}ms ${easing}`;

            requestAnimationFrame(() => {
                el.style.transform = 'translateX(0%)';
            });

            el.setAttribute('data-slide-state', 'open');
        }
    });
    return this;
}

/**
 * * Slides an element out of view.
 * @example slideOut() => Slides out all matched elements to the left over 300ms.
 * @example slideOut({ direction: 'right', duration: 500 }) => Slides out all matched elements to the right over 500ms.
 * @example slideOut(500) => Slides out to the left over 500ms.
 * @param options Direction ('left'|'right') and duration in ms.
 * @returns The current jBase instance.
 */
export function slideOut(this: jBase, options: SlideOptions | number = {}): jBase {
    if (!isBrowser()) return this;

    const duration = typeof options === 'number' ? options : (options.duration || 300);
    const direction = typeof options === 'object' && options.direction ? options.direction : 'left';
    
    const translateValue = direction === 'left' ? '-100%' : '100%';

    let easing = typeof options === 'object' && options.easing ? options.easing : 'cubic-bezier(0.4, 0.0, 0.2, 1)';
    if (typeof options === 'object' && options.bounce) {
        easing = 'cubic-bezier(0.6, -0.28, 0.735, 0.045)';
    }

    this.each((el) => {
        if (el instanceof HTMLElement) {
            el.style.willChange = 'transform';
            el.style.transition = `transform ${duration}ms ${easing}`;

            requestAnimationFrame(() => {
                el.style.transform = `translateX(${translateValue})`;
            });

            el.setAttribute('data-slide-state', 'closed');
        }
    });
    return this;
}

/**
 * * Toggles between slideIn and slideOut based on the current state.
 * @example slideToggle() => Slides in hidden elements and slides out visible elements to the left over 300ms.
 * @example slideToggle({ direction: 'right', duration: 500 }) => Slides in hidden elements and slides out visible elements to the right over 500ms.
 * @param options Direction ('left'|'right') and duration in ms.
 * @returns The current jBase instance.
 */
export function slideToggle(this: jBase, options: SlideOptions | number = {}): jBase {
    if (!isBrowser()) return this;

    this.each((el) => {
        if (el instanceof HTMLElement) {
            const state = el.getAttribute('data-slide-state');
            const currentTransform = el.style.transform;

            const wrapper = new (this.constructor as any)(el);

            if (state === 'open' || currentTransform === 'translateX(0%)') {
                wrapper.slideOut(options);
            } else {
                wrapper.slideIn(options);
            }
        }
    });
    return this;
}
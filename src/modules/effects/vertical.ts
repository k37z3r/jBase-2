/**
 * @file src/modules/effects/vertical.ts
 * @version 2.0.3
 * @since 2.0.0
 * @license GPL-3.0-or-later
 * @copyright Sven Minio 2026
 * @author Sven Minio <https://sven-minio.de>
 * @category Effects
 * @description
 * * Methods for vertical sliding effects (slideDown, slideUp, slideToggle).
 * @requires ../../core
 * * Depends on the core jBase class for type definitions.
 * @requires ../../utils
 * * Utility function to check for browser environment.
 * @requires ./types
 * * Type definitions for effect options.
 */

import { isBrowser } from '../../utils';
import { jBase } from '../../core';
import { SlideVerticalOptions } from './types';

/**
 * * Slides an element down (animates height from 0 to auto). Sets `display` property and animates height.
 * @example slideDown() => Slides down all matched elements over 300ms with display: block.
 * @example slideDown({ duration: 500, displayType: 'inline-block' }) => Slides down all matched elements over 500ms with display: inline-block.
 * @param options Animation duration and display type.
 * @returns The current jBase instance.
 */
export function slideDown(this: jBase, options: SlideVerticalOptions = {}): jBase {
    if (!isBrowser())
        return this;
    const { duration = 300, displayType = 'block' } = options;

    this.each(function(el) {
        if (el instanceof HTMLElement) {
            if (window.getComputedStyle(el).display !== 'none')
                return;

            el.style.display = displayType;
            const height = el.scrollHeight;

            el.style.height = '0px';
            el.style.overflow = 'hidden'; 
            el.style.transition = `height ${duration}ms ease-in-out`;

            void el.offsetHeight;

            el.style.height = `${height}px`;

            setTimeout(() => {
                el.style.height = 'auto';
                el.style.overflow = 'visible';
                el.style.transition = '';
            }, duration);
        }
    });
    return this;
}

/**
 * * Slides an element up (animates height to 0). Sets `display: none` after animation.
 * @example slideUp() => Slides up all matched elements over 300ms with display: none.
 * @example slideUp({ duration: 500 }) => Slides up all matched elements over 500ms with display: none.
 * @param options Animation duration.
 * @returns The current jBase instance.
 */
export function slideUp(this: jBase, options: SlideVerticalOptions = {}): jBase {
    if (!isBrowser())
        return this;
    const { duration = 300 } = options;

    this.each(function(el) {
        if (el instanceof HTMLElement) {
            el.style.height = `${el.scrollHeight}px`;
            el.style.overflow = 'hidden';
            el.style.transition = `height ${duration}ms ease-in-out`;

            void el.offsetHeight;

            el.style.height = '0px';

            setTimeout(() => {
                el.style.display = 'none';
                el.style.height = '';
                el.style.overflow = '';
                el.style.transition = '';
            }, duration);
        }
    });
    return this;
}

/**
 * * Toggles between slideDown and slideUp based on the display state.
 * @example slideToggle() => Slides in hidden elements and slides out visible elements over 300ms.
 * @example slideToggle({ duration: 500 }) => Slides in hidden elements and slides out visible elements over 500ms.
 * @param options Animation duration.
 * @returns The current jBase instance.
 */
export function slideToggleBox(this: jBase, options: SlideVerticalOptions = {}): jBase {
    if (!isBrowser())
        return this;
    this.each(function(el) {
        if (el instanceof HTMLElement) {
            const display = window.getComputedStyle(el).display;
            const wrapper = new (this.constructor as any)(el);

            if (display === 'none') {
                wrapper.slideDown(options);
            } else {
                wrapper.slideUp(options);
            }
        }
    });
    return this;
}
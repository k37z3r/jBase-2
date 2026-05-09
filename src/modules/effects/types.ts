/**
 * @file src/modules/data/types.ts
 * @version 2.0.3
 * @since 2.0.2
 * @license GPL-3.0-or-later
 * @copyright Sven Minio 2026
 * @author Sven Minio <https://sven-minio.de>
 * @category Data
 * @description
 * * Type definitions and validation helpers for data structures.
 */

/**
 * * Configuration options for fade effects.
 */
export interface FadeOptions {
    duration?: number;
    displayType?: string;
    easing?: string;
    bounce?: boolean;
}

/**
 * * Configuration interface for slide methods.
 */
export interface SlideOptions {
    direction?: 'left' | 'right';
    duration?: number;
    easing?: string;
    bounce?: boolean;
}

/**
 * * Configuration options for vertical slide effects.
 */
export interface SlideVerticalOptions {
    duration?: number;
    displayType?: string;
    easing?: string;
    bounce?: boolean;
}
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
/**
 * * Aggregation of all visual effect methods. Bundles sliding and fading animations to extend the jBase prototype.
 */
export declare const effectMethods: {
    fadeIn(this: import("../..").JBaseClass, options?: import("./types").FadeOptions): import("../..").JBaseClass;
    fadeOut(this: import("../..").JBaseClass, options?: import("./types").FadeOptions): import("../..").JBaseClass;
    fadeToggle(this: import("../..").JBaseClass, options?: import("./types").FadeOptions): import("../..").JBaseClass;
    slideDown(this: import("../..").JBaseClass, options?: import("./types").SlideVerticalOptions): import("../..").JBaseClass;
    slideUp(this: import("../..").JBaseClass, options?: import("./types").SlideVerticalOptions): import("../..").JBaseClass;
    slideToggleBox(this: import("../..").JBaseClass, options?: import("./types").SlideVerticalOptions): import("../..").JBaseClass;
    slideIn(this: import("../..").JBaseClass, options?: import("./types").SlideOptions): import("../..").JBaseClass;
    slideOut(this: import("../..").JBaseClass, options?: import("./types").SlideOptions): import("../..").JBaseClass;
    slideToggle(this: import("../..").JBaseClass, options?: import("./types").SlideOptions): import("../..").JBaseClass;
};
//# sourceMappingURL=index.d.ts.map
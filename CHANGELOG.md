# Changelog

All notable changes to this project will be documented in this file.

## [2.0.1] - 2026-02-04

* **ReadMe (`README.md`):** Updated ReadMe for better understanding 


## [2.0.2] - 2026-02-08

### 🚀 Added (SSR & Architecture)

* **Server-Side Rendering (SSR):** Full support for Node.js environments via `jsdom`.
* Added `src/server.ts` with `parseHTML` utility.
* Added `bind(window)` factory in `src/index.ts` to create isolated jBase instances per request.


* **Context Awareness:** The core `jBase` class now accepts an optional `context` (Window/Document) in the constructor to support isolated environments.
* **Environment Detection:** Added `isBrowser()` utility in `src/utils.ts` to safely distinguish between browser and server environments.

### ⚡ Performance

* **Data Module (`data/objects.ts`):** Optimized search algorithms in `find.first`, `find.last`, `find.key`, and `find.value`. moved query normalization (`toLowerCase()`) outside of loops to significantly reduce CPU overhead.
* **Effects Module:** Added server-guards (`if (!isBrowser())`) to `fade.ts`, `slide.ts`, and `vertical.ts`. Animation logic is now skipped on the server to save resources.

### 🛡️ Fixed (Stability & Logic)

* **Core (`core.ts`):** Added crash protection for invalid CSS selectors. `$(...)` now catches `DOMException` errors internally and logs a warning instead of crashing.
* **DOM Manipulation (`dom/manipulation.ts`):**
* Rewrote `unwrap()` using a `Set` to safely handle parent removal without conflicts on sibling elements.
* Replaced global `window.document` usage with a `getDoc(this)` helper to prevent `ReferenceError` crashes in Node.js.


* **HTTP Module (`http/*.ts`):** Fixed potential crash when parsing JSON from `200 OK` responses that contain an empty body.
* **CSS Module (`css/styles.ts`):** Updated `css()` getter to access `getComputedStyle` via `el.ownerDocument` instead of global `window`.

### 🔧 Changed & Cleaned

* **Documentation:** Removed localized German JSDoc comments to reduce source code size and maintain a consistent English-only documentation standard.
* **Config:** Fixed invalid JSON syntax in `tsconfig.json`.
* **Type Safety:** Upgraded `isObject` utility to a TypeScript Type Guard for better type inference.


## [2.0.3] - 2026-02-13

### 🛡️ Fixed (http)

* **HTTP Module (`http/get.ts`):** Enforce GET method in get() and getText() utility. Overrides method to 'GET' if 'POST' is passed in options.
* **HTTP Module (`http/post.ts`):** Enforce POST method in post() utility. Overrides method to 'POST' if 'GET' is passed in options.


## [2.1.1] - 2026-02-22

### 🚀 Added (DOM Attributes)

* **Attributes Module (`dom/attributes.ts`):** Added `removeAttr()` method to safely remove HTML attributes from all elements in a selection.
* **Attributes Module (`dom/attributes.ts`):** Added `prop()` method for getting and setting underlying DOM properties (e.g., `checked`, `disabled`, `selectedIndex`) that don't directly map to standard HTML attributes.

### 🛡️ Fixed (CSS & HTTP)

* **CSS Module (`css/styles.ts`):** Enhanced the `css()` method to support passing an object (`Record<string, string | number>`) for setting multiple CSS properties simultaneously (e.g., `css({'background-color': 'blue', 'font-size': '14px'})`). 
* **CSS Module (`css/styles.ts`):** Improved handling of kebab-case property names inside the `css()` method by utilizing `style.setProperty()` for greater robustness.
* **HTTP Module (`http/get.ts`):** Fixed a critical bug in `getText()` where it incorrectly attempted to parse the response with `JSON.parse()` instead of returning the raw text. It now safely returns the raw string/HTML as intended.

## [2.1.2] - 2026-02-22

### 🛡️ Fixed (Core & Browser Scope)

* **Core (`src/index.ts`):** Fixed an architectural bug where the `http` and `data` modules were not accessible via the main `$` wrapper (e.g., `$.http` or `$.data`) as documented in the wiki. They are now properly attached to the `init` factory function using `Object.assign()`.
* **Browser Module (`src/browser.ts`):** Removed the unintended global `window.http` export to prevent global namespace pollution. The HTTP module must now be accessed exclusively through the framework instance (e.g., `$.http` or `jBase.http`).

## [2.2.0] - 2026-04-12

### 🚀 Added (New Features)
* **Event System (`events/binding.ts`):** * Massive upgrade to the `.on()` and `.off()` methods. They now fully support **Event Delegation** (e.g., `$('table').on('click', 'tr', handler)`) and passing custom data to the event object (`event.data`).
  * Added `.once()` method to execute a handler at most once per element and event type. Supports delegation and data.
  * Added `.trigger()` method to programmatically execute native or custom events and pass optional data via `event.detail`.
* **Touch Events (`events/touch.ts`):** Added `.swipeLeft()`, `.swipeUp()` `.swipeDown()` and `.swipeRight()` helpers for robust mobile gesture detection.
* **Mouse Events (`events/mouse.ts`):** Added `.hover()` as a convenient shorthand for binding both `mouseenter` and `mouseleave` handlers.
* **Core Utilities (`utils.ts` & `index.ts`):** * Introduced `$.each()`, a highly performant, breakable iteration utility for arrays, NodeLists, and plain objects.
  * `$.throttle` and `$.debounce` are now globally exposed on the main `$` object for easy access.

### ⚡ Performance
* **Core (`core.ts`):** Implemented a high-performance, native `for`-loop iteration method (`.each()`) inside the core class. Replaced standard `forEach` calls across the entire framework (DOM, CSS, Attributes, etc.) to significantly reduce CPU overhead and allow early loop termination.

### 🛡️ Fixed (Stability & Architecture)
* **SSR Safety (`core.ts`):** Fixed a critical bug in the constructor where string selectors would fall back to the global `document` instead of the passed isolated `context` (`this.doc`). Node.js environments are now completely safe.
* **Event Delegation (`events/binding.ts`):** Fixed a potential `TypeError` crash during event delegation when a user clicks on a pure `TextNode` (which lacks the `.closest()` method).
* **Typings (`index.ts`):** Fixed signature mismatch for `.prop()` to correctly handle getter (`any`) and setter (`jBase`) overloads.
* **Dependencies (`package.json`):** Moved `jsdom` and `tslib` from standard `dependencies` to `peerDependencies` / `devDependencies`. This drastically reduces the installation size for browser-only users via npm.
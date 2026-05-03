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

## [2.3.0] - 2026-04-20

### 🚀 Added (Upload Method)
* **HTTP Module:** Added `$.http.upload()` method. This introduces a modern, Promise-based wrapper around `XMLHttpRequest` specifically designed for file uploads. It solves the native limitation of the `fetch` API by allowing real-time upload progress tracking via an `onProgress` callback, while maintaining the same elegant `async/await` syntax as the rest of the HTTP module.

## [2.4.0] - 2026-05-03

### 🚀 Added (Dynamic Routing & API Symmetry)
* **Data Module (`data/index.ts`):** Introduced a smart, dynamic API router (Facade). You no longer need to explicitly specify `.arr` or `.obj` when calling data utilities.
  * Methods can now be called directly on the main data namespace (e.g., `$.data.chunk()`, `$.data.remove.at()`).
  * The framework automatically detects the input type under the hood (`Array.isArray()`) and routes the request to the correct underlying module.
  * Full TypeScript overloads guarantee perfect IntelliSense and type safety depending on whether you pass an array or an object.
  * *Note: Explicit calls via `.arr` and `.obj` remain fully supported for 100% backward compatibility.*
* **Data Module (`data/objects.ts`):** Massive expansion of object utilities to mirror the array API.
  * Added `chunk()` for objects to split a large object into an array of smaller objects (batched processing).
  * Added `add()` for safely injecting a key-value pair at a specific index position.
  * Added `remove.at()`, `remove.first()`, `remove.last()`, `remove.byKey()`, `remove.byValue()`, and `remove.byMatch()` to immutably remove properties from an object based on complex queries or exact matches.
  * Added `find.all()` to return a partial object containing only the properties that match a specific query.
  * Aliased `merge` to `mergeObjects` to ensure naming consistency across the data module.
* **Data Module (`data/arrays.ts`):** Expanded array utilities to mirror the object API.
  * Added `get()` and `set()` for safe, deep navigation and assignment within nested arrays.
  * Added `find.key()` and `find.value()` to provide identical method signatures between arrays and objects.
  * Added `pick()` and `omit()` to immutably extract or remove array elements based on a list of specific indices.
  * Added `remove.byKey()` and `remove.byValue()` for strict API parity with object removals.

### 🚀 Added (DOM Content)
* **DOM Module (`dom/content.ts`):** Added `.load(url)` method. This provides a highly requested, classic shortcut to asynchronously fetch HTML from a server and inject it directly into the matched DOM elements. Under the hood, it seamlessly utilizes the robust `$.http.getText()` utility.

### ⚡ Performance & Logic
* **Data Module (`data/arrays.ts` & `data/objects.ts`):** 
  * All search queries within `find` and `remove` methods are now executed in a case-insensitive manner by default.
  * Both modules are now completely symmetrical, utilizing the same internal `MatchMode` logic (`'exact'`, `'contains'`, `'startsWith'`, `'endsWith'`) for predictable data extraction.

### 🧹 Cleaned & Utility
* **Data Module (`data/arrays.ts` & `data/objects.ts`):** 
  * Added `clear()` (along with aliases `empty()` and `remove.all()`) to both modules. These methods provide a fast, standardized way to return a new, empty element of the respective type (`[]` or `{}`) without mutating the original data structure, adhering to the framework's functional design principles.
* **Effects Module (`effects/fade.ts`):** Added `show()`, `hide()` and `toggle()`, as semantic aliases for `fadeIn()`, `fadeOut()` and `fadeToggle()`. This provides a more intuitive, classic API for developers used to standard DOM visibility toggling, while maintaining the smooth CSS transition logic under the hood.
* **DOM Module (`dom/states.ts`):** Added semantic action aliases for state manipulation. You can now use `.check()`, `.uncheck()`, `.select()`, `.disable()`, and `.enable()` as highly readable, chainable alternatives to passing boolean values into `.checked()`, `.selected()`, and `.disabled()`.

### 🛡️ Secured (XSS Protection & Architecture)
* **Core Utilities (`utils.ts`):** Introduced a centralized, high-performance XSS sanitizer (`sanitizeDangerousAttributes`). This internal utility aggressively strips dangerous inline event handlers (like `onerror`) and malicious protocols (like `href="javascript:..."`) from raw HTML strings.
* **Core (`core.ts`):** Hardened the main `jBase` constructor. Creating new DOM elements via `$('<div...>')` now passes the string through the central sanitizer, ensuring "secure-by-default" behavior even when handling untrusted user input.
* **DOM Manipulation (`dom/manipulation.ts`):** Secured all structural insertion methods (`append`, `prepend`, `before`, `after`, `wrap`, and `replaceWith`). Any raw HTML strings passed into these methods are now automatically sanitized before being injected into the DOM, closing the backdoor for XSS injections.
* **DOM Content (`dom/content.ts`):** Completely overhauled the injection logic for `.html()` and `.load()`. They now inherit the strict XSS sanitization by default. To maintain full framework flexibility for trusted sources, we introduced the `{ executeScripts: true }` bypass, which safely extracts, injects, and evaluates embedded `<script>` tags on demand.
# jBase
![Package Version][package-version-badge]
![Build][build-badge]
![Size][size-badge]
![License][license-badge]

![SSR Ready][ssr-ready-badge]
![Browser Ready][browser-ready-badge]
![Exports][exports-badge]

![NPM][available-badge-npm]
![GITHUB][available-badge-github]
![jsDelivr][cdn-badge-jsdelivr]
![Statically][cdn-badge-statically]

**A modern, lightweight, and modular JavaScript framework for high-performance DOM manipulation, event handling, and data management.**

jBase offers a familiar chainable API (similar to jQuery) but is built on modern ES6+ standards. It goes beyond UI logic by including a robust set of immutable data utilities and **full Server-Side Rendering (SSR) support**.

---

## 📥 Installation

### via NPM / Yarn
Ideal for modern web apps using bundlers (Vite, Webpack) or Node.js.

```bash
npm install @k37z3r/jbase
# or
yarn add @k37z3r/jbase
```

### via Script Tag (CDN)

Simply download the minified file and include it in your HTML.

```html
<script src="dist/jbase.min.js"></script>
```

-- OR --

via CDN
```html
<!-- CDN: jsDelivr @latest Version -->
<script src="https://cdn.jsdelivr.net/npm/@k37z3r/jbase/dist/jbase.min.js"></script>

<!-- CDN: Statically @latest version -->
<script src="https://cdn.statically.io/npm/@k37z3r/jbase/dist/jbase.min.js"></script>

<!-- CDN: jsDelivr @2.2.0 Version -->
<script src="https://cdn.jsdelivr.net/gh/k37z3r/jBase-2@2.2.0/dist/jbase.min.js"></script>

<!-- CDN: Statically @2.2.0 Version -->
<script src="https://cdn.statically.io/gh/k37z3r/jBase-2@2.2.0/dist/jbase.min.js"></script>

<!-- Use one of the examples above. You can find further examples in the jsDelivr or Statically documentation -->
```

---

## 🖥️ Server-Side Rendering (SSR) & Node.js

jBase is **isomorphic**. You can use the exact same code on the client and the server.
To use DOM manipulation in Node.js, simply bind jBase to a `jsdom` window instance.

### 1. Install JSDOM (Optional Peer Dependency)

```bash
npm install jsdom
```

### 2. Bind to a Virtual Window

Use the `bind` factory to create a jBase instance scoped to a specific request or document.

```javascript
import { JSDOM } from 'jsdom';
import { bind } from '@k37z3r/jbase'; // Adjust to your package name

// 1. Create a virtual DOM environment
const dom = new JSDOM('<!DOCTYPE html><div id="app"></div>');
const window = dom.window;

// 2. Create a scoped instance of jBase
const $ = bind(window);

// 3. Manipulate the DOM exactly like in the browser
$('#app')
    .addClass('ssr-rendered')
    .html('<h1>Hello from Node.js!</h1>')
    .append('<p>This HTML was generated on the server.</p>');

// 4. Output the final HTML string
console.log(dom.serialize());
```

> [!NOTE]
> Browser-only features like animations (`fadeIn`, `slideUp`) or Event Bindings (`click`) are **safely ignored** in Node.js environments to prevent crashes and save resources.

---

## 🚀 Client-Side Features

jBase exposes itself globally as `jBase` and the shorthand `$`.

### 1. DOM & Effects

```javascript
$(document).ready(() => {
    // Event Handling
    $('button.save').on('click', (e) => {
        e.preventDefault();
        
        // Chained manipulation & Animation
        $('.notification')
            .addClass('success')
            .text('Saved successfully!')
            .fadeIn(300);
    });
});
```

### 2. Powerful Data Utilities

jBase includes a unique `$.data` module for **immutable** array and object manipulation. Optimized for high performance.

```javascript
const users = [
    { id: 1, name: 'Alice', role: 'admin' },
    { id: 2, name: 'Bob', role: 'user' }
];

// Find specific data efficiently (Optimized Search)
const admin = $.data.find.first(users, 'admin', 'exact', 'role');

// Remove data immutably (returns a new array)
const nonAdmins = $.data.remove.byMatch(users, 'admin', 'exact', 'role');
```

### 3. HTTP Requests

Simple, robust AJAX wrappers that handle JSON automatically.

```javascript
$.http.get('https://api.example.com/items')
    .then(data => console.log('Items loaded:', data))
    .catch(err => console.error('Error:', err));
```

---

## 📚 Documentation

Detailed documentation for all methods is available in the **[GitHub Wiki](../../wiki)** or offline **[Documentation](./wiki)**.

---

## 📄 License

**jBase** is open-source software licensed under the **[GPL-3.0-or-later](LICENSE)**.

**Author:** Sven Minio

**Website:** [sven-minio.de](https://sven-minio.de)

**Copyright:** © 2026 Sven Minio

[available-badge-npm]: https://img.shields.io/badge/available%20on-npm-CB3837?style=flat-square&logo=npm
[available-badge-github]: https://img.shields.io/badge/available%20on-GitHub-181717CB3837?style=flat-square&logo=github
[cdn-badge-jsdelivr]: https://img.shields.io/badge/CDN-jsDelivr-E84D3D?style=flat-square&logo=jsdelivr
[cdn-badge-statically]: https://img.shields.io/badge/CDN-Statically-ea6545?style=flat-square&logo=data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYuNjc1bW0iIGhlaWdodD0iMTYuNjc1bW0iIGNsaXAtcnVsZT0iZXZlbm9kZCIgZmlsbC1ydWxlPSJldmVub2RkIiBpbWFnZS1yZW5kZXJpbmc9Im9wdGltaXplUXVhbGl0eSIgc2hhcGUtcmVuZGVyaW5nPSJnZW9tZXRyaWNQcmVjaXNpb24iIHRleHQtcmVuZGVyaW5nPSJnZW9tZXRyaWNQcmVjaXNpb24iIHZpZXdCb3g9IjAgMCA0NDUuNjcgNDQ1LjMzIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxsaW5lYXJHcmFkaWVudCBpZD0iYSIgeDE9IjExMC42NyIgeDI9IjMzNC4zMiIgeTE9IjQxNC44IiB5Mj0iMzAuMTkiIGdyYWRpZW50VHJhbnNmb3JtPSJ0cmFuc2xhdGUoMCwxNTU1LjcpIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHN0b3Agc3RvcC1jb2xvcj0iI2Q3MjQzMCIgb2Zmc2V0PSIwIi8+PHN0b3Agc3RvcC1jb2xvcj0iI2ZkYTI1OSIgb2Zmc2V0PSIxIi8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLjMzNDI3IC0xNTU2KSI+PHBhdGggZD0ibTMwIDE2NjYuN2M2Mi0xMDcgMTk4LTE0MyAzMDQtODEgMTA3IDYyIDE0MyAxOTggODEgMzA0LTYyIDEwNy0xOTggMTQzLTMwNCA4MS0xMDctNjItMTQzLTE5OC04MS0zMDR6IiBmaWxsPSJ1cmwoI2EpIi8+PGcgdHJhbnNmb3JtPSJtYXRyaXgoMS4yMTk0IC4xMTIzNiAtLjExMjkyIDEuMjI1NSAtMjIuMjUxIDE0NzguNCkiIHN0cm9rZT0iI2ZlZmVmZSIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLXdpZHRoPSIyMy4wNDEiPjxnIHN0cm9rZT0iI2ZlZmVmZSIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLXdpZHRoPSIyMy4wNDEiPjxwYXRoIGQ9Ik0yODMgMjI2bC00Ny0xOSA3NC0xMDVMMTU2IDIyMmw1MiAxOC03MyAxMDZ6IiBmaWxsPSIjZmVmZWZlIiBzdHJva2U9IiNmZWZlZmUiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS13aWR0aD0iMjMuMDQxIi8+PC9nPjwvZz48L2c+PC9zdmc+
[package-version-badge]: https://img.shields.io/github/package-json/v/k37z3r/jBase-2/main?style=flat-square&label=version
[ssr-ready-badge]: https://img.shields.io/badge/SSR-Ready-brightgreen?style=flat-square
[browser-ready-badge]: https://img.shields.io/badge/Browser-Ready-4CAF50?style=flat-square
[exports-badge]: https://img.shields.io/badge/exports-.js%20%7C%20.mjs%20%7C%20.cjs%20%7C%20.d.ts-007ec6?style=flat-square
[license-badge]: https://img.shields.io/badge/license-GPL--3.0-green.svg?style=flat-square
[size-badge]: https://img.shields.io/badge/size-lightweight-orange.svg?style=flat-square
[build-badge]: https://img.shields.io/badge/build-passing-brightgreen.svg?style=flat-square

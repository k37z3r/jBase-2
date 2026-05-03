# Welcome to the jBase Documentation

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

**jBase** is a modern, modular, and lightweight JavaScript framework designed for high-performance DOM manipulation, event handling, and data management. It serves as a robust alternative to legacy libraries, built with modern ES6+ standards.

---

## 🚀 Getting Started

New to jBase? Start here to get up and running quickly.

* **[Installation & Setup](Installation)**
    * Learn how to include jBase via Script Tag or NPM/Bundlers.
* **[Quick Start Guide](Quick-Start)**
    * Basic usage examples to get you started in minutes.

---

## 📚 API Reference

Explore the comprehensive documentation for all jBase modules.

### 🌲 DOM & UI
Manage your interface with powerful traversal and manipulation tools.

* **DOM Traversal**
    * `find`, `closest`, `parent`, `children`, `siblings`, `next`, `prev`...
* **DOM Manipulation**
    * `append`, `prepend`, `remove`, `html`, `text`, `wrap`, `replaceWith`...
* **Attributes & States**
    * `attr`, `val`, `data`, `checked`, `disabled`, `selected`...
* **CSS & Styling**
    * `css`, `addClass`, `removeClass`, `toggleClass`, `hasClass`...
* and many more...

### ⚡ Interaction & Effects
Bring your application to life with events and animations.

* **Event Handling**
    * **Bindings:** `on`, `off`, `once`
    * **Mouse/Touch:** `click`, `touchmove`, `mousemove`...
    * **Keyboard:** `keydown`, `pressedkey`...
    * **Forms:** `submit`, `change`, `input`...
* **Effects & Animations**
    * `fadeIn`, `fadeOut`, `slideDown`, `slideUp`, `slideToggle`...
* and many more...

### 🌐 Network
Communicate with servers easily.

* **HTTP Client**
    * `get`, `post`, `getText` (Promise-based AJAX wrappers).

### 🛠 Data Utilities
Advanced helpers for complex data structures (Immutable & Type-Safe).

* **Array Utilities**
    * **Manage:** `chunk`, `mergeArray`, `add`
    * **Immutable Remove:** `remove.at`, `remove.byMatch`...
    * **Search:** `find.at`, `find.all`, `find.first`...
* **Object Utilities**
    * **Manage:** `mergeObjects`, `pick`, `omit`
    * **Deep Access:** `get` (dot-notation), `set`
    * **Search:** `find.key`, `find.value`, `find.first`...
* **General Utilities**
    * `$.each`, `$.throttle`, `$.debounce`

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

## 🤝 Contributing & Support

* Found a bug? [Open an Issue](../issues)
* Back to Repository: [jBase Repo](../)

---
*© 2026 Sven Minio. Licensed under GPL-3.0.*

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
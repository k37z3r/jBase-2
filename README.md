# jBase

![Version](https://img.shields.io/badge/version-2.3.0-blue.svg?style=flat-square)
![License](https://img.shields.io/badge/license-GPL--3.0-green.svg?style=flat-square)
![Size](https://img.shields.io/badge/size-lightweight-orange.svg?style=flat-square)
![Build](https://img.shields.io/badge/build-passing-brightgreen.svg?style=flat-square)

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
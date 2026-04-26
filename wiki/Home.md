# Welcome to the jBase Documentation

![Version](https://img.shields.io/badge/version-2.3.0-blue.svg?style=flat-square)
![License](https://img.shields.io/badge/license-GPL--3.0-green.svg?style=flat-square)
![Lightweight](https://img.shields.io/badge/size-lightweight-orange.svg?style=flat-square)

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

* Found a bug? [Open an Issue](../../issues)
* Back to Repository: [jBase Repo](../../)

---
*© 2026 Sven Minio. Licensed under GPL-3.0.*
/**
 * @k37z3r/jbase - A modern micro-framework for the web: jBase offers the familiar syntax of classic DOM libraries, but without their baggage. Fully typed, modular, and optimized for modern browser engines.
 * @version 2.1.1
 * @homepage https://github.com/k37z3r/jBase-2
 * @author Sven Minio (https://github.com/k37z3r/jBase-2)
 * @license GPL-3.0-or-later
 * @copyright 2026 Sven Minio (https://github.com/k37z3r/jBase-2)
 */
"use strict";
(() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __esm = (fn, res) => function __init() {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
  };
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };

  // src/core.ts
  var jBase;
  var init_core = __esm({
    "src/core.ts"() {
      "use strict";
      /**
       * @file src/core.ts
       * @version 2.0.2
       * @since 2.0.0
       * @license GPL-3.0-or-later
       * @copyright Sven Minio 2026
       * @author Sven Minio <https://sven-minio.de>
       * @category Core
       * @description
       * * The main jBase class. Handles the selection engine, initialization, and plugin architecture.
       */
      jBase = class extends Array {
        selectorSource = "";
        doc;
        /**
         * * Initializes a new jBase instance. Analyzes the provided selector and populates the internal array with found or created DOM elements.
         * @param selector
         * * The input selector (CSS selector, HTML string, DOM element, or collection).
         */
        constructor(selector, context) {
          super();
          if (context instanceof Document) {
            this.doc = context;
          } else if (context && context.document) {
            this.doc = context.document;
          } else {
            this.doc = typeof document !== "undefined" ? document : null;
          }
          if (typeof document === "undefined") {
            return;
          }
          this.selectorSource = typeof selector === "string" ? selector : "<DOM Object/Array>";
          if (!selector)
            return;
          if (selector instanceof HTMLElement || selector === document || selector === window || selector instanceof Element) {
            this.push(selector);
          } else if (typeof selector === "string") {
            const trimmed = selector.trim();
            if (trimmed.startsWith("<") && trimmed.endsWith(">")) {
              const tempDiv = document.createElement("div");
              tempDiv.innerHTML = trimmed;
              this.push(...Array.from(tempDiv.children));
            } else if (trimmed.startsWith("#") && !trimmed.includes(" ") && !trimmed.includes(".")) {
              const el = document.getElementById(trimmed.slice(1));
              if (el)
                this.push(el);
            } else if (trimmed.startsWith(".") && !trimmed.includes(" ") && !/[:\[#]/.test(trimmed)) {
              const els = document.getElementsByClassName(trimmed.slice(1));
              for (let i = 0; i < els.length; i++) {
                this.push(els[i]);
              }
            } else if (/^[a-zA-Z0-9]+$/.test(trimmed)) {
              const els = document.getElementsByTagName(trimmed);
              for (let i = 0; i < els.length; i++) {
                this.push(els[i]);
              }
            } else {
              try {
                this.push(...Array.from(document.querySelectorAll(selector)));
              } catch (e) {
                console.warn(`jBase: Invalid selector "${selector}"`, e);
              }
            }
          } else if (selector instanceof NodeList || Array.isArray(selector)) {
            this.push(...Array.from(selector));
          }
        }
        /**
         * * Custom serializer for JSON.stringify. Prevents circular references and huge outputs by returning a simplified preview.
         * @returns
         * * A simplified object representation for debugging.
         */
        toJSON() {
          return {
            meta: "jBase Wrapper",
            query: this.selectorSource,
            count: this.length,
            preview: this.slice(0, 10).map((el) => {
              if (el instanceof Element)
                return el.tagName.toLowerCase();
              return typeof el;
            })
          };
        }
      };
    }
  });

  // src/modules/css/classes.ts
  var classes_exports = {};
  __export(classes_exports, {
    addClass: () => addClass,
    hasClass: () => hasClass,
    removeClass: () => removeClass,
    toggleClass: () => toggleClass
  });
  function addClass(...classNames) {
    this.forEach((el) => {
      if (el instanceof Element) el.classList.add(...classNames);
    });
    return this;
  }
  function removeClass(...classNames) {
    this.forEach((el) => {
      if (el instanceof Element) el.classList.remove(...classNames);
    });
    return this;
  }
  function toggleClass(className) {
    this.forEach((el) => {
      if (el instanceof Element) el.classList.toggle(className);
    });
    return this;
  }
  function hasClass(className) {
    return this.some((el) => {
      return el instanceof Element && el.classList.contains(className);
    });
  }
  var init_classes = __esm({
    "src/modules/css/classes.ts"() {
      "use strict";
      /**
       * @file src/modules/css/classes.ts
       * @version 2.0.2
       * @since 2.0.0
       * @license GPL-3.0-or-later
       * @copyright Sven Minio 2026
       * @author Sven Minio <https://sven-minio.de>
       * @category CSS
       * @description
       * * Methods for manipulating CSS classes (add, remove, toggle, has).
       * @requires ../../core
       * * Depends on the core jBase class for type definitions.
       */
    }
  });

  // src/modules/css/styles.ts
  var styles_exports = {};
  __export(styles_exports, {
    css: () => css
  });
  function css(property, value) {
    if (typeof property === "object" && property !== null) {
      this.forEach((el) => {
        if (el instanceof HTMLElement || el instanceof SVGElement) {
          for (const key in property) {
            if (Object.prototype.hasOwnProperty.call(property, key)) {
              if (key.includes("-")) {
                el.style.setProperty(key, String(property[key]));
              } else {
                el.style[key] = property[key];
              }
            }
          }
        }
      });
      return this;
    }
    if (typeof property === "string") {
      if (value === void 0) {
        const el = this[0];
        if (el instanceof HTMLElement || el instanceof SVGElement) {
          const doc = el.ownerDocument;
          const win = doc ? doc.defaultView : null;
          if (win) {
            return win.getComputedStyle(el).getPropertyValue(property) || win.getComputedStyle(el)[property] || "";
          } else {
            return el.style[property] || "";
          }
        }
        return "";
      }
      this.forEach((el) => {
        if (el instanceof HTMLElement || el instanceof SVGElement) {
          if (property.includes("-")) {
            el.style.setProperty(property, String(value));
          } else {
            el.style[property] = value;
          }
        }
      });
    }
    return this;
  }
  var init_styles = __esm({
    "src/modules/css/styles.ts"() {
      "use strict";
      /**
       * @file src/modules/css/styles.ts
       * @version 2.0.3
       * @since 2.0.0
       * @license GPL-3.0-or-later
       * @copyright Sven Minio 2026
       * @author Sven Minio <https://sven-minio.de>
       * @category CSS
       * @description
       * * Methods for getting and setting inline CSS styles.
       * @requires ../../core
       * * Depends on the core jBase class for type definitions.
       */
    }
  });

  // src/modules/css/index.ts
  var cssMethods;
  var init_css = __esm({
    "src/modules/css/index.ts"() {
      "use strict";
      init_classes();
      init_styles();
      /**
       * @file src/modules/css/index.ts
       * @version 2.0.2
       * @since 2.0.0
       * @license GPL-3.0-or-later
       * @copyright Sven Minio 2026
       * @author Sven Minio <https://sven-minio.de>
       * @category CSS
       * @description
       * * Central entry point for CSS operations. Aggregates class and style manipulation methods.
       * @requires ./classes
       * * Class manipulation methods (addClass, removeClass, etc.).
       * @requires ./styles
       * * Style manipulation methods (css).
       */
      cssMethods = {
        ...classes_exports,
        ...styles_exports
      };
    }
  });

  // src/modules/events/binding.ts
  var binding_exports = {};
  __export(binding_exports, {
    off: () => off,
    on: () => on
  });
  function on(event, handler) {
    this.forEach((el) => {
      el.addEventListener(event, handler);
    });
    return this;
  }
  function off(event, handler) {
    this.forEach((el) => {
      el.removeEventListener(event, handler);
    });
    return this;
  }
  var init_binding = __esm({
    "src/modules/events/binding.ts"() {
      "use strict";
      /**
       * @file src/modules/events/binding.ts
       * @version 2.0.2
       * @since 2.0.0
       * @license GPL-3.0-or-later
       * @copyright Sven Minio 2026
       * @author Sven Minio <https://sven-minio.de>
       * @category Events
       * @description
       * * Core event binding methods (on, off, trigger). Handles event registration and removal.
       * @requires ../../core
       * * Depends on the core jBase class for type definitions.
       */
    }
  });

  // src/modules/events/mouse.ts
  var mouse_exports = {};
  __export(mouse_exports, {
    click: () => click,
    dblclick: () => dblclick,
    mousedown: () => mousedown,
    mouseenter: () => mouseenter,
    mouseleave: () => mouseleave,
    mousemove: () => mousemove,
    mouseout: () => mouseout,
    mouseover: () => mouseover,
    mouseup: () => mouseup
  });
  function click(handler) {
    if (handler) {
      return this.on("click", handler);
    } else {
      this.forEach((el) => {
        if (el instanceof HTMLElement) el.click();
      });
      return this;
    }
  }
  function mousemove(handler) {
    return this.on("mousemove", handler);
  }
  function mouseleave(handler) {
    return this.on("mouseleave", handler);
  }
  function mouseenter(handler) {
    return this.on("mouseenter", handler);
  }
  function mousedown(handler) {
    return this.on("mousedown", handler);
  }
  function mouseup(handler) {
    return this.on("mouseup", handler);
  }
  function dblclick(handler) {
    if (handler) {
      return this.on("dblclick", handler);
    } else {
      this.forEach((el) => {
        if (el instanceof HTMLElement) {
          el.dispatchEvent(new MouseEvent("dblclick", {
            bubbles: true,
            cancelable: true,
            view: window
          }));
        }
      });
      return this;
    }
  }
  function mouseout(handler) {
    return this.on("mouseout", handler);
  }
  function mouseover(handler) {
    return this.on("mouseover", handler);
  }
  var init_mouse = __esm({
    "src/modules/events/mouse.ts"() {
      "use strict";
      /**
       * @file src/modules/events/mouse.ts
       * @version 2.0.2
       * @since 2.0.0
       * @license GPL-3.0-or-later
       * @copyright Sven Minio 2026
       * @author Sven Minio <https://sven-minio.de>
       * @category Events
       * @description
       * * Methods for handling mouse events (click, dblclick, hover, mouseenter, mouseleave).
       * @requires ../../core
       * * Depends on the core jBase class for type definitions.
       */
    }
  });

  // src/modules/events/lifecycle.ts
  var lifecycle_exports = {};
  __export(lifecycle_exports, {
    ready: () => ready
  });
  function ready(handler) {
    const doc = window.document;
    if (doc.readyState === "complete" || doc.readyState === "interactive") {
      handler();
    } else {
      this.on("DOMContentLoaded", handler);
    }
    return this;
  }
  var init_lifecycle = __esm({
    "src/modules/events/lifecycle.ts"() {
      "use strict";
      /**
       * @file src/modules/events/lifecycle.ts
       * @version 2.0.2
       * @since 2.0.0
       * @license GPL-3.0-or-later
       * @copyright Sven Minio 2026
       * @author Sven Minio <https://sven-minio.de>
       * @category Events
       * @description
       * * Methods for handling DOM lifecycle events (e.g., ready).
       * @requires ../../core
       * * Depends on the core jBase class for type definitions.
       */
    }
  });

  // src/modules/events/keyboard.ts
  var keyboard_exports = {};
  __export(keyboard_exports, {
    keydown: () => keydown,
    keypress: () => keypress,
    keyup: () => keyup,
    pressedKey: () => pressedKey
  });
  function keydown(handler) {
    return this.on("keydown", handler);
  }
  function keyup(handler) {
    return this.on("keyup", handler);
  }
  function keypress(handler) {
    return this.on("keypress", handler);
  }
  function pressedKey(targetKey, handler) {
    return this.on("keydown", (e) => {
      const event = e;
      if (event.key.toLowerCase() === targetKey.toLowerCase()) {
        handler(event);
      }
    });
  }
  var init_keyboard = __esm({
    "src/modules/events/keyboard.ts"() {
      "use strict";
      /**
       * @file src/modules/events/keyboard.ts
       * @version 2.0.2
       * @since 2.0.0
       * @license GPL-3.0-or-later
       * @copyright Sven Minio 2026
       * @author Sven Minio <https://sven-minio.de>
       * @category Events
       * @description
       * * Methods for handling keyboard events (keydown, keyup, keypress).
       * @requires ../../core
       * * Depends on the core jBase class for type definitions.
       */
    }
  });

  // src/modules/events/form.ts
  var form_exports = {};
  __export(form_exports, {
    blur: () => blur,
    change: () => change,
    focus: () => focus,
    input: () => input,
    submit: () => submit
  });
  function submit(handler) {
    return this.on("submit", handler);
  }
  function change(handler) {
    return this.on("change", handler);
  }
  function input(handler) {
    return this.on("input", handler);
  }
  function focus(handler) {
    if (handler) {
      return this.on("focus", handler);
    } else {
      this.forEach((el) => {
        if (el instanceof HTMLElement) el.focus();
      });
      return this;
    }
  }
  function blur(handler) {
    if (handler) {
      return this.on("blur", handler);
    } else {
      this.forEach((el) => {
        if (el instanceof HTMLElement) el.blur();
      });
      return this;
    }
  }
  var init_form = __esm({
    "src/modules/events/form.ts"() {
      "use strict";
      /**
       * @file src/modules/events/form.ts
       * @version 2.0.2
       * @since 2.0.0
       * @license GPL-3.0-or-later
       * @copyright Sven Minio 2026
       * @author Sven Minio <https://sven-minio.de>
       * @category Events
       * @description
       * * Methods for handling form events (submit, change, focus, blur, input).
       * @requires ../../core
       * * Depends on the core jBase class for type definitions.
       */
    }
  });

  // src/modules/events/touch.ts
  var touch_exports = {};
  __export(touch_exports, {
    touchcancel: () => touchcancel,
    touchend: () => touchend,
    touchmove: () => touchmove,
    touchstart: () => touchstart
  });
  function touchstart(handler) {
    return this.on("touchstart", handler);
  }
  function touchend(handler) {
    return this.on("touchend", handler);
  }
  function touchmove(handler) {
    return this.on("touchmove", handler);
  }
  function touchcancel(handler) {
    return this.on("touchcancel", handler);
  }
  var init_touch = __esm({
    "src/modules/events/touch.ts"() {
      "use strict";
      /**
       * @file src/modules/events/touch.ts
       * @version 2.0.2
       * @since 2.0.0
       * @license GPL-3.0-or-later
       * @copyright Sven Minio 2026
       * @author Sven Minio <https://sven-minio.de>
       * @category Events
       * @description
       * * Methods for handling touch events (touchstart, touchend, touchmove).
       * @requires ../../core
       * * Depends on the core jBase class for type definitions.
       */
    }
  });

  // src/modules/events/index.ts
  var eventMethods;
  var init_events = __esm({
    "src/modules/events/index.ts"() {
      "use strict";
      init_binding();
      init_mouse();
      init_lifecycle();
      init_keyboard();
      init_form();
      init_touch();
      /**
       * @file src/modules/events/index.ts
       * @version 2.0.2
       * @since 2.0.0
       * @license GPL-3.0-or-later
       * @copyright Sven Minio 2026
       * @author Sven Minio <https://sven-minio.de>
       * @category Events
       * @description
       * * Central entry point for event handling. Aggregates binding, mouse, lifecycle, keyboard, form, and touch events.
       * @requires ./binding
       * * General event binding (on, off).
       * @requires ./mouse
       * * Mouse interaction events (click, hover, etc.).
       * @requires ./lifecycle
       * * DOM lifecycle events (ready).
       * @requires ./keyboard
       * * Keyboard interaction events (keydown, keyup).
       * @requires ./form
       * * Form handling events (submit, change, input).
       * @requires ./touch
       * * Touch interaction events.
       */
      eventMethods = {
        ...binding_exports,
        ...mouse_exports,
        ...lifecycle_exports,
        ...keyboard_exports,
        ...form_exports,
        ...touch_exports
      };
    }
  });

  // src/modules/dom/attributes.ts
  var attributes_exports = {};
  __export(attributes_exports, {
    attr: () => attr,
    prop: () => prop,
    removeAttr: () => removeAttr,
    val: () => val
  });
  function attr(name, value) {
    if (value === void 0) {
      const el = this[0];
      return el instanceof Element ? el.getAttribute(name) : null;
    }
    this.forEach((el) => {
      if (el instanceof Element) el.setAttribute(name, value);
    });
    return this;
  }
  function val(value) {
    if (value === void 0) {
      const el = this[0];
      if (el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement || el instanceof HTMLSelectElement) {
        return el.value;
      }
      return "";
    }
    this.forEach((el) => {
      if (el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement || el instanceof HTMLSelectElement) {
        el.value = value;
      }
    });
    return this;
  }
  function removeAttr(name) {
    this.forEach((el) => {
      if (el instanceof Element) el.removeAttribute(name);
    });
    return this;
  }
  function prop(name, value) {
    if (value === void 0) {
      const el = this[0];
      return el instanceof Element ? el[name] : void 0;
    }
    this.forEach((el) => {
      if (el instanceof Element) {
        el[name] = value;
      }
    });
    return this;
  }
  var init_attributes = __esm({
    "src/modules/dom/attributes.ts"() {
      "use strict";
      /**
       * @file src/modules/dom/attributes.ts
       * @version 2.1.0
       * @since 2.0.0
       * @license GPL-3.0-or-later
       * @copyright Sven Minio 2026
       * @author Sven Minio <https://sven-minio.de>
       * @category DOM
       * @description
       * * Methods for getting and setting HTML attributes and properties (attr, data, val).
       * @requires ../../core
       * * Depends on the core jBase class for type definitions.
       */
    }
  });

  // src/modules/dom/content.ts
  var content_exports = {};
  __export(content_exports, {
    html: () => html,
    text: () => text
  });
  function html(content) {
    if (content === void 0) {
      const el = this[0];
      return el instanceof Element ? el.innerHTML : "";
    }
    this.forEach((el) => {
      if (el instanceof Element) el.innerHTML = content;
    });
    return this;
  }
  function text(content) {
    if (content === void 0) {
      const el = this[0];
      return el instanceof Node ? el.textContent || "" : "";
    }
    this.forEach((el) => {
      if (el instanceof HTMLElement) {
        el.textContent = content;
      }
    });
    return this;
  }
  var init_content = __esm({
    "src/modules/dom/content.ts"() {
      "use strict";
      /**
       * @file src/modules/dom/content.ts
       * @version 2.0.2
       * @since 2.0.0
       * @license GPL-3.0-or-later
       * @copyright Sven Minio 2026
       * @author Sven Minio <https://sven-minio.de>
       * @category DOM
       * @description
       * * Methods for getting and setting element content (html, text, empty, replaceWith).
       * @requires ../../core
       * * Depends on the core jBase class for type definitions.
       */
    }
  });

  // src/modules/dom/manipulation.ts
  var manipulation_exports = {};
  __export(manipulation_exports, {
    after: () => after,
    append: () => append,
    appendTo: () => appendTo,
    before: () => before,
    empty: () => empty,
    insertAfter: () => insertAfter,
    insertBefore: () => insertBefore,
    prepend: () => prepend,
    prependTo: () => prependTo,
    remove: () => remove,
    replaceWith: () => replaceWith,
    replaceWithClone: () => replaceWithClone,
    unwrap: () => unwrap,
    wrap: () => wrap
  });
  function parseHTML(html2, doc) {
    const tmp = doc.createElement("div");
    tmp.innerHTML = html2.trim();
    return tmp.firstElementChild;
  }
  function getDoc(collection) {
    if (collection.length > 0 && collection[0] instanceof Element) {
      return collection[0].ownerDocument;
    }
    return typeof document !== "undefined" ? document : null;
  }
  function normalizeToFragment(content, doc) {
    const fragment = doc.createDocumentFragment();
    const add = (item) => {
      if (typeof item === "string") {
        const temp = doc.createElement("div");
        temp.innerHTML = item.trim();
        while (temp.firstChild) {
          fragment.appendChild(temp.firstChild);
        }
      } else if (item instanceof Node) {
        fragment.appendChild(item);
      } else if (item instanceof jBase || Array.isArray(item) || item instanceof NodeList) {
        Array.from(item).forEach((child) => add(child));
      }
    };
    add(content);
    return fragment;
  }
  function remove() {
    this.forEach((el) => {
      if (el instanceof Element) el.remove();
    });
    return this;
  }
  function empty() {
    this.forEach((el) => {
      if (el instanceof Element) el.innerHTML = "";
    });
    return this;
  }
  function replaceWithClone() {
    const newElements = [];
    this.forEach((el) => {
      if (el instanceof Element) {
        const clone = el.cloneNode(true);
        el.replaceWith(clone);
        newElements.push(clone);
      }
    });
    return new this.constructor(newElements);
  }
  function append(content) {
    if (typeof content === "string") {
      this.forEach((el) => {
        if (el instanceof Element) {
          el.insertAdjacentHTML("beforeend", content);
        }
      });
      return this;
    }
    const doc = getDoc(this);
    if (!doc)
      return this;
    const fragment = normalizeToFragment(content, doc);
    this.forEach((el, i) => {
      if (el instanceof Element) {
        const contentToInsert = i < this.length - 1 ? fragment.cloneNode(true) : fragment;
        el.appendChild(contentToInsert);
      }
    });
    return this;
  }
  function prepend(content) {
    if (typeof content === "string") {
      this.forEach((el) => {
        if (el instanceof Element) {
          el.insertAdjacentHTML("afterbegin", content);
        }
      });
      return this;
    }
    const doc = getDoc(this);
    if (!doc)
      return this;
    const fragment = normalizeToFragment(content, doc);
    this.forEach((el, i) => {
      if (el instanceof Element) {
        const contentToInsert = i < this.length - 1 ? fragment.cloneNode(true) : fragment;
        el.prepend(contentToInsert);
      }
    });
    return this;
  }
  function before(content) {
    if (typeof content === "string") {
      this.forEach((el) => {
        if (el instanceof Element) {
          el.insertAdjacentHTML("beforebegin", content);
        }
      });
      return this;
    }
    const doc = getDoc(this);
    if (!doc)
      return this;
    const fragment = normalizeToFragment(content, doc);
    this.forEach((el, i) => {
      if (el instanceof Element) {
        const contentToInsert = i < this.length - 1 ? fragment.cloneNode(true) : fragment;
        el.before(contentToInsert);
      }
    });
    return this;
  }
  function after(content) {
    if (typeof content === "string") {
      this.forEach((el) => {
        if (el instanceof Element) {
          el.insertAdjacentHTML("afterend", content);
        }
      });
      return this;
    }
    const doc = getDoc(this);
    if (!doc)
      return this;
    const fragment = normalizeToFragment(content, doc);
    this.forEach((el, i) => {
      if (el instanceof Element) {
        const contentToInsert = i < this.length - 1 ? fragment.cloneNode(true) : fragment;
        el.after(contentToInsert);
      }
    });
    return this;
  }
  function replaceWith(content) {
    const doc = getDoc(this);
    if (!doc)
      return this;
    const fragment = normalizeToFragment(content, doc);
    this.forEach((el, i) => {
      if (el instanceof Element) {
        const contentToInsert = i < this.length - 1 ? fragment.cloneNode(true) : fragment;
        el.replaceWith(contentToInsert);
      }
    });
    return this;
  }
  function appendTo(target) {
    const doc = getDoc(this);
    if (!doc)
      return this;
    const parent2 = typeof target === "string" ? doc.querySelector(target) : target;
    if (parent2 instanceof Element) {
      const fragment = doc.createDocumentFragment();
      this.forEach((el) => {
        if (el instanceof Node) fragment.appendChild(el);
      });
      parent2.appendChild(fragment);
    }
    return this;
  }
  function prependTo(target) {
    const doc = getDoc(this);
    if (!doc)
      return this;
    const parent2 = typeof target === "string" ? doc.querySelector(target) : target;
    if (parent2 instanceof Element) {
      const fragment = doc.createDocumentFragment();
      this.forEach((el) => {
        if (el instanceof Node) fragment.appendChild(el);
      });
      parent2.prepend(fragment);
    }
    return this;
  }
  function insertBefore(target) {
    const doc = getDoc(this);
    if (!doc)
      return this;
    const targetEl = typeof target === "string" ? doc.querySelector(target) : target;
    if (targetEl instanceof Element) {
      const fragment = doc.createDocumentFragment();
      this.forEach((el) => {
        if (el instanceof Node) fragment.appendChild(el);
      });
      targetEl.before(fragment);
    }
    return this;
  }
  function insertAfter(target) {
    const doc = getDoc(this);
    if (!doc)
      return this;
    const targetEl = typeof target === "string" ? doc.querySelector(target) : target;
    if (targetEl instanceof Element) {
      const fragment = doc.createDocumentFragment();
      this.forEach((el) => {
        if (el instanceof Node) fragment.appendChild(el);
      });
      targetEl.after(fragment);
    }
    return this;
  }
  function wrap(wrapperHtml) {
    const doc = getDoc(this);
    if (!doc)
      return this;
    this.forEach((el) => {
      if (el instanceof Element) {
        const wrapper = parseHTML(wrapperHtml, doc);
        if (el.parentNode) {
          el.parentNode.insertBefore(wrapper, el);
        }
        wrapper.appendChild(el);
      }
    });
    return this;
  }
  function unwrap() {
    const doc = getDoc(this);
    if (!doc)
      return this;
    const parents2 = /* @__PURE__ */ new Set();
    this.forEach((el) => {
      if (el instanceof Element && el.parentElement) {
        parents2.add(el.parentElement);
      }
    });
    parents2.forEach((parent2) => {
      const fragment = doc.createDocumentFragment();
      while (parent2.firstChild) {
        fragment.appendChild(parent2.firstChild);
      }
      parent2.replaceWith(fragment);
    });
    return this;
  }
  var init_manipulation = __esm({
    "src/modules/dom/manipulation.ts"() {
      "use strict";
      init_core();
      /**
       * @file src/modules/dom/manipulation.ts
       * @version 2.0.2
       * @since 2.0.0
       * @license GPL-3.0-or-later
       * @copyright Sven Minio 2026
       * @author Sven Minio <https://sven-minio.de>
       * @category DOM
       * @description
       * * Methods for inserting, moving, and removing elements (append, prepend, remove).
       * @requires ../../core
       * * Depends on the core jBase class for type definitions.
       */
    }
  });

  // src/modules/dom/traversal.ts
  var traversal_exports = {};
  __export(traversal_exports, {
    children: () => children,
    closest: () => closest,
    descendants: () => descendants,
    descendantsUntil: () => descendantsUntil,
    eq: () => eq,
    filterBy: () => filterBy,
    findAll: () => findAll,
    first: () => first,
    last: () => last,
    next: () => next,
    nextAll: () => nextAll,
    nextSibling: () => nextSibling,
    nextUntil: () => nextUntil,
    not: () => not,
    parent: () => parent,
    parents: () => parents,
    parentsUntil: () => parentsUntil,
    prev: () => prev,
    prevAll: () => prevAll,
    prevSibling: () => prevSibling,
    prevUntil: () => prevUntil,
    sibling: () => sibling,
    siblings: () => siblings
  });
  function closest(selector) {
    const found = [];
    this.forEach((el) => {
      if (el instanceof Element) {
        const match = el.closest(selector);
        if (match) {
          found.push(match);
        }
      }
    });
    const Construction = this.constructor;
    return new Construction([...new Set(found)]);
  }
  function parent() {
    const parents2 = [];
    this.forEach((el) => {
      if (el instanceof Element && el.parentElement) {
        parents2.push(el.parentElement);
      }
    });
    const Construction = this.constructor;
    return new Construction([...new Set(parents2)]);
  }
  function children(selector) {
    let allChildren = [];
    this.forEach((el) => {
      if (el instanceof Element) {
        const kids = Array.from(el.children);
        allChildren = allChildren.concat(kids);
      }
    });
    if (selector) {
      allChildren = allChildren.filter((child) => child.matches(selector));
    }
    const Construction = this.constructor;
    return new Construction(allChildren);
  }
  function findAll(selector) {
    const found = [];
    this.forEach((el) => {
      if (el instanceof Element || el instanceof Document) {
        const matches = el.querySelectorAll(selector);
        matches.forEach((m) => found.push(m));
      }
    });
    const Construction = this.constructor;
    return new Construction([...new Set(found)]);
  }
  function descendants() {
    return this.findAll("*");
  }
  function parents(selector) {
    const ancestors = [];
    this.forEach((el) => {
      if (el instanceof Element) {
        let curr = el.parentElement;
        while (curr) {
          if (!selector || curr.matches(selector)) {
            ancestors.push(curr);
          }
          curr = curr.parentElement;
        }
      }
    });
    const Construction = this.constructor;
    return new Construction([...new Set(ancestors)]);
  }
  function parentsUntil(selector, filter) {
    const ancestors = [];
    this.forEach((el) => {
      if (el instanceof Element) {
        let curr = el.parentElement;
        while (curr && !curr.matches(selector)) {
          if (!filter || curr.matches(filter)) {
            ancestors.push(curr);
          }
          curr = curr.parentElement;
        }
      }
    });
    const Construction = this.constructor;
    return new Construction([...new Set(ancestors)]);
  }
  function descendantsUntil(untilSelector, filter) {
    const found = [];
    const traverse = (parent2) => {
      const kids = parent2.children;
      for (let i = 0; i < kids.length; i++) {
        const child = kids[i];
        if (child.matches(untilSelector)) {
          continue;
        }
        if (!filter || child.matches(filter)) {
          found.push(child);
        }
        traverse(child);
      }
    };
    this.forEach((el) => {
      if (el instanceof Element) traverse(el);
    });
    const Construction = this.constructor;
    return new Construction([...new Set(found)]);
  }
  function next(selector) {
    const found = [];
    this.forEach((el) => {
      if (el instanceof Element && el.nextElementSibling) {
        const nextEl = el.nextElementSibling;
        if (!selector || nextEl.matches(selector)) {
          found.push(nextEl);
        }
      }
    });
    const Construction = this.constructor;
    return new Construction([...new Set(found)]);
  }
  function prev(selector) {
    const found = [];
    this.forEach((el) => {
      if (el instanceof Element && el.previousElementSibling) {
        const prevEl = el.previousElementSibling;
        if (!selector || prevEl.matches(selector)) {
          found.push(prevEl);
        }
      }
    });
    const Construction = this.constructor;
    return new Construction([...new Set(found)]);
  }
  function nextSibling(selector) {
    return this.next(selector);
  }
  function prevSibling(selector) {
    return this.prev(selector);
  }
  function sibling(selector) {
    return this.next(selector);
  }
  function nextAll(selector) {
    const found = [];
    this.forEach((el) => {
      if (el instanceof Element) {
        let curr = el.nextElementSibling;
        while (curr) {
          if (!selector || curr.matches(selector)) {
            found.push(curr);
          }
          curr = curr.nextElementSibling;
        }
      }
    });
    const Construction = this.constructor;
    return new Construction([...new Set(found)]);
  }
  function prevAll(selector) {
    const found = [];
    this.forEach((el) => {
      if (el instanceof Element) {
        let curr = el.previousElementSibling;
        while (curr) {
          if (!selector || curr.matches(selector)) {
            found.push(curr);
          }
          curr = curr.previousElementSibling;
        }
      }
    });
    const Construction = this.constructor;
    return new Construction([...new Set(found)]);
  }
  function siblings(selector) {
    const found = [];
    this.forEach((el) => {
      if (el instanceof Element && el.parentElement) {
        const children2 = Array.from(el.parentElement.children);
        children2.forEach((child) => {
          if (child !== el) {
            if (!selector || child.matches(selector)) {
              found.push(child);
            }
          }
        });
      }
    });
    const Construction = this.constructor;
    return new Construction([...new Set(found)]);
  }
  function nextUntil(untilSelector, filter) {
    const found = [];
    this.forEach((el) => {
      if (el instanceof Element) {
        let curr = el.nextElementSibling;
        while (curr && !curr.matches(untilSelector)) {
          if (!filter || curr.matches(filter)) {
            found.push(curr);
          }
          curr = curr.nextElementSibling;
        }
      }
    });
    const Construction = this.constructor;
    return new Construction([...new Set(found)]);
  }
  function prevUntil(untilSelector, filter) {
    const found = [];
    this.forEach((el) => {
      if (el instanceof Element) {
        let curr = el.previousElementSibling;
        while (curr && !curr.matches(untilSelector)) {
          if (!filter || curr.matches(filter)) {
            found.push(curr);
          }
          curr = curr.previousElementSibling;
        }
      }
    });
    const Construction = this.constructor;
    return new Construction([...new Set(found)]);
  }
  function eq(index) {
    const len = this.length;
    const idx = index < 0 ? len + index : index;
    const el = this[idx];
    const Construction = this.constructor;
    return new Construction(el ? [el] : []);
  }
  function first() {
    return this.eq(0);
  }
  function last() {
    return this.eq(-1);
  }
  function filterBy(selectorOrFn) {
    const found = [];
    this.forEach((el, index) => {
      if (el instanceof Element) {
        if (typeof selectorOrFn === "string") {
          if (el.matches(selectorOrFn)) {
            found.push(el);
          }
        } else if (typeof selectorOrFn === "function") {
          if (selectorOrFn.call(el, index, el)) {
            found.push(el);
          }
        }
      }
    });
    const Construction = this.constructor;
    return new Construction(found);
  }
  function not(selectorOrFn) {
    const found = [];
    this.forEach((el, index) => {
      if (el instanceof Element) {
        if (typeof selectorOrFn === "string") {
          if (!el.matches(selectorOrFn)) {
            found.push(el);
          }
        } else if (typeof selectorOrFn === "function") {
          if (!selectorOrFn.call(el, index, el)) {
            found.push(el);
          }
        }
      }
    });
    const Construction = this.constructor;
    return new Construction(found);
  }
  var init_traversal = __esm({
    "src/modules/dom/traversal.ts"() {
      "use strict";
      /**
       * @file src/modules/dom/traversal.ts
       * @version 2.0.2
       * @since 2.0.0
       * @license GPL-3.0-or-later
       * @copyright Sven Minio 2026
       * @author Sven Minio <https://sven-minio.de>
       * @category DOM
       * @description
       * * Methods for navigating the DOM tree (find, parent, children, siblings).
       * @requires ../../core
       * * Depends on the core jBase class for type definitions.
       */
    }
  });

  // src/modules/dom/states.ts
  var states_exports = {};
  __export(states_exports, {
    checked: () => checked,
    disabled: () => disabled,
    selected: () => selected
  });
  function checked(state) {
    if (state === void 0) {
      const el = this[0];
      return el instanceof HTMLInputElement ? el.checked : false;
    }
    this.forEach((el) => {
      if (el instanceof HTMLInputElement)
        el.checked = state;
    });
    return this;
  }
  function selected(state) {
    if (state === void 0) {
      const el = this[0];
      return el instanceof HTMLOptionElement ? el.selected : false;
    }
    this.forEach((el) => {
      if (el instanceof HTMLOptionElement)
        el.selected = state;
    });
    return this;
  }
  function disabled(state) {
    if (state === void 0) {
      const el = this[0];
      return el instanceof HTMLElement && "disabled" in el ? el.disabled : false;
    }
    this.forEach((el) => {
      if (el instanceof HTMLElement && "disabled" in el) {
        el.disabled = state;
        if (state)
          el.classList.add("disabled");
        else
          el.classList.remove("disabled");
      }
    });
    return this;
  }
  var init_states = __esm({
    "src/modules/dom/states.ts"() {
      "use strict";
      /**
       * @file src/modules/dom/states.ts
       * @version 2.0.2
       * @since 2.0.0
       * @license GPL-3.0-or-later
       * @copyright Sven Minio 2026
       * @author Sven Minio <https://sven-minio.de>
       * @category DOM
       * @description
       * * Methods for checking element states (e.g., visibility, checked, disabled).
       * @requires ../../core
       * * Depends on the core jBase class for type definitions.
       */
    }
  });

  // src/modules/dom/index.ts
  var domMethods;
  var init_dom = __esm({
    "src/modules/dom/index.ts"() {
      "use strict";
      init_attributes();
      init_content();
      init_manipulation();
      init_traversal();
      init_states();
      /**
       * @file src/modules/dom/index.ts
       * @version 2.0.2
       * @since 2.0.0
       * @license GPL-3.0-or-later
       * @copyright Sven Minio 2026
       * @author Sven Minio <https://sven-minio.de>
       * @category DOM
       * @description
       * * Central entry point for DOM operations. Aggregates methods for attributes, content, manipulation, traversal, and states.
       * @requires ./attributes
       * * Attribute and value manipulation.
       * @requires ./content
       * * Content handling (html, text).
       * @requires ./manipulation
       * * DOM manipulation (append, remove, etc.).
       * @requires ./traversal
       * * Tree traversal (find, parent, children).
       * @requires ./states
       * * State checks (checked, disabled).
       */
      domMethods = {
        ...attributes_exports,
        ...content_exports,
        ...manipulation_exports,
        ...traversal_exports,
        ...states_exports
      };
    }
  });

  // src/utils.ts
  function isBrowser() {
    return typeof window !== "undefined" && typeof window.requestAnimationFrame !== "undefined";
  }
  var init_utils = __esm({
    "src/utils.ts"() {
      "use strict";
      /**
       * @file src/utils.ts
       * @version 2.0.2
       * @since 2.0.0
       * @license GPL-3.0-or-later
       * @copyright Sven Minio 2026
       * @author Sven Minio <https://sven-minio.de>
       * @category Utilities
       * @description
       * * General utility functions and helpers (e.g., debounce, throttle, type checks).
       */
    }
  });

  // src/modules/effects/slide.ts
  var slide_exports = {};
  __export(slide_exports, {
    slideIn: () => slideIn,
    slideOut: () => slideOut,
    slideToggle: () => slideToggle
  });
  function slideIn(options = {}) {
    if (!isBrowser())
      return this;
    const { duration = 300 } = options;
    this.forEach((el) => {
      if (el instanceof HTMLElement) {
        el.style.willChange = "transform";
        el.style.transition = `transform ${duration}ms cubic-bezier(0.4, 0.0, 0.2, 1)`;
        requestAnimationFrame(() => {
          el.style.transform = "translateX(0%)";
        });
        el.setAttribute("data-slide-state", "open");
      }
    });
    return this;
  }
  function slideOut(options = {}) {
    if (!isBrowser())
      return this;
    const { direction = "left", duration = 300 } = options;
    const translateValue = direction === "left" ? "-100%" : "100%";
    this.forEach((el) => {
      if (el instanceof HTMLElement) {
        el.style.willChange = "transform";
        el.style.transition = `transform ${duration}ms cubic-bezier(0.4, 0.0, 0.2, 1)`;
        requestAnimationFrame(() => {
          el.style.transform = `translateX(${translateValue})`;
        });
        el.setAttribute("data-slide-state", "closed");
      }
    });
    return this;
  }
  function slideToggle(options = {}) {
    if (!isBrowser())
      return this;
    this.forEach((el) => {
      if (el instanceof HTMLElement) {
        const state = el.getAttribute("data-slide-state");
        const currentTransform = el.style.transform;
        if (state === "open" || currentTransform === "translateX(0%)") {
          const wrapper = new this.constructor(el);
          wrapper.slideOut(options);
        } else {
          const wrapper = new this.constructor(el);
          wrapper.slideIn(options);
        }
      }
    });
    return this;
  }
  var init_slide = __esm({
    "src/modules/effects/slide.ts"() {
      "use strict";
      init_utils();
      /**
       * @file src/modules/effects/slide.ts
       * @version 2.0.2
       * @since 2.0.0
       * @license GPL-3.0-or-later
       * @copyright Sven Minio 2026
       * @author Sven Minio <https://sven-minio.de>
       * @category Effects
       * @description
       * * Methods for horizontal sliding effects (slideIn, slideOut, slideToggle).
       * @requires ../../core
       * * Depends on the core jBase class for type definitions.
       */
    }
  });

  // src/modules/effects/vertical.ts
  var vertical_exports = {};
  __export(vertical_exports, {
    slideDown: () => slideDown,
    slideToggleBox: () => slideToggleBox,
    slideUp: () => slideUp
  });
  function slideDown(options = {}) {
    if (!isBrowser())
      return this;
    const { duration = 300, displayType = "block" } = options;
    this.forEach((el) => {
      if (el instanceof HTMLElement) {
        if (window.getComputedStyle(el).display !== "none")
          return;
        el.style.display = displayType;
        const height = el.scrollHeight;
        el.style.height = "0px";
        el.style.overflow = "hidden";
        el.style.transition = `height ${duration}ms ease-in-out`;
        void el.offsetHeight;
        el.style.height = `${height}px`;
        setTimeout(() => {
          el.style.height = "auto";
          el.style.overflow = "visible";
          el.style.transition = "";
        }, duration);
      }
    });
    return this;
  }
  function slideUp(options = {}) {
    if (!isBrowser())
      return this;
    const { duration = 300 } = options;
    this.forEach((el) => {
      if (el instanceof HTMLElement) {
        el.style.height = `${el.scrollHeight}px`;
        el.style.overflow = "hidden";
        el.style.transition = `height ${duration}ms ease-in-out`;
        void el.offsetHeight;
        el.style.height = "0px";
        setTimeout(() => {
          el.style.display = "none";
          el.style.height = "";
          el.style.overflow = "";
          el.style.transition = "";
        }, duration);
      }
    });
    return this;
  }
  function slideToggleBox(options = {}) {
    if (!isBrowser())
      return this;
    this.forEach((el) => {
      if (el instanceof HTMLElement) {
        const display = window.getComputedStyle(el).display;
        const wrapper = new this.constructor(el);
        if (display === "none") {
          wrapper.slideDown(options);
        } else {
          wrapper.slideUp(options);
        }
      }
    });
    return this;
  }
  var init_vertical = __esm({
    "src/modules/effects/vertical.ts"() {
      "use strict";
      init_utils();
      /**
       * @file src/modules/effects/vertical.ts
       * @version 2.0.2
       * @since 2.0.0
       * @license GPL-3.0-or-later
       * @copyright Sven Minio 2026
       * @author Sven Minio <https://sven-minio.de>
       * @category Effects
       * @description
       * * Methods for vertical sliding effects (slideDown, slideUp, slideToggle).
       * @requires ../../core
       * * Depends on the core jBase class for type definitions.
       */
    }
  });

  // src/modules/effects/fade.ts
  var fade_exports = {};
  __export(fade_exports, {
    fadeIn: () => fadeIn,
    fadeOut: () => fadeOut,
    fadeToggle: () => fadeToggle
  });
  function fadeIn(options = {}) {
    if (!isBrowser())
      return this;
    const { duration = 300, displayType = "block" } = options;
    this.forEach((el) => {
      if (el instanceof HTMLElement) {
        el.style.opacity = "0";
        el.style.display = displayType;
        el.style.transition = `opacity ${duration}ms ease-in-out`;
        void el.offsetHeight;
        requestAnimationFrame(() => {
          el.style.opacity = "1";
        });
        setTimeout(() => {
          el.style.transition = "";
        }, duration);
      }
    });
    return this;
  }
  function fadeOut(options = {}) {
    if (!isBrowser())
      return this;
    const { duration = 300 } = options;
    this.forEach((el) => {
      if (el instanceof HTMLElement) {
        el.style.opacity = "1";
        el.style.transition = `opacity ${duration}ms ease-in-out`;
        void el.offsetHeight;
        requestAnimationFrame(() => {
          el.style.opacity = "0";
        });
        setTimeout(() => {
          el.style.display = "none";
          el.style.transition = "";
        }, duration);
      }
    });
    return this;
  }
  function fadeToggle(options = {}) {
    if (!isBrowser())
      return this;
    this.forEach((el) => {
      if (el instanceof HTMLElement) {
        const display = window.getComputedStyle(el).display;
        const wrapper = new this.constructor(el);
        if (display === "none") {
          wrapper.fadeIn(options);
        } else {
          wrapper.fadeOut(options);
        }
      }
    });
    return this;
  }
  var init_fade = __esm({
    "src/modules/effects/fade.ts"() {
      "use strict";
      init_utils();
      /**
       * @file src/modules/effects/fade.ts
       * @version 2.0.2
       * @since 2.0.0
       * @license GPL-3.0-or-later
       * @copyright Sven Minio 2026
       * @author Sven Minio <https://sven-minio.de>
       * @category Effects
       * @description
       * * Methods for fading elements in and out (fadeIn, fadeOut, fadeToggle).
       * @requires ../../core
       * * Depends on the core jBase class for type definitions.
       */
    }
  });

  // src/modules/effects/index.ts
  var effectMethods;
  var init_effects = __esm({
    "src/modules/effects/index.ts"() {
      "use strict";
      init_slide();
      init_vertical();
      init_fade();
      /**
       * @file src/modules/effects/index.ts
       * @version 2.0.2
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
      effectMethods = {
        ...slide_exports,
        ...vertical_exports,
        ...fade_exports
      };
    }
  });

  // src/modules/http/get.ts
  var get_exports = {};
  __export(get_exports, {
    get: () => get,
    getText: () => getText
  });
  async function get(url, option) {
    const fetchOptions = { ...option };
    if (fetchOptions.method?.toLowerCase() === "post") {
      fetchOptions.method = "GET";
    }
    if (!fetchOptions.signal) {
      fetchOptions.signal = AbortSignal.timeout(5e3);
    }
    const response = await fetch(url, {
      ...fetchOptions
    });
    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }
    const text2 = await response.text();
    return text2 ? JSON.parse(text2) : {};
  }
  async function getText(url, option) {
    const fetchOptions = { ...option };
    if (fetchOptions.method?.toLowerCase() !== "get") {
      fetchOptions.method = "GET";
    }
    if (!fetchOptions.signal) {
      fetchOptions.signal = AbortSignal.timeout(5e3);
    }
    const response = await fetch(url, {
      ...fetchOptions
    });
    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }
    const text2 = await response.text();
    return text2;
  }
  var init_get = __esm({
    "src/modules/http/get.ts"() {
      "use strict";
      /**
       * @file src/modules/http/get.ts
       * @version 2.0.4
       * @since 2.0.0
       * @license GPL-3.0-or-later
       * @copyright Sven Minio 2026
       * @author Sven Minio <https://sven-minio.de>
       * @category HTTP
       * @description
       * * Abstraction for HTTP GET requests.
       * @requires ../../core
       * * Depends on the core jBase class for type definitions.
       */
    }
  });

  // src/modules/http/post.ts
  var post_exports = {};
  __export(post_exports, {
    post: () => post
  });
  async function post(url, body = {}, option) {
    const fetchOptions = { ...option };
    if (fetchOptions.method?.toLowerCase() !== "post") {
      fetchOptions.method = "post";
    }
    if (!fetchOptions.signal) {
      fetchOptions.signal = AbortSignal.timeout(5e3);
    }
    const response = await fetch(url, {
      ...fetchOptions,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });
    if (response.status === 204) {
      const text3 = await response.text();
      return text3 ? JSON.parse(text3) : {};
    }
    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }
    const text2 = await response.text();
    return text2 ? JSON.parse(text2) : {};
  }
  var init_post = __esm({
    "src/modules/http/post.ts"() {
      "use strict";
      /**
       * @file src/modules/http/post.ts
       * @version 2.0.3
       * @since 2.0.2
       * @license GPL-3.0-or-later
       * @copyright Sven Minio 2026
       * @author Sven Minio <https://sven-minio.de>
       * @category HTTP
       * * @description
       * * Abstraction for HTTP POST requests.
       * @requires ../../core
       * * Depends on the core jBase class for type definitions.
       */
    }
  });

  // src/modules/http/index.ts
  var http;
  var init_http = __esm({
    "src/modules/http/index.ts"() {
      "use strict";
      init_get();
      init_post();
      /**
       * @file src/modules/http/index.ts
       * @version 2.0.2
       * @since 2.0.0
       * @license GPL-3.0-or-later
       * @copyright Sven Minio 2026
       * @author Sven Minio <https://sven-minio.de>
       * @category HTTP
       * @description
       * * Central entry point for HTTP requests. Aggregates GET and POST methods.
       * @requires ./get
       * * HTTP GET methods (get, getText).
       * @requires ./post
       * * HTTP POST methods.
       */
      http = {
        ...get_exports,
        ...post_exports
      };
    }
  });

  // src/modules/data/arrays.ts
  var init_arrays = __esm({
    "src/modules/data/arrays.ts"() {
      "use strict";
      /**
       * @file src/modules/data/arrays.ts
       * @version 2.0.2
       * @since 2.0.0
       * @license GPL-3.0-or-later
       * @copyright Sven Minio 2026
       * @author Sven Minio <https://sven-minio.de>
       * @category Data
       * @description
       * * Utility functions for array manipulation and data processing.
       * @requires ./types
       * * Depends on types.
       */
    }
  });

  // src/modules/data/objects.ts
  var init_objects = __esm({
    "src/modules/data/objects.ts"() {
      "use strict";
      /**
       * @file src/modules/data/objects.ts
       * @version 2.0.2
       * @since 2.0.0
       * @license GPL-3.0-or-later
       * @copyright Sven Minio 2026
       * @author Sven Minio <https://sven-minio.de>
       * @category Data
       * @description
       * * Utility functions for object manipulation (e.g., deep merging, extension).
       * @requires ./types
       * * Depends on types.
       */
    }
  });

  // src/modules/data/index.ts
  var init_data = __esm({
    "src/modules/data/index.ts"() {
      "use strict";
      init_arrays();
      init_objects();
      /**
       * @file src/modules/data/index.ts
       * @version 2.0.2
       * @since 2.0.0
       * * @license GPL-3.0-or-later
       * @copyright Sven Minio 2026
       * @author Sven Minio <https://sven-minio.de>
       * @category Data
       * @description
       * * Central entry point for data manipulation modules. Aggregates array and object utilities.
       * @requires ./arrays
       * * Array manipulation methods.
       * @requires ./objects
       * * Object manipulation methods.
       */
    }
  });

  // src/index.ts
  var init, $, jB, _jB, __jB, _jBase, __jBase, jBase2, __;
  var init_index = __esm({
    "src/index.ts"() {
      "use strict";
      init_core();
      init_css();
      init_events();
      init_dom();
      init_effects();
      init_http();
      init_data();
      init_utils();
      init_utils();
      init_http();
      init_data();
      /**
       * @file src/index.ts
       * @version 2.1.1
       * @since 2.0.0
       * @license GPL-3.0-or-later
       * @copyright Sven Minio 2026
       * @author Sven Minio <https://sven-minio.de>
       * @category Entry Point
       * @description
       * * Main library entry point. Aggregates Core, Types, Utils, and all functional modules into a single export.
       * @requires ./core
       * * Core class logic and inheritance.
       * @requires ./types
       * * TypeScript type definitions and interfaces.
       * @requires ./utils
       * * Helper functions (throttle, debounce).
       * @requires ./modules/css
       * * Style manipulation methods.
       * @requires ./modules/events
       * * Event handling logic.
       * @requires ./modules/dom
       * * DOM traversal and manipulation.
       * @requires ./modules/effects
       * * Visual effects and animations.
       * @requires ./modules/http
       * * HTTP client for AJAX requests.
       * @requires ./modules/data
       * * Data structure utilities.
       */
      Object.assign(jBase.prototype, cssMethods);
      Object.assign(jBase.prototype, eventMethods);
      Object.assign(jBase.prototype, domMethods);
      Object.assign(jBase.prototype, effectMethods);
      init = (selector) => {
        return new jBase(selector);
      };
      $ = init;
      jB = init;
      _jB = init;
      __jB = init;
      _jBase = init;
      __jBase = init;
      jBase2 = init;
      __ = init;
    }
  });

  // src/browser.ts
  var require_browser = __commonJS({
    "src/browser.ts"() {
      init_index();
      /**
       * @file src/browser.ts
       * @version 2.0.2
       * @since 2.0.0
       * @license GPL-3.0-or-later
       * @copyright Sven Minio 2026
       * @author Sven Minio <https://sven-minio.de>
       * @category Browser
       * @description
       * * Browser Entry Point. Attaches the jBase library and utilities to the global window object so they can be accessed via `$` or `jBase` in inline scripts.
       */
      window.$ = $;
      window.jBase = jBase2;
      window.jB = jB;
      window._jB = _jB;
      window.__jB = __jB;
      window._jBase = _jBase;
      window.__jBase = __jBase;
      window.__ = __;
      window.http = http;
      console.log("jBase initialized and ready!");
    }
  });
  require_browser();
})();
//# sourceMappingURL=jbase.browser.js.map

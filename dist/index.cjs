/**
 * @k37z3r/jbase - Ditch the legacy bloat. jBase is a blazing-fast, SSR-ready micro-framework combining an elegant DOM chaining API with powerful, immutable data utilities. Fully typed, modular, and built for modern web & Node.js environments.
 * @version 2.4.0
 * @homepage https://github.com/k37z3r/jBase-2
 * @author Sven Minio (https://github.com/k37z3r/jBase-2)
 * @license GPL-3.0-or-later
 * @copyright 2026 Sven Minio (https://github.com/k37z3r/jBase-2)
 */
"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  $: () => $,
  JBaseClass: () => jBase,
  __: () => __,
  __jB: () => __jB,
  __jBase: () => __jBase,
  _jB: () => _jB,
  _jBase: () => _jBase,
  bind: () => bind,
  data: () => data,
  debounce: () => debounce,
  each: () => each,
  http: () => http,
  jB: () => jB,
  jBase: () => jBase2,
  throttle: () => throttle
});
module.exports = __toCommonJS(index_exports);

// src/utils.ts
function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}
function debounce(func, delay) {
  let timer;
  return function(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => func.apply(this, args), delay);
  };
}
function isBrowser() {
  return typeof window !== "undefined" && typeof window.requestAnimationFrame !== "undefined";
}
function each(collection, callback) {
  const isArrayLike = Array.isArray(collection) || collection && typeof collection === "object" && "length" in collection && typeof collection.length === "number";
  if (isArrayLike) {
    const arr = collection;
    for (let i = 0, len = arr.length; i < len; i++) {
      if (callback.call(arr[i], i, arr[i]) === false) {
        break;
      }
    }
  } else {
    const obj = collection;
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        if (callback.call(obj[key], key, obj[key]) === false) {
          break;
        }
      }
    }
  }
  return collection;
}
function sanitizeDangerousAttributes(htmlStr) {
  let cleanStr = htmlStr.replace(/on\w+\s*=\s*(['"])(?:(?!\1).)*\1/gi, "");
  cleanStr = cleanStr.replace(/(href|action)\s*=\s*(['"])\s*javascript\s*:[\s\S]*?\2/gi, "");
  return cleanStr;
}

// src/core.ts
var jBase = class extends Array {
  /**
   * * The original selector string or input type used to create this instance.
   */
  selectorSource = "";
  /**
   * * The document context this instance is bound to (supports SSR via jsdom).
   */
  doc;
  /**
   * * Initializes a new jBase instance. Analyzes the provided selector and populates the internal array with found or created DOM elements.
   * @param selector The input selector (CSS selector, HTML string, DOM element, or collection).
   * @param context An optional specific Document or Window context (essential for SSR).
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
        const tempDiv = this.doc.createElement("div");
        tempDiv.innerHTML = sanitizeDangerousAttributes(trimmed);
        this.push(...Array.from(tempDiv.children));
      } else if (trimmed.startsWith("#") && !trimmed.includes(" ") && !trimmed.includes(".")) {
        const el = this.doc.getElementById(trimmed.slice(1));
        if (el)
          this.push(el);
      } else if (trimmed.startsWith(".") && !trimmed.includes(" ") && !/[:\[#]/.test(trimmed)) {
        const els = this.doc.getElementsByClassName(trimmed.slice(1));
        for (let i = 0; i < els.length; i++) {
          this.push(els[i]);
        }
      } else if (/^[a-zA-Z0-9]+$/.test(trimmed)) {
        const els = this.doc.getElementsByTagName(trimmed);
        for (let i = 0; i < els.length; i++) {
          this.push(els[i]);
        }
      } else {
        try {
          this.push(...Array.from(this.doc.querySelectorAll(selector)));
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
   * @example toJson() => { meta: 'jBase Wrapper', query: '#myId', count: 1, preview: ['div'] }
   * @returns A simplified object representation for debugging.
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
  /**
   * * High-performance iteration over matched elements.
   * * Returning 'false' in the callback breaks the loop early.
   * @example each((el, index) => { console.log(el); if (index === 5) return false; }) => Logs the first 6 matched elements to the console.
   * @param callback The function to execute for each element. Context (`this`) is set to the current element.
   * @returns The current jBase instance for chaining.
   */
  each(callback) {
    for (let i = 0, len = this.length; i < len; i++) {
      if (callback.call(this[i], this[i], i) === false) {
        break;
      }
    }
    return this;
  }
};

// src/modules/css/classes.ts
var classes_exports = {};
__export(classes_exports, {
  addClass: () => addClass,
  hasClass: () => hasClass,
  removeClass: () => removeClass,
  toggleClass: () => toggleClass
});
function addClass(...classNames) {
  this.each(function(el) {
    if (el instanceof Element) el.classList.add(...classNames);
  });
  return this;
}
function removeClass(...classNames) {
  this.each(function(el) {
    if (el instanceof Element) el.classList.remove(...classNames);
  });
  return this;
}
function toggleClass(className) {
  this.each(function(el) {
    if (el instanceof Element) el.classList.toggle(className);
  });
  return this;
}
function hasClass(className) {
  return this.some((el) => {
    return el instanceof Element && el.classList.contains(className);
  });
}

// src/modules/css/styles.ts
var styles_exports = {};
__export(styles_exports, {
  css: () => css
});
function css(property, value) {
  if (typeof property === "object" && property !== null) {
    this.each(function(el) {
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
    this.each(function(el) {
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

// src/modules/css/index.ts
var cssMethods = {
  ...classes_exports,
  ...styles_exports
};

// src/modules/events/binding.ts
var binding_exports = {};
__export(binding_exports, {
  off: () => off,
  on: () => on,
  once: () => once,
  trigger: () => trigger
});
var JB_EVENTS = "__jb_events";
function on(events, selectorOrDataOrHandler, dataOrHandler, handlerOrUndefined) {
  let selector;
  let data2;
  let handler;
  if (typeof selectorOrDataOrHandler === "string") {
    selector = selectorOrDataOrHandler;
    if (typeof dataOrHandler === "function") {
      handler = dataOrHandler;
    } else {
      data2 = dataOrHandler;
      handler = handlerOrUndefined;
    }
  } else if (typeof selectorOrDataOrHandler === "function") {
    handler = selectorOrDataOrHandler;
  } else {
    data2 = selectorOrDataOrHandler;
    handler = dataOrHandler;
  }
  if (!handler) return this;
  const eventTypes = events.split(" ");
  this.each(function(el) {
    if (!(el instanceof EventTarget)) return;
    const registry = el[JB_EVENTS] || (el[JB_EVENTS] = []);
    each(eventTypes, function(_index, eventType) {
      const wrappedHandler = function(e) {
        let targetContext = el;
        if (selector) {
          const target = e.target instanceof Element ? e.target : e.target?.parentElement;
          const match = target instanceof Element && target.closest ? target.closest(selector) : null;
          if (!match || !el.contains(match)) {
            return;
          }
          targetContext = match;
        }
        if (data2 !== void 0) {
          e.data = data2;
        }
        handler.call(targetContext, e);
      };
      registry.push({
        type: eventType,
        original: handler,
        wrapped: wrappedHandler,
        selector
      });
      el.addEventListener(eventType, wrappedHandler);
    });
  });
  return this;
}
function off(events, selectorOrHandler, handlerOrUndefined) {
  let selector;
  let handler;
  if (typeof selectorOrHandler === "string") {
    selector = selectorOrHandler;
    handler = handlerOrUndefined;
  } else if (typeof selectorOrHandler === "function") {
    handler = selectorOrHandler;
  }
  const eventTypes = events.split(" ");
  this.each(function(el) {
    if (!(el instanceof EventTarget)) return;
    const registry = el[JB_EVENTS];
    if (!registry) return;
    each(eventTypes, function(_index, eventType) {
      for (let i = registry.length - 1; i >= 0; i--) {
        const record = registry[i];
        const matchType = record.type === eventType;
        const matchSelector = selector ? record.selector === selector : true;
        const matchHandler = handler ? record.original === handler : true;
        if (matchType && matchSelector && matchHandler) {
          el.removeEventListener(eventType, record.wrapped);
          registry.splice(i, 1);
        }
      }
    });
  });
  return this;
}
function once(events, selectorOrDataOrHandler, dataOrHandler, handlerOrUndefined) {
  const self = this;
  const handleOnce = function(e) {
    self.off(events, selectorOrDataOrHandler, handleOnce);
    let realHandler;
    if (typeof selectorOrDataOrHandler === "function") {
      realHandler = selectorOrDataOrHandler;
    } else if (typeof dataOrHandler === "function") {
      realHandler = dataOrHandler;
    } else {
      realHandler = handlerOrUndefined;
    }
    return realHandler.apply(this, arguments);
  };
  if (typeof selectorOrDataOrHandler === "string") {
    if (typeof dataOrHandler === "function") {
      return this.on(events, selectorOrDataOrHandler, handleOnce);
    } else {
      return this.on(events, selectorOrDataOrHandler, dataOrHandler, handleOnce);
    }
  } else if (typeof selectorOrDataOrHandler === "function") {
    return this.on(events, handleOnce);
  } else {
    return this.on(events, selectorOrDataOrHandler, handleOnce);
  }
}
function trigger(eventName, data2) {
  return this.each(function(el) {
    if (!(el instanceof EventTarget)) return;
    const event = new CustomEvent(eventName, {
      bubbles: true,
      cancelable: true,
      detail: data2
    });
    el.dispatchEvent(event);
  });
}

// src/modules/events/mouse.ts
var mouse_exports = {};
__export(mouse_exports, {
  click: () => click,
  dblclick: () => dblclick,
  hover: () => hover,
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
    this.each(function(el) {
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
    this.each(function(el) {
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
function hover(handlerIn, handlerOut) {
  return this.mouseenter(handlerIn).mouseleave(handlerOut);
}

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
    this.each(function(el) {
      if (el instanceof HTMLElement) el.focus();
    });
    return this;
  }
}
function blur(handler) {
  if (handler) {
    return this.on("blur", handler);
  } else {
    this.each(function(el) {
      if (el instanceof HTMLElement) el.blur();
    });
    return this;
  }
}

// src/modules/events/touch.ts
var touch_exports = {};
__export(touch_exports, {
  swipeDown: () => swipeDown,
  swipeLeft: () => swipeLeft,
  swipeRight: () => swipeRight,
  swipeUp: () => swipeUp,
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
function swipeLeft(handler) {
  return this.each(function(el) {
    if (el instanceof Element) handleSwipe.call(this, el, "left", handler);
  });
}
function swipeRight(handler) {
  return this.each(function(el) {
    if (el instanceof Element) handleSwipe.call(this, el, "right", handler);
  });
}
function swipeUp(handler) {
  return this.each(function(el) {
    if (el instanceof Element) handleSwipe.call(this, el, "up", handler);
  });
}
function swipeDown(handler) {
  return this.each(function(el) {
    if (el instanceof Element) handleSwipe.call(this, el, "down", handler);
  });
}
function handleSwipe(el, direction, handler) {
  let startX = 0, startY = 0;
  el.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
  }, { passive: true });
  el.addEventListener("touchend", (e) => {
    const diffX = e.changedTouches[0].clientX - startX;
    const diffY = e.changedTouches[0].clientY - startY;
    const threshold = 50;
    if (Math.abs(diffX) > Math.abs(diffY)) {
      if (Math.abs(diffX) > threshold) {
        if (diffX > 0 && direction === "right") handler.call(el, e);
        if (diffX < 0 && direction === "left") handler.call(el, e);
      }
    } else {
      if (Math.abs(diffY) > threshold) {
        if (diffY > 0 && direction === "down") handler.call(el, e);
        if (diffY < 0 && direction === "up") handler.call(el, e);
      }
    }
  }, { passive: true });
}

// src/modules/events/index.ts
var eventMethods = {
  ...binding_exports,
  ...mouse_exports,
  ...lifecycle_exports,
  ...keyboard_exports,
  ...form_exports,
  ...touch_exports
};

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
  this.each(function(el) {
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
  this.each(function(el) {
    if (el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement || el instanceof HTMLSelectElement) {
      el.value = value;
    }
  });
  return this;
}
function removeAttr(name) {
  this.each(function(el) {
    if (el instanceof Element) el.removeAttribute(name);
  });
  return this;
}
function prop(name, value) {
  if (value === void 0) {
    const el = this[0];
    return el instanceof Element ? el[name] : void 0;
  }
  this.each(function(el) {
    if (el instanceof Element) {
      el[name] = value;
    }
  });
  return this;
}

// src/modules/dom/content.ts
var content_exports = {};
__export(content_exports, {
  html: () => html,
  load: () => load,
  text: () => text
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
  try {
    return text2 ? JSON.parse(text2) : {};
  } catch (e) {
    return text2;
  }
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

// src/modules/dom/content.ts
function extractAndExecuteScripts(htmlStr, doc) {
  const tempDiv = doc.createElement("div");
  tempDiv.innerHTML = htmlStr;
  const scripts = tempDiv.querySelectorAll("script");
  scripts.forEach((oldScript) => {
    const newScript = doc.createElement("script");
    Array.from(oldScript.attributes).forEach((attr2) => {
      newScript.setAttribute(attr2.name, attr2.value);
    });
    if (oldScript.textContent) {
      newScript.textContent = oldScript.textContent;
    }
    doc.head.appendChild(newScript);
    doc.head.removeChild(newScript);
    oldScript.remove();
  });
  return tempDiv.innerHTML;
}
function html(content, options) {
  if (content === void 0) {
    const el = this[0];
    return el instanceof Element ? el.innerHTML : "";
  }
  let finalHtml = content;
  const execute = options?.executeScripts === true;
  this.each(function(el) {
    if (el instanceof Element) {
      const doc = el.ownerDocument || document;
      const processedHtml = execute ? extractAndExecuteScripts(finalHtml, doc) : sanitizeDangerousAttributes(finalHtml);
      el.innerHTML = processedHtml;
    }
  });
  return this;
}
function text(content) {
  if (content === void 0) {
    const el = this[0];
    return el instanceof Node ? el.textContent || "" : "";
  }
  this.each(function(el) {
    if (el instanceof HTMLElement) {
      el.textContent = content;
    }
  });
  return this;
}
async function load(url, options) {
  try {
    const fetchOptions = { ...options };
    delete fetchOptions.executeScripts;
    const htmlStr = await getText(url, fetchOptions);
    this.html(htmlStr, { executeScripts: options?.executeScripts });
  } catch (error) {
    console.error(`jBase .load() failed to fetch: ${url}`, error);
    throw error;
  }
  return this;
}

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
  tmp.innerHTML = sanitizeDangerousAttributes(html2.trim());
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
  const add4 = (item) => {
    if (typeof item === "string") {
      const temp = doc.createElement("div");
      temp.innerHTML = sanitizeDangerousAttributes(item.trim());
      while (temp.firstChild) {
        fragment.appendChild(temp.firstChild);
      }
    } else if (item instanceof Node) {
      fragment.appendChild(item);
    } else if (item instanceof jBase || Array.isArray(item) || item instanceof NodeList) {
      each(item, function(_index, child) {
        add4(child);
      });
    }
  };
  add4(content);
  return fragment;
}
function remove() {
  this.each(function(el) {
    if (el instanceof Element) el.remove();
  });
  return this;
}
function empty() {
  this.each(function(el) {
    if (el instanceof Element) el.innerHTML = "";
  });
  return this;
}
function replaceWithClone() {
  const newElements = [];
  this.each(function(el) {
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
    const safeContent = sanitizeDangerousAttributes(content);
    this.each(function(el) {
      if (el instanceof Element) {
        el.insertAdjacentHTML("beforeend", safeContent);
      }
    });
    return this;
  }
  const doc = getDoc(this);
  if (!doc)
    return this;
  const fragment = normalizeToFragment(content, doc);
  const len = this.length;
  this.each(function(el, i) {
    if (el instanceof Element) {
      const contentToInsert = i < len - 1 ? fragment.cloneNode(true) : fragment;
      el.appendChild(contentToInsert);
    }
  });
  return this;
}
function prepend(content) {
  if (typeof content === "string") {
    const safeContent = sanitizeDangerousAttributes(content);
    this.each(function(el) {
      if (el instanceof Element) {
        el.insertAdjacentHTML("afterbegin", safeContent);
      }
    });
    return this;
  }
  const doc = getDoc(this);
  if (!doc)
    return this;
  const fragment = normalizeToFragment(content, doc);
  const len = this.length;
  this.each(function(el, i) {
    if (el instanceof Element) {
      const contentToInsert = i < len - 1 ? fragment.cloneNode(true) : fragment;
      el.prepend(contentToInsert);
    }
  });
  return this;
}
function before(content) {
  if (typeof content === "string") {
    const safeContent = sanitizeDangerousAttributes(content);
    this.each(function(el) {
      if (el instanceof Element) {
        el.insertAdjacentHTML("beforebegin", safeContent);
      }
    });
    return this;
  }
  const doc = getDoc(this);
  if (!doc)
    return this;
  const fragment = normalizeToFragment(content, doc);
  const len = this.length;
  this.each(function(el, i) {
    if (el instanceof Element) {
      const contentToInsert = i < len - 1 ? fragment.cloneNode(true) : fragment;
      el.before(contentToInsert);
    }
  });
  return this;
}
function after(content) {
  if (typeof content === "string") {
    const safeContent = sanitizeDangerousAttributes(content);
    this.each(function(el) {
      if (el instanceof Element) {
        el.insertAdjacentHTML("afterend", safeContent);
      }
    });
    return this;
  }
  const doc = getDoc(this);
  if (!doc)
    return this;
  const fragment = normalizeToFragment(content, doc);
  const len = this.length;
  this.each(function(el, i) {
    if (el instanceof Element) {
      const contentToInsert = i < len - 1 ? fragment.cloneNode(true) : fragment;
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
  const len = this.length;
  this.each(function(el, i) {
    if (el instanceof Element) {
      const contentToInsert = i < len - 1 ? fragment.cloneNode(true) : fragment;
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
    this.each(function(el) {
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
    this.each(function(el) {
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
    this.each(function(el) {
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
    this.each(function(el) {
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
  this.each(function(el) {
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
  if (!doc) return this;
  const parents2 = /* @__PURE__ */ new Set();
  this.each(function(el) {
    if (el instanceof Element && el.parentElement) {
      parents2.add(el.parentElement);
    }
  });
  each(Array.from(parents2), function(_index, parent2) {
    const fragment = doc.createDocumentFragment();
    while (parent2.firstChild) {
      fragment.appendChild(parent2.firstChild);
    }
    parent2.replaceWith(fragment);
  });
  return this;
}

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
  this.each(function(el) {
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
  this.each(function(el) {
    if (el instanceof Element && el.parentElement) {
      parents2.push(el.parentElement);
    }
  });
  const Construction = this.constructor;
  return new Construction([...new Set(parents2)]);
}
function children(selector) {
  let allChildren = [];
  this.each(function(el) {
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
  this.each(function(el) {
    if (el instanceof Element || el instanceof Document) {
      const matches = el.querySelectorAll(selector);
      each(matches, function(_index, m) {
        found.push(m);
      });
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
  this.each(function(el) {
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
  this.each(function(el) {
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
  this.each(function(el) {
    if (el instanceof Element) traverse(el);
  });
  const Construction = this.constructor;
  return new Construction([...new Set(found)]);
}
function next(selector) {
  const found = [];
  this.each(function(el) {
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
  this.each(function(el) {
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
  this.each(function(el) {
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
  this.each(function(el) {
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
  this.each(function(el) {
    if (el instanceof Element && el.parentElement) {
      const children2 = Array.from(el.parentElement.children);
      each(children2, function(_index, child) {
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
  this.each(function(el) {
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
  this.each(function(el) {
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
  this.each(function(el, index) {
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
  this.each(function(el, index) {
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

// src/modules/dom/states.ts
var states_exports = {};
__export(states_exports, {
  check: () => check,
  checked: () => checked,
  disable: () => disable,
  disabled: () => disabled,
  enable: () => enable,
  select: () => select,
  selected: () => selected,
  uncheck: () => uncheck
});
function checked(state) {
  if (state === void 0) {
    const el = this[0];
    return el instanceof HTMLInputElement ? el.checked : false;
  }
  this.each(function(el) {
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
  this.each(function(el) {
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
  this.each(function(el) {
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
function check() {
  return checked.call(this, true);
}
function uncheck() {
  return checked.call(this, false);
}
function select() {
  return selected.call(this, true);
}
function disable() {
  return disabled.call(this, true);
}
function enable() {
  return disabled.call(this, false);
}

// src/modules/dom/index.ts
var domMethods = {
  ...attributes_exports,
  ...content_exports,
  ...manipulation_exports,
  ...traversal_exports,
  ...states_exports
};

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
  this.each(function(el) {
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
  this.each(function(el) {
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
  this.each(function(el) {
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
  this.each(function(el) {
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
  this.each(function(el) {
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
  this.each(function(el) {
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

// src/modules/effects/fade.ts
var fade_exports = {};
__export(fade_exports, {
  fadeIn: () => fadeIn,
  fadeOut: () => fadeOut,
  fadeToggle: () => fadeToggle,
  hide: () => hide,
  show: () => show,
  toggle: () => toggle
});
function fadeIn(options = {}) {
  if (!isBrowser())
    return this;
  const { duration = 300, displayType = "block" } = options;
  this.each(function(el) {
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
  this.each(function(el) {
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
  this.each(function(el) {
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
var show = fadeIn;
var hide = fadeOut;
var toggle = fadeToggle;

// src/modules/effects/index.ts
var effectMethods = {
  ...slide_exports,
  ...vertical_exports,
  ...fade_exports
};

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
  try {
    return text2 ? JSON.parse(text2) : {};
  } catch (e) {
    return text2;
  }
}

// src/modules/http/upload.ts
var upload_exports = {};
__export(upload_exports, {
  upload: () => upload
});
async function upload(url, data2, onProgress) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", url);
    if (onProgress) {
      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const percentage = Math.round(event.loaded / event.total * 100);
          onProgress(percentage, event.loaded, event.total);
        }
      };
    }
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        const text2 = xhr.responseText;
        try {
          resolve(text2 ? JSON.parse(text2) : {});
        } catch (e) {
          resolve(text2);
        }
      } else {
        reject(new Error(`HTTP Error: ${xhr.status}`));
      }
    };
    xhr.onerror = () => {
      reject(new Error("Network Error during upload"));
    };
    let payload;
    if (data2 instanceof File) {
      payload = new FormData();
      payload.append("file", data2);
    } else {
      payload = data2;
    }
    xhr.send(payload);
  });
}

// src/modules/http/index.ts
var http = {
  ...get_exports,
  ...post_exports,
  ...upload_exports
};

// src/modules/data/arrays.ts
var arrays_exports = {};
__export(arrays_exports, {
  add: () => add,
  chunk: () => chunk,
  clear: () => clear,
  empty: () => empty2,
  find: () => find,
  get: () => get2,
  merge: () => merge,
  mergeArray: () => mergeArray,
  omit: () => omit,
  pick: () => pick,
  remove: () => remove2,
  set: () => set
});
function chunk(array, size) {
  const chunks = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
}
function mergeArray(...arrays) {
  return [].concat(...arrays);
}
var merge = mergeArray;
function add(array, item, index = array.length) {
  const copy = [...array];
  const idx = index < 0 ? array.length + index + 1 : index;
  copy.splice(idx, 0, item);
  return copy;
}
function clear(array) {
  return [];
}
var empty2 = clear;
function pick(array, indices) {
  return array.filter((_, index) => indices.includes(index));
}
function omit(array, indices) {
  return array.filter((_, index) => !indices.includes(index));
}
function get2(array, path) {
  return path.split(".").reduce((acc, part) => acc && acc[part], array);
}
function set(array, path, value) {
  const parts = path.split(".");
  let current = array;
  for (let i = 0; i < parts.length - 1; i++) {
    const part = parts[i];
    if (!current[part]) {
      current[part] = isNaN(Number(parts[i + 1])) ? {} : [];
    }
    current = current[part];
  }
  current[parts[parts.length - 1]] = value;
}
var remove2 = {
  /**
   * * Removes an element at a specific index.
   * @example remove.at([1, 2, 3, 4], -2) => [1, 2, 4]
   * @template T The type of the items in the array.
   * @param array The array.
   * @param index The index (negative values allowed).
   * @returns A new array with the element removed.
   */
  at(array, index) {
    const copy = [...array];
    const idx = index < 0 ? array.length + index : index;
    if (idx >= 0 && idx < copy.length) {
      copy.splice(idx, 1);
    }
    return copy;
  },
  /**
   * * Removes the first element.
   * @example remove.first([1, 2, 3]) => [2, 3]
   * @template T The type of the items in the array.
   * @param array The array.
   */
  first(array) {
    return array.slice(1);
  },
  /**
   * * Removes the last element.
   * @example remove.last([1, 2, 3]) => [1, 2]
   * @template T The type of the items in the array.
   * @param array The array.
   */
  last(array) {
    return array.slice(0, -1);
  },
  /**
   * * Removes all elements matching a query condition.
   * @example remove.byMatch(users, 'Admin', 'exact', 'role')
   * @template T The type of the items in the array.
   * @param array The array.
   * @param query The search query.
   * @param mode The comparison mode ('exact', 'contains', 'startsWith', 'endsWith').
   * @param key (Optional) The object key if it is an array of objects.
   */
  byMatch(array, query, mode = "exact", key) {
    const queryStr = String(query).toLowerCase();
    return array.filter((item) => {
      const val2 = key ? item[key] : item;
      const valStr = String(val2).toLowerCase();
      switch (mode) {
        case "exact":
          return valStr === queryStr;
        case "startsWith":
          return valStr.startsWith(queryStr);
        case "endsWith":
          return valStr.endsWith(queryStr);
        case "contains":
          return valStr.includes(queryStr);
        default:
          return false;
      }
    });
  },
  /**
   * * Removes the element at a specific index.
   * * Mirrors object.remove.byKey.
   * @example remove.byKey(['a', 'b', 'c'], 1) => ['a', 'c']
   * @template T The type of the items in the array.
   * @param array The source array.
   * @param index The index (key) to remove.
   * @returns A new array without the specified index.
   */
  byKey(array, index) {
    return this.at(array, index);
  },
  /**
   * * Removes all elements that match a specific value exactly (Strict Equality).
   * * Mirrors object.remove.byValue.
   * @example remove.byValue([1, 2, 1, 3], 1) => [2, 3]
   * @template T The type of the items in the array.
   * @param array The source array.
   * @param value The value to remove.
   * @returns A new array without the matching values.
   */
  byValue(array, value) {
    return array.filter((item) => item !== value);
  },
  /**
   * * ALIAS for clear. Removes all elements.
   * @param array The source array.
   * @returns A new, empty array.
   */
  all(array) {
    return clear(array);
  }
};
var find = {
  /**
   * * Finds the index of the first match.
   * @example find.at(['apple', 'banana', 'cherry'], 'an', 'contains') => 1
   * @template T The type of the items in the array.
   * @param array The array.
   * @param query The search query.
   * @param mode The comparison mode ('exact', 'contains', 'startsWith', 'endsWith').
   * @param key (Optional) The object key if it is an array of objects.
   * @returns Index or -1.
   */
  at(array, query, mode = "exact", key) {
    const queryStr = String(query).toLowerCase();
    return array.findIndex((item) => {
      const val2 = key ? item[key] : item;
      const valStr = String(val2).toLowerCase();
      switch (mode) {
        case "exact":
          return valStr === queryStr;
        case "startsWith":
          return valStr.startsWith(queryStr);
        case "endsWith":
          return valStr.endsWith(queryStr);
        case "contains":
          return valStr.includes(queryStr);
        default:
          return false;
      }
    });
  },
  /**
   * * Returns all elements matching the condition (Filter).
   * @example find.all(['apple', 'banana', 'cherry'], 'a', 'contains') => ['apple', 'banana']
   * @template T The type of the items in the array.
   * @param array The array.
   * @param query The search query.
   * @param mode The comparison mode ('exact', 'contains', 'startsWith', 'endsWith').
   * @param key (Optional) The object key if it is an array of objects.
   * @returns All matching elements or -1.
   */
  all(array, query, mode = "exact", key) {
    const queryStr = String(query).toLowerCase();
    return array.filter((item) => {
      const val2 = key ? item[key] : item;
      const valStr = String(val2).toLowerCase();
      switch (mode) {
        case "exact":
          return valStr === queryStr;
        case "startsWith":
          return valStr.startsWith(queryStr);
        case "endsWith":
          return valStr.endsWith(queryStr);
        case "contains":
          return valStr.includes(queryStr);
        default:
          return false;
      }
    });
  },
  /**
   * * Returns the first matching element (or undefined).
   * @example find.first(['apple', 'banana', 'cherry'], 'a', 'contains') => 'apple'
   * @template T The type of the items in the array.
   * @param array The array.
   * @param query The search query.
   * @param mode The comparison mode ('exact', 'contains', 'startsWith', 'endsWith').
   * @param key (Optional) The object key if it is an array of objects.
   * @returns Index or -1.
   */
  first(array, query, mode = "exact", key) {
    const queryStr = String(query).toLowerCase();
    return array.find((item) => {
      const val2 = key ? item[key] : item;
      const valStr = String(val2).toLowerCase();
      switch (mode) {
        case "exact":
          return valStr === queryStr;
        case "startsWith":
          return valStr.startsWith(queryStr);
        case "endsWith":
          return valStr.endsWith(queryStr);
        case "contains":
          return valStr.includes(queryStr);
        default:
          return false;
      }
    });
  },
  /**
   * * Returns the last matching element (or undefined).
   * @example find.last(['apple', 'banana', 'cherry'], 'a', 'contains') => 'banana'
   * @template T The type of the items in the array.
   * @param array The array.
   * @param query The search query.
   * @param mode The comparison mode ('exact', 'contains', 'startsWith', 'endsWith').
   * @param key (Optional) The object key if it is an array of objects.
   * @returns Index or -1.
   */
  last(array, query, mode = "exact", key) {
    const queryStr = String(query).toLowerCase();
    return [...array].reverse().find((item) => {
      const val2 = key ? item[key] : item;
      const valStr = String(val2).toLowerCase();
      switch (mode) {
        case "exact":
          return valStr === queryStr;
        case "startsWith":
          return valStr.startsWith(queryStr);
        case "endsWith":
          return valStr.endsWith(queryStr);
        case "contains":
          return valStr.includes(queryStr);
        default:
          return false;
      }
    });
  },
  /**
   * * Finds all indices (keys) matching the query.
   * * Mirrors object.find.key(). For arrays, keys are the indices.
   * @param array The array to search.
   * @param query The search query.
   * @param mode The comparison mode.
   * @returns An array of matching indices as strings.
   */
  key(array, query, mode = "exact") {
    const queryStr = String(query).toLowerCase();
    return Object.keys(array).filter((indexKey) => {
      const valStr = String(indexKey).toLowerCase();
      switch (mode) {
        case "exact":
          return valStr === queryStr;
        case "startsWith":
          return valStr.startsWith(queryStr);
        case "endsWith":
          return valStr.endsWith(queryStr);
        case "contains":
          return valStr.includes(queryStr);
        default:
          return false;
      }
    });
  },
  /**
   * * Finds all values matching the query.
   * * Mirrors object.find.value(). Identical to find.all() for flat arrays.
   * @param array The array to search.
   * @param query The search query.
   * @param mode The comparison mode.
   * @returns An array of matching values.
   */
  value(array, query, mode = "exact") {
    return this.all(array, query, mode);
  },
  /**
   * * Finds the key of the first match based on the query condition.
   * @example find.byMatch(users, 'Admin', 'exact', 'role') => 0
   * @template T The type of the items in the array.
   * @param array The array.
   * @param query The search query.
   * @param mode The comparison mode ('exact', 'contains', 'startsWith', 'endsWith').
   * @param key (Optional) The object key if it is an array of objects.
   * @returns Index or -1.
   */
  byMatch(array, query, mode = "exact", key) {
    const queryStr = String(query).toLowerCase();
    return array.findIndex((item) => {
      const val2 = key ? item[key] : item;
      const valStr = String(val2).toLowerCase();
      switch (mode) {
        case "exact":
          return valStr === queryStr;
        case "startsWith":
          return valStr.startsWith(queryStr);
        case "endsWith":
          return valStr.endsWith(queryStr);
        case "contains":
          return valStr.includes(queryStr);
        default:
          return false;
      }
    });
  }
};

// src/modules/data/objects.ts
var objects_exports = {};
__export(objects_exports, {
  add: () => add2,
  chunk: () => chunk2,
  clear: () => clear2,
  empty: () => empty3,
  find: () => find2,
  get: () => get3,
  merge: () => merge2,
  mergeObjects: () => mergeObjects,
  omit: () => omit2,
  pick: () => pick2,
  remove: () => remove3,
  set: () => set2
});
function isObject(item) {
  return item && typeof item === "object" && !Array.isArray(item);
}
function mergeObjects(target, ...sources) {
  if (!sources.length)
    return target;
  const source = sources.shift();
  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (key === "__proto__" || key === "constructor")
        continue;
      if (isObject(source[key])) {
        if (!target[key]) target[key] = {};
        mergeObjects(target[key], source[key]);
      } else {
        target[key] = source[key];
      }
    }
  }
  return mergeObjects(target, ...sources);
}
var merge2 = mergeObjects;
function chunk2(obj, size) {
  const entries = Object.entries(obj);
  const chunks = [];
  for (let i = 0; i < entries.length; i += size) {
    const slice = entries.slice(i, i + size);
    chunks.push(Object.fromEntries(slice));
  }
  return chunks;
}
function add2(obj, key, value, index = Object.keys(obj).length) {
  const entries = Object.entries(obj);
  const idx = index < 0 ? entries.length + index + 1 : index;
  entries.splice(idx, 0, [key, value]);
  return Object.fromEntries(entries);
}
function clear2(obj) {
  return {};
}
var empty3 = clear2;
function pick2(obj, keys) {
  const ret = {};
  each(keys, function(_index, key) {
    if (key in obj) ret[key] = obj[key];
  });
  return ret;
}
function omit2(obj, keys) {
  const ret = { ...obj };
  each(keys, function(_index, key) {
    delete ret[key];
  });
  return ret;
}
function get3(obj, path) {
  return path.split(".").reduce((acc, part) => acc && acc[part], obj);
}
function set2(obj, path, value) {
  const parts = path.split(".");
  let current = obj;
  for (let i = 0; i < parts.length - 1; i++) {
    const part = parts[i];
    if (!current[part]) current[part] = {};
    current = current[part];
  }
  current[parts[parts.length - 1]] = value;
}
var remove3 = {
  /**
   * * Removes an entry at a specific index.
   * @example remove.at({a: 1, b: 2, c: 3}, -1) => {a: 1, b: 2}
   * @param obj The source object.
   * @param index The index (negative values allowed).
   * @returns A new object with the element removed.
   */
  at(obj, index) {
    const entries = Object.entries(obj);
    const idx = index < 0 ? entries.length + index : index;
    if (idx >= 0 && idx < entries.length) {
      entries.splice(idx, 1);
    }
    return Object.fromEntries(entries);
  },
  /**
   * * Removes the first entry from the object.
   * @param obj The source object.
   * @returns A new object without the first entry.
   */
  first(obj) {
    const entries = Object.entries(obj).slice(1);
    return Object.fromEntries(entries);
  },
  /**
   * * Removes the last entry from the object.
   * @param obj The source object.
   * @returns A new object without the last entry.
   */
  last(obj) {
    const entries = Object.entries(obj).slice(0, -1);
    return Object.fromEntries(entries);
  },
  /**
   * * Removes all entries matching a query condition.
   * @example remove.byMatch(config, 'hidden', 'exact', 'key')
   * @param obj The source object.
   * @param query The search query.
   * @param mode The comparison mode ('exact', 'contains', 'startsWith', 'endsWith').
   * @param searchBy Whether to search by 'key' or 'value' (default: 'key').
   * @returns A new object without the matching elements.
   */
  byMatch(obj, query, mode = "exact", searchBy = "key") {
    const queryStr = String(query).toLowerCase();
    const filteredEntries = Object.entries(obj).filter(([key, val2]) => {
      const target = searchBy === "key" ? key : val2;
      const valStr = String(target).toLowerCase();
      switch (mode) {
        case "exact":
          return valStr !== queryStr;
        case "startsWith":
          return !valStr.startsWith(queryStr);
        case "endsWith":
          return !valStr.endsWith(queryStr);
        case "contains":
          return !valStr.includes(queryStr);
        default:
          return true;
      }
    });
    return Object.fromEntries(filteredEntries);
  },
  /**
   * * Removes all entries that have a specific key.
   * @example remove.byKey({ a: 1, b: 2, c: 3 }, 'b') => { a: 1, c: 3 }
   * @param obj The source object.
   * @param key The key to remove.
   * @returns A new object without the specified key.
   */
  byKey(obj, key) {
    const ret = { ...obj };
    delete ret[key];
    return ret;
  },
  /**
   * * Removes all entries that match a specific value exactly (Strict Equality).
   * @example remove.byValue({ a: 1, b: 2, c: 1 }, 1) => { b: 2 }
   * @param obj The source object.
   * @param value The value to remove.
   * @returns A new object without the matching values.
   */
  byValue(obj, value) {
    const filteredEntries = Object.entries(obj).filter(([_key, val2]) => val2 !== value);
    return Object.fromEntries(filteredEntries);
  },
  /**
   * * ALIAS for clear. Removes all entries.
   * @param obj The source object.
   * @returns A new, empty object.
   */
  all(obj) {
    return clear2(obj);
  }
};
var find2 = {
  /**
   * * Returns the n-th entry of an object as a [key, value] pair. Supports negative indices.
   * @example find.at({ a: 1, b: 2 }, 1) => ['b', 2]
   * @param obj The object to search.
   * @param index The index (0-based, negative counts from the back).
   * @returns A [key, value] tuple or undefined.
   */
  at(obj, index) {
    const entries = Object.entries(obj);
    const idx = index < 0 ? entries.length + index : index;
    return entries[idx];
  },
  /**
   * * Returns a NEW OBJECT containing ALL elements matching the condition.
   * * Mirrors array.find.all() but returns a partial object.
   * @example find.all({a: 1, b: 2, c: 1}, 1, 'exact', 'value') => {a: 1, c: 1}
   * @param obj The object to search.
   * @param query The search query.
   * @param mode The comparison mode ('exact', 'contains', 'startsWith', 'endsWith').
   * @param searchBy Whether to search by 'key' or 'value' (default: 'key').
   * @returns A new object with only the matching elements.
   */
  all(obj, query, mode = "exact", searchBy = "key") {
    const queryStr = String(query).toLowerCase();
    const filteredEntries = Object.entries(obj).filter(([key, val2]) => {
      const target = searchBy === "key" ? key : val2;
      const valStr = String(target).toLowerCase();
      switch (mode) {
        case "exact":
          return valStr === queryStr;
        case "startsWith":
          return valStr.startsWith(queryStr);
        case "endsWith":
          return valStr.endsWith(queryStr);
        case "contains":
          return valStr.includes(queryStr);
        default:
          return false;
      }
    });
    return Object.fromEntries(filteredEntries);
  },
  /**
   * * Finds the first entry where the key or value matches the query.
   * @example find.first(config, 'admin', 'exact', 'key')
   * @param obj The object to search.
   * @param query The search query.
   * @param mode The comparison mode ('exact', 'contains', 'startsWith', 'endsWith').
   * @param searchBy Whether to search by 'key' or 'value'.
   * @returns The first matching [key, value] pair or undefined.
   */
  first(obj, query, mode = "exact", searchBy = "key") {
    const entries = Object.entries(obj);
    const queryStr = String(query).toLowerCase();
    return entries.find(([key, val2]) => {
      const target = searchBy === "key" ? key : val2;
      const valStr = String(target).toLowerCase();
      switch (mode) {
        case "exact":
          return valStr === queryStr;
        case "startsWith":
          return valStr.startsWith(queryStr);
        case "endsWith":
          return valStr.endsWith(queryStr);
        case "contains":
          return valStr.includes(queryStr);
        default:
          return false;
      }
    });
  },
  /**
   * * Finds the last entry where the key or value matches the query.
   * @example find.last(config, '.php', 'endsWith', 'key')
   * @param obj The object to search.
   * @param query The search query.
   * @param mode The comparison mode ('exact', 'contains', 'startsWith', 'endsWith').
   * @param searchBy Whether to search by 'key' or 'value'.
   * @returns The last matching [key, value] pair or undefined.
   */
  last(obj, query, mode = "exact", searchBy = "key") {
    const entries = Object.entries(obj);
    const queryStr = String(query).toLowerCase();
    return [...entries].reverse().find(([key, val2]) => {
      const target = searchBy === "key" ? key : val2;
      const valStr = String(target).toLowerCase();
      switch (mode) {
        case "exact":
          return valStr === queryStr;
        case "startsWith":
          return valStr.startsWith(queryStr);
        case "endsWith":
          return valStr.endsWith(queryStr);
        case "contains":
          return valStr.includes(queryStr);
        default:
          return false;
      }
    });
  },
  /**
   * * Finds all keys matching the query.
   * @example find.key(config, 'api_', 'startsWith')
   * @param obj The object to search.
   * @param query The search query.
   * @param mode The comparison mode ('exact', 'contains', 'startsWith', 'endsWith').
   * @returns An array of matching keys.
   */
  key(obj, query, mode = "exact") {
    const queryStr = String(query).toLowerCase();
    return Object.keys(obj).filter((key) => {
      const valStr = String(key).toLowerCase();
      switch (mode) {
        case "exact":
          return valStr === queryStr;
        case "startsWith":
          return valStr.startsWith(queryStr);
        case "endsWith":
          return valStr.endsWith(queryStr);
        case "contains":
          return valStr.includes(queryStr);
        default:
          return false;
      }
    });
  },
  /**
   * * Finds all values matching the query.
   * @example find.value(config, 'enabled', 'exact')
   * @param obj The object to search.
   * @param query The search query.
   * @param mode The comparison mode ('exact', 'contains', 'startsWith', 'endsWith').
   * @returns An array of matching values.
   */
  value(obj, query, mode = "exact") {
    const queryStr = String(query).toLowerCase();
    return Object.values(obj).filter((val2) => {
      const valStr = String(val2).toLowerCase();
      switch (mode) {
        case "exact":
          return valStr === queryStr;
        case "startsWith":
          return valStr.startsWith(queryStr);
        case "endsWith":
          return valStr.endsWith(queryStr);
        case "contains":
          return valStr.includes(queryStr);
        default:
          return false;
      }
    });
  },
  /**
   * * Finds the key of the first match based on the query condition.
   * * Mirrors array.find.byMatch(). For objects, it returns the key instead of a numeric index.
   * @example find.byMatch(config, 'admin', 'exact', 'value') => 'role'
   * @param obj The object to search.
   * @param query The search query.
   * @param mode The comparison mode ('exact', 'contains', 'startsWith', 'endsWith').
   * @param searchBy Whether to search by 'key' or 'value' (default: 'key').
   * @returns The matched key as a string, or undefined if no match is found.
   */
  byMatch(obj, query, mode = "exact", searchBy = "key") {
    const queryStr = String(query).toLowerCase();
    const entries = Object.entries(obj);
    const found = entries.find(([key, val2]) => {
      const target = searchBy === "key" ? key : val2;
      const valStr = String(target).toLowerCase();
      switch (mode) {
        case "exact":
          return valStr === queryStr;
        case "startsWith":
          return valStr.startsWith(queryStr);
        case "endsWith":
          return valStr.endsWith(queryStr);
        case "contains":
          return valStr.includes(queryStr);
        default:
          return false;
      }
    });
    return found ? found[0] : void 0;
  }
};

// src/modules/data/index.ts
function chunk3(data2, size) {
  return Array.isArray(data2) ? chunk(data2, size) : chunk2(data2, size);
}
function merge3(data2, ...args) {
  return Array.isArray(data2) ? merge(data2, ...args) : merge2(data2, ...args);
}
function add3(data2, arg1, arg2, arg3) {
  return Array.isArray(data2) ? add(data2, arg1, arg2) : add2(data2, arg1, arg2, arg3);
}
function clear3(data2) {
  return Array.isArray(data2) ? clear(data2) : clear2(data2);
}
function pick3(data2, keysOrIndices) {
  return Array.isArray(data2) ? pick(data2, keysOrIndices) : pick2(data2, keysOrIndices);
}
function omit3(data2, keysOrIndices) {
  return Array.isArray(data2) ? omit(data2, keysOrIndices) : omit2(data2, keysOrIndices);
}
function get4(data2, path) {
  return Array.isArray(data2) ? get2(data2, path) : get3(data2, path);
}
function set3(data2, path, value) {
  return Array.isArray(data2) ? set(data2, path, value) : set2(data2, path, value);
}
function removeAt(data2, index) {
  return Array.isArray(data2) ? remove2.at(data2, index) : remove3.at(data2, index);
}
function removeFirst(data2) {
  return Array.isArray(data2) ? remove2.first(data2) : remove3.first(data2);
}
function removeLast(data2) {
  return Array.isArray(data2) ? remove2.last(data2) : remove3.last(data2);
}
function removeByMatch(data2, query, mode, keyOrSearchBy) {
  return Array.isArray(data2) ? remove2.byMatch(data2, query, mode, keyOrSearchBy) : remove3.byMatch(data2, query, mode, keyOrSearchBy);
}
function removeByKey(data2, keyOrIndex) {
  return Array.isArray(data2) ? remove2.byKey(data2, keyOrIndex) : remove3.byKey(data2, keyOrIndex);
}
function removeByValue(data2, value) {
  return Array.isArray(data2) ? remove2.byValue(data2, value) : remove3.byValue(data2, value);
}
function findAt(data2, arg1, arg2, arg3) {
  return Array.isArray(data2) ? find.at(data2, arg1, arg2, arg3) : find2.at(data2, arg1);
}
function findAll2(data2, query, mode, keyOrSearchBy) {
  return Array.isArray(data2) ? find.all(data2, query, mode, keyOrSearchBy) : find2.all(data2, query, mode, keyOrSearchBy);
}
function findFirst(data2, query, mode, keyOrSearchBy) {
  return Array.isArray(data2) ? find.first(data2, query, mode, keyOrSearchBy) : find2.first(data2, query, mode, keyOrSearchBy);
}
function findLast(data2, query, mode, keyOrSearchBy) {
  return Array.isArray(data2) ? find.last(data2, query, mode, keyOrSearchBy) : find2.last(data2, query, mode, keyOrSearchBy);
}
function findKey(data2, query, mode) {
  return Array.isArray(data2) ? find.key(data2, query, mode) : find2.key(data2, query, mode);
}
function findValue(data2, query, mode) {
  return Array.isArray(data2) ? find.value(data2, query, mode) : find2.value(data2, query, mode);
}
function findByMatch(data2, query, mode, keyOrSearchBy) {
  return Array.isArray(data2) ? find.byMatch(data2, query, mode, keyOrSearchBy) : find2.byMatch(data2, query, mode, keyOrSearchBy);
}
var data = {
  arr: arrays_exports,
  obj: objects_exports,
  chunk: chunk3,
  merge: merge3,
  add: add3,
  clear: clear3,
  empty: clear3,
  pick: pick3,
  omit: omit3,
  get: get4,
  set: set3,
  remove: {
    at: removeAt,
    first: removeFirst,
    last: removeLast,
    byKey: removeByKey,
    byValue: removeByValue,
    byMatch: removeByMatch,
    all: clear3
  },
  find: {
    at: findAt,
    all: findAll2,
    first: findFirst,
    last: findLast,
    key: findKey,
    value: findValue,
    byMatch: findByMatch
  }
};

// src/index.ts
Object.assign(jBase.prototype, cssMethods);
Object.assign(jBase.prototype, eventMethods);
Object.assign(jBase.prototype, domMethods);
Object.assign(jBase.prototype, effectMethods);
var initFn = (selector) => {
  return new jBase(selector);
};
var init = Object.assign(initFn, {
  http,
  data,
  each,
  throttle,
  debounce,
  fn: jBase.prototype
});
var bind = (window2) => {
  const doc = window2.document;
  const boundInit = (selector) => new jBase(selector, doc);
  Object.assign(boundInit, {
    fn: jBase.prototype,
    http,
    data,
    each,
    throttle,
    debounce
  });
  return boundInit;
};
var $ = init;
var jB = init;
var _jB = init;
var __jB = init;
var _jBase = init;
var __jBase = init;
var jBase2 = init;
var __ = init;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  $,
  JBaseClass,
  __,
  __jB,
  __jBase,
  _jB,
  _jBase,
  bind,
  data,
  debounce,
  each,
  http,
  jB,
  jBase,
  throttle
});
/**
 * @file src/utils.ts
 * @version 2.2.0
 * @since 2.0.0
 * @license GPL-3.0-or-later
 * @copyright Sven Minio 2026
 * @author Sven Minio <https://sven-minio.de>
 * @category Utilities
 * @description
 * * General utility functions and helpers (e.g., debounce, throttle, type checks).
 */
/**
 * @file src/core.ts
 * @version 2.2.0
 * @since 2.0.0
 * @license GPL-3.0-or-later
 * @copyright Sven Minio 2026
 * @author Sven Minio <https://sven-minio.de>
 * @category Core
 * @description
 * * The main jBase class. Handles the selection engine, initialization, and plugin architecture.
 * @requires ./types
 * * Type definitions for the core class and its methods.
 */
/**
 * @file src/modules/css/classes.ts
 * @version 2.0.3
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
/**
 * @file src/modules/css/styles.ts
 * @version 2.0.4
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
/**
 * @file src/modules/css/index.ts
 * @version 2.0.3
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
/**
 * @file src/modules/events/binding.ts
 * @version 2.1.0
 * @since 2.0.0
 * @license GPL-3.0-or-later
 * @copyright Sven Minio 2026
 * @author Sven Minio <https://sven-minio.de>
 * @category Events
 * @description
 * * Core event binding methods (on, off, trigger). Handles event registration and removal.
 * @requires ../../core
 * * Depends on the core jBase class for type definitions.
 * @requires ../../utils
 * * Uses utility functions for iteration and environment checks.
 */
/**
 * @file src/modules/events/mouse.ts
 * @version 2.1.0
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
/**
 * @file src/modules/events/lifecycle.ts
 * @version 2.0.3
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
/**
 * @file src/modules/events/keyboard.ts
 * @version 2.0.3
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
/**
 * @file src/modules/events/form.ts
 * @version 2.0.3
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
/**
 * @file src/modules/events/touch.ts
 * @version 2.1.0
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
/**
 * @file src/modules/dom/attributes.ts
 * @version 2.1.1
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
/**
 * @file src/modules/http/get.ts
 * @version 2.0.6
 * @since 2.0.0
 * @license GPL-3.0-or-later
 * @copyright Sven Minio 2026
 * @author Sven Minio <https://sven-minio.de>
 * @category HTTP
 * @description
 * * Abstraction for HTTP GET requests.
 */
/**
 * @file src/modules/dom/content.ts
 * @version 2.1.0
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
/**
 * @file src/modules/dom/manipulation.ts
 * @version 2.0.4
 * @since 2.0.0
 * @license GPL-3.0-or-later
 * @copyright Sven Minio 2026
 * @author Sven Minio <https://sven-minio.de>
 * @category DOM
 * @description
 * * Methods for inserting, moving, and removing elements (append, prepend, remove).
 * @requires ../../core
 * * Depends on the core jBase class for type definitions.
 * @requires src/utils
 * * Depends on utility functions (e.g., each).
 */
/**
 * @file src/modules/dom/traversal.ts
 * @version 2.0.3
 * @since 2.0.0
 * @license GPL-3.0-or-later
 * @copyright Sven Minio 2026
 * @author Sven Minio <https://sven-minio.de>
 * @category DOM
 * @description
 * * Methods for navigating the DOM tree (find, parent, children, siblings).
 * @requires ../../core
 * * Depends on the core jBase class for type definitions.
 * @requires ../../utils
 * * Utility functions (e.g., `each` for iteration).
 */
/**
 * @file src/modules/dom/states.ts
 * @version 2.1.0
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
/**
 * @file src/modules/dom/index.ts
 * @version 2.0.3
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
/**
 * @file src/modules/effects/slide.ts
 * @version 2.0.3
 * @since 2.0.0
 * @license GPL-3.0-or-later
 * @copyright Sven Minio 2026
 * @author Sven Minio <https://sven-minio.de>
 * @category Effects
 * @description
 * * Methods for horizontal sliding effects (slideIn, slideOut, slideToggle).
 * @requires ../../core
 * * Depends on the core jBase class for type definitions.
 * @requires ../../utils
 * * Uses utility functions for environment checks.
 * @requires ./types
 * * Type definitions for slide options.
 */
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
/**
 * @file src/modules/effects/fade.ts
 * @version 2.1.0
 * @since 2.0.0
 * @license GPL-3.0-or-later
 * @copyright Sven Minio 2026
 * @author Sven Minio <https://sven-minio.de>
 * @category Effects
 * @description
 * * Methods for fading elements in and out (fadeIn, fadeOut, fadeToggle).
 * @requires ../../core
 * * Depends on the core jBase class for type definitions.
 * @requires ../../utils
 * * Uses utility functions for environment checks.
 * @requires ./types
 * * Type definitions for fade options.
 */
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
 * @file src/modules/http/post.ts
 * @version 2.0.5
 * @since 2.0.2
 * @license GPL-3.0-or-later
 * @copyright Sven Minio 2026
 * @author Sven Minio <https://sven-minio.de>
 * @category HTTP
 * * @description
 * * Abstraction for HTTP POST requests.
 */
/**
 * @file src/modules/http/upload.ts
 * @version 2.0.0
 * @since 2.3.0
 * @license GPL-3.0-or-later
 * @copyright Sven Minio 2026
 * @author Sven Minio <https://sven-minio.de>
 * @category HTTP
 * * @description
 * * Abstraction for HTTP POST requests.
 */
/**
 * @file src/modules/http/index.ts
 * @version 2.1.0
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
 * @requires ./upload
 * * HTTP file upload method with progress tracking.
 */
/**
 * @file src/modules/data/arrays.ts
 * @version 2.1.0
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
/**
 * @file src/modules/data/objects.ts
 * @version 2.1.0
 * @since 2.0.0
 * @license GPL-3.0-or-later
 * @copyright Sven Minio 2026
 * @author Sven Minio <https://sven-minio.de>
 * @category Data
 * @description
 * * Utility functions for object manipulation (e.g., deep merging, extension).
 * @requires ./types
 * * Depends on types.
 * @requires src/utils
 * * Depends on utility functions (e.g., each).
 */
/**
 * @file src/modules/data/index.ts
 * @version 2.1.0
 * @since 2.0.0
 * * @license GPL-3.0-or-later
 * @copyright Sven Minio 2026
 * @author Sven Minio <https://sven-minio.de>
 * @category Data
 * @description
 * * Central entry point for data manipulation. 
 * * Features a dynamic, overloaded API router that automatically delegates 
 * * to array or object utilities based on the input type.
 * @requires ./arrays
 * * Array manipulation methods.
 * @requires ./objects
 * * Object manipulation methods.
 */
/**
 * @file src/index.ts
 * @version 2.3.0
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
//# sourceMappingURL=index.cjs.map

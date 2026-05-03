* [`remove`](#usage-remove) | [`empty`](#usage-empty) | [`replaceWithClone`](#usage-replaceWithClone)
* [`append`](#usage-append) | [`prepend`](#usage-prepend) | [`before`](#usage-before) | [`after`](#usage-after)
* [`replaceWith`](#usage-replaceWith) | [`appendTo`](#usage-appendTo) | [`prependTo`](#usage-prependTo)
* [`insertBefore`](#usage-insertBefore) | [`insertAfter`](#usage-insertAfter)
* [`wrap`](#usage-wrap) | [`unwrap`](#usage-unwrap)

---

## <a id="usage-remove"></a>.remove

**Description**
Removes the set of matched elements from the DOM.

**Parameters**

* None.

**Returns**

* (jBase): The removed elements (detached).

**Example**

```javascript
$('.ads').remove();

```

---

## <a id="usage-empty"></a>.empty

**Description**
Remove all child nodes of the set of matched elements from the DOM.

**Parameters**

* None.

**Returns**

* (jBase): Current instance.

**Example**

```javascript
// Clears the content of .container but keeps the container itself
$('.container').empty();

```

---

## <a id="usage-replaceWithClone"></a>.replaceWithClone

**Description**
Replaces the selected elements with a deep clone of themselves. Useful for stripping event listeners.

**Parameters**

* None.

**Returns**

* (jBase): The new cloned elements.

**Example**

```javascript
// Removes all events attached to the button by cloning it
$('button#reset').replaceWithClone();

```

---

## <a id="usage-append"></a>.append

**Description**
Insert content, specified by the parameter, to the end of each element in the set of matched elements.

**Parameters**

* `content` (String|HTMLElement|jBase): The content to insert.

**Returns**

* (jBase): Current instance.

**Example**

```javascript
$('.list').append('<li>New Item</li>');

```

---

## <a id="usage-prepend"></a>.prepend

**Description**
Insert content, specified by the parameter, to the beginning of each element in the set of matched elements.

**Parameters**

* `content` (String|HTMLElement|jBase): The content to insert.

**Returns**

* (jBase): Current instance.

**Example**

```javascript
$('.list').prepend('<li>First Item</li>');

```

---

## <a id="usage-before"></a>.before

**Description**
Insert content before each element in the set of matched elements.

**Parameters**

* `content` (String|HTMLElement|jBase): The content to insert.

**Returns**

* (jBase): Current instance.

**Example**

```javascript
$('#main').before('<div class="header"></div>');

```

---

## <a id="usage-after"></a>.after

**Description**
Insert content after each element in the set of matched elements.

**Parameters**

* `content` (String|HTMLElement|jBase): The content to insert.

**Returns**

* (jBase): Current instance.

**Example**

```javascript
$('#main').after('<div class="footer"></div>');

```

---

## <a id="usage-replaceWith"></a>.replaceWith

**Description**
Replace each element in the set of matched elements with the provided new content.

**Parameters**

* `content` (String|HTMLElement|jBase): The content to insert.

**Returns**

* (jBase): Current instance (the old, detached elements).

**Example**
```javascript
$('.old-element').replaceWith('<div class="new-element">Updated</div>');
```

---

## <a id="usage-appendTo"></a>.appendTo

**Description**
Insert every element in the set of matched elements to the end of the target.

**Parameters**

* `target` (String|HTMLElement|jBase): The element to append to.

**Returns**

* (jBase): Current instance.

**Example**

```javascript
$('<p>Test</p>').appendTo('.container');

```

---

## <a id="usage-prependTo"></a>.prependTo

**Description**
Insert every element in the set of matched elements to the beginning of the target.

**Parameters**

* `target` (String|HTMLElement|jBase): The target element.

**Returns**

* (jBase): Current instance.

**Example**

```javascript
$('<p>Intro</p>').prependTo('body');

```

---

## <a id="usage-insertBefore"></a>.insertBefore

**Description**
Insert every element in the set of matched elements immediately before the target element.

**Parameters**

* `target` (String|HTMLElement): A CSS selector or DOM element before which the content will be inserted.

**Returns**

* (jBase): Current instance.

**Example**

```javascript
$('<p>New Alert</p>').insertBefore('#main-content');
```

---

## <a id="usage-insertAfter"></a>.insertAfter

**Description**
Insert every element in the set of matched elements immediately after the target element.

**Parameters**

* `target` (String|HTMLElement): A CSS selector or DOM element after which the content will be inserted.

**Returns**

* (jBase): Current instance.

**Example**

```javascript
$('<span>* Required</span>').insertAfter('input.required');
```

---

## <a id="usage-wrap"></a>.wrap

**Description**
Wrap an HTML structure around each element in the set of matched elements.

**Parameters**

* `structure` (String): HTML string specifying the structure (e.g., `<div class="wrapper"></div>`).

**Returns**

* (jBase): Current instance.

**Example**

```javascript
$('.item').wrap('<div class="item-wrapper"></div>');

```

---

## <a id="usage-unwrap"></a>.unwrap

**Description**
Remove the parents of the set of matched elements from the DOM, leaving the matched elements in their place.

**Parameters**

* None.

**Returns**

* (jBase): Current instance.

**Example**

```javascript
// Removes the parent <div> but keeps the <span>
$('span').unwrap();

```
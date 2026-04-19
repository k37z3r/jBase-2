* [`keydown`](#usage-keydown) | [`keyup`](#usage-keyup) | [`keypress`](#usage-keypress) | [`pressedKey`](#usage-pressedKey)

---

## <a id="usage-keydown"></a>.keydown

**Description**
Bind an event handler to the "keydown" event, or trigger it.

**Parameters**

* `handler` (Function, optional): Function to execute.

**Returns**

* (jBase): Current instance.

**Example**

```javascript
$(document).keydown(function(e) {
    console.log('Key pressed:', e.key);
});

```

---

## <a id="usage-keyup"></a>.keyup

**Description**
Bind an event handler to the "keyup" event, or trigger it.

**Parameters**

* `handler` (Function, optional): Function to execute.

**Returns**

* (jBase): Current instance.

**Example**

```javascript
$('#input').keyup(function() {
    console.log('Key released');
});

```

---

## <a id="usage-keypress"></a>.keypress

> **⚠️ DEPRECATED:** This event is officially deprecated in modern web standards. Please use [`.keydown()`](#usage-keydown) instead.

**Description**
Bind an event handler to the "keypress" event, or trigger it.

**Parameters**
* `handler` (Function, optional): Function to execute.

**Returns**
* (jBase): Current instance.

**Example**
```javascript
$(document).keypress(function(e) {
    // Logic here
});

```

---

## <a id="usage-pressedkey"></a>.pressedkey

**Description**
A specialized helper method. It attaches a listener that only executes the handler if a specific key matches.

**Parameters**

* `key` (String): The key value to check for (e.g., 'Enter', 'Escape').
* `handler` (Function): Function to execute if the key matches.

**Returns**

* (jBase): Current instance.

**Example**

```javascript
$('#search').pressedkey('Enter', function() {
    console.log('Enter key was pressed, submitting search...');
});

```
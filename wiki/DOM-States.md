* [`checked`](#usage-checked) | [`check`](#usage-check) | [`uncheck`](#usage-uncheck)
* [`selected`](#usage-selected) | [`select`](#usage-select)
* [`disabled`](#usage-disabled) | [`disable`](#usage-disable) | [`enable`](#usage-enable)

---

## <a id="usage-checked"></a>.checked

**Description**
Get the checked state of the first element or set the state for all matched elements.

**Parameters**

* `state` (Boolean, optional): True to check, false to uncheck.

**Returns**

* (Boolean): Current state (if getter).
* (jBase): Current instance (if setter).

**Example**

```javascript
if ($('#agree').checked()) {
    // do something
}
$('#agree').checked(true);

```

---

## <a id="usage-selected"></a>.selected

**Description**
Get the selected state of an option or set it.

**Parameters**

* `state` (Boolean, optional): True to select, false to deselect.

**Returns**

* (Boolean): Current state (if getter).
* (jBase): Current instance (if setter).

**Example**

```javascript
$('option[value="de"]').selected(true);

```

---

## <a id="usage-disabled"></a>.disabled

**Description**
Get the disabled state of an element or set it.

**Parameters**

* `state` (Boolean, optional): True to disable, false to enable.

**Returns**

* (Boolean): Current state (if getter).
* (jBase): Current instance (if setter).

**Example**

```javascript
$('button').disabled(true);

```

---

## <a id="usage-check"></a>.check

**Description**
Alias for `.checked(true)`. Checks all matched checkboxes or radio buttons.

**Parameters**
* None.

**Returns**
* (jBase): Current instance for chaining.

**Example**
```javascript
$('.terms-checkbox').check();
```

---

## <a id="usage-uncheck"></a>.uncheck

**Description**
Alias for `.checked(false)`. Unchecks all matched checkboxes or radio buttons.

**Parameters**
* None.

**Returns**
* (jBase): Current instance for chaining.

**Example**
```javascript
$('.optional-options').uncheck();
```

---

## <a id="usage-select"></a>.select

**Description**
Alias for `.selected(true)`. Selects the matched `<option>` elements in a dropdown.

**Parameters**
* None.

**Returns**
* (jBase): Current instance for chaining.

**Example**
```javascript
$('select#country option[value="DE"]').select();
```

---

## <a id="usage-disable"></a>.disable

**Description**
Alias for `.disabled(true)`. Disables the matched form fields or buttons and automatically adds the `.disabled` CSS class.

**Parameters**
* None.

**Returns**
* (jBase): Current instance for chaining.

**Example**
```javascript
$('#submit-btn').disable();
```

---

## <a id="usage-enable"></a>.enable

**Description**
Alias for `.disabled(false)`. Enables the matched form fields or buttons and automatically removes the `.disabled` CSS class.

**Parameters**
* None.

**Returns**
* (jBase): Current instance for chaining.

**Example**
```javascript
$('#submit-btn').enable();
```
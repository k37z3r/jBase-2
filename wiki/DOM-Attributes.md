* [`attr`](#usage-attr) | [`val`](#usage-val) | [`removeAttr`](#usage-removeattr) | [`prop`](#usage-prop)

---

## <a id="usage-attr"></a>.attr

**Description**
Get the value of an attribute for the first element in the set, or set one or more attributes for every matched element.

**Parameters**

* `name` (String): The name of the attribute.
* `value` (String|Number, optional): The value to set. If omitted, the method acts as a getter.

**Returns**

* (String): Value of the attribute (if getter).
* (jBase): Current instance for chaining (if setter).

**Example**

```javascript
// Get href
const link = $('a.my-link').attr('href');

// Set id and title
$('.item').attr('id', 'item-1').attr('title', 'Item One');
```

---

## <a id="usage-val"></a>.val

**Description**
Get the current value of the first element in the set of matched elements or set the value of every matched element.

**Parameters**

* `value` (String|Number, optional): The value to set.

**Returns**

* (String|Number): The value of the input (if getter).
* (jBase): Current instance (if setter).

**Example**

```javascript
// Get input value
const username = $('#username').val();

// Set input value
$('#username').val('NewUser');
```

---

## <a id="usage-removeattr"></a>.removeAttr

**Description**
Remove an attribute from each element in the set of matched elements.

**Parameters**

* `name` (String): The name of the attribute to remove.

**Returns**

* (jBase): Current instance for chaining.

**Example**

```javascript
// Remove disabled attribute to enable a button
$('button.submit').removeAttr('disabled');

// Remove readonly attribute from an input
$('.input-field').removeAttr('readonly');
```

---

## <a id="usage-prop"></a>.prop

**Description**
Get the value of a property for the first element in the set of matched elements or set one or more properties for every matched element. This is especially useful for properties that do not map directly to HTML attributes (like `checked`, `disabled`, or `selectedIndex`).

**Parameters**

* `name` (String): The name of the property.
* `value` (Any, optional): The value to set. If omitted, the method acts as a getter.

**Returns**

* (Any): Value of the property (if getter).
* (jBase): Current instance for chaining (if setter).

**Example**

```javascript
// Get checked state of a checkbox
const isChecked = $('#my-checkbox').prop('checked');

// Set a checkbox to checked
$('#my-checkbox').prop('checked', true);

// Set all inputs in a form to disabled
$('form input').prop('disabled', true);

```
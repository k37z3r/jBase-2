
* [`slideDown`](#usage-slideDown) | [`slideUp`](#usage-slideUp) | [`slideToggleBox`](#usage-slideToggleBox)

---

## <a id="usage-slideDown"></a>.slideDown

**Description**
Display the matched elements with a sliding motion (expanding height downwards).

**Parameters**
* `options` (Object, optional): Animation options.
  * `duration` (Number): Duration in milliseconds (default is 300).
  * `displayType` (String): The CSS display value to set before sliding (default is 'block').

**Returns**
* (jBase): Current instance.

**Example**
```javascript
// Reveal a dropdown menu
$('.dropdown-menu').slideDown({ duration: 200 });
```

---

## <a id="usage-slideUp"></a>.slideUp

**Description**
Hide the matched elements with a sliding motion (collapsing height upwards).

**Parameters**
  * `options` (Object, optional): Animation options.
      * `duration` (Number): Duration in milliseconds (default is 300).

**Returns**
  * (jBase): Current instance.

**Example**
```javascript
$('.dropdown-menu').slideUp({ duration: 200 });
```

---

## <a id="usage-slideToggleBox"></a>.slideToggleBox

**Description**
Display or hide the matched elements with a vertical sliding motion. Ideal for accordions or collapsible boxes.

**Parameters**
  * `options` (Object, optional): Animation options.
      * `duration` (Number): Duration in milliseconds (default is 300).

**Returns**
* (jBase): Current instance.

**Example**
```javascript
$('.accordion-header').click(function() {
    // Slide toggle the next element (the body)
    $(this).next().slideToggleBox({ duration: 300 });
});
```

* [`slideDown`](#usage-slideDown) | [`slideUp`](#usage-slideUp) | [`slideToggleBox`](#usage-slideToggleBox)

---

## <a id="usage-slideDown"></a>.slideDown

**Description**
Display the matched elements with a sliding motion (expanding height downwards).

**Parameters**
* `options` (Object, optional): Animation options.
  * `duration` (Number): Duration in milliseconds (default is 300).
  * `displayType` (String): The CSS display value to set before sliding (default is 'block').
  * `easing` (String): CSS transition timing function (e.g., 'linear', 'ease-in-out').
  * `bounce` (Boolean): If set to true, applies a dynamic cubic-bezier curve that slightly overshoots the target height for a spring effect.

**Returns**
* (jBase): Current instance.

**Example**
```javascript
// Reveal a dropdown menu
$('.dropdown-menu').slideDown({ duration: 200 });

// 1. Shorthand syntax (Number)
$('.dropdown-content').slideDown(400);

// 2. Custom display type and bounce
$('.accordion-panel').slideDown({ 
    duration: 500, 
    displayType: 'flex', 
    bounce: true 
});
```

---

## <a id="usage-slideUp"></a>.slideUp

**Description**
Hide the matched elements with a sliding motion (collapsing height upwards).

**Parameters**
* `options` (Object, optional): Animation options.
  * `duration` (Number): Duration in milliseconds (default is 300).
  * `easing` (String): CSS transition timing function.
  * `bounce` (Boolean): If set to true, the element slightly expands before collapsing.

**Returns**
  * (jBase): Current instance.

**Example**
```javascript
$('.dropdown-menu').slideUp({ duration: 200 });

// 1. Shorthand syntax (Number)
$('.alert-box').slideUp(300);

// 2. Hide with custom easing
$('.modal-body').slideUp({ 
    duration: 500, 
    easing: 'ease-out' 
});
```

---

## <a id="usage-slideToggleBox"></a>.slideToggleBox

**Description**
Display or hide the matched elements with a vertical sliding motion. Ideal for accordions or collapsible boxes.

**Parameters**
* `options` (Object | Number, optional): Animation options object, or a number representing the duration in milliseconds. Passes these options to either `slideDown` or `slideUp`

**Returns**
* (jBase): Current instance.

**Example**
```javascript
$('.accordion-header').click(function() {
    // Slide toggle the next element (the body)
    $(this).next().slideToggleBox({ duration: 300 });
});

// Toggle an accordion panel with shorthand syntax
$('.accordion-header').on('click', () => {
    $(this).next('.accordion-content').slideToggleBox(400);
});
```
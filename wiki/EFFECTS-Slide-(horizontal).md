* [`slideIn`](#usage-slideIn) | [`slideOut`](#usage-slideOut) | [`slideToggle`](#usage-slideToggle)

---

## <a id="usage-slideIn"></a>.slideIn

**Description**
Displays the matched elements with a sliding motion (usually from left to right or by expanding width).

**Parameters**
* `options` (Object, optional): Animation options.
  * `duration` (Number): Duration in milliseconds (default is 300).
  * `direction` (String): 'left' or 'right' (default is 'left').
  * `easing` (String): CSS transition timing function (default is 'cubic-bezier(0.4, 0.0, 0.2, 1)').
  * `bounce` (Boolean): If set to true, applies a dynamic spring-like curve that slightly overshoots the target before resting.

**Returns**
* (jBase): Current instance.

**Example**

```javascript
$('#sidebar').slideIn({ duration: 400, direction: 'left' });

// 1. Shorthand syntax (Number)
$('#sidebar').slideIn(400);

// 2. Slide in from the right with custom easing
$('#sidebar').slideIn({ 
    duration: 500, 
    direction: 'right', 
    easing: 'linear' 
});

// 3. The new snappy bounce effect
$('#drawer').slideIn({ 
    duration: 600, 
    bounce: true 
});
```

---

## <a id="usage-slideOut"></a>.slideOut

**Description**
Hides the matched elements with a sliding motion (usually collapsing width or moving off-canvas).

**Parameters**
* `options` (Object, optional): Animation options.
  * `duration` (Number): Duration in milliseconds (default is 300).
  * `direction` (String): 'left' or 'right' (default is 'left').
  * `easing` (String): CSS transition timing function.
  * `bounce` (Boolean): If set to true, the element slightly pulls back before shooting off-canvas.

**Returns**
* (jBase): Current instance.

**Example**

```javascript
$('#sidebar').slideOut({ duration: 400 });

// 1. Shorthand syntax (Number)
$('#sidebar').slideOut(400);

// 2. Slide out to the right with bounce effect
$('#sidebar').slideOut({ 
    duration: 500, 
    direction: 'right', 
    bounce: true 
});

```

---

## <a id="usage-slideToggle"></a>.slideToggle

**Description**
Display or hide the matched elements with a horizontal sliding motion.

**Parameters**
* `options` (Object | Number, optional): Animation options object, or a number representing the duration in milliseconds. Passes these options to either `slideIn` or `slideOut`.

**Returns**
* (jBase): Current instance.

**Example**

```javascript
$('.drawer').slideToggle();

// Toggle an off-canvas menu with a bouncy spring effect
$('.menu-toggle-btn').on('click', () => {
    $('.drawer').slideToggle({ 
        duration: 400, 
        bounce: true 
    });
});
```
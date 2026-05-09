* [`fadeIn` / `show`](#usage-fadeIn) | [`fadeOut` / `hide`](#usage-fadeOut) | [`fadeToggle`](#usage-fadeToggle)

---

## <a id="usage-fadeIn"></a>.fadeIn (Alias: .show)

**Description**
Display the matched elements by fading them to opaque (opacity: 1).

**Parameters**
* `options` (Object, optional): Animation options.
  * `duration` (Number): Animation runtime in milliseconds (default is 300).
  * `displayType` (String): The CSS display value to set before fading (default is 'block').
  * `easing` (String): CSS transition timing function (e.g., 'linear', 'ease-in-out').
  * `bounce` (Boolean): If set to true, applies a dynamic cubic-bezier curve and scale transformation for a spring-like effect.

**Returns**
* (jBase): Current instance.

**Example**
```javascript
// 1. Shorthand syntax (Number)
$('div.hidden').fadeIn(400);

// 2. Custom display type and easing
$('.modal').show({ 
    duration: 600, 
    displayType: 'flex', 
    easing: 'linear' 
});

// 3. The new snappy bounce effect
$('.alert').fadeIn({ 
    duration: 500, 
    bounce: true 
});

```

---

## <a id="usage-fadeOut"></a>.fadeOut (Alias: .hide)

**Description**
Hide the matched elements by fading them to transparent (opacity: 0). Once complete, the display property is often set to 'none'.

**Parameters**

* `options` (Object, optional): Animation options.
  * `duration` (Number, optional): Duration in milliseconds.
  * `easing` (String): CSS transition timing function (e.g., 'linear', 'ease-in-out').
  * `bounce` (Boolean): If set to true, applies a spring-like 'back-in' animation before disappearing.

**Returns**

* (jBase): Current instance.

**Example**

```javascript
$('.alert-box').fadeOut({ duration: 300 });

// 1. Shorthand syntax (Number)
$('.alert-box').fadeOut(300);

// Use the alias with custom duration
$('.modal').hide({ duration: 500 });

// 2. Hide with custom easing
$('.modal').hide({ 
    duration: 500, 
    easing: 'ease-out' 
});

```

---

## <a id="usage-fadeToggle"></a>.fadeToggle (Alias: .toggle)

**Description**
Display or hide the matched elements by intelligently animating their opacity based on their current computed display state.

**Parameters**

* `options` (Object, optional): Animation options.
  * `duration` (Object | Number, optional): Animation options object, or a number representing the duration in milliseconds. Passes these options to either `fadeIn` or `fadeOut`.

**Returns**

* (jBase): Current instance.

**Example**

```javascript
// Toggle visibility on click
$('#toggle-btn').click(() => {
    $('.content').fadeToggle({ duration: 200 });
});

// 1. Simple toggle with shorthand syntax
$('#toggle-btn').on('click', () => {
    $('.content').fadeToggle(200);
});

// 2. Toggle with modern bounce effect
$('#menu-btn').on('click', () => {
    $('.dropdown').toggle({ 
        duration: 400, 
        bounce: true 
    });
});

```
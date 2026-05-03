* [`fadeIn` / `show`](#usage-fadeIn) | [`fadeOut` / `hide`](#usage-fadeOut) | [`fadeToggle`](#usage-fadeToggle)

---

## <a id="usage-fadeIn"></a>.fadeIn (Alias: .show)

**Description**
Display the matched elements by fading them to opaque (opacity: 1).

**Parameters**
* `options` (Object, optional): Animation options.
  * `duration` (Number): Animation runtime in milliseconds (default is 300).
  * `displayType` (String): The CSS display value to set before fading (default is 'block').

**Returns**
* (jBase): Current instance.

**Example**
```javascript
// Fade in over 600ms as flexbox
$('div.hidden').fadeIn({ duration: 600, displayType: 'flex' }, function() {
    console.log('Animation complete.');
});

// Use the alias with custom settings
$('.modal').show({ duration: 500, displayType: 'flex' });

```

---

## <a id="usage-fadeOut"></a>.fadeOut (Alias: .hide)

**Description**
Hide the matched elements by fading them to transparent (opacity: 0). Once complete, the display property is often set to 'none'.

**Parameters**

* `options` (Object, optional): Animation options.
  * `duration` (Number, optional): Duration in milliseconds.

**Returns**

* (jBase): Current instance.

**Example**

```javascript
$('.alert-box').fadeOut({ duration: 300 });

// Use the alias with custom duration
$('.modal').hide({ duration: 500 });

```

---

## <a id="usage-fadeToggle"></a>.fadeToggle

**Description**
Display or hide the matched elements by animating their opacity.

**Parameters**

* `options` (Object, optional): Animation options.
  * `duration` (Number, optional): Duration in milliseconds.

**Returns**

* (jBase): Current instance.

**Example**

```javascript
// Toggle visibility on click
$('#toggle-btn').click(() => {
    $('.content').fadeToggle({ duration: 200 });
});

```
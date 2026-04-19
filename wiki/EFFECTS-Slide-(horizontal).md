* [`slideIn`](#usage-slideIn) | [`slideOut`](#usage-slideOut) | [`slideToggle`](#usage-slideToggle)

---

## <a id="usage-slideIn"></a>.slideIn

**Description**
Displays the matched elements with a sliding motion (usually from left to right or by expanding width).

**Parameters**
* `options` (Object, optional): Animation options.
  * `duration` (Number): Duration in milliseconds (default is 300).
  * `direction` (String): 'left' or 'right' (default is 'left').


**Returns**
* (jBase): Current instance.

**Example**

```javascript
$('#sidebar').slideIn({ duration: 400, direction: 'left' });
```

---

## <a id="usage-slideOut"></a>.slideOut

**Description**
Hides the matched elements with a sliding motion (usually collapsing width or moving off-canvas).

**Parameters**
  * `options` (Object, optional): Animation options.
      * `duration` (Number): Duration in milliseconds (default is 300).
      * `direction` (String): 'left' or 'right' (default is 'left').

**Returns**
* (jBase): Current instance.

**Example**

```javascript
$('#sidebar').slideOut({ duration: 400 });

```

---

## <a id="usage-slideToggle"></a>.slideToggle

**Description**
Display or hide the matched elements with a horizontal sliding motion.

**Parameters**
  * `options` (Object, optional): Animation options.
      * `duration` (Number): Duration in milliseconds (default is 300).
      * `direction` (String): 'left' or 'right' (default is 'left').

**Returns**
* (jBase): Current instance.

**Example**

```javascript
$('.drawer').slideToggle();
```
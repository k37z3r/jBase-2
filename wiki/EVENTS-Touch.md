* [`touchstart`](#usage-touchstart) | [`touchend`](#usage-touchend) | [`touchmove`](#usage-touchmove) | [`touchcancel`](#usage-touchcancel)
* [`swipeLeft`](#usage-swipeLeft) | [`swipeRight`](#usage-swipeRight) | [`swipeUp`](#usage-swipeUp) | [`swipeDown`](#usage-swipeDown)


---

## <a id="usage-touchstart"></a>.touchstart

**Description**
Bind an event handler to the "touchstart" event (finger is placed on a touch surface).

**Parameters**

* `handler` (Function, optional): Function to execute.

**Returns**

* (jBase): Current instance.

**Example**

```javascript
$('.swipe-area').touchstart(function(e) {
    console.log('Touch started');
});

```

---

## <a id="usage-touchend"></a>.touchend

**Description**
Bind an event handler to the "touchend" event (finger is removed from a touch surface).

**Parameters**

* `handler` (Function, optional): Function to execute.

**Returns**

* (jBase): Current instance.

**Example**

```javascript
$('.swipe-area').touchend(function(e) {
    console.log('Touch ended');
});

```

---

## <a id="usage-touchmove"></a>.touchmove

**Description**
Bind an event handler to the "touchmove" event (finger is dragged across the surface).

**Parameters**

* `handler` (Function, optional): Function to execute.

**Returns**

* (jBase): Current instance.

**Example**

```javascript
$('.swipe-area').touchmove(function(e) {
    // prevent scrolling while swiping
    e.preventDefault(); 
});

```

---

## <a id="usage-touchcancel"></a>.touchcancel

**Description**
Bind an event handler to the "touchcancel" event (system cancels the touch event).

**Parameters**

* `handler` (Function, optional): Function to execute.

**Returns**

* (jBase): Current instance.

**Example**

```javascript
$('.swipe-area').touchcancel(function() {
    console.log('Touch cancelled');
});

```

---

## <a id="usage-swipeLeft"></a>.swipeLeft

**Description**
Binds an event handler to be executed when the user swipes their finger to the left across the element. The swipe must cover a minimum distance of 50px.

**Parameters**
* `handler` (Function): Function to execute on left swipe.

**Returns**
* (jBase): Current instance.

**Example**
```javascript
$('.carousel').swipeLeft(() => nextSlide());
```

---

## <a id="usage-swipeRight"></a>.swipeRight
**Description**
Binds an event handler to be executed when the user swipes their finger to the right across the element.

**Parameters**

  * `handler` (Function): Function to execute on right swipe.

**Returns**

  * (jBase): Current instance.

**Example**

```javascript
$('.carousel').swipeRight(() => prevSlide());
```

---

## <a id="usage-swipeUp"></a>.swipeUp

**Description**
Binds an event handler to be executed when the user swipes their finger upwards across the element.

**Parameters**

  * `handler` (Function): Function to execute on upward swipe.

**Returns**

  * (jBase): Current instance.

**Example**

```javascript
$('.carousel').swipeUp(() => {
    CloseWindow()
});
```

---

## <a id="usage-swipeDown"></a>.swipeDown

**Description**
Binds an event handler to be executed when the user swipes their finger downwards across the element.

**Parameters**

  * `handler` (Function): Function to execute on downward swipe.

**Returns**

  * (jBase): Current instance.


**Example**

```javascript
$('.carousel').swipeDown(() => {
    Reload();
});
```
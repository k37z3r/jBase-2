* [`click`](#usage-click) | [`dblclick`](#usage-dblclick)
* [`mouseenter`](#usage-mouseenter) | [`mouseleave`](#usage-mouseleave) | [`mousemove`](#usage-mousemove) | [`mousedown`](#usage-mousedown) | [`mouseup`](#usage-mouseup) | [`mouseover`](#usage-mouseover) | [`mouseout`](#usage-mouseout) | [`hover`](#usage-hover)

---

## <a id="usage-click"></a>.click

**Description**
Bind an event handler to the "click" event, or trigger it.

**Parameters**

* `handler` (Function, optional): Function to execute.

**Returns**

* (jBase): Current instance.

**Example**

```javascript
$('#btn').click(function() {
    alert('Clicked!');
});

```

---

## <a id="usage-dblclick"></a>.dblclick

**Description**
Bind an event handler to the "dblclick" event, or trigger it.

**Parameters**

* `handler` (Function, optional): Function to execute.

**Returns**

* (jBase): Current instance.

**Example**

```javascript
$('.item').dblclick(function() {
    $(this).toggleClass('expanded');
});

```

---

## <a id="usage-mousedown"></a>.mousedown

**Description**
Bind an event handler to the "mousedown" event (mouse button is pressed), or trigger it.

**Parameters**

* `handler` (Function, optional): Function to execute.

**Returns**

* (jBase): Current instance.

**Example**

```javascript
$('.btn').mousedown(function() {
    $(this).addClass('active-state');
});

```

---

## <a id="usage-mouseup"></a>.mouseup

**Description**
Bind an event handler to the "mouseup" event (mouse button is released), or trigger it.

**Parameters**

* `handler` (Function, optional): Function to execute.

**Returns**

* (jBase): Current instance.

**Example**

```javascript
$('.btn').mouseup(function() {
    $(this).removeClass('active-state');
});
```

---

## <a id="usage-mouseenter"></a>.mouseenter

**Description**
Bind an event handler to be fired when the mouse enters an element. This event does not bubble (unlike `mouseover`).

**Parameters**

* `handler` (Function): Function to execute.

**Returns**

* (jBase): Current instance.

**Example**

```javascript
$('.card').mouseenter(function() {
    $(this).addClass('hover-effect');
});
```

---

## <a id="usage-mouseleave"></a>.mouseleave

**Description**
Bind an event handler to be fired when the mouse leaves an element. This event does not bubble (unlike `mouseout`).

**Parameters**

* `handler` (Function): Function to execute.

**Returns**

* (jBase): Current instance.

**Example**

```javascript
$('.card').mouseleave(function() {
    $(this).removeClass('hover-effect');
});
```

---

## <a id="usage-mousemove"></a>.mousemove

**Description**
Bind an event handler to the "mousemove" event, or trigger it.

**Parameters**

* `handler` (Function, optional): Function to execute.

**Returns**

* (jBase): Current instance.

**Example**

```javascript
$(document).mousemove(function(e) {
    console.log('Coords: ', e.pageX, e.pageY);
});
```

---

## <a id="usage-mouseover"></a>.mouseover

**Description**
Bind an event handler to the "mouseover" event. This event bubbles (triggers if mouse enters a child element).

**Parameters**

* `handler` (Function, optional): Function to execute.

**Returns**

* (jBase): Current instance.

**Example**

```javascript
$('.container').mouseover(function() {
    // Handle bubbling mouseover
});
```

---

## <a id="usage-mouseout"></a>.mouseout

**Description**
Bind an event handler to the "mouseout" event. This event bubbles.

**Parameters**

* `handler` (Function, optional): Function to execute.

**Returns**

* (jBase): Current instance.

**Example**

```javascript
$('.container').mouseout(function() {
    // Handle bubbling mouseout
});
```

---

## <a id="usage-hover"></a>.hover

**Description**
Bind two handlers to the matched elements, to be executed when the mouse pointer enters and leaves the elements. This is a convenient shorthand for chaining `.mouseenter()` and `.mouseleave()`.

**Parameters**
* `handlerIn` (Function): A function to execute when the mouse pointer enters the element.
* `handlerOut` (Function): A function to execute when the mouse pointer leaves the element.

**Returns**
* (jBase): Current instance for chaining.

**Example**
```javascript
$('.card').hover(
    function(e) { $(this).addClass('shadow-lg'); }, // On Enter
    function(e) { $(this).removeClass('shadow-lg'); } // On Leave
);
```
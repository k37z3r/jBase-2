* [`on`](#usage-on) | [`off`](#usage-off) | [`once`](#usage-once) | [`trigger`](#usage-trigger)

---

## <a id="usage-on"></a>.on

**Description**
Attach an event handler function for one or more events to the selected elements. It fully supports event delegation (listening to dynamically added children) and passing custom data to the event object.

**Parameters**

* `events` (String): One or more space-separated event types (e.g., "click" or "mouseenter mouseleave").
* `selector` (String, optional): A selector string to filter the descendants of the selected elements that trigger the event. If omitted, the event is always triggered when it reaches the selected element.
* `data` (Any, optional): Custom data to be passed to the handler in `event.data` when an event is triggered.
* `handler` (Function): A function to execute when the event is triggered.

**Returns**

* (jBase): Current instance for chaining.

**Examples**

```javascript
// 1. Basic binding
$('button').on('click', function(e) {
    console.log('Button clicked!');
});

// 2. Event Delegation (Highly performant for dynamic content)
// Listens on the <table>, but only fires if a <tr> was clicked
$('table.data-grid').on('click', 'tr', function(e) {
    console.log('Row clicked:', this); 
});

// 3. Passing custom data
function greet(event) {
    alert("Hello " + event.data.name);
}
$('button.user-btn').on('click', { name: "Karl" }, greet);

```

---

## <a id="usage-off"></a>.off

**Description**
Remove an event handler. You can remove all handlers for an event, or be highly specific by passing the exact selector and/or handler function that was used during binding.

**Parameters**

  * `events` (String): One or more space-separated event types.
  * `selector` (String, optional): A selector which should exactly match the one originally passed to `.on()`.
  * `handler` (Function, optional): The specific handler function previously attached for the event(s).

**Returns**

  * (jBase): Current instance for chaining.

**Examples**

```javascript
// 1. Remove ALL click handlers from buttons
$('button').off('click');

// 2. Remove a specific handler
function handleClick() { console.log('Clicked'); }
$('button').on('click', handleClick);
$('button').off('click', handleClick);

// 3. Remove a delegated event
$('table').off('click', 'tr');

```

---

## <a id="usage-once"></a>.once

**Description**
Attach a handler to an event for the elements. The handler is executed **at most once** per element per event type, and then automatically unbinds itself. It supports the exact same parameters (delegation and data) as `.on()`.

**Parameters**

  * `events` (String): One or more space-separated event types.
  * `selector` (String, optional): A selector string for event delegation.
  * `data` (Any, optional): Custom data passed to `event.data`.
  * `handler` (Function): A function to execute.

**Returns**

  * (jBase): Current instance for chaining.

**Examples**

```javascript
// Triggers only the first time the button is clicked
$('button.submit').once('click', () => {
    console.log('Form submitted! Button will ignore further clicks.');
});

// Delegated one-time event
$('ul.todo-list').once('click', 'li', function() {
    $(this).addClass('completed');
});
```

---

## <a id="usage-trigger"></a>.trigger

**Description**
Execute all handlers and behaviors attached to the matched elements for the given event type. You can also pass custom data to the event (accessible via `event.detail`).

**Parameters**
* `eventName` (String): The name of the event to trigger (e.g., 'click' or a custom event like 'user:login').
* `data` (Any, optional): Extra data passed to the custom event object.

**Returns**
* (jBase): Current instance for chaining.

**Examples**
```javascript
// Trigger a native click
$('#btn').trigger('click');

// Trigger a custom event with data
$('.user-card').on('user:update', (e) => console.log(e.detail.id));
$('.user-card').trigger('user:update', { id: 42 });
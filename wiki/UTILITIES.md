* [`$.each`](#usage-each) | [`$.throttle`](#usage-throttle) | [`$.debounce`](#usage-debounce)

---

## <a id="usage-each"></a>$.each

**Description**
A generic, highly performant iterator function that can be used to seamlessly iterate over both arrays (or array-like objects such as NodeLists) and plain objects. 

Unlike the native `Array.prototype.forEach()`, `$.each()` allows you to **break the loop early** by returning `false` within the callback function, saving valuable CPU cycles.

**Parameters**

* `collection` (Array | Object | NodeList): The collection to iterate over.
* `callback` (Function): The function to execute for each item.
  * For arrays, the callback is passed `(index, value)`.
  * For objects, the callback is passed `(key, value)`.
  * The `this` context inside the callback refers to the current value.

**Returns**

* (Array | Object): The original collection.

**Examples**

```javascript
// 1. Iterating over an Array (with early break)
const fruits = ['Apple', 'Banana', 'Cherry', 'Date'];

$.each(fruits, function(index, value) {
    console.log(index + ': ' + value);
    
    // Stop the loop completely once we find 'Cherry'
    if (value === 'Cherry') {
        return false; 
    }
});

// 2. Iterating over an Object
const user = { id: 1, name: 'Alice', role: 'Admin' };

$.each(user, function(key, value) {
    console.log(key + ' = ' + value);
});

// 3. Iterating over a NodeList directly
const buttons = document.querySelectorAll('button');

$.each(buttons, function(index, btn) {
    btn.classList.add('processed');
});
```

-----

## <a id="usage-throttle"></a>$.throttle

**Description**
Ensures a function is called at most once in a specified time limit. [cite_start]Perfect for `scroll` or `resize` events. [cite: 561]

**Parameters**

  * `func` (Function): The function to throttle.
  * [cite_start]`limit` (Number): The time limit in milliseconds. [cite: 561]

**Example**

```javascript
const throttledScroll = $.throttle(() => {
    console.log('Scrolling...');
}, 200);

$(window).on('scroll', throttledScroll);
```

-----

## <a id="usage-debounce"></a>$.debounce

**Description**
Delays the execution of a function until after a specified wait time has passed since the last time it was invoked. [cite_start]Ideal for search inputs. [cite: 565]

**Parameters**

  * `func` (Function): The function to debounce.
  * [cite_start]`delay` (Number): The delay in milliseconds. [cite: 565]

**Example**

```javascript
const search = $.debounce((query) => {
    $.http.get('/search?q=' + query).then(console.log);
}, 500);

$('#search-input').on('input', function() {
    search($(this).val());
});
```
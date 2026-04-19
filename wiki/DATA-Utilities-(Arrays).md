* [`chunk`](#usage-chunk) | [`mergeArray`](#usage-mergeArray) | [`add`](#usage-add)
* [`remove.at`](#usage-remove.at) | [`remove.first`](#usage-remove.first) | [`remove.last`](#usage-remove.last) | [`remove.byMatch`](#usage-remove.byMatch)
* [`findAt`](#usage-find-at) | [`findFirst`](#usage-find-first) | [`findLast`](#usage-find-last) | [`findAll`](#usage-find-all) | [`findByMatch`](#usage-find-byMatch)

---

## <a id="usage-chunk"></a>.chunk

**Description**
Creates an array of elements split into groups the length of `size`.

**Parameters**

* `array` (Array): The array to process.
* `size` (Number): The length of each chunk.

**Returns**

* (Array[]): An array containing the chunked arrays.

**Example**

```javascript
const data = [1, 2, 3, 4, 5];
const chunks = $.data.chunk(data, 2);
// Result: [[1, 2], [3, 4], [5]]

```

---

## <a id="usage-mergeArray"></a>.mergeArray

**Description**
Merges multiple arrays into a single, flat array.
*(Note: This creates a new array and does not modify the inputs).*

**Parameters**

* `...arrays` (Array[]): A list of arrays to merge (e.g. `arr1, arr2, arr3`).

**Returns**

* (Array): A new, single merged array.

**Example**

```javascript
const a = [1, 2];
const b = [3, 4];
const c = [5, 6];
const result = $.data.mergeArray(a, b, c);
// Result: [1, 2, 3, 4, 5, 6]

```

---

## <a id="usage-add"></a>.add

**Description**
Safely adds an element to the array at a specific position without mutating the original array (Immutable).

**Parameters**

* `array` (Array): The original array.
* `item` (Any): The item to add.
* `index` (Number, optional): The position to insert at. Defaults to the end (`array.length`). Negative values count from the back.

**Returns**

* (Array): A new array including the added element.

**Example**

```javascript
const list = ['a', 'c'];
// Insert 'b' at index 1
const result = $.data.add(list, 'b', 1);
// Result: ['a', 'b', 'c']

```

---

## <a id="usage-remove-at"></a>.remove.at

**Description**
Removes an element at a specific index and returns a new array. Supports negative indices to count from the end.

**Parameters**

* `array` (Array): The source array.
* `index` (Number): The index to remove. Negative values count from the back (e.g., `-1` is the last item).

**Returns**

* (Array): A new array without the item at the specified index.

**Example**

```javascript
const numbers = [10, 20, 30, 40];
const result = $.data.remove.at(numbers, -2); // Removes 30
// Result: [10, 20, 40]
// Original 'numbers' array remains [10, 20, 30, 40]

```

---

## <a id="usage-remove-first"></a>.remove.first

**Description**
Removes the first element of the array and returns the rest as a new array.

**Parameters**

* `array` (Array): The source array.

**Returns**

* (Array): A new array without the first element.

**Example**

```javascript
const queue = ['Task 1', 'Task 2', 'Task 3'];
const nextQueue = $.data.remove.first(queue);
// Result: ['Task 2', 'Task 3']

```

---

## <a id="usage-remove-last"></a>.remove.last

**Description**
Removes the last element of the array and returns the rest as a new array.

**Parameters**

* `array` (Array): The source array.

**Returns**

* (Array): A new array without the last element.

**Example**

```javascript
const stack = ['A', 'B', 'C'];
const newStack = $.data.remove.last(stack);
// Result: ['A', 'B']

```

---

## <a id="usage-remove-byMatch"></a>.remove.byMatch

**Description**
Removes **all** elements that match the search query condition.
*(This effectively acts as an inverse filter).*

**Parameters**

* `array` (Array): The source array.
* `query` (String|Number): The search term to match against.
* `mode` (String, optional): Comparison mode: `'exact'`, `'contains'`, `'startsWith'`, `'endsWith'`. Default is `'exact'`.
* `key` (String, optional): If the array contains objects, specify the property key to check.

**Returns**

* (Array): A new array containing only the items that **did not** match.

**Example**

```javascript
const users = [
    { id: 1, role: 'admin' },
    { id: 2, role: 'user' },
    { id: 3, role: 'admin' }
];

// Remove all admins
const nonAdmins = $.data.remove.byMatch(users, 'admin', 'exact', 'role');
// Result: [{ id: 2, role: 'user' }]
```

---

## <a id="usage-find-at"></a>.find.at

**Description**
Finds the **index** of the first element that matches the query.

**Parameters**

* `array` (Array): The array to search.
* `query` (String|Number): The search term.
* `mode` (String, optional): Comparison mode: `'exact'`, `'contains'`, `'startsWith'`, `'endsWith'`. Default is `'exact'`.
* `key` (String, optional): If the array contains objects, specify the property key to search in.

**Returns**

* (Number): The index of the match, or `-1` if not found.

**Example**

```javascript
const users = [{id: 1, name: 'Alice'}, {id: 2, name: 'Bob'}];
// Find index of user with name starting with 'Bo'
const index = $.data.find.at(users, 'Bo', 'startsWith', 'name');
// Result: 1

```

---

## <a id="usage-find-all"></a>.find.all

**Description**
Returns **all elements** (as a new array) that match the condition. Similar to `filter()`.

**Parameters**

* `array` (Array): The array to search.
* `query` (String|Number): The search term.
* `mode` (String, optional): `'exact'`, `'contains'`, `'startsWith'`, `'endsWith'`. Default is `'exact'`.
* `key` (String, optional): The object property key to check (if array of objects).

**Returns**

* (Array): An array containing all matching elements.

**Example**

```javascript
const files = ['image.png', 'script.js', 'logo.png', 'style.css'];
// Find all .png files
const images = $.data.find.all(files, '.png', 'endsWith');
// Result: ['image.png', 'logo.png']

```

---

## <a id="usage-find-first"></a>.find.first

**Description**
Returns the **first element** (the actual item, not the index) that matches the query.

**Parameters**

* `array` (Array): The array to search.
* `query` (String|Number): The search term.
* `mode` (String, optional): `'exact'`, `'contains'`, `'startsWith'`, `'endsWith'`. Default is `'exact'`.
* `key` (String, optional): The object property key to check.

**Returns**

* (Any | undefined): The found element, or `undefined`.

**Example**

```javascript
const fruits = ['apple', 'banana', 'cherry'];
const match = $.data.find.first(fruits, 'nana', 'contains');
// Result: 'banana'

```

---

## <a id="usage-find-last"></a>.find.last

**Description**
Returns the **last element** that matches the query. Searches the array in reverse order.

**Parameters**

* `array` (Array): The array to search.
* `query` (String|Number): The search term.
* `mode` (String, optional): `'exact'`, `'contains'`, `'startsWith'`, `'endsWith'`. Default is `'exact'`.
* `key` (String, optional): The object property key to check.

**Returns**

* (Any | undefined): The last matching element, or `undefined`.

**Example**

```javascript
const log = [
    { level: 'info', msg: 'Start' },
    { level: 'error', msg: 'Fail' },
    { level: 'info', msg: 'End' }
];
// Find last info message
const lastInfo = $.data.find.last(log, 'info', 'exact', 'level');
// Result: { level: 'info', msg: 'End' }

```

---

## <a id="usage-find-byMatch"></a>.find.byMatch

**Description**
Finds the **index** of the first match based on the query condition.
*(Note: Functionally similar to `find.at` in the current implementation).*

**Parameters**

* `array` (Array): The array to search.
* `query` (String|Number): The search term.
* `mode` (String, optional): `'exact'`, `'contains'`, `'startsWith'`, `'endsWith'`. Default is `'exact'`.
* `key` (String, optional): The object property key to check.

**Returns**

* (Number): The index of the match, or `-1`.

**Example**

```javascript
const nums = [10, 20, 30, 40];
const idx = $.data.find.byMatch(nums, 30);
// Result: 2

```
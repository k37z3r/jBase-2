* [`chunk`](#usage-chunk) | [`mergeArray` / `merge`](#usage-mergeArray) | [`add`](#usage-add) | [`clear` / `empty`](#usage-clear)
* [`pick`](#usage-pick) | [`omit`](#usage-omit) | [`get`](#usage-get) | [`set`](#usage-set)
* [`remove.at`](#usage-remove-at) | [`remove.first`](#usage-remove-first) | [`remove.last`](#usage-remove-last) | [`remove.byMatch`](#usage-remove-byMatch) | [`remove.byKey`](#usage-remove-byKey) | [`remove.byValue`](#usage-remove-byValue) | [`remove.all`](#usage-remove-all)
* [`find.at`](#usage-find-at) | [`find.first`](#usage-find-first) | [`find.last`](#usage-find-last) | [`find.all`](#usage-find-all) | [`find.key`](#usage-find-key) | [`find.value`](#usage-find-value) | [`find.byMatch`](#usage-find-byMatch)



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

## <a id="usage-mergeArray"></a>.mergeArray (Alias: .merge)

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
const result = $.data.merge(a, b, c);
//Alternative: $.data.mergeArray(a, b, c);

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

## <a id="usage-clear"></a>.clear (Alias: .empty)

**Description**
Clears the array and returns a new empty array. This method is strictly immutable; it does not mutate the original array, but instead provides a clean, predictable way to reset data states.

**Parameters**

* `array` (Array): The array to clear.

**Returns**

* (Array): A new, empty array (`[]`).

**Example**
```javascript
const myData = [1, 2, 3, 4, 5];
const resetData = $.data.clear(myData);
// Alternatively: $.data.empty(myData);

// Result: resetData is [], myData remains [1, 2, 3, 4, 5]
```

---

## <a id="usage-pick"></a>.pick

**Description**
Creates a new array containing only the elements at the specified indices (Allowlist). Mirrors the object API.

**Parameters**

* `array` (Array): The source array.
* `indices` (Number[]): Array of indices to keep.

**Returns**

* (Array): A new array with selected elements.

**Example**
```javascript
const list = ['a', 'b', 'c', 'd'];
const result = $.data.pick(list, [0, 2]);
// Result: ['a', 'c']
```

---

## <a id="usage-omit"></a>.omit

**Description**
Creates a new array containing all elements EXCEPT those at the specified indices (Blocklist). Mirrors the object API.

**Parameters**

* `array` (Array): The source array.
* `indices` (Number[]): Array of indices to remove.

**Returns**

* (Array): A new array without the specified elements.

**Example**

```javascript
const list = ['a', 'b', 'c', 'd'];
const result = $.data.omit(list, [1, 3]);
// Result: ['a', 'c']
```

---

## <a id="usage-get"></a>.get

**Description**
Safely retrieves a value from a nested array/object structure (Safe Navigation) using dot-notation. Mirrors the object API.

**Parameters**

* `array` (Array): The source array.
* `path` (String): The path as a dot-notation string.

**Returns**

* (Any | undefined): The found value or `undefined` if any part is missing.

**Example**
```javascript
const users = [{ profile: { name: 'Sven' } }];
const name = $.data.get(users, '0.profile.name');
// Result: 'Sven'
```

---

## <a id="usage-set"></a>.set

**Description**
Sets a value deeply within a nested array/object structure. Automatically creates missing intermediate objects or arrays based on the path. Mirrors the object API.

**Parameters**

* `array` (Array): The array to modify.
* `path` (String): The path as a string (e.g., '0.profile.name').
* `value` (Any): The value to set.

**Returns**

* (void): Modifies the array in place.

**Example**

```javascript
const users = [];
$.data.set(users, '0.profile.role', 'admin');
// Result: [{ profile: { role: 'admin' } }]
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

## <a id="usage-remove-byKey"></a>.remove.byKey

**Description**
Removes the element at a specific index. Mirrors `object.remove.byKey`. Functionally identical to `remove.at` for arrays.

**Parameters**

* `array` (Array): The source array.
* `index` (Number): The index (key) to remove.

**Returns**

* (Array): A new array without the specified index.

**Example**
```javascript
const list = ['a', 'b', 'c'];
const result = $.data.remove.byKey(list, 1); 
// Result: ['a', 'c']
```

---

## <a id="usage-remove-byValue"></a>.remove.byValue

**Description**
Removes all elements that match a specific value exactly (using strict equality `!==`).

**Parameters**

* `array` (Array): The source array.
* `value` (Any): The exact value to remove.

**Returns**

* (Array): A new array without the specified values.

**Example**

```javascript
const nums = [1, 2, 1, 3];
const result = $.data.remove.byValue(nums, 1); 
// Result: [2, 3]
```

---

## <a id="usage-remove-all"></a>.remove.all

**Description**
Alias for `.clear()`. Empties the array immutably.

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

---

## <a id="usage-find-key"></a>.find.key

**Description**
Finds all indices (keys) matching the query. For arrays, keys are the indices (represented as strings). Mirrors the object API.

**Parameters**

* `array` (Array): The array to search.
* `query` (String|Number): The search query.
* `mode` (String, optional): Comparison mode: `'exact'`, `'contains'`, `'startsWith'`, `'endsWith'`. Default is `'exact'`.

**Returns**

* (String[]): An array of matching indices as strings.

**Example**
```javascript
const list = ['apple', 'banana', 'apricot'];
// Find indices containing '0'
const indices = $.data.find.key(list, '0', 'exact');
// Result: ['0']
```

---

## <a id="usage-find-value"></a>.find.value

**Description**
Finds all values matching the query. Identical to `find.all()` for flat arrays, provided for strict API symmetry with objects.

**Parameters**

* `array` (Array): The array to search.
* `query` (String|Number): The search term.
* `mode` (String, optional): Comparison mode. Default is `'exact'`.

**Returns**

* (Array): An array of matching values.

**Example**

```javascript
const list = ['apple', 'banana', 'apricot'];
const matches = $.data.find.value(list, 'ap', 'startsWith');
// Result: ['apple', 'apricot']
```
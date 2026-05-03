* [`chunk`](#usage-chunk) | [`mergeObjects` / `merge`](#usage-mergeObjects) | [`add`](#usage-add) | [`clear` / `empty`](#usage-clear)
* [`pick`](#usage-pick) | [`omit`](#usage-omit) | [`get`](#usage-get) | [`set`](#usage-set)
* [`remove.at`](#usage-remove-at) | [`remove.first`](#usage-remove-first) | [`remove.last`](#usage-remove-last) | [`remove.byMatch`](#usage-remove-byMatch) | [`remove.byKey`](#usage-remove-byKey) | [`remove.byValue`](#usage-remove-byValue) | [`remove.all`](#usage-remove-all)
* [`find.at`](#usage-find-at) | [`find.first`](#usage-find-first) | [`find.last`](#usage-find-last) | [`find.all`](#usage-find-all) | [`find.key`](#usage-find-key) | [`find.value`](#usage-find-value) | [`find.byMatch`](#usage-find-byMatch)


---

## <a id="usage-chunk"></a>.chunk

**Description**
Splits an object into an array of smaller objects (chunks). Ideal for batched processing of object properties. Mirrors the array API.

**Parameters**

* `obj` (Object): The source object.
* `size` (Number): The maximum number of keys per chunk.

**Returns**

* (Object[]): An array of partial objects.

**Example**
```javascript
const data = { a: 1, b: 2, c: 3 };
const chunks = $.data.chunk(data, 2);
// Result: [{ a: 1, b: 2 }, { c: 3 }]
```

---

## <a id="usage-add"></a>.add

**Description**
Safely adds a key-value pair at a specific index without mutating the original object (Immutable). Note: While modern browsers generally respect object insertion order, relying strictly on object key order is not always recommended.

**Parameters**

* `obj` (Object): The original object.
* `key` (String): The key to add.
* `value` (Any): The value to add.
* `index` (Number, optional): The position to insert at. Defaults to the end. Negative values count from the back.

**Returns**

* (Object): A new object including the added element.

**Example**

```javascript
const list = { a: 1, c: 3 };
const result = $.data.add(list, 'b', 2, 1);
// Result: { a: 1, b: 2, c: 3 }
```

---

## <a id="usage-clear"></a>.clear (Alias: .empty)

**Description**
Clears the object and returns a new empty object. This method is strictly immutable; it does not mutate the original object, ensuring a safe functional approach when resetting state.

**Parameters**

* `obj` (Object): The object to clear.

**Returns**

* (Object): A new, empty object (`{}`).

**Example**
```javascript
const userProfile = { name: 'Sven', role: 'Admin' };
const resetProfile = $.data.clear(userProfile);
// Alternatively: $.data.empty(userProfile);

// Result: resetProfile is {}, userProfile remains unchanged
```

---

## <a id="usage-mergeObjects"></a>.mergeObjects (Alias: .merge)


**Description**
Recursively merges one or more source objects into a target object (Deep Merge).
*Note: This modifies the `target` object in place.*

**Parameters**

* `target` (Object): The target object to receive properties.
* `...sources` (Object[]): One or more source objects to merge into the target.

**Returns**

* (Object): The modified target object.

**Example**

```javascript
const defaults = { app: { theme: 'light', debug: false } };
const config = { app: { debug: true } };

$.data.merge(defaults, config);
// Alternatively: $.data.mergeObjects(defaults, config);

// defaults is now: { app: { theme: 'light', debug: true } }

```

---

## <a id="usage-pick"></a>.pick

**Description**
Creates a new object containing *only* the specified keys (Allowlist).

**Parameters**

* `obj` (Object): The source object.
* `keys` (String[]): An array of keys to keep.

**Returns**

* (Object): A new object with the selected keys.

**Example**

```javascript
const user = { id: 1, name: 'Alice', role: 'admin' };
const publicProfile = $.data.pick(user, ['name']);
// Result: { name: 'Alice' }

```

---

## <a id="usage-omit"></a>.omit

**Description**
Creates a new object containing all keys *except* the specified ones (Blocklist).

**Parameters**

* `obj` (Object): The source object.
* `keys` (String[]): An array of keys to remove.

**Returns**

* (Object): A new object without the specified keys.

**Example**

```javascript
const user = { id: 1, name: 'Alice', password: '123' };
const safeUser = $.data.omit(user, ['password']);
// Result: { id: 1, name: 'Alice' }

```

---

## <a id="usage-get"></a>.get

**Description**
Safely retrieves a value from a nested object using dot-notation. Returns `undefined` if the path does not exist, preventing runtime errors.

**Parameters**

* `obj` (Object): The object to query.
* `path` (String): The path as a dot-notation string (e.g., `'user.address.city'`).

**Returns**

* (Any): The found value or `undefined`.

**Example**

```javascript
const val = $.data.get(response, 'data.items.0.id');

```

---

## <a id="usage-set"></a>.set

**Description**
Sets a value deeply within a nested object. It automatically creates missing intermediate objects if the path doesn't exist.

**Parameters**

* `obj` (Object): The object to modify.
* `path` (String): The path string (e.g., `'settings.theme.color'`).
* `value` (Any): The value to set.

**Returns**

* (Void): This function mutates the object and returns nothing.

**Example**

```javascript
const config = {};
$.data.set(config, 'database.connection.host', 'localhost');
// config is now: { database: { connection: { host: 'localhost' } } }

```

---

## <a id="usage-remove-at"></a>.remove.at

**Description**
Removes an entry at a specific index and returns a new object (Immutable). Supports negative indices to count from the end.

**Parameters**

* `obj` (Object): The source object.
* `index` (Number): The index to remove.

**Returns**

* (Object): A new object without the entry at the specified index.

**Example**
```javascript
const data = { a: 1, b: 2, c: 3 };
const result = $.data.remove.at(data, -1); 
// Result: { a: 1, b: 2 }
```

---

## <a id="usage-remove-first"></a>.remove.first

**Description**
Removes the first entry of the object and returns the rest as a new object (Immutable).

**Parameters**

* `obj` (Object): The source object.

**Returns**

* (Object): A new object without the first entry.

**Example**

```javascript
const queue = { first: 'Task 1', second: 'Task 2' };
const nextQueue = $.data.remove.first(queue);
// Result: { second: 'Task 2' }
```

---

## <a id="usage-remove-last"></a>.remove.last

**Description**
Removes the last entry of the object and returns the rest as a new object (Immutable).

**Parameters**

* `obj` (Object): The source object.

**Returns**

* (Object): A new object without the last entry.

**Example**
```javascript
const stack = { a: 1, b: 2, c: 3 };
const newStack = $.data.remove.last(stack);
// Result: { a: 1, b: 2 }
```

---

## <a id="usage-remove-byMatch"></a>.remove.byMatch

**Description**
Removes **all** entries that match the search query condition (Immutable). Acts as an inverse filter.

**Parameters**

* `obj` (Object): The source object.
* `query` (String|Number): The search term.
* `mode` (String, optional): Comparison mode: `'exact'`, `'contains'`, `'startsWith'`, `'endsWith'`. Default is `'exact'`.
* `searchBy` (String, optional): Search by `'key'` or `'value'`. Default is `'key'`.

**Returns**

* (Object): A new object containing only the items that **did not** match.

**Example**

```javascript
const config = { api_key: '123', secret: 'abc', api_url: 'http' };
const safeConfig = $.data.remove.byMatch(config, 'api_', 'startsWith', 'key');
// Result: { secret: 'abc' }
```

---

## <a id="usage-remove-byKey"></a>.remove.byKey

**Description**
Removes a specific key-value pair from the object based on its key (Immutable).

**Parameters**

* `obj` (Object): The source object.
* `key` (String): The exact key to remove.

**Returns**

* (Object): A new object without the specified key.

**Example**
```javascript
const user = { a: 1, b: 2, c: 3 };
const result = $.data.remove.byKey(user, 'b'); 
// Result: { a: 1, c: 3 }
```

---

## <a id="usage-remove-byValue"></a>.remove.byValue

**Description**
Removes all entries that match a specific value exactly (using strict equality `!==`).

**Parameters**

* `obj` (Object): The source object.
* `value` (Any): The exact value to remove.

**Returns**

* (Object): A new object without the matching values.

**Example**

```javascript
const scores = { alice: 10, bob: 5, charlie: 10 };
const result = $.data.remove.byValue(scores, 10); 
// Result: { bob: 5 }
```

---

## <a id="usage-remove-all"></a>.remove.all

**Description**
Alias for `.clear()`. Empties the object immutably.

---

## <a id="usage-find-at"></a>.find.at

**Description**
Returns the n-th entry of an object as a `[key, value]` pair. Supports negative indices to count from the end.

**Parameters**

* `obj` (Object): The object to search.
* `index` (Number): The 0-based index. Negative numbers count from the back.

**Returns**

* ([String, Any] | undefined): A tuple containing the key and value, or undefined.

**Example**

```javascript
const data = { a: 1, b: 2, c: 3 };
const entry = $.data.find.at(data, -1);
// Result: ['c', 3]

```

---

## <a id="usage-find-all"></a>.find.all

**Description**
Returns a NEW OBJECT containing ALL elements that match the condition. Similar to `filter()` but returns a partial object. Mirrors the array API.

**Parameters**

* `obj` (Object): The object to search.
* `query` (String|Number): The search term.
* `mode` (String, optional): `'exact'`, `'contains'`, `'startsWith'`, `'endsWith'`. Default is `'exact'`.
* `searchBy` (String, optional): Search by `'key'` or `'value'`. Default is `'key'`.

**Returns**

* (Object): A new object containing only the matching elements.

**Example**
```javascript
const config = { a: 1, b: 2, c: 1 };
// Find all entries where the value is exactly 1
const matches = $.data.find.all(config, 1, 'exact', 'value');
// Result: { a: 1, c: 1 }
```

---

## <a id="usage-find-first"></a>.find.first

**Description**
Finds the **first** entry where the key or value matches the query.

**Parameters**

* `obj` (Object): The object to search.
* `query` (String|Number): The search term.
* `mode` (String, optional): Comparison mode: `'exact'`, `'contains'`, `'startsWith'`, `'endsWith'`. Default is `'exact'`.
* `searchBy` (String, optional): Search by `'key'` or `'value'`. Default is `'key'`.

**Returns**

* ([String, Any] | undefined): The first matching `[key, value]` pair.

**Example**

```javascript
const config = { admin_id: 10, user_id: 20 };
// Find first entry where key starts with 'user'
const match = $.data.find.first(config, 'user', 'startsWith', 'key');
// Result: ['user_id', 20]

```

---

## <a id="usage-find-last"></a>.find.last

**Description**
Finds the **last** entry where the key or value matches the query. Useful for prioritized overrides or ordered objects.

**Parameters**

* `obj` (Object): The object to search.
* `query` (String|Number): The search term.
* `mode` (String, optional): `'exact'`, `'contains'`, `'startsWith'`, `'endsWith'`. Default is `'exact'`.
* `searchBy` (String, optional): `'key'` or `'value'`. Default is `'key'`.

**Returns**

* ([String, Any] | undefined): The last matching `[key, value]` pair.

**Example**

```javascript
const files = { 'script.js': 1, 'style.css': 2, 'main.css': 3 };
// Find last entry where key ends with '.css'
const match = $.data.find.last(files, '.css', 'endsWith', 'key');
// Result: ['main.css', 3]

```

---

## <a id="usage-find-key"></a>.find.key

**Description**
Finds **all keys** in the object that match the query.

**Parameters**

* `obj` (Object): The object to search.
* `query` (String): The search term.
* `mode` (String, optional): `'exact'`, `'contains'`, `'startsWith'`, `'endsWith'`. Default is `'exact'`.

**Returns**

* (String[]): An array of matching keys.

**Example**

```javascript
const settings = { theme_dark: true, theme_light: false, lang: 'en' };
const themes = $.data.find.key(settings, 'theme_', 'startsWith');
// Result: ['theme_dark', 'theme_light']

```

---

## <a id="usage-find-value"></a>.find.value

**Description**
Finds **all values** in the object that match the query.

**Parameters**

* `obj` (Object): The object to search.
* `query` (String): The search term.
* `mode` (String, optional): `'exact'`, `'contains'`, `'startsWith'`, `'endsWith'`. Default is `'exact'`.

**Returns**

* (Any[]): An array of matching values.

**Example**

```javascript
const roles = { bob: 'admin', alice: 'editor', john: 'admin' };
const admins = $.data.find.value(roles, 'admin', 'exact');
// Result: ['admin', 'admin']

```

---

## <a id="usage-find-byMatch"></a>.find.byMatch

**Description**
Finds the **key** of the first match based on the query condition. This mirrors the array method (which returns a numeric index), but returns the string key for objects.

**Parameters**

* `obj` (Object): The object to search.
* `query` (String|Number): The search term.
* `mode` (String, optional): `'exact'`, `'contains'`, `'startsWith'`, `'endsWith'`. Default is `'exact'`.
* `searchBy` (String, optional): Search by `'key'` or `'value'`. Default is `'key'`.

**Returns**

* (String | undefined): The key of the first matching entry, or `undefined`.

**Example**

```javascript
const roles = { user: 'standard', alice: 'admin', bob: 'editor' };

// Find the key of the first entry where the value is 'admin'
const adminKey = $.data.find.byMatch(roles, 'admin', 'exact', 'value');
// Result: 'alice'
```
* [`closest`](#usage-closest) | [`parent`](#usage-parent) | [`children`](#usage-children) | [`findAll`](#usage-findAll)
* [`descendants`](#usage-descendants) | [`parents`](#usage-parents) | [`parentsUntil`](#usage-parentsUntil)
* [`descendantsUntil`](#usage-descendantsUntil)
* [`next`](#usage-next) | [`prev`](#usage-prev) | [`nextSibling`](#usage-nextSibling) | [`prevSibling`](#usage-prevSibling)
* [`sibling`](#usage-sibling) | [`nextAll`](#usage-nextAll) | [`prevAll`](#usage-prevAll) | [`siblings`](#usage-siblings)
* [`nextUntil`](#usage-nextUntil) | [`prevUntil`](#usage-prevUntil)
* [`eq`](#usage-eq) | [`first`](#usage-first) | [`last`](#usage-last) | [`filterBy`](#usage-filterBy) | [`not`](#usage-not)

---

## <a id="usage-closest"></a>.closest

**Description**
Travels up the DOM tree from the current element to find the first ancestor that matches the selector.

**Parameters**

* `selector` (String): A string containing a selector expression to match elements against.

**Returns**

* (jBase): A new jBase object containing the matching ancestor.

**Example**

```javascript
// Find the nearest container div for a button
const container = $('button.save').closest('.container');

```

---

## <a id="usage-parent"></a>.parent

**Description**
Get the direct parent of each element in the current set of matched elements.

**Parameters**

* None.

**Returns**

* (jBase): The parent elements.

**Example**

```javascript
$('.item').parent().addClass('has-items');

```

---

## <a id="usage-children"></a>.children

**Description**
Get the children of each element in the set of matched elements, optionally filtered by a selector.

**Parameters**

* `selector` (String, optional): A string containing a selector expression to match elements against.

**Returns**

* (jBase): The children elements.

**Example**

```javascript
// Get only list items with class 'active'
$('ul.menu').children('li.active');

```

---

## <a id="usage-findAll"></a>.findAll

**Description**
Finds all descendant elements that match the selector.

**Parameters**

* `selector` (String): The selector to match.

**Returns**

* (jBase): The found elements.

**Example**

```javascript
// Find all spans inside the header
$('.header').findAll('span');

```

---

## <a id="usage-descendants"></a>.descendants

**Description**
Get all descendant elements (children, grandchildren, etc.), optionally filtered by a selector.

**Parameters**

* `selector` (String, optional): Filter for the descendants.

**Returns**

* (jBase): All descendant elements.

**Example**

```javascript
$('#tree').descendants('.leaf');

```

---

## <a id="usage-parents"></a>.parents

**Description**
Get the ancestors of each element in the current set of matched elements.

**Parameters**

* `selector` (String, optional): If supplied, the ancestors are filtered.

**Returns**

* (jBase): The ancestor elements.

**Example**

```javascript
$('span').parents('div');

```

---

## <a id="usage-parentsUntil"></a>.parentsUntil

**Description**
Get the ancestors of each element in the current set of matched elements, up to but not including the element matched by the selector.

**Parameters**

* `selector` (String): The selector that indicates where to stop matching ancestor elements.
* `filter` (String, optional): A string containing a selector expression to filter the returned ancestors.

**Returns**

* (jBase): The ancestor elements between the current element and the stop selector.

**Example**

```javascript
// Get all parents of .item until .container is reached
$('.item').parentsUntil('.container');

```

---

## <a id="usage-descendantsUntil"></a>.descendantsUntil

**Description**
Get all descendant elements, but stop searching deeper in a specific branch once the provided selector is matched.

**Parameters**

* `selector` (String): The selector that indicates where to stop the deep traversal.

**Returns**

* (jBase): The descendant elements found before hitting the stop selector.

**Example**

```javascript
// Find descendants but don't look inside nested .protected-areas
$('.root').descendantsUntil('.protected-area');

```

---

## <a id="usage-next"></a>.next

**Description**
Get the immediately following sibling of each element in the set of matched elements.

**Parameters**

* `selector` (String, optional): If supplied, the method only returns the element if it matches.

**Returns**

* (jBase): The next sibling.

**Example**

```javascript
$('.current-step').next().addClass('next-step');

```

---

## <a id="usage-prev"></a>.prev

**Description**
Get the immediately preceding sibling of each element in the set of matched elements.

**Parameters**

* `selector` (String, optional): If supplied, the method only returns the element if it matches.

**Returns**

* (jBase): The previous sibling.

**Example**

```javascript
$('.step-2').prev();

```

---

## <a id="usage-nextSibling"></a>.nextSibling

**Description**
Get the immediately following DOM sibling element. Unlike `next()`, this focuses strictly on the DOM structure `nextElementSibling`.

**Parameters**

* None.

**Returns**

* (jBase): The next sibling element.

**Example**

```javascript
const nextEl = $('.current').nextSibling();

```

---

## <a id="usage-prevSibling"></a>.prevSibling

**Description**
Get the immediately preceding DOM sibling element. Unlike `prev()`, this focuses strictly on the DOM structure `previousElementSibling`.

**Parameters**

* None.

**Returns**

* (jBase): The previous sibling element.

**Example**

```javascript
const prevEl = $('.current').prevSibling();

```

---

## <a id="usage-sibling"></a>.sibling

**Description**
Get a single, specific sibling element. Unlike `siblings()` which returns all siblings, this method returns a specific one (e.g. the immediate next or matching a specific condition depending on implementation).
*(Note: Based on typical usage, this often acts like a directed `next` or `prev` or finds a specific single neighbor).*

**Parameters**

* `selector` (String, optional): A selector to identify the specific sibling.

**Returns**

* (jBase): The specific sibling element.

**Example**

```javascript
// Get a specific sibling with class 'active'
$('.item').sibling('.active');

```

---

## <a id="usage-nextAll"></a>.nextAll

**Description**
Get all following siblings of each element in the set of matched elements, optionally filtered by a selector.

**Parameters**

* `selector` (String, optional): A string containing a selector expression to match elements against.

**Returns**

* (jBase): All following sibling elements.

**Example**

```javascript
// Select all elements coming after the active one
$('.active').nextAll();

```

---

## <a id="usage-prevAll"></a>.prevAll

**Description**
Get all preceding siblings of each element in the set of matched elements, optionally filtered by a selector.

**Parameters**

* `selector` (String, optional): A string containing a selector expression to match elements against.

**Returns**

* (jBase): All preceding sibling elements.

**Example**

```javascript
// Select all elements coming before the active one
$('.active').prevAll();

```

---

## <a id="usage-siblings"></a>.siblings

**Description**
Get the siblings of each element in the set of matched elements.

**Parameters**

* `selector` (String, optional): If supplied, the siblings are filtered.

**Returns**

* (jBase): The sibling elements.

**Example**

```javascript
// Find all siblings that are not active
$('.active').siblings(':not(.active)');

```

---

## <a id="usage-nextUntil"></a>.nextUntil

**Description**
Get all following siblings of each element up to but not including the element matched by the selector.

**Parameters**

* `selector` (String): The selector that indicates where to stop matching following sibling elements.
* `filter` (String, optional): A selector to filter the returned siblings.

**Returns**

* (jBase): The following siblings up to the stop selector.

**Example**

```javascript
// Select all elements between header and footer
$('#header').nextUntil('#footer');

```

---

## <a id="usage-prevUntil"></a>.prevUntil

**Description**
Get all preceding siblings of each element up to but not including the element matched by the selector.

**Parameters**

* `selector` (String): The selector that indicates where to stop matching preceding sibling elements.
* `filter` (String, optional): A selector to filter the returned siblings.

**Returns**

* (jBase): The preceding siblings up to the stop selector.

**Example**

```javascript
// Select all items backwards until the start marker
$('.end-marker').prevUntil('.start-marker');

```

---

## <a id="usage-eq"></a>.eq

**Description**
Reduce the set of matched elements to the one at the specified index.

**Parameters**

* `index` (Number): An integer indicating the 0-based position of the element.

**Returns**

* (jBase): The element at the index.

**Example**

```javascript
// Select the 3rd element (index 2)
$('li').eq(2).css('color', 'red');

```

---

## <a id="usage-first"></a>.first

**Description**
Reduce the set of matched elements to the first in the set.

**Parameters**

* None.

**Returns**

* (jBase): The first element.

**Example**

```javascript
$('p').first();

```

---

## <a id="usage-last"></a>.last

**Description**
Reduce the set of matched elements to the final one in the set.

**Parameters**

* None.

**Returns**

* (jBase): The last element.

**Example**

```javascript
$('p').last();

```

---

## <a id="usage-filterBy"></a>.filterBy

**Description**
Reduce the set of matched elements to those that match the selector.

**Parameters**

* `selector` (String): The selector to match.

**Returns**

* (jBase): The filtered subset.

**Example**

```javascript
$('div').filterBy('.highlight');

```

---

## <a id="usage-not"></a>.not

**Description**
Remove elements from the set of matched elements.

**Parameters**

* `selector` (String): A string containing a selector expression to match elements against.

**Returns**

* (jBase): The subset without the matched elements.

**Example**

```javascript
$('input').not('[type="submit"]');

```
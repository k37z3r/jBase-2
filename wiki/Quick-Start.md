# 🚀 Quick Start Guide

Welcome to jBase! This guide will help you get up and running in minutes. We will cover the basics of selecting elements, handling events, and fetching data.

---

## 1. Setup

Ensure you have included jBase in your project.

### Option A: CDN / Static
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>jBase App</title>
</head>
<body>
    <div id="app"></div>

    <script src="path/to/jbase.min.js"></script>
    <script>
        // Your code goes here
    </script>
</body>
</html>

```

### Option B: Node.js / Bundler

```javascript
import { $ } from 'jbase';
// or
const { $ } = require('jbase');

```

---

## 2. Basic DOM Manipulation

Selecting elements and changing their content is the most common task. jBase uses the familiar `$(selector)` syntax.

```javascript
// Wait for DOM ready
$(document).ready(() => {

    // 1. Select by ID and change text
    $('#title').text('Hello jBase!');

    // 2. Select by Class and change CSS
    $('.box').css({
        'background-color': '#3498db',
        'color': 'white',
        'padding': '20px'
    });

    // 3. Append HTML content
    $('#app').append('<button id="click-me">Click Me!</button>');

});

```

---

## 3. Handling Events

Interactivity is key. Let's make that button work.

```javascript
// Bind a click event
$('#click-me').on('click', function(e) {
    e.preventDefault();
    alert('You clicked the button!');
});

// Shorthand method
$('#click-me').click(() => {
    console.log('Clicked via shorthand!');
});

// Hover effect
$('.box')
    .mouseenter(() => console.log('Mouse In'))
    .mouseleave(() => console.log('Mouse Out'));

```

---

## 4. Working with Arrays & Data

jBase isn't just for the DOM. It includes powerful data utilities.

```javascript
const users = [
    { id: 1, name: 'Alice', role: 'admin' },
    { id: 2, name: 'Bob', role: 'user' },
    { id: 3, name: 'Charlie', role: 'user' }
];

// 1. Find the first admin
const admin = $.data.find.first(users, 'admin', 'exact', 'role');
console.log(admin); // { id: 1, name: 'Alice', ... }

// 2. Remove user with ID 2 (Immutable!)
const newUsers = $.data.remove.byMatch(users, 2, 'exact', 'id');
console.log(newUsers.length); // 2

```

---

## 5. Fetching Data (AJAX)

Loading data from an API is built-in and Promise-based.

```javascript
$.http.get('https://jsonplaceholder.typicode.com/todos/1')
    .then(data => {
        // Success
        $('#app').append(`<p>Loaded: ${data.title}</p>`);
    })
    .catch(err => {
        // Error
        console.error('Failed to load data', err);
    });

```

---

## What's Next?

Now that you know the basics, explore the detailed modules, look at sidebar!

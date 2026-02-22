* [`get`](#usage-http-get) | [`getText`](#usage-http-getText) | [`post`](#usage-http-post)

---

## <a id="usage-http-get"></a>.get

**Description**
Performs an asynchronous HTTP GET request. This method assumes the response is JSON and will automatically parse it. Includes an automatic timeout of 5000ms to avoid hanging requests.

**Parameters**

* `url` (String): A string containing the URL to which the request is sent.
* `option` (RequestInit, optional): An optional RequestInit object to customize the fetch request (e.g., custom headers, mode). The method is strictly enforced as 'GET'.

**Returns**

* (Promise): A Promise that resolves with the parsed JSON data or rejects with an error.

**Example**

```javascript
$.http.get('[https://api.example.com/users](https://api.example.com/users)')
    .then(data => {
        console.log('Users loaded:', data);
    })
    .catch(err => {
        console.error('Error loading users:', err);
    });
```

---

## <a id="usage-http-getText"></a>getText

**Description**
Performs an asynchronous HTTP GET request. This method expects a raw text or HTML response and does not attempt to parse it as JSON. Ideal for loading HTML templates (Server-Side Rendering Partials) or config files. Includes an automatic timeout of 5000ms.

**Parameters**

* `url` (String): A string containing the URL to which the request is sent.
* `option` (RequestInit, optional): An optional RequestInit object to customize the fetch request. The method is strictly enforced as 'GET'.

**Returns**

* (Promise): A Promise that resolves with the raw string data.

**Example**

```javascript
$.http.getText('/partials/footer.html')
    .then(html => {
        $('#footer-container').html(html);
    });
```

---

## <a id="usage-http-post"></a>post

**Description**
Performs an asynchronous HTTP POST request to submit data to a server. The body is automatically stringified to JSON, and the `Content-Type` is set to `application/json`. Includes an automatic timeout of 5000ms.

**Parameters**

* `url` (String): A string containing the URL to which the request is sent.
* `body` (Any, optional): The data to send to the server (automatically JSON serialized). Defaults to `{}`.
* `option` (RequestInit, optional): An optional RequestInit object to customize the fetch request. The method is strictly enforced as 'POST'.

**Returns**

* (Promise): A Promise that resolves with the server's response (parsed as JSON).

**Example**

```javascript
const payload = {
    username: 'jdoe',
    email: 'john@example.com'
};

$.http.post('/api/register', payload)
    .then(response => {
        if (response.success) {
            console.log('User registered!');
        }
    })
    .catch(err => {
        console.error('Registration failed:', err);
    });
```
* [`get`](#usage-http-get) | [`getText`](#usage-http-getText) | [`post`](#usage-http-post) | [`upload`](#usage-http-upload)

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

---

## <a id="usage-http-upload"></a>upload

**Description**
The native `fetch` API currently lacks the ability to track upload progress. To solve this, jBase provides `$.http.upload()`. This method acts as a modern, Promise-based wrapper around `XMLHttpRequest`. It gives you the elegant, asynchronous chaining you expect from `fetch`, but includes full real-time progress tracking for multipart/form-data uploads.

**Parameters**
* `url` (String): The target API endpoint.
* `data` (File | FormData): The payload to upload. If a single `File` object is provided, jBase automatically wraps it into a `FormData` object under the key `'file'`.
* `onProgress` (Function, optional): A callback function triggered during the upload. Receives three arguments: `percentage` (0-100), `loaded` (bytes transferred), and `total` (total bytes).

**Returns**
* (Promise): Resolves to the parsed JSON response from the server (or text if parsing fails).

**Example**
```javascript
// Grab a file from an input field
const file = $('#file-input').prop('files')[0];

if (file) {
    try {
        // Upload with real-time progress tracking
        const response = await $.http.upload('/api/media/upload', file, (pct, loaded, total) => {
            console.log(`Uploading: ${pct}%`);
            
            // Update a custom progress bar using jBase CSS chaining
            $('.upload-progress-bar').css('width', pct + '%');
        });

        console.log('Upload successful!', response);
    } catch (error) {
        console.error('Upload failed:', error.message);
    }
}
```
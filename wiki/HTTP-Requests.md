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

## <a id="usage-http-getText"></a>.getText

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

## <a id="usage-http-post"></a>.post

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

## <a id="usage-http-upload"></a>.upload

**Description**
Performs a `multipart/form-data` upload with precise progress tracking. It uses `XMLHttpRequest` under the hood because the native `fetch` API lacks upload progress support. 

It seamlessly accepts either a single `File` object (which is automatically wrapped for you) or a pre-populated `FormData` object (ideal for multi-file uploads and adding extra fields).

**Parameters**

* `url` (String): The target endpoint.
* `data` (FormData | File): The data to upload. If a single `File` is provided, jBase automatically wraps it in a `FormData` object under the key `'file'`.
* `onProgress` (Function, optional): A callback function that triggers repeatedly during the upload.
  * `percentage` (Number): The rounded progress percentage (0-100).
  * `loaded` (Number): The amount of bytes loaded so far.
  * `total` (Number): The total amount of bytes to upload.

**Returns**

* (Promise<any>): A Promise resolving to the parsed JSON response (or plain text if parsing fails).

**Examples**

**1. Single File Upload with a UI Progress Bar**
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

**2. Multi-File Upload using FormData**
```javascript
const fileInput = $('#gallery-upload')[0];

if (fileInput && fileInput.files.length > 0) {
    const formData = new FormData();

    // Append all selected files to the FormData object.
    // The '[]' in the key tells the server to expect an array of files.
    $.each(fileInput.files, (index, file) => {
        formData.append('images[]', file);
    });

    // You can also append regular text fields!
    formData.append('albumId', '12345');

    // Upload the entire FormData object
    await $.http.upload('/api/gallery', formData, (percentage) => {
        console.log(`Total Upload Progress: ${percentage}%`);
    });
}
```
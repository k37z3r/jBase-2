* [`html`](#usage-html) | [`text`](#usage-text) | [`load`](#usage-load)

---

## <a id="usage-html"></a>.html

**Description**
Gets the HTML contents of the first element in the set, or sets the HTML contents of every matched element. 

🛡️ **Security by Default:** When setting HTML, jBase automatically strips dangerous inline event handlers (like `onerror`) and malicious protocols (like `href="javascript:..."`) to mitigate XSS attacks. Embedded `<script>` tags are placed into the DOM but are **not** executed by the browser.

⚙️ **Executing Scripts:** If you are injecting trusted content that contains `<script>` tags which *must* be executed, you can pass the `executeScripts: true` flag.

**Parameters**

* `content` (String, optional): The HTML string to set. If omitted, the method acts as a getter.
* `options` (Object, optional): Configuration options for the injection.
  * `executeScripts` (Boolean): If `true`, jBase will extract, execute, and evaluate any `<script>` tags found in the injected HTML string. Default is `false`.

**Returns**

* (String): The inner HTML of the first matched element (if used as a getter).
* (jBase): The current instance for chaining (if used as a setter).

**Examples**
```javascript
// 1. GETTER: Retrieve HTML
const content = $('#container').html();

// 2. SETTER (Safe Default): Inject HTML (strips inline events, scripts are ignored)
$('#container').html('<div class="child">Hello</div>');

// 3. SETTER (Trusted Execution): Inject HTML and execute embedded scripts
$('#widget').html('<script>initWidget();</script>', { executeScripts: true });
```

---

## <a id="usage-text"></a>.text

**Description**
Get the combined text contents of each element in the set of matched elements, including their descendants, or set the text contents of the matched elements.

**Parameters**

* `content` (String, optional): The text to set.

**Returns**

* (String): Text content (if getter).
* (jBase): Current instance (if setter).

**Example**

```javascript
$('h1').text('Welcome to jBase');

```

---

## <a id="usage-load"></a>.load

**Description**
Loads HTML content from a server and automatically injects it into the matched elements. This is an asynchronous wrapper utilizing `$.http.getText()`.

🛡️ **Security by Default:** When setting HTML, jBase automatically strips dangerous inline event handlers (like `onerror`) and malicious protocols (like `href="javascript:..."`) to mitigate XSS attacks. Embedded `<script>` tags are placed into the DOM but are **not** executed by the browser.

⚙️ **Executing Scripts:** If you are loading trusted content that contains `<script>` tags which *must* be executed upon loading, you can pass the `executeScripts: true` flag.

**Parameters**

* `url` (String): The URL to fetch the HTML from.
* `options` (Object, optional): Standard `RequestInit` fetch options, extended with jBase specific flags.
  * `executeScripts` (Boolean): If `true`, jBase will extract, execute, and evaluate any `<script>` tags found in the loaded HTML. Default is `false`.

**Returns**

* (Promise<jBase>): A promise that resolves to the current jBase instance.

**Example**
```javascript
// Default: Safe load (no scripts executed, inline events stripped)
await $('#sidebar').load('/partials/sidebar.html');

// Trusted load: Execute scripts found in the fetched HTML
await $('#widget-container').load('/partials/interactive-widget.html', { 
    executeScripts: true 
});
```
## 1. Browser (Legacy / Static)
Download the [jbase.min.js](/k37z3r/jBase-2/releases/latest/download/jbase.min.js) file, upload it to your server, and include it in your HTML.

```html
<script src="/path/to/js/jbase.min.js"></script>

<script>
  // jBase is now available via '$' or 'jBase'
  $(document).ready(() => {
      console.log("jBase is ready!");
  });
</script>
```

-- OR --

**via CDN**
```html
<!-- CDN: jsDelivr @latest Version -->
<script src="https://cdn.jsdelivr.net/npm/@k37z3r/jbase/dist/jbase.min.js"></script>

<!-- CDN: Statically @latest version -->
<script src="https://cdn.statically.io/npm/@k37z3r/jbase/dist/jbase.min.js"></script>

<!-- CDN: jsDelivr @2.2.0 Version -->
<script src="https://cdn.jsdelivr.net/gh/k37z3r/jBase-2@2.2.0/dist/jbase.min.js"></script>

<!-- CDN: Statically @2.2.0 Version -->
<script src="https://cdn.statically.io/gh/k37z3r/jBase-2@2.2.0/dist/jbase.min.js"></script>

<!-- Use one of the examples above. You can find further examples in the jsDelivr or Statically documentation -->

<script>
  // jBase is now available via '$' or 'jBase'
  $(document).ready(() => {
      console.log("jBase is ready!");
  });
</script>
```

---

## 2. Node.js / Bundlers (Webpack, Vite, Rollup) **coming soon**

If you are using a modern stack or server-side rendering (SSR), you can import jBase as a module.

```bash
npm install @k37z3r/jbase
# or
yarn add @k37z3r/jbase

```

**Usage in TypeScript/ESM:**

```typescript
import { $ } from 'jbase';

// Use as usual
$('.element').addClass('active');

```

**Usage in CommonJS (Node.js require):**

```javascript
const { $ } = require('jbase');
$('.element').addClass('active');

```
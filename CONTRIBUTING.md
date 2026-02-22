# Contributing to jBase

First off, thank you for considering contributing to jBase! It's people like you that make the open-source community such an amazing place to learn, inspire, and create.

Following these guidelines helps to communicate that you respect the time of the developers managing and developing this project. In return, they should reciprocate that respect in addressing your issue, assessing changes, and helping you finalize your pull requests.

## ⚡ Quick Start

1.  **Fork the repository** on GitHub.
2.  **Clone your fork** locally:
    ```bash
    git clone [https://github.com/k37z3r/jBase-2.git](https://github.com/k37z3r/jBase-2.git)
    cd jbase
    ```
3.  **Install dependencies**:
    ```bash
    npm install
    ```
4.  **Build the project** to ensure everything works:
    ```bash
    node build.js
    ```

## 🛠 Development Workflow

### 1. Branching
Always create a new branch for your work. Do not commit directly to `main`.
* **Features:** `feature/my-new-feature`
* **Bugfixes:** `fix/issue-description`
* **Docs:** `docs/update-readme`

### 2. Coding Standards
We enforce a strict coding style to maintain quality across the framework.

* **Language:** TypeScript (Strict mode).
* **Formatting:**
    * **Indentation:** 4 Spaces (Check `.editorconfig`).
    * **Quotes:** Single quotes preferred.
    * **Semicolons:** Always use semicolons.
* **Documentation:**
    * **Language:** English only. No German comments in the source code.
    * **JSDoc:** Every exported function must have a JSDoc block describing parameters and return values.
* **SSR Safety:**
    * Never access `window` or `document` globally in logic that might run on the server.
    * Use `isBrowser()` check for effects/animations.
    * Use `getDoc(this)` or `el.ownerDocument` for DOM access.

### 3. Commit Messages
We follow the **Conventional Commits** specification. This helps in generating changelogs automatically.

* `feat: add new slideDown animation`
* `fix: resolve crash in unwrap method`
* `docs: update installation guide`
* `perf: optimize object search algorithm`
* `refactor: clean up event binding`

## 🚀 Building the Project

The project uses a custom `esbuild` script. Before submitting a PR, make sure the build succeeds without errors.

```bash
node build.js

```

This command generates:

* `dist/jbase.min.js` (Browser)
* `dist/index.mjs` (ESM)
* `dist/index.cjs` (CommonJS)
* `dist/server.js` (Node.js/SSR)
* `dist/*.d.ts` (Type Definitions)

## 🐞 Reporting Bugs

We use GitHub issues to track public bugs. Report a bug by opening a new issue; it's that easy!

**Great Bug Reports tend to have:**

* A quick summary and/or background.
* Steps to reproduce.
* What you expected would happen.
* What actually happened.
* Notes (possibly including why you think this might be happening, or stuff you tried that didn't work).

## 📝 Pull Requests

1. Push your changes to your fork.
2. Open a Pull Request against the `main` branch of the `jBase` repository.
3. Describe your changes clearly.
4. Link to any related issues (e.g., "Closes #12").
5. Wait for a code review. We might ask for changes before merging.

---

**Happy Coding!** 🚀
## JavaScript Modules: Default Export vs Named Export

JavaScript modules allow you to share code between files.

* **`export`** makes code available to other files.
* **`import`** brings exported code into the current file.

There are two types of exports.

### 1. Default Export

Use a **default export** when a file has **one primary value** to export.

```jsx
// ToastContainer.jsx
export default function ToastContainer() {
  return <div>Hi</div>;
}
```

Import it **without `{}`**:

```jsx
import ToastContainer from "./Components/ToastContainer";
```

The imported name is your choice:

```jsx
import MyToast from "./Components/ToastContainer";
```

Both imports refer to the same default export.

### 2. Named Export

Use **named exports** when a file exports multiple values.

```jsx
// utils.js
export function add(a, b) {
  return a + b;
}

export function subtract(a, b) {
  return a - b;
}
```

Import them **with `{}`**:

```jsx
import { add, subtract } from "./utils";
```

The imported name must match the exported name.

To rename a named export:

```jsx
import { add as sum } from "./utils";
```

### Default Export vs Named Export

| Feature                            | Default Export                   | Named Export                          |
| ---------------------------------- | -------------------------------- | ------------------------------------- |
| Syntax                             | `export default`                 | `export`                              |
| Number of exports per file         | Only one                         | Multiple                              |
| Import syntax                      | `import Component from "./file"` | `import { Component } from "./file"`  |
| Uses `{}` while importing          | ❌ No                            | ✅ Yes                                 |
| Import name must match export name | ❌ No                            | ✅ Yes                                 |
| Can rename while importing         | ✅ Yes                           | ✅ Yes (`as`)                          |
| Typical use                        | Main component or value          | Utility functions, constants, helpers |

### Example

**Default Export**

```jsx
// Button.jsx
export default function Button() {}
```

```jsx
import Button from "./Button";
import MyButton from "./Button"; // Also valid
```

**Named Export**

```jsx
// utils.js
export const add = () => {};
export const subtract = () => {};
```

```jsx
import { add, subtract } from "./utils";
```

Renaming a named export:

```jsx
import { add as sum } from "./utils";
```

#### Note

React component names must begin with an uppercase letter.

```jsx
<MyToast />
```

✅ React treats this as a custom component.

```jsx
<myToast />
```

❌ React treats this as an HTML element.

---

### 1. Arrow Function (Most common)

```jsx
const handleClose = () => {
  setShow(false);
};
```

* Not hoisted.
* Doesn't have its own `this`.
* Preferred in modern React.

### 2. Function Declaration

```jsx
function handleClose() {
  setShow(false);
}
```

* Hoisted, so it can be called before it's defined.
* Has its own `this` (when used as a method).
* Also commonly used in React.

### 3. Function Expression

```jsx
const handleClose = function () {
  setShow(false);
};
```

* Not hoisted.
* Has its own `this`.
* Works the same as the arrow function here, but is used less often in React.

### In your example

All three behave the same because you're simply calling `setShow(false)`:

```jsx
const handleClose = () => setShow(false);
```

```jsx
function handleClose() {
  setShow(false);
}
```

```jsx
const handleClose = function () {
  setShow(false);
};
```

The main differences are **hoisting** and **how `this` is handled**. In React function components, `this` is typically not used, so arrow functions are the most common choice.

```
USER CLICK BUTTON
        |
        |
        v
+----------------+
|   handleAdd    |
+----------------+
        |
        |
        v
Create Toast Object
        |
        |
        v
Update toasts State
        |
        |
        v
React Re-render
        |
        |
        v
Toast appears on screen
        |
        |
        v
Create 5 sec Timer
        |
        |
        v
Store Timer in useRef
        |
        |
        v
========================
      wait 5 seconds
========================
        |
        |
        v
+----------------+
|  handleClose   |
+----------------+
        |
        |
        v
Clear Timer
        |
        |
        v
Delete Timer Reference
        |
        |
        v
Filter Toast Array
        |
        |
        v
Update State
        |
        |
        v
React Re-render
        |
        |
        v
Toast disappears
```

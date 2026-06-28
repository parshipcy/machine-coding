# JavaScript Modules: Default Export vs Named Export

* JavaScript modules use **`export`** to make code available to other files and **`import`** to use that code.
* There are **two types of exports**:

  * **Default export**: Used when a file exports one main value. Import it **without `{}`**, and you can choose any variable name.
  * **Named export**: Used when a file exports multiple values. Import it **with `{}`**, and the name must match the exported name (unless renamed with `as`).

## Example

```jsx
// ToastContainer.js
export default function ToastContainer() {
  return <div>Hi</div>;
}
```

```jsx
// App.js
import ToastContainer from "./Components/ToastContainer";

export default function App() {
  return <ToastContainer />;
}
```

You can even rename the default import:

```jsx
import MyToast from "./Components/ToastContainer";

export default function App() {
  return <MyToast />;
}
```

**Note:** When using a React component, its name **must start with an uppercase letter**. Writing `<myToast />` or `<toastContainer />` makes React treat it as an HTML element instead of a custom component.

---

## Here's the difference between the three approaches:

| Syntax                              | Hoisted? | `this`         | Common in React |
| ----------------------------------- | -------- | -------------- | --------------- |
| `const handleClose = () => {}`      | ❌ No    | Lexical `this` | ✅ Yes          |
| `function handleClose() {}`         | ✅ Yes   | Own `this`     | ✅ Yes          |
| `const handleClose = function() {}` | ❌ No    | Own `this`     | Less common     |

## 1. Arrow Function (Most common)

```jsx
const handleClose = () => {
  setShow(false);
};
```

* Not hoisted.
* Doesn't have its own `this`.
* Preferred in modern React.

---

## 2. Function Declaration

```jsx
function handleClose() {
  setShow(false);
}
```

* Hoisted, so it can be called before it's defined.
* Has its own `this` (when used as a method).
* Also commonly used in React.

---

## 3. Function Expression

```jsx
const handleClose = function () {
  setShow(false);
};
```

* Not hoisted.
* Has its own `this`.
* Works the same as the arrow function here, but is used less often in React.

## In your example

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

---

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

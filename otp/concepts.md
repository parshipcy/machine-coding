# Building an OTP Component: React & JavaScript Concepts

This note summarizes the important React, JavaScript, and CSS concepts learned while building the OTP input component.

---

# 1. React Components

A React component is simply a JavaScript function that returns JSX.

```jsx
export default function OtpComponent() {
  return <h1>Hello</h1>;
}
```

React renders whatever the component returns.

---

# 2. Props

Props allow a parent component to pass data to a child component.

```jsx
<OtpComponent otpLength={6} />
```

React internally calls:

```js
OtpComponent({
  otpLength: 6,
});
```

The component receives a single object called `props`.

---

# 3. Object Destructuring

Instead of writing:

```jsx
function OtpComponent(props) {
  console.log(props.otpLength);
}
```

we can extract the property directly.

```jsx
function OtpComponent({ otpLength }) {
  console.log(otpLength);
}
```

This is called **object destructuring**.

---

# 4. Default Parameters

```jsx
function OtpComponent({ otpLength = 6 }) {}
```

If no value is passed:

```jsx
<OtpComponent />
```

then

```js
otpLength === 6
```

If a value is passed:

```jsx
<OtpComponent otpLength={4} />
```

then

```js
otpLength === 4
```

---

# 5. useState

State stores data that changes and causes React to re-render.

```jsx
const [otpFields, setOtpFields] = useState(
  new Array(otpLength).fill("")
);
```

Initially:

```js
["", "", "", "", "", ""]
```

Each array element represents one OTP input.

---

# 6. new Array()

```js
new Array(6)
```

creates an array with six empty slots.

```
[ <6 empty items> ]
```

Using `.fill("")` converts it into

```js
["", "", "", "", "", ""]
```

which is easier to work with.

---

# 7. Array.map()

`map()` loops over every element and returns a new array.

```jsx
otpFields.map((value, index) => (
  <input key={index} value={value} />
));
```

For

```js
["", "", ""]
```

React creates

```jsx
<input />
<input />
<input />
```

---

# 8. Why key is Needed

```jsx
<input key={index} />
```

`key` helps React identify each element when rendering lists.

Without keys, React cannot efficiently update items.

---

# 9. Controlled Inputs

```jsx
<input value={value} />
```

React now controls the input's value.

Normally, controlled inputs use

```jsx
onChange={handleChange}
```

If `value` is provided without `onChange`, React shows a warning because it assumes the input is read-only.

---

# 10. React Event Object

```jsx
onKeyDown={(e) => handleKeyDown(e, index)}
```

React automatically passes an event object.

```js
e.key
```

contains the pressed key.

Examples:

```
"5"
"Backspace"
"ArrowLeft"
```

---

# 11. State Should Never Be Mutated

❌ Don't do this

```js
otpFields[0] = "5";
```

Always create a copy first.

```js
const copyOtpFields = [...otpFields];

copyOtpFields[index] = key;

setOtpFields(copyOtpFields);
```

This follows React's immutable state rule.

---

# 12. Spread Operator (...)

The spread operator copies an array.

```js
const copy = [...otpFields];
```

Before

```js
otpFields
```

```
["", "", "", ""]
```

After

```js
copy
```

```
["", "", "", ""]
```

Now you can safely modify the copy.

---

# 13. useRef()

A ref stores a value without causing a re-render.

```jsx
const ref = useRef([]);
```

Initially

```js
ref.current = [];
```

Later React stores each input element.

```
ref.current

[
  input0,
  input1,
  input2,
  input3,
  input4,
  input5
]
```

---

# 14. Callback Refs

```jsx
ref={(currentInput) => (
  ref.current[index] = currentInput
)}
```

React gives you the real DOM element.

You store it inside the ref array.

Later you can access it using

```js
ref.current[index]
```

---

# 15. Focusing the Next Input

```js
ref.current[index + 1].focus();
```

moves the cursor to the next OTP box.

Always check the index first.

```js
if (index + 1 < otpFields.length) {
  ref.current[index + 1].focus();
}
```

Otherwise you may try to focus an input that doesn't exist.

---

# 16. Handling Backspace

```js
if (key === "Backspace") {
  copyOtpFields[index] = "";

  setOtpFields(copyOtpFields);

  if (index > 0) {
    ref.current[index - 1].focus();
  }

  return;
}
```

This clears the current box and moves focus back.

---

# 17. useEffect

```jsx
useEffect(() => {
  ref.current[0].focus();
}, []);
```

Runs once after the component mounts.

Useful for automatically focusing the first input.

---

# 18. Default Export vs Named Export

## Default Export

```jsx
export default function OtpComponent() {}
```

Import without `{}`

```jsx
import OtpComponent from "./OtpComponent";
```

You may rename it.

```jsx
import MyOtp from "./OtpComponent";
```

---

## Named Export

```jsx
export function helper() {}
```

Import with `{}`

```jsx
import { helper } from "./helper";
```

The name must match unless renamed with `as`.

---

# 19. CSS Selectors

Element selector

```css
input {}
```

Targets every `<input>`.

Class selector

```css
.container {}
```

Targets

```jsx
<div className="container">
```

ID selector

```css
#container {}
```

Targets

```html
<div id="container">
```

---

# 20. Flexbox

Enable Flexbox.

```css
display: flex;
```

Center children horizontally.

```css
justify-content: center;
```

Center children vertically.

```css
align-items: center;
```

Give the container full screen height.

```css
height: 100vh;
```

Complete example

```css
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
```

---

# 21. text-align vs Flexbox

```css
text-align: center;
```

Centers **text and inline elements inside a container**.

```css
display: flex;
justify-content: center;
```

Centers **child elements themselves**.

---

# 22. Common React Rules

* Components must return JSX.
* Component names begin with an uppercase letter.
* Never mutate state directly.
* Use `key` when rendering lists.
* Use `useState` for UI data.
* Use `useRef` for DOM elements or mutable values.
* Create new arrays or objects before updating state.
* Controlled inputs normally use `value` with `onChange`.

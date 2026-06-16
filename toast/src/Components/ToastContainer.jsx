/*
  This component does 3 main things:
  1. Stores all active toasts
  2. Adds new toast messages
  3. Removes them after 5 seconds or when clicking x
*/

import { useRef, useState } from "react";

export default function ToastContainer() {
  const [toasts, setToasts] = useState([]);
  const timersRef = useRef({}); //optimisation

  const handleClose = (id) => {
    clearTimeout(timersRef.current[id]);
    delete timersRef.current[id];
    setToasts((prevToasts) => {
      const filteredArr = prevToasts.filter((toast) => {
        return toast.id !== id;
      });
      return filteredArr;
    });
  };
  const handleAdd = (message, type) => {
    const id = new Date().getTime();
    const newToasts = [...toasts, { id, message, type }];
    setToasts(newToasts);
    timersRef.current[id] = setTimeout(() => handleClose(id), 5000); //auto-delete timer
  };

  return (
    <div className="container">
      <div className="toast-container">
        {toasts.map(({ id, message, type }) => {
          return (
            <div key={id} className={`toast ${type}`}>
              {message} <span onClick={() => handleClose(id)}>x</span>
            </div>
          );
        })}
      </div>

      <div className="btn-container">
        {/*Arrow function prevents immediate execution and runs the function only when triggered*/}
        <button onClick={() => handleAdd("Success", "success")}>Success</button>
        <button onClick={() => handleAdd("Info", "info")}>Info</button>
        <button onClick={() => handleAdd("Warning", "warning")}>Warning</button>
        <button onClick={() => handleAdd("Error", "error")}>Error</button>
      </div>
    </div>
  );
}

/*
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
*/
import { useState, useRef } from "react";
import ToastView from "./ToastView";

export default function ToastContainer() {
  const [toasts, setToasts] = useState([]);
  // Keyed by toast id - lets us clear the correct timer when a toast is dismissed.
  const timersRef = useRef({});

  const toastDurations = {
    success: 10000,
    warning: 7000,
    info: 5000,
    error: 8000,
  };

  // Press x to close.
  const handleClose = (id) => {
    // Optimisation: when we close a toast manually, the timer should also be removed.
    clearTimeout(timersRef.current[id]);
    delete timersRef.current[id]; // Remove the timer from the object.

    // Use the latest state to avoid stale data.
    setToasts((prevToasts) => {
      return prevToasts.filter((toast) => toast.id !== id);
    });
  };

  const handleAdd = (message, type) => {
    const id = new Date().getTime();
    const newToasts = [...toasts, { id, message, type }]; // ...toasts -> prev toasts
    setToasts(newToasts);

    timersRef.current[id] = setTimeout(() => {
      handleClose(id);
    }, toastDurations[type]);
  };

  return (
    <ToastView
      toasts={toasts}
      handleAdd={handleAdd}
      handleClose={handleClose}
    />
  );
}

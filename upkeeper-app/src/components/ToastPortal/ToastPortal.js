// import styles from "./styles/modules.css";
import useToastPortal from "../../hooks/useToastPortal";
import ReactDOM from "react-dom";
import { forwardRef, useState, useImperativeHandle } from "react";
import Toast from "../Toast";
import { v4 as uuidv4 } from "uuid";

export const ToastPortal = forwardRef(({ autoClose, autoCloseTime }, ref) => {
  const [toasts, setToasts] = useState([]);
  const { loaded, portalId } = useToastPortal();
  const removeToast = id => {
    setToasts(toasts.filter(toast => toast.id !== id));
  };

  useImperativeHandle(ref, () => ({
    addMessage(toast) {
      setToasts([...toasts, { ...toast, id: uuidv4() }]);
    },
  }));
  return loaded ? (
    ReactDOM.createPortal(
      <div className="toastContainer">
        {toasts.map(toast => (
          <Toast
            key={toast.id}
            message={toast.message}
            onClose={() => removeToast(toast.id)}
          ></Toast>
        ))}
      </div>,
      document.getElementById(portalId)
    )
  ) : (
    <></>
  );
});

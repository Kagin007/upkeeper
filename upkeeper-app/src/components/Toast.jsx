const Toast = ({ onClose, message }) => {
  return (
    <div className="toast" onClick={onClose}>
      <i className="fa-solid fa-xmark toast-exit"></i>
      <div>{message}</div>
    </div>
  );
};

export default Toast;

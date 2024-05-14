import ReactDom from "react-dom";
import './modal.css'

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;
  return ReactDom.createPortal(
    <>
      <div className="overlay" />
      <div className="modal">
        <button onClick={onClose}>Close</button>
        {children}
      </div>
    </>,
    document.getElementById("portal")
  );
};

export default Modal;

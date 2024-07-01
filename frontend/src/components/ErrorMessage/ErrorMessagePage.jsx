import Modal from "../Modal/Modal";
import "./errorMessagePage.css";
import ReactDom from "react-dom";

const ErrorMessagePage = ({ isOpen, onClose, message }) => {
  if (!isOpen) return null;
  return ReactDom.createPortal(
    <>
      <div className="overlayError" />
      <div className="modalError">
        <div className="errorMessage">
          <label htmlFor="Request">Error</label>
          <p>{message}</p>
        </div>
        <button className="buttonCloseError" onClick={onClose}>
          Close
        </button>
      </div>
    </>,
    document.getElementById("portal")
  );
};

export default ErrorMessagePage;

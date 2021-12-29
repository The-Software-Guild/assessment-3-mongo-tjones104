import ReactDom from "react-dom";

const Modal = ({ open, children, onClose }) => {
  if (!open) return null;
  return ReactDom.createPortal(
    <>
      <div className="overlay" />
      <div className="modal">
        {children}
        <button className="cancel-edit" onClick={onClose}>
          Cancel Edit
        </button>
      </div>
    </>,
    document.getElementById("portal")
  );
};

export default Modal;

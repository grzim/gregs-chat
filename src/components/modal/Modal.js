import React from "react";
import "./style.scss";

function Modal({ children, close, isOpen }) {
  return (
    isOpen && (
      <div className="modal-container overlay">
        <div className="modal">
          <button className="modal-close" type="button" onClick={close}>
            ×
          </button>
          <div className="modal-body">{children}</div>
        </div>
      </div>
    )
  );
}

export default Modal;

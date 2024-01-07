import React, { useEffect, useRef } from "react";
import { X } from "react-feather";
import "../styles/Modal.css";
const Modal = ({
  isOpen,
  children,
  onClose,
}: {
  isOpen: boolean;
  children: React.ReactNode;
  onClose: () => void;
}) => {
  const modalRef = useRef<HTMLDivElement>(null); // Initialize the ref with the correct type

  // Close the modal when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !(modalRef.current as HTMLDivElement)?.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [modalRef, onClose]);

  return isOpen ? (
    <div className="modal-overlay">
      <div className="modal" ref={modalRef}>
        {children}
        <button className="modal-close-button" onClick={onClose}>
          <X />
        </button>
      </div>
    </div>
  ) : null;
};

export default Modal;

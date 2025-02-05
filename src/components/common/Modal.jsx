import { useEffect } from 'react';
import '../../styles/Modal.css';  // Make sure the path to your CSS is correct

const Modal = ({ isOpen, onClose, title, children }) => {
  // Handle modal open/close state changes
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }

    return () => {
      document.body.classList.remove('modal-open'); // Clean up on unmount
    };
  }, [isOpen]);

  // Do not render the modal if isOpen is false
  if (!isOpen) return null;

  // Handle close when the overlay (background) is clicked
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">{title}</h2>
          <button className="close-button" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="modal-body">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;

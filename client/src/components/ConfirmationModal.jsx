import React from 'react';
import '../styles/retro.css';
import '../styles/confirmationModal.css';

const ConfirmationModal = ({ isOpen, onClose, onConfirm, message, title, acceptText, cancelText }) => {
  if (!isOpen) return null;

  return (
    <div className="confirmation-modal-overlay" onClick={onClose}>
      <div className="confirmation-modal" onClick={e => e.stopPropagation()}>
        <div className="confirmation-modal-header">
          <div className="confirmation-modal-title">{title}</div>
          <button className="window-control-button" onClick={onClose}>×</button>
        </div>
        <div className="confirmation-modal-content">
          <p className="confirmation-text">{message}</p>
          <div className="confirmation-modal-buttons">
            <button className="confirmation-button confirm-accept" onClick={onConfirm}>{acceptText}</button>
            <button className="confirmation-button confirm-cancel" onClick={onClose}>{cancelText}</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal; 
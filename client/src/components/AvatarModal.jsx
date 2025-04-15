import React from 'react';
import '../styles/retro.css';
import '../styles/avatarModal.css';

const AvatarModal = ({ isOpen, onClose, onSelect, currentAvatar, avatars, title }) => {
  if (!isOpen) return null;

  return (
    <div className="avatar-modal-overlay" onClick={onClose}>
      <div className="avatar-modal" onClick={e => e.stopPropagation()}>
        <div className="avatar-modal-header">
          <div className="avatar-modal-title">{title}</div>
          <button className="window-control-button" onClick={onClose}>×</button>
        </div>
        <div className="avatar-modal-content">
          <div className="avatar-grid">
            {avatars.map((avatar) => (
              <div
                key={avatar}
                className={`avatar-option ${currentAvatar === avatar ? 'selected' : ''}`}
                onClick={() => {
                  onSelect(avatar);
                  onClose();
                }}
                title={`Seleccionar ${avatar}`}
              >
                <span className="avatar-emoji">{avatar}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AvatarModal; 
import React from 'react';

export default function ConfirmModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal__content">
        <p className="modal__text">Вы уверены, что хотите удалить выбранный элемент?</p>
        <div className="modal__buttons">
          <button className="modal__btn modal__btn_type_delete" onClick={onConfirm}>
            Удалить
          </button>
          <button className="modal__btn modal__btn_type_cancel" onClick={onClose}>
            Отмена
          </button>
        </div>
      </div>
    </div>
  );
}

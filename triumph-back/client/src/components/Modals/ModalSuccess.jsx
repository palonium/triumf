import React from "react";

export default function ModalSuccess({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="modal" onClick={onClose}>
      <div className="modal__content" onClick={(e) => e.stopPropagation()}>
        <div className="modal__success">
          <h2 className="modal__title-success">Вы оставили заявку на пробную тренировку!</h2>
          <p className="modal__text-success">В скором времени с вами свяжется администратор</p>
          <button className="modal__close" onClick={onClose}>
          <img src="/icon/Close.svg" alt="Закрыть" />
        </button>
        </div>
      </div>
    </div>
  );
}

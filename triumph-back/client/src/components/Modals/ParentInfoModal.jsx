import { useEffect } from 'react';

export default function ParentInfoModal({ isOpen, onClose, parent }) {
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }

    return () => {
      document.body.classList.remove('modal-open');
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
  <div className="modal" onClick={onClose}>
    <div className="modal__content modal__content--children modal__content--parent" onClick={(e) => e.stopPropagation()}>
      <div className="modal__info-wrapper">
        <img src="/icon/info.svg" alt="Информация" className="modal__info-icon" />
      </div>

      <button className="modal__close" onClick={onClose}>
        <img src="/icon/Close.svg" alt="Закрыть" />
      </button>

      <div className="modal__cards">
          <div className="modal__child-block modal__block" >
          <p className="modal__line">
                Имя: <span className="modal__bold">{parent.firstName}</span>
              </p>
              <p className="modal__line">
                Фамилия: <span className="modal__bold">{parent.lastName}</span>
              </p>
              <p className="modal__line">
                Телефон: <span className="modal__bold">{parent.phone}</span>
          </p>
      </div>
      </div>
    </div>
  </div>
  );
}

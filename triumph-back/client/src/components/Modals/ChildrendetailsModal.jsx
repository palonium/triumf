import { useNavigate } from "react-router-dom";

export default function ChildrenDetailsModal({ isOpen, onClose, childrenList }) {
  if (!isOpen) return null;

  return (
    <div className="modal">
        {/* <div className="modal__info-wrapper--children">
          <img src="/icon/info.svg" alt="Информация" className="modal__info-icon" />
        </div> */}
      <div className="modal__content modal__content--children">

        <button className="modal__close" onClick={onClose}>
          <img src="/icon/Close.svg" alt="Закрыть" />
        </button>

        <div className="modal__cards">
          {childrenList.map((child, index) => (
            <div className="modal__child-block modal__block" key={index}>
              <p className="modal__line">
                Имя: <span className="modal__bold">{child.firstName}</span>
              </p>
              <p className="modal__line">
                Фамилия: <span className="modal__bold">{child.lastName}</span>
              </p>
              <p className="modal__line">
                Дата рождения: <span className="modal__bold">{child.birthDate}</span>
              </p>
              <p className="modal__line">
                Команда: <span className="modal__bold">
                  {typeof child.team === 'object' ? child.team.name : child.team || '—'}
                </span>
              </p>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

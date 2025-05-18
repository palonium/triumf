import { useState } from 'react';
import ConfirmModal from '../Modals/ConfirmModal';
import ChildrenDetailsModal from '../Modals/ChildrendetailsModal';

export default function UsersCard({ request, onDelete }) {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isChildrenModalOpen, setChildrenModalOpen] = useState(false);


  const handleDelete = () => {
    onDelete(request.id);
    setModalOpen(false);
  };

  const getChildrenWord = (count) => {
    if (count % 100 >= 11 && count % 100 <= 14) return 'детей';
    const lastDigit = count % 10;
    if (lastDigit === 1) return 'ребёнок';
    if (lastDigit >= 2 && lastDigit <= 4) return 'ребёнка';
    return 'детей';
  };
  const childCount = request.children.length;
  const childLabel = `${childCount} ${getChildrenWord(childCount)}`;

  return (
    <>
      <div className="card">
        <div className="card__info">
          <div className="card__field">
            <span className="card__label">Имя:</span>
            <span className="card__value">{request.firstName}</span>
          </div>
          <div className="card__field">
            <span className="card__label">Фамилия:</span>
            <span className="card__value">{request.lastName}</span>
          </div>
          <div className="card__field">
            <span className="card__label">Телефон:</span>
            <span className="card__value">{request.phone}</span>
          </div>
          <div className="card__field">
            <span className="card__label">Дети:</span>
            <span className="card__value">{childLabel}</span>
            <button className="card__icon-button" onClick={() => setChildrenModalOpen(true)}>
                <img src="/icon/info.svg" alt="Инфо" />
            </button>
          </div>
        </div>

          <button className="card__delete" onClick={() => setModalOpen(true)}>
            <img src="/icon/delete.svg" alt="Удалить" className="card__delete-icon" />
          </button>
      </div>

      <ConfirmModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={handleDelete}
      />
      <ChildrenDetailsModal
        isOpen={isChildrenModalOpen}
        onClose={() => setChildrenModalOpen(false)}
        childrenList={request.children}
        />
    </>
  );
}

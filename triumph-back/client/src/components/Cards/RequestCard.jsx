import { useState } from 'react';
import ConfirmModal from '../Modals/ConfirmModal';

export default function RequestCard({ request, onDelete }) {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleDelete = () => {
    onDelete(request.id);
    setModalOpen(false);
  };

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
            <span className="card__label">Филиал:</span>
            <span className="card__value">{request.branch}</span>
          </div>
        </div>

        <div className="card__actions">
          <button className="card__delete" onClick={() => setModalOpen(true)}>
            <img src="/icon/delete.svg" alt="Удалить" className="card__delete-icon" />
          </button>
        </div>
      </div>

      <ConfirmModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={handleDelete}
      />
    </>
  );
}

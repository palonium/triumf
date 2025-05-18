import { useState } from 'react';
import AddressModal from '../Modals/AddressModal';
import { useConfirmDelete } from '../../hooks/useConfirmDelete';

export default function AddressCard({ address, onDelete, onSave }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { openConfirm, Confirm } = useConfirmDelete();

  const handleEdit = () => {
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const handleSave = async (newAddressData) => {
    await onSave(address.id, newAddressData);
    handleClose();
  };

  return (
    <div className="card">
      <div className="card__info">
        <div className="card__field">
          <span className="card__label">Улица:</span>
          <span className="card__value">{address.street}</span>
        </div>
        <div className="card__field">
          <span className="card__label">Дом:</span>
          <span className="card__value">{address.house}</span>
        </div>
        <div className="card__field">
          <span className="card__label">Школа:</span>
          <span className="card__value">{address.school}</span>
        </div>
      </div>

      <div className="card__actions">
        <button className="card__icon-button" onClick={handleEdit}>
          <img src="/icon/edit.svg" alt="Редактировать" />
        </button>
        <button className="card__delete" onClick={() => openConfirm(address.id, onDelete)}>
          <img src="/icon/delete.svg" alt="Удалить" className="card__delete-icon" />
        </button>
      </div>

      <AddressModal
        isOpen={isModalOpen}
        onClose={handleClose}
        mode="edit"
        address={address}
        onSave={handleSave}
      />

    <Confirm />
    </div>
  );
}
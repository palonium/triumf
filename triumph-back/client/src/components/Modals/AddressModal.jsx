import { useState, useEffect } from 'react';

export default function AddressModal({ isOpen, onClose, mode, address, onSave }) {
  const [street, setStreet] = useState('');
  const [house, setHouse] = useState('');
  const [school, setSchool] = useState('');

  useEffect(() => {
    if (isOpen) {
      if (mode === 'edit' && address) {
        setStreet(address.street || '');
        setHouse(address.house || '');
        setSchool(address.school || '');
      } else {
        setStreet('');
        setHouse('');
        setSchool('');
      }
    }
  }, [isOpen, mode, address]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const newAddress = {
      street,
      house,
      school,
    };
    onSave(newAddress);
    onClose();
  };

  return (
    <div className="modal">
      <div className="modal__overlay" onClick={onClose}></div>
      <div className="modal__content modal__content-edit">
        <h2 className="modal__title">{mode === 'edit' ? 'Редактировать' : 'Добавить'}</h2>
        <button className="modal__close" onClick={onClose}>
          <img src="/icon/Close.svg" alt="Закрыть" />
        </button>

        <form className="modal__form" onSubmit={handleSubmit}>
          <label className="modal__label">
            Улица
            <input
              type="text"
              className="modal__input"
              value={street}
              onChange={(e) => setStreet(e.target.value)}
              required
            />
          </label>

          <label className="modal__label">
            Дом
            <input
              type="text"
              className="modal__input"
              value={house}
              onChange={(e) => setHouse(e.target.value)}
              required
            />
          </label>

          <label className="modal__label">
            Школа
            <input
              type="text"
              className="modal__input"
              value={school}
              onChange={(e) => setSchool(e.target.value)}
              required
            />
          </label>

          <button type="submit" className="modal__save">
              Сохранить
          </button>
        </form>
      </div>
    </div>
  );
}

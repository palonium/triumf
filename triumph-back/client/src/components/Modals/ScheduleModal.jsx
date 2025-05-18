import { useState, useEffect } from 'react';
import CustomSelect from '../../ux/CustomSelect';

export default function ScheduleModal({ isOpen, onClose, mode, schedule, teams, addresses, onSave }) {
  const [teamId, setTeamId] = useState('');
  const [day, setDay] = useState('');
  const [time, setTime] = useState('');
  const [addressId, setAddressId] = useState('');

  useEffect(() => {
    if (mode === 'edit' && schedule) {
      setTeamId(schedule.teamId);
      setDay(schedule.day);
      setTime(schedule.time);
      setAddressId(schedule.addressId);
    } else {
      setTeamId('');
      setDay('');
      setTime('');
      setAddressId('');
    }
  }, [mode, schedule]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const newSchedule = {
      teamId,
      day,
      time,
      addressId,
    };
    onSave(newSchedule);
    onClose();
  };

  return (
    <div className="modal">
      <div className="modal__overlay" onClick={onClose}></div>
      <div className="modal__content modal__content-edit">
        <button className="modal__close" onClick={onClose}>
            <img src="/icon/Close.svg" alt="Закрыть" />
        </button>
        <h2 className="modal__title">{mode === 'edit' ? 'Редактировать' : 'Добавить'}</h2>

        <form className="modal__form" onSubmit={handleSubmit}>
        <label className="modal__label">
          Команда
          <CustomSelect
            options={teams.map((t) => ({ label: t.name, value: t.id }))}
            selected={teams.find((t) => t.id === teamId)?.name || ''}
            onChange={(option) => setTeamId(option.value)}
            className="custom-select--modal"
            placeholder="Выбрать"
          />
        </label>

        <label className="modal__label">
            Время
            <input
              type="time"
              className="modal__input"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
            />
          </label>

          <label className="modal__label">
            День
            <input
              type="text"
              className="modal__input"
              value={day}
              onChange={(e) => setDay(e.target.value)}
              required
            />
          </label>

          <label className="modal__label">
            Адрес
            <CustomSelect
              options={addresses.map((a) => ({
                label: `${a.street}, ${a.house}`,
                value: a.id,
              }))}
              selected={addresses.find((a) => a.id === addressId)
                ? `${addresses.find((a) => a.id === addressId).street}, ${addresses.find((a) => a.id === addressId).house}`
                : ''}
              onChange={(option) => setAddressId(option.value)}
              className="custom-select--modal"
              placeholder="Выбрать"
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

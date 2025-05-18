import { useState, useEffect } from 'react';

export default function TeamModal({ isOpen, onClose, mode, team, users, onSave }) {
  const [teamName, setTeamName] = useState('');
  const [selectedChildIds, setSelectedChildIds] = useState([]);

  useEffect(() => {
    if (mode === 'edit' && team) {
      setTeamName(team.name);
      setSelectedChildIds(team.members || []); 
    } else {
      setTeamName('');
      setSelectedChildIds([]);
    }
  }, [mode, team]);

  if (!isOpen) return null;

  const handleChildToggle = (childId) => {
    setSelectedChildIds((prev) =>
      prev.includes(childId) ? prev.filter((id) => id !== childId) : [...prev, childId]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTeam =
      mode === "edit"
        ? { members: selectedChildIds }
        : { name: teamName, members: selectedChildIds };
    onSave(newTeam);
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
            Название команды
            <input
              type="text"
              className="modal__input"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              required
            />
          </label>

          <div className="modal__subsection">
            <h3 className="modal__subtitle">Состав</h3>
            <div className="modal__checkbox-list">
              {users.flatMap((parent) =>
                parent.children.map((child) => (
                  <label key={child.id} className="modal__checkbox-label">
                    <input
                      type="checkbox"
                      className="modal__checkbox"
                      checked={selectedChildIds.includes(child.id)}
                      onChange={() => handleChildToggle(child.id)}
                    />
                    <span className="modal__custom-checkbox" />
                    {child.firstName} {child.lastName}
                  </label>

                ))
              )}
            </div>
          </div>

          <button type="submit" className="modal__save modal__save-team">Сохранить</button>
        </form>
      </div>
    </div>
  );
}

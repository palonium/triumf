import { useState } from 'react';
import ParentInfoModal from '../Modals/ParentInfoModal';
import { updateChildTeam } from '../../api/users';
import CustomSelect from '../../ux/CustomSelect';
import { useConfirmDelete } from '../../hooks/useConfirmDelete';

export default function ChildCard({ child, parent, teams, onDelete }) {
  const [selectedTeam, setSelectedTeam] = useState(child.team || '');
  const [isParentModalOpen, setIsParentModalOpen] = useState(false);
  const { openConfirm, Confirm } = useConfirmDelete();

  const handleTeamChange = async (e) => {
    const newTeam = e.target.value;
    setSelectedTeam(newTeam);
    try {
      await updateChildTeam(child.id, newTeam);
    } catch (error) {
      console.error('Ошибка обновления команды ребенка', error);
    }
  };

  return (
    <>
      <div className="card">
        <div className="card__info">
          <div className="card__field">
            <span className="card__label">Имя:</span>
            <span className="card__value">{child.firstName}</span>
          </div>

          <div className="card__field">
            <span className="card__label">Фамилия:</span>
            <span className="card__value">{child.lastName}</span>
          </div>

          <div className="card__field">
            <span className="card__label">Дата рождения:</span>
            <span className="card__value">{child.birthDate}</span>
          </div>

          <div className="card__field card__field--parent">
            <span className="card__label">Родитель:</span>
            <span className="card__value">
              {parent.firstName} {parent.lastName}
            </span>
            <button
              type="button"
              className="card__icon-button"
              onClick={() => setIsParentModalOpen(true)}
            >
              <img src="/icon/info.svg" alt="Инфо" />
            </button>
          </div>

          <CustomSelect
            options={teams.map((team) =>
              typeof team === 'string' ? { label: team, value: team } : { label: team.name, value: team.id }
            )}
            selected={
              typeof selectedTeam === 'string'
                ? selectedTeam
                : teams.find((t) => t.id === selectedTeam)?.name || ''
            }
            onChange={(team) => {
              setSelectedTeam(team.value);
              updateChildTeam(child.id, team.value).catch((err) =>
                console.error('Ошибка обновления команды ребенка', err)
              );
            }}
          />

        </div>

        <button className="card__delete" onClick={() => openConfirm(child.id, onDelete)}>
          <img src="/icon/delete.svg" alt="Удалить" className="card__delete-icon" />
        </button>
      </div>

      <ParentInfoModal
        isOpen={isParentModalOpen}
        onClose={() => setIsParentModalOpen(false)}
        parent={parent}
      />

      <Confirm />
    </>
  );
}

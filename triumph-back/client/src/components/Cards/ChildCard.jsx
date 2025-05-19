import { useState } from 'react';
import ParentInfoModal from '../Modals/ParentInfoModal';
import { updateChildTeam } from '../../api/users';
import CustomSelect from '../../ux/CustomSelect';
import { useConfirmDelete } from '../../hooks/useConfirmDelete';

export default function ChildCard({ child, parent, teams, onDelete }) {
  const [selectedTeam, setSelectedTeam] = useState(child.team?.id || child.teamId || '');
  const [isParentModalOpen, setIsParentModalOpen] = useState(false);
  const { openConfirm, Confirm } = useConfirmDelete();

  console.log({ selectedTeam, child, teams });
  console.log('child.team ===>', child.team);

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
            options={teams.map((team) => ({
              label: team.name,
              value: team.id,
            }))}
            selected={
              teams.find((t) => t.id === selectedTeam)?.name || ''
            }
            onChange={(team) => {
              setSelectedTeam(team.value);
              console.log('Выбрана команда:', team);
              updateChildTeam(child.id, team.value).catch((err) =>
                console.error('Ошибка обновления команды ребёнка:', err)
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

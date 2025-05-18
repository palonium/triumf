import { useConfirmDelete } from "../../hooks/useConfirmDelete";

export default function TeamCard({ team, members, onEditClick, onDeleteClick }) {
  const { openConfirm, Confirm } = useConfirmDelete();
  const getMembersCountText = (count) => {
    const mod10 = count % 10;
    const mod100 = count % 100;
    if (mod100 >= 11 && mod100 <= 14) {
      return `${count} человек`;
    }
    if (mod10 === 1) {
      return `${count} человек`;
    }
    if (mod10 >= 2 && mod10 <= 4) {
      return `${count} человека`;
    }
    return `${count} человек`;
  };

  return (
    <div className="card">
      <div className="card__info">
        <div className="card__field">
          <span className="card__title">Название:</span>
          <span className="card__value">{team.name}</span>
        </div>
        <div className="card__field">
          <span className="card__lable">Состав:</span>
          <span className="card__value">{getMembersCountText(members.length)}</span>
        </div>
        <ol className="card__members-list">
          {members.map((member, idx) => (
            <li key={idx} className="card__members-item">
              {member.firstName} {member.lastName}
            </li>
          ))}
        </ol>
      </div>

      <div className="card__actions">
        <button className="card__icon-button" onClick={() => onEditClick(team)}>
          <img src="/icon/edit.svg" alt="Редактировать" />
        </button>
        <button className="card__delete" onClick={() => openConfirm(team.id, onDeleteClick)}>
          <img src="/icon/delete.svg" alt="Удалить" className="card__delete-icon" />
        </button>
      </div>

      <Confirm />
    </div>
  );
}

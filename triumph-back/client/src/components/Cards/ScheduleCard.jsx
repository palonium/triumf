import { useConfirmDelete } from "../../hooks/useConfirmDelete";

export default function ScheduleCard({ schedule, getTeamName, getAddressName, onEditClick, onDeleteClick }) {
  const { openConfirm, Confirm } = useConfirmDelete();

  return (
    <>
      <div className="card">
        <div className="card__info">
          <div className="card__field">
            <span className="card__label">Команда:</span>
            <span className="card__value">{getTeamName(schedule.teamId)}</span>
          </div>
          <div className="card__field">
            <span className="card__label">День:</span>
            <span className="card__value">{schedule.day}</span>
          </div>
          <div className="card__field">
            <span className="card__label">Время:</span>
            <span className="card__value">{schedule.time}</span>
          </div>
          <div className="card__field">
            <span className="card__label">Адрес:</span>
            <span className="card__value">{getAddressName(schedule.addressId)}</span>
          </div>
        </div>

        <div className="card__actions">
          <button className="card__icon-button" onClick={() => onEditClick(schedule)}>
            <img src="/icon/edit.svg" alt="Редактировать" />
          </button>
          <button className="card__delete" onClick={() => openConfirm(schedule.id, onDeleteClick)}>
            <img src="/icon/delete.svg" alt="Удалить" className="card__delete-icon" />
          </button>
        </div>
      </div>

      <Confirm />
    </>
  );
}

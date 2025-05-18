import { useEffect, useState } from 'react';
import { getSchedules, createSchedule, updateSchedule, deleteSchedule } from '../../api/schedule';
import { getTeams } from '../../api/teams';
import { getAddresses } from '../../api/addresses';
import ScheduleModal from '../Modals/ScheduleModal';
import ScheduleCard from '../Cards/ScheduleCard';

export default function SchedulesTab() {
  const [schedules, setSchedules] = useState([]);
  const [teams, setTeams] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('create');
  const [selectedSchedule, setSelectedSchedule] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [schedulesData, teamsData, addressesData] = await Promise.all([
        getSchedules(),
        getTeams(),
        getAddresses()
      ]);
      setSchedules(schedulesData);
      setTeams(teamsData);
      setAddresses(addressesData);
    } catch (error) {
      console.error('Ошибка загрузки данных для расписаний:', error);
    }
  };

  const getTeamName = (teamId) => {
    const team = teams.find((t) => t.id === teamId);
    return team ? team.name : 'Неизвестная команда';
  };

  const getAddressName = (addressId) => {
    const address = addresses.find((a) => a.id === addressId);
    return address ? `${address.street}, ${address.house}` : 'Неизвестный адрес';
  };

  const handleEditClick = (schedule) => {
    setSelectedSchedule(schedule);
    setModalMode('edit');
    setIsModalOpen(true);
  };

  const handleCreateClick = () => {
    setSelectedSchedule(null);
    setModalMode('create');
    setIsModalOpen(true);
  };

  const handleDeleteClick = async (id) => {
    try {
      await deleteSchedule(id);
      setSchedules((prev) => prev.filter((s) => s.id !== id));
    } catch (err) {
      console.error('Ошибка удаления расписания:', err);
    }
  };

  const handleSave = async (newSchedule) => {
    try {
      if (modalMode === 'edit' && selectedSchedule) {
        await updateSchedule(selectedSchedule.id, newSchedule);
      } else {
        await createSchedule(newSchedule);
      }
      fetchData();
    } catch (error) {
      console.error('Ошибка при сохранении расписания', error);
    }
  };

  return (
    <div className="schedules">
      <div className="cards">
        {schedules.length > 0 ? (
          schedules.map((schedule) => (
            <ScheduleCard
              key={schedule.id}
              schedule={schedule}
              getTeamName={getTeamName}
              getAddressName={getAddressName}
              onEditClick={handleEditClick}
              onDeleteClick={handleDeleteClick}
            />
          ))
        ) : (
          <p>Расписание пока пустое</p>
        )}
      </div>
      <button className="card__add team__add" onClick={handleCreateClick}>+ Добавить</button>

      <ScheduleModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        mode={modalMode}
        schedule={selectedSchedule}
        teams={teams}
        addresses={addresses}
        onSave={handleSave}
      />
    </div>
  );
}

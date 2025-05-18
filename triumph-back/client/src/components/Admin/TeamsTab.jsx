import { useEffect, useState } from 'react';
import { getTeams, updateTeam, createTeam, deleteTeam } from '../../api/teams';
import { getUsers } from '../../api/users';
import TeamModal from '../Modals/TeamModal';
import TeamCard from '../Cards/TeamCard';

export default function TeamsTab() {
  const [teams, setTeams] = useState([]);
  const [users, setUsers] = useState([]);
  const [modalMode, setModalMode] = useState('create');
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchTeamsAndUsers = async () => {
    try {
      const [teamsData, usersData] = await Promise.all([getTeams(), getUsers()]);
      setTeams(teamsData);
      setUsers(usersData);
    } catch (error) {
      console.error('Ошибка загрузки данных:', error);
    }
  };

  useEffect(() => {
    fetchTeamsAndUsers();
  }, []);

  const getChildrenByIds = (ids) => {
    return users.flatMap((user) => user.children).filter((child) => ids.includes(child.id));
  };

  const handleEditClick = (team) => {
    setSelectedTeam({
      id: team.id,
      name: team.name,
      members: team.members, // массив id
    });
    setModalMode('edit');
    setIsModalOpen(true);
  };

  const handleCreateClick = () => {
    setSelectedTeam(null);
    setModalMode('create');
    setIsModalOpen(true);
  };

  const handleSave = async (newTeamData) => {
    try {
      let updatedTeam;
      if (modalMode === 'edit' && selectedTeam) {
        updatedTeam = await updateTeam(selectedTeam.id, newTeamData);
        setTeams((prev) => prev.map((t) => (t.id === selectedTeam.id ? updatedTeam : t)));
      } else {
        updatedTeam = await createTeam(newTeamData);
        setTeams((prev) => [...prev, updatedTeam]);
      }
    } catch (err) {
      console.error('Ошибка при сохранении команды', err);
    } finally {
      setIsModalOpen(false);
      setSelectedTeam(null);
    }
  };

  const handleDeleteClick = async (teamId) => {
    try {
      await deleteTeam(teamId);
      setTeams((prev) => prev.filter((team) => team.id !== teamId));
    } catch (err) {
      console.error('Ошибка при удалении команды', err);
    }
  };

  return (
    <div className="teams">
      <div className="teams__list">
        {teams.length > 0 ? (
          teams.map((team) => (
            <TeamCard
              key={team.id}
              team={team}
              members={getChildrenByIds(team.members)}
              onEditClick={handleEditClick}
              onDeleteClick={handleDeleteClick}
            />
          ))
        ) : (
          <p>Команд нет</p>
        )}
      </div>

      <button className="card__add team__add" onClick={handleCreateClick}>
        + Добавить
      </button>

      <TeamModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        mode={modalMode}
        team={selectedTeam}
        users={users}
        onSave={handleSave}
      />
    </div>
  );
}

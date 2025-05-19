import { useEffect, useState } from 'react';
import { getRequests, deleteRequest } from '../api/requests';
import { getUsers, deleteUsers, deleteChild } from '../api/users';
import { getAddresses, deleteAddress, createAddress, updateAddress } from '../api/addresses';
import { getTeams } from '../api/teams';
import { getSchedules } from '../api/schedule';
import AdminTabs from '../components/Admin/AdminTabs';
import AdminTabContent from '../components/Admin/AdminTabContent';
import AddressModal from '../components/Modals/AddressModal';

const tabs = ['Заявки', 'Пользователи', 'Адреса', 'Дети', 'Команды', 'Расписание'];

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState('Заявки');
  const [requests, setRequests] = useState([]);
  const [users, setUsers] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [teams, setTeams] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const fetchData = async () => {
    try {
      if (activeTab === 'Заявки') {
        const data = await getRequests();
        setRequests(data);
      } else if (activeTab === 'Пользователи' || activeTab === 'Дети') {
        const [usersData, teamsData] = await Promise.all([getUsers(), getTeams()]);

        // добавляем объект team каждому ребёнку
        const usersWithTeams = usersData.map((user) => {
          const updatedChildren = user.children.map((child) => {
            const team = teamsData.find((t) => t.id === child.teamId);
            return { ...child, team };
          });
          return { ...user, children: updatedChildren };
        });

        setUsers(usersWithTeams);
        setTeams(teamsData);
      } else if (activeTab === 'Адреса') {
        const data = await getAddresses();
        setAddresses(data);
      } else if (activeTab === 'Расписание') {
        const data = await getSchedules();
        setSchedules(data);
      }
    } catch (error) {
      console.error('Ошибка загрузки данных:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const handleDeleteRequest = async (id) => {
    try {
      await deleteRequest(id);
      setRequests((prev) => prev.filter((r) => r.id !== id));
    } catch (error) {
      console.error('Ошибка удаления заявки:', error);
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      await deleteUsers(id);
      setUsers((prev) => prev.filter((u) => u.id !== id));
    } catch (error) {
      console.error('Ошибка удаления пользователя:', error);
    }
  };

  const handleDeleteAddress = async (id) => {
    try {
      await deleteAddress(id);
      setAddresses((prev) => prev.filter((a) => a.id !== id));
    } catch (error) {
      console.error('Ошибка удаления адреса:', error);
    }
  };

  const handleSaveAddress = async (id, addressData) => {
    try {
      if (id) {
        const updated = await updateAddress(id, addressData);
        setAddresses((prev) => prev.map((a) => (a.id === id ? updated : a)));
      } else {
        const created = await createAddress(addressData);
        setAddresses((prev) => [...prev, created]);
      }
    } catch (error) {
      console.error('Ошибка сохранения адреса:', error);
    }
  };

  const handleAddAddress = () => {
    setIsAddModalOpen(true);
  };

  const handleDeleteChild = async (childId) => {
    try {
      await deleteChild(childId);
      const updated = await getUsers();
      setUsers(updated);
    } catch (error) {
      console.error('Ошибка удаления ребёнка:', error);
    }
  };

  return (
    <div className="admin-panel">
      <h1 className="admin-panel__title">ПАНЕЛЬ УПРАВЛЕНИЯ</h1>

      <AdminTabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />

      <AdminTabContent
        activeTab={activeTab}
        requests={requests}
        users={users}
        addresses={addresses}
        onDeleteRequest={handleDeleteRequest}
        onDeleteUser={handleDeleteUser}
        onDeleteAddress={handleDeleteAddress}
        onSaveAddress={handleSaveAddress}
        onAddAddress={handleAddAddress}
        onDeleteChild={handleDeleteChild}
      />

      <AddressModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        mode="add"
        onSave={async (newAddressData) => {
          await handleSaveAddress(null, newAddressData);
          setIsAddModalOpen(false);
        }}
      />
    </div>
  );
}

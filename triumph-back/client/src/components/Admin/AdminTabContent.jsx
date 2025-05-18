import AddressModal from '../Modals/AddressModal';
import RequestCard from '../Cards/RequestCard';
import UsersCard from '../Cards/UsersCard';
import AddressCard from '../Cards/AddressCard';
import ChildrenTab from '../Admin/ChildrenTab';
import TeamsTab from '../Admin/TeamsTab';
import SchedulesTab from '../Admin/ScheduleTab';

export default function AdminTabContent({
  activeTab,
  requests,
  users,
  addresses,
  onDeleteRequest,
  onDeleteUser,
  onDeleteAddress,
  onEditAddress,
  onAddAddress,
  onDeleteChild,
}) {
  return (
    
    <div className="admin-panel__content">
      {activeTab === 'Заявки' && (
        <div className="cards">
          {requests.length > 0 ? (
            requests.map((req) => (
              <RequestCard key={req.id} request={req} onDelete={onDeleteRequest} />
            ))
          ) : (
            <p>Заявок нет</p>
          )}
        </div>
      )}

      {activeTab === 'Пользователи' && (
        <div className="cards">
          {users.length > 0 ? (
            users.map((user) => (
              <UsersCard key={user.id} request={user} onDelete={onDeleteUser} />
            ))
          ) : (
            <p>Пользователей нет</p>
          )}
        </div>
      )}

      {activeTab === 'Адреса' && (
        <div className="cards">
          {addresses.length > 0 ? (
            addresses.map((address) => (
              <AddressCard
                key={address.id}
                address={address}
                onEdit={onEditAddress}
                onDelete={onDeleteAddress}
              />
            ))
          ) : (
            <p>Адресов нет</p>
          )}
          <button className="card__add" onClick={onAddAddress}>
            + Добавить
          </button>
        </div>
      )}

      {activeTab === 'Дети' && <ChildrenTab users={users} onDeleteChild={onDeleteChild} />}
      {activeTab === 'Команды' && <TeamsTab />}
      {activeTab === 'Расписание' && <SchedulesTab />}
    </div>
  );
}

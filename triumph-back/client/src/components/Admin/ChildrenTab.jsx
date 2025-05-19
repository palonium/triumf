import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getTeams } from '../../api/teams';
import ChildCard from '../Cards/ChildCard';

export default function ChildrenTab({ users, onDeleteChild }) {
  const [teams, setTeams] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const data = await getTeams();
        setTeams(data);
      } catch (error) {
        console.error('Ошибка загрузки команд:', error);
      }
    };

    fetchTeams();
  }, []);

  const childrenWithParents = [];

  users.forEach(parent => {
    parent.children.forEach(child => {
      childrenWithParents.push({ child, parent });
    });
  });

  return (
    <div className="cards">
      {childrenWithParents.length > 0 ? (
        childrenWithParents.map((item, idx) => (
          <div id={`child-${item.child.id}`} key={item.child.id}>
          <ChildCard
            key={idx}
            child={item.child}
            parent={item.parent}
            teams={teams}
            onDelete={onDeleteChild}
          />
          </div>
        ))
      ) : (
        <p>Детей нет</p>
      )}
    </div>
  );
}

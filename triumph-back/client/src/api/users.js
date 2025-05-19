export const getUsers = async () => {
  const res = await fetch("/api/users");
  if (!res.ok) {
    throw new Error("Ошибка загрузки пользователей");
  }
  return await res.json();
};

export const deleteUsers = async (id) => {
  const res = await fetch(`/api/users/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    throw new Error("Ошибка удаления пользователя");
  }
  return true;
};

export const updateChildTeam = async (childId, teamId) => {
  const res = await fetch(`/api/children/${childId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ teamId }),
  });
  if (!res.ok) {
    throw new Error("Ошибка обновления команды ребёнка");
  }
  return await res.json();
};

export const deleteChild = async (childId) => {
  const res = await fetch(`/api/children/${childId}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    throw new Error("Ошибка удаления ребёнка");
  }
  return true;
};

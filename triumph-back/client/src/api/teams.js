export const getTeams = async () => {
  const res = await fetch("/api/teams");
  if (!res.ok) {
    throw new Error("Ошибка загрузки команд");
  }
  return await res.json();
};

export const createTeam = async (team) => {
  const res = await fetch("/api/teams", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(team),
  });
  if (!res.ok) {
    throw new Error("Ошибка создания команды");
  }
  return await res.json();
};

export const updateTeam = async (id, teamId) => {
  const res = await fetch(`/api/teams/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(teamId),
  });
  if (!res.ok) {
    throw new Error("Ошибка обновления команды");
  }
  return await res.json();
};

export const deleteTeam = async (id) => {
  const res = await fetch(`/api/teams/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    throw new Error("Ошибка удаления команды");
  }
  return true;
};

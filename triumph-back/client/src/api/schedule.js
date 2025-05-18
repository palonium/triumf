export const getSchedules = async () => {
  const res = await fetch("/api/schedules");
  if (!res.ok) {
    throw new Error("Ошибка загрузки расписания");
  }
  return await res.json();
};

export const createSchedule = async (schedule) => {
  const res = await fetch("/api/schedules", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(schedule),
  });
  if (!res.ok) {
    throw new Error("Ошибка создания расписания");
  }
  return await res.json();
};

export const updateSchedule = async (id, schedule) => {
  const res = await fetch(`/api/schedules/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(schedule),
  });
  if (!res.ok) {
    throw new Error("Ошибка обновления расписания");
  }
  return await res.json();
};

export const deleteSchedule = async (id) => {
  const res = await fetch(`/api/schedules/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    throw new Error("Ошибка удаления расписания");
  }
  return true;
};

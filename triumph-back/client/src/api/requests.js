export const getRequests = async () => {
  const res = await fetch("/api/requests");
  if (!res.ok) {
    throw new Error("Ошибка загрузки заявок");
  }
  return await res.json();
};

export const deleteRequest = async (id) => {
  const res = await fetch(`/api/requests/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    throw new Error("Ошибка удаления заявки");
  }
  return true;
};

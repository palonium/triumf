export const getAddresses = async () => {
  const res = await fetch("/api/addresses");
  if (!res.ok) {
    throw new Error("Ошибка загрузки адресов");
  }
  return await res.json();
};

export const createAddress = async (address) => {
  const res = await fetch("/api/addresses", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(address),
  });
  if (!res.ok) {
    throw new Error("Ошибка добавления адреса");
  }
  return await res.json();
};

export const updateAddress = async (id, address) => {
  const res = await fetch(`/api/addresses/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(address),
  });
  if (!res.ok) {
    throw new Error("Ошибка редактирования адреса");
  }
  return await res.json();
};

export const deleteAddress = async (id) => {
  const res = await fetch(`/api/addresses/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    throw new Error("Ошибка удаления адреса");
  }
  return true;
};

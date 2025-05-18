import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function ParentEditPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const [name, setName] = useState(location.state?.name || "");
  const [surname, setSurname] = useState(location.state?.surname || "");
  const [phone, setPhone] = useState(location.state?.phone || "");

  const [errors, setErrors] = useState({ name: false, surname: false, phone: false });
  const [shake, setShake] = useState({ name: false, surname: false, phone: false });

  const triggerShake = (field) => {
    setShake((prev) => ({ ...prev, [field]: true }));
    setTimeout(() => {
      setShake((prev) => ({ ...prev, [field]: false }));
    }, 400);
  };

  const validatePhone = (value) => /^\+375\d{9}$/.test(value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {
      name: name.trim() === "",
      surname: surname.trim() === "",
      phone: !validatePhone(phone),
    };

    setErrors(newErrors);
    Object.entries(newErrors).forEach(([field, hasError]) => {
      if (hasError) triggerShake(field);
    });

    if (Object.values(newErrors).some((e) => e)) return;
    try {
      const response = await fetch("/api/parent/details", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ name, surname, phone }),
      });

      if (response.ok) {
        navigate("/account");
      } else {
        alert("Ошибка при сохранении данных");
      }
    } catch {
      alert("Ошибка подключения к серверу");
    }

    navigate("/account");
  };

  return (
    <div className="registration">
      <h1 className="registration__title">ЛИЧНЫЙ КАБИНЕТ</h1>
      <p className="registration__subtitle">Заполните свои данные</p>

      <form className="registration__form" onSubmit={handleSubmit}>
        <input
          type="text"
          className={`registration__form-input ${
            errors.name ? "input--error" : ""
          } ${shake.name ? "input--shake" : ""}`}
          placeholder="Имя*"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="text"
          className={`registration__form-input ${
            errors.surname ? "input--error" : ""
          } ${shake.surname ? "input--shake" : ""}`}
          placeholder="Фамилия*"
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
        />

        <input
          type="text"
          className={`registration__form-input ${
            errors.phone ? "input--error" : ""
          } ${shake.phone ? "input--shake" : ""}`}
          placeholder="Номер телефона (+375XXXXXXXXX)"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <button
          type="button"
          className="registration__link"
          style={{ color: "#283991", marginBottom: "16px" }}
          onClick={() => navigate("/account/edit-parent/change-password")}
        >
          Сменить пароль
        </button>

        <button type="submit" className="registration__submit-button">
          Сохранить
        </button>
      </form>
    </div>
  );
}

export default ParentEditPage;

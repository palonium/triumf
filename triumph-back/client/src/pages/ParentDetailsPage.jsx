import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function ParentDetailsPage() {
  const navigate = useNavigate();
  const location = useLocation();

  // Инициализация с предзаполнением из state
  const [name, setName] = useState(location.state?.name || "");
  const [surname, setSurname] = useState(location.state?.surname || "");

  const [errors, setErrors] = useState({ name: false, surname: false });
  const [shake, setShake] = useState({ name: false, surname: false });

  const triggerShake = (field) => {
    setShake((prev) => ({ ...prev, [field]: true }));
    setTimeout(() => {
      setShake((prev) => ({ ...prev, [field]: false }));
    }, 400);
  };

  const onlyLetters = (value) => /^[А-Яа-яA-Za-zЁё\s-]+$/.test(value);
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {
      name: name.trim() === "" || !onlyLetters(name),
      surname: surname.trim() === "" || !onlyLetters(surname),
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
        body: JSON.stringify({ name, surname }),
      });

      if (response.ok) {
        navigate("/register/child");
      } else {
        alert("Ошибка сохранения данных родителя");
      }
    } catch {
      alert("Ошибка подключения к серверу");
    }

    navigate("/register/child");
  };

  return (
    <div className="registration">
      <h1 className="registration__title details__title">ЛИЧНЫЙ КАБИНЕТ</h1>
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

        <button type="submit" className="registration__submit-button">
          Сохранить
        </button>
      </form>
    </div>
  );
}

export default ParentDetailsPage;

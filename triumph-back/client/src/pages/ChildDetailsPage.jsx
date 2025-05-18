import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function ChildDetailsPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const [childName, setChildName] = useState(location.state?.name || "");
  const [childSurname, setChildSurname] = useState(location.state?.surname || "");
  const [birthDate, setBirthDate] = useState(
    location.state?.birthDate ? new Date(location.state.birthDate) : null
  );

  const [errors, setErrors] = useState({
    childName: false,
    childSurname: false,
    birthDate: false,
  });
  const [shake, setShake] = useState({
    childName: false,
    childSurname: false,
    birthDate: false,
  });

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
      childName: childName.trim() === "" || !onlyLetters(childName),
      childSurname: childSurname.trim() === "" || !onlyLetters(childSurname),
      birthDate: birthDate === null,
    };
    

    setErrors(newErrors);
    Object.entries(newErrors).forEach(([field, hasError]) => {
      if (hasError) triggerShake(field);
    });

    if (Object.values(newErrors).some((e) => e)) return;

    try {
      console.log('!', location.state)

      const response = await fetch("/api/child/details", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          id: location.state?.id,
          name: childName,
          surname: childSurname,
          birthDate: birthDate.toISOString().split("T")[0],
        }),
      });

      if (response.ok) {
        navigate("/account");
      } else {
        alert("Ошибка сохранения данных ребёнка");
      }
    } catch {
      alert("Ошибка подключения к серверу");
    }

    navigate("/account");
  };

  return (
    <div className="registration">
      <h1 className="registration__title">ЛИЧНЫЙ КАБИНЕТ</h1>
      <p className="registration__subtitle">Заполните данные о ребенке</p>

      <form className="registration__form" onSubmit={handleSubmit}>
        <input
          type="text"
          className={`registration__form-input ${
            errors.childName ? "input--error" : ""
          } ${shake.childName ? "input--shake" : ""}`}
          placeholder="Имя*"
          value={childName}
          onChange={(e) => setChildName(e.target.value)}
        />

        <input
          type="text"
          className={`registration__form-input ${
            errors.childSurname ? "input--error" : ""
          } ${shake.childSurname ? "input--shake" : ""}`}
          placeholder="Фамилия*"
          value={childSurname}
          onChange={(e) => setChildSurname(e.target.value)}
        />

        <DatePicker
          selected={birthDate}
          onChange={(date) => setBirthDate(date)}
          placeholderText="Дата рождения*"
          dateFormat="dd.MM.yyyy"
          className={`registration__form-input ${
            errors.birthDate ? "input--error" : ""
          } ${shake.birthDate ? "input--shake" : ""}`}
        />

        <button type="submit" className="registration__submit-button">
          Сохранить
        </button>
      </form>
    </div>
  );
}

export default ChildDetailsPage;

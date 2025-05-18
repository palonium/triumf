import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function ChangePasswordPage() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const [visibleOld, setVisibleOld] = useState(false);
  const [visibleNew, setVisibleNew] = useState(false);
  const [visibleRepeat, setVisibleRepeat] = useState(false);

  const [errors, setErrors] = useState({
    oldPassword: false,
    newPassword: false,
    repeatPassword: false,
  });
  const [shake, setShake] = useState({
    oldPassword: false,
    newPassword: false,
    repeatPassword: false,
  });

  const navigate = useNavigate();

  const triggerShake = (field) => {
    setShake((prev) => ({ ...prev, [field]: true }));
    setTimeout(() => {
      setShake((prev) => ({ ...prev, [field]: false }));
    }, 400);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {
      oldPassword: oldPassword.trim() === "",
      newPassword: newPassword.trim() === "",
      repeatPassword:
        repeatPassword.trim() === "" || newPassword !== repeatPassword,
    };

    setErrors(newErrors);

    Object.entries(newErrors).forEach(([field, hasError]) => {
      if (hasError) triggerShake(field);
    });

    if (Object.values(newErrors).some((e) => e)) return;

    try {
      const response = await fetch("/api/change-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          oldPassword,
          newPassword,
        }),
      });

      if (response.ok) {
        navigate("/account");
      } else {
        alert("Ошибка смены пароля");
      }
    } catch (e) {
      alert("Ошибка подключения к серверу");
    }

    navigate("/account");
  };

  return (
    <div className="registration">
      <h1 className="registration__title">ЛИЧНЫЙ КАБИНЕТ</h1>
      <p className="registration__subtitle">Заполните свои данные</p>

      <form className="registration__form" onSubmit={handleSubmit}>
      <div className="registration__form-input-wrapper">
          <input
            type={visibleOld ? "text" : "password"}
            className={`registration__form-input ${
              errors.oldPassword ? "input--error" : ""
            } ${shake.oldPassword ? "input--shake" : ""}`}
            placeholder="Старый пароль"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
          <button
            type="button"
            className="registration__form-input-button"
            onClick={() => setVisibleOld(!visibleOld)}
          >
            <img
              src={visibleOld ? "/icon/active.svg" : "/icon/default.svg"}
              alt="показать пароль"
              className="registration__form-input-icon"
            />
          </button>
        </div>


        <div className="registration__form-input-wrapper">
          <input
            type={visibleNew ? "text" : "password"}
            className={`registration__form-input ${
              errors.newPassword ? "input--error" : ""
            } ${shake.newPassword ? "input--shake" : ""}`}
            placeholder="Новый пароль"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <button
            type="button"
            className="registration__form-input-button"
            onClick={() => setVisibleNew(!visibleNew)}
          >
            <img
              src={visibleNew ? "/icon/active.svg" : "/icon/default.svg"}
              alt="показать пароль"
              className="registration__form-input-icon"
            />
          </button>
        </div>


        <div className="registration__form-input-wrapper">
  <input
    type={visibleRepeat ? "text" : "password"}
    className={`registration__form-input ${
      errors.repeatPassword ? "input--error" : ""
    } ${shake.repeatPassword ? "input--shake" : ""}`}
    placeholder="Повторить пароль"
    value={repeatPassword}
    onChange={(e) => setRepeatPassword(e.target.value)}
  />
  <button
    type="button"
    className="registration__form-input-button"
    onClick={() => setVisibleRepeat(!visibleRepeat)}
  >
    <img
      src={visibleRepeat ? "/icon/active.svg" : "/icon/default.svg"}
      alt="показать пароль"
      className="registration__form-input-icon"
    />
  </button>
</div>


        <button type="submit" className="registration__submit-button">
          Сохранить
        </button>
      </form>
    </div>
  );
}

export default ChangePasswordPage;

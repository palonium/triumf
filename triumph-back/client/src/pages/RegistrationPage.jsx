import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function RegistrationPage() {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [visiblePassword, setVisiblePassword] = useState(false);
  const [visibleRepeat, setVisibleRepeat] = useState(false);
  const [errors, setErrors] = useState({
    phone: false,
    password: false,
    repeatPassword: false,
  });
  const [shake, setShake] = useState({
    phone: false,
    password: false,
    repeatPassword: false,
  });

  const navigate = useNavigate();

  const validatePhone = (value) => /^\+375\d{9}$/.test(value);

  const triggerShake = (field) => {
    setShake((prev) => ({ ...prev, [field]: true }));
    setTimeout(() => {
      setShake((prev) => ({ ...prev, [field]: false }));
    }, 400);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {
      phone: !validatePhone(phone),
      password: password.length < 8,
      repeatPassword:
        repeatPassword.length < 8 ||
        password !== repeatPassword,
    };
    

    setErrors(newErrors);

    Object.entries(newErrors).forEach(([field, hasError]) => {
      if (hasError) triggerShake(field);
    });

    if (Object.values(newErrors).some((e) => e)) return;

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.token);
        navigate("/register/parent");
      } else {
        alert("Ошибка регистрации");
      }

      // localStorage.setItem("token", "mock-token");
      // navigate("/register/parent");
    } catch {
      alert("Ошибка подключения к серверу");
    }
  };

  return (
    <div className="registration">
      <h1 className="registration__title">РЕГИСТРАЦИЯ</h1>

      <form className="registration__form" onSubmit={handleSubmit}>
        <input
          type="text"
          className={`registration__form-input ${
            errors.phone ? "input--error" : ""
          } ${shake.phone ? "input--shake" : ""}`}
          placeholder="Номер телефона"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <div className="registration__form-input-wrapper">
          <input
            type={visiblePassword ? "text" : "password"}
            className={`registration__form-input ${
              errors.password ? "input--error" : ""
            } ${shake.password ? "input--shake" : ""}`}
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            className="registration__form-input-button"
            onClick={() => setVisiblePassword(!visiblePassword)}
          >
            <img
              src={visiblePassword ? "/icon/active.svg" : "/icon/default.svg"}
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
          Зарегистрироваться
        </button>
      </form>
    </div>
  );
}

export default RegistrationPage;

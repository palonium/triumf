import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [visiblePassword, setVisiblePassword] = useState(false);

  const [errors, setErrors] = useState({
    phone: false,
    password: false,
  });
  const [shake, setShake] = useState({
    phone: false,
    password: false,
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const phoneRegex = /^(\+?375)(25|29|33|44)\d{7}$/;
    const newErrors = {
      phone: !phoneRegex.test(phone),
      password: !password,
    };

    setErrors(newErrors);

    Object.entries(newErrors).forEach(([field, hasError]) => {
      if (hasError) {
        setShake((prev) => ({ ...prev, [field]: true }));
        setTimeout(() => {
          setShake((prev) => ({ ...prev, [field]: false }));
        }, 400);
      }
    });

    if (Object.values(newErrors).some(Boolean)) return;

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.role);
        navigate(data.role === "admin" ? "/admin" : "/account");
      } else {
        alert("Неверный логин или пароль");
      }
    } catch {
      alert("Ошибка подключения. Попробуйте позже.");
    }
  };

  return (
    <div className="registration">
      <h1 className="registration__title">ВХОД</h1>

      <form className="registration__form" onSubmit={handleSubmit}>
        <input
          type="text"
          className={`registration__form-input ${
            errors.phone ? "input--error" : ""
          } ${shake.phone ? "input--shake" : ""}`}
          placeholder="Номер телефона"
          value={phone}
          onChange={(e) => {
            const value = e.target.value;
            if (/^[0-9+]*$/.test(value)) {
              setPhone(value);
            }
          }}
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


        <button type="submit" className="registration__submit-button">
          Войти
        </button>

        <div style={{ marginTop: "20px", textAlign: "center" }}>или</div>

        <button
          type="button"
          className="registration__submit-button"
          style={{
            backgroundColor: "transparent",
            color: "#283991",
            border: "1px solid #28399159",
            marginTop: "20px",
          }}
          onClick={() => navigate("/register")}
        >
          Зарегистрироваться
        </button>
      </form>
    </div>
  );
}

export default LoginPage;

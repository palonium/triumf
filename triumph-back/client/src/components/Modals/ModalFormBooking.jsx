import React, { useEffect, useState } from "react";
import { getAddresses } from "../../api/addresses";
import CustomSelect from "../../ux/CustomSelect";

export default function ModalFormBooking({ isOpen, onClose, onSubmit }) {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [phone, setPhone] = useState("");
  const [branch, setBranch] = useState("");
  const [branches, setBranches] = useState([]);

  const [errors, setErrors] = useState({
    name: false,
    surname: false,
    phone: false,
    branch: false,
  });

  const [shake, setShake] = useState({
    name: false,
    surname: false,
    phone: false,
    branch: false,
  });

  useEffect(() => {
    getAddresses().then(setBranches);
  }, []);

  const validate = () => {
    const phoneRegex = /^(\+?375)(25|29|33|44)\d{7}$/;
    const nameRegex = /^[а-яА-Яa-zA-ZёЁ\s-]{2,}$/;

    const newErrors = {
      name: !nameRegex.test(name),
      surname: !nameRegex.test(surname),
      phone: !phoneRegex.test(phone),
      branch: !branch,
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

    return !Object.values(newErrors).some(Boolean);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const requestData = { name, surname, phone, branch };

    fetch("/api/booking", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestData),
    });

    onSubmit();
    onClose();
  };

  if (!isOpen) return null;

  const branchOptions = branches.map((b) => ({
    label: `${b.street}, ${b.house} (${b.school})`,
    value: `${b.street}, ${b.house} (${b.school})`,
  }));

  return (
    <div className="modal" onClick={onClose}>
      <div
        className="modal__content modal__content-edit"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal__close" onClick={onClose}>
          <img src="/icon/Close.svg" alt="Закрыть" />
        </button>
        <h2 className="modal__title">Запись на тренировку</h2>
        <form className="modal__form" onSubmit={handleSubmit}>
          <input
            type="text"
            className={`modal__input booking__modal-input ${
              errors.name ? "input--error" : ""
            } ${shake.name ? "input--shake" : ""}`}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Имя*"
          />
          <input
            type="text"
            className={`modal__input booking__modal-input ${
              errors.surname ? "input--error" : ""
            } ${shake.surname ? "input--shake" : ""}`}
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
            placeholder="Фамилия*"
          />
          <input
            type="tel"
            className={`modal__input booking__modal-input ${
              errors.phone ? "input--error" : ""
            } ${shake.phone ? "input--shake" : ""}`}
            value={phone}
            onChange={(e) => {
              const value = e.target.value;
              if (/^[0-9+]*$/.test(value)) setPhone(value);
            }}
            placeholder="Номер телефона*"
          />

          <CustomSelect
            options={branchOptions}
            selected={branch}
            onChange={(option) => {
              setBranch(option.value);
              setErrors((prev) => ({ ...prev, branch: false }));
            }}
            placeholder="Филиал*"
            className="custom-select--modal"
            error={errors.branch}
            shake={shake.branch}
          />

          <button type="submit" className="modal__save">
            Записаться
          </button>
        </form>
      </div>
    </div>
  );
}

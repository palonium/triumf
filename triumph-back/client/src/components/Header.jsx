import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ModalFormBooking from "./Modals/ModalFormBooking"; 
import ModalSuccess from "./Modals/ModalSuccess"; 
import { HashLink } from 'react-router-hash-link';

function Header() {
  const navigate = useNavigate();
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const handleAccountClick = () => {
    if (!token || !role) {
      navigate("/login");
      return;
    }
    navigate(role === "admin" ? "/admin" : "/account");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  return (
    <>
      <header className="header">
        <div className="header__bottom">
          <a href="/" className="header__logo">
            <img className="header__logo-img" src="icon/logo-header.svg" alt="" />
          </a>

          <div className="header__info">
            <p className="header__text line">
              Эстетическая групповая гимнастика в Минске
            </p>
            <p className="header__text second">
              Триумф - ваш путь к совершенству!
            </p>
          </div>

          <div className="header__items">
            <a href="https://www.instagram.com/klubtriumf/" className="header__inst-button">
              <img src="icon/inst.svg" alt="" />
            </a>
            <a href="tel:+375297650956" className="header__button-number">+375 29 171 5238</a>
          </div>
        </div>

        <div className="header__top">
          <div className="header__top-container">
            <nav className="header__navbar">
              <button
                className="header__request"
                onClick={() => setIsBookingOpen(true)}
              >
                Запись
              </button>
              <ul className="header__nav">
                <li className="header__nav-item">
                  <HashLink smooth to="/#about" className="header__nav-link link">О нас</HashLink>
                </li>
                <li className="header__nav-item">
                  <HashLink smooth to="/#price" className="header__nav-link link">Стоимость</HashLink>
                </li>
                <li className="header__nav-item">
                  <HashLink smooth to="/#photo" className="header__nav-link link">Фото</HashLink>
                </li>
                <li className="header__nav-item">
                  <HashLink smooth to="/#contacts" className="header__nav-link link">Контакты</HashLink>
                </li>
                <li className="header__nav-item">
                  <a href="/places" className="header__nav-link link">Филиалы</a>
                </li>
                <li className="header__nav-item">
                  <a href="/trainers" className="header__nav-link link">Тренеры</a>
                </li>
                <li className="header__nav-item">
                  {role === "admin" ? (
                    <button
                      onClick={handleLogout}
                      className="header__nav-link link"
                      style={{ background: "none", border: "none", cursor: "pointer" }}
                    >
                      Выйти
                    </button>
                  ) : (
                    <button
                      onClick={handleAccountClick}
                      className="header__nav-link link"
                      style={{ background: "none", border: "none", cursor: "pointer" }}
                    >
                      Кабинет
                    </button>
                  )}
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <ModalFormBooking
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        onSubmit={() => setIsSuccessOpen(true)}
      />
      <ModalSuccess
        isOpen={isSuccessOpen}
        onClose={() => setIsSuccessOpen(false)}
      />
    </>
  );
}

export default Header;

import React from "react";
import { HashLink } from "react-router-hash-link";
import { useNavigate } from "react-router-dom";
import ModalFormBooking from "./Modals/ModalFormBooking"; 
import ModalSuccess from "./Modals/ModalSuccess"; 
import { useState } from "react";

function Footer() {
  const navigate = useNavigate();
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);

  const handleAccountClick = () => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token || !role) {
      navigate("/login");
      return;
    }

    navigate(role === "admin" ? "/admin" : "/account");
  };

  return (
    <footer className="footer">
      <a href="/" className="footer__logo-wrap">
        <img src="images/logo.svg" alt="" className="footer__logo" />
        <p className="footer__logo-text">Клуб эстетической групповой гимнастики</p>
      </a>

      <nav className="footer__nav">
        <ul className="footer__navbar">
          <li className="footer_navbar-item">
            <HashLink smooth to="/#about" className="footer__navbar-item-link link">О нас</HashLink>
          </li>
          <li className="footer_navbar-item">
            <HashLink smooth to="/#price" className="footer__navbar-item-link link">Стоимость</HashLink>
          </li>
          <li className="footer_navbar-item">
            <HashLink smooth to="/#contacts" className="footer__navbar-item-link link">Контакты</HashLink>
          </li>
          <li className="footer_navbar-item">
            <a href="/places" className="footer__navbar-item-link link">Филиалы</a>
          </li>
        </ul>

        <ul className="footer__navbar">
          <li className="footer_navbar-item">
            <a href="/trainers" className="footer__navbar-item-link link">Тренеры</a>
          </li>
          <li className="footer_navbar-item">
            <HashLink smooth to="/#photo" className="footer__navbar-item-link link">Фото</HashLink>
          </li>
          <li className="footer_navbar-item ">
            <button
              onClick={handleAccountClick}
              className="footer__navbar-item-link link"
              style={{ background: "none", border: "none", cursor: "pointer" }}
            >
              Кабинет
            </button>
          </li>
        </ul>
      </nav>

      <div className="footer__items">
        <button className="footer__request" 
                onClick={() => setIsBookingOpen(true)}>Запись</button>
        <a href="tel:+375297650956" className="footer__link">
          <div className="footer__link-wrap">
            <img src="icon/call.svg" alt="" className="footer__link-icon" />
          </div>
          +375 29 171 5238
        </a>
        <a href="https://www.instagram.com/klubtriumf/" className="footer__link">
          <img src="icon/inst.svg" alt="" className="footer__link-icon" />
          klubtriumf
        </a>
      </div>

      <ModalFormBooking
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        onSubmit={() => setIsSuccessOpen(true)}
      />
      <ModalSuccess
        isOpen={isSuccessOpen}
        onClose={() => setIsSuccessOpen(false)}
      />
    </footer>
  );
}

export default Footer;

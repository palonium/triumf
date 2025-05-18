import React from "react";
import ModalFormBooking from "../components/Modals/ModalFormBooking"; 
import ModalSuccess from "../components/Modals/ModalSuccess"; 
import { useState } from "react";

function MainSection(){
    const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
    return(
        <div className="gymnastics">
            <div className="container">

                <article className="gymnastics__container">
                <h2 className="gymnastics__title">ЭСТЕТИЧЕСКАЯ ГРУППОВАЯ ГИМНАСТИКА</h2>
                <p className="gymnastics__description">Открыт набор в группы на новый 
                    сезон 2025-2026 в клуб «Триумф»!</p>
                <p className="gymnastics__description">Первое занятие <span className="gymnastics__description-span">БЕСПЛАТНО</span></p>
                <div className="gymnastics__button-wrapper">
                    <button
                      className="gymnastics__button btn"
                      onClick={() => setIsBookingOpen(true)}
                    >
                      ЗАПИСАТЬСЯ
                    </button>
                  </div>
                </article>

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
        </div>
    )
}

export default MainSection
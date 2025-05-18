import ModalFormBooking from "../components/Modals/ModalFormBooking"; 
import ModalSuccess from "../components/Modals/ModalSuccess"; 
import { useState } from "react";
function PlacesPage(){
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
    return(
        <main>
        <section class="places container">
          <h2 class="places__title">ФИЛИАЛЫ</h2>
    
          <article class="places__item">
            <p class="places__type"><span class="places__highlight">Каменная горка</span><span>Пушкинская</span><span>Институт культуры</span></p>
            <div class="places__content">
              <div class="places__img-wrap">
                <img src="images/kamenka.png" alt="" class="places__img"/>
              </div>
              <div class="places__info">
                <h3 class="places__name">Каменная горка</h3>
                <p class="places__adress">ул. Кунцевщина 18, Гимназия 4</p>
                <button class="places__button btn" onClick={() => setIsBookingOpen(true)}>Записаться</button>
              </div>
            </div>
          </article>
          <article class="places__item">
            <p class="places__type"><span>Каменная горка</span><span class="places__highlight">Пушкинская</span><span>Институт культуры</span></p>
            <div class="places__content">
              <div class="places__img-wrap">
                <img src="images/pushkinskaya.png" alt="" class="places__img"/>
              </div>
              <div class="places__info">
                <h3 class="places__name">Пушкинская</h3>
                <p class="places__adress">ул. Притыцкого 18, СШ 103</p>
                <button class="places__button btn" onClick={() => setIsBookingOpen(true)}>Записаться</button>
              </div>
            </div>
          </article>
    
          <article class="places__item">
            <p class="places__type"><span>Каменная горка</span><span>Пушкинская</span><span class="places__highlight">Институт культуры</span></p>
            <div class="places__content">
              <div class="places__img-wrap">
                <img src="images/institut.png" alt="" class="places__img"/>
              </div>
              <div class="places__info">
                <h3 class="places__name">Институт Культуры</h3>
                <p class="places__adress">ул. Брестская 66, СШ 110</p>
                <button class="places__button btn" onClick={() => setIsBookingOpen(true)}>Записаться</button>
              </div>
            </div>
          </article>
        </section>

        <ModalFormBooking
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        onSubmit={() => setIsSuccessOpen(true)}
      />
      <ModalSuccess
        isOpen={isSuccessOpen}
        onClose={() => setIsSuccessOpen(false)}
      />
      </main>
    )
}

export default PlacesPage
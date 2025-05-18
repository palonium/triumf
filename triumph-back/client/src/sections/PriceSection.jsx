import React from "react";
import AdvantageCard from "../components/Cards/AdvantageCard";
import { advantages } from "../data/contentData";

function PriceSection() {
  return (
    <section id="price" className="price container">

      <h2 className="price__title">СТОИМОСТЬ</h2>

      <div className="price__container">

        <div className="price__content">
          <div className="price__items">
            <article className="price__item">
              <h3 className="price__item-title">Количество</h3>
              <p className="price__item-text">в неделю</p>
              <p className="price__item-numbers">2 часа</p>
            </article>
  
            <article className="price__item">
              <h3 className="price__item-title">Стоимость</h3>
              <p className="price__item-text">в месяц</p>
              <p className="price__item-numbers">85 руб.</p>
            </article>
          </div>

          <p className="price__note">Стоимость зависит от количества часов в неделю</p>
            
        </div>
          
      </div>

    </section>
  );
}

export default PriceSection;

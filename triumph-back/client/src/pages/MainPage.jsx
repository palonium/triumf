import React from "react";
import Header from "../components/Header";
import MainSection from "../sections/MainSection";
import StatisticsSection from "../sections/StatisticsSection";
import AdvantagesSection from "../sections/AdvantagesSection";
import CategoriesSection from "../sections/CategoriesSection";
import PriceSection from "../sections/PriceSection";
import PhotoCarousel from "../components/PhotoCarousel";

function MainPage(){
    return(
        <div>
            <MainSection/>
            <StatisticsSection/>
            <AdvantagesSection/>
            <CategoriesSection/>
            <PriceSection/>
            <PhotoCarousel/>
    <section id="contacts" class="contacts container">
      <h2 class="contacts__title">СВЯЖИТЕСЬ С НАМИ</h2>

      <iframe class="contacts__map" src="https://yandex.ru/map-widget/v1/?um=constructor%3Adcfe0e27a29394df262d9fe125de1d45d58e03211109525f10eea21d24b85bcb&amp;source=constructor"></iframe>

      <div class="contacts__items">
        <article class="contacts__item">
          <h3 class="contacts__type">Телефон</h3>
          <a href="tel:+375297650956" class="contact__contact link">+375 29 765 0956</a>
        </article>

        <article class="contacts__item">
          <h3 class="contacts__type">Почта</h3>
          <a href="mailto:fegg@tut.by" class="contact__contact link">fegg@tut.by</a>
        </article>

        <article class="contacts__item">
          <h3 class="contacts__type">Адрес</h3>
          <a href="https://yandex.by/maps/-/CDVybCIj" class="contact__contact link">Минск, Беларусь</a>
        </article>
      </div>
    </section>
        </div>
    )
}

export default MainPage
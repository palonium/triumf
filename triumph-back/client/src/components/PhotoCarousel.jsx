import React, { useState } from "react";

const images = [
  "images/swiper-1.jpeg",
  "images/swiper-2.jpeg",
  "images/swiper-3.jpeg",
  "images/swiper-4.jpeg",
  "images/swiper-5.jpeg",
  "images/swiper-6.jpeg",
];

function PhotoCarousel() {
  const [position, setPosition] = useState(0);

  const moveRight = () => {
    setPosition((prev) => (prev + 1) % images.length);
  };

  const moveLeft = () => {
    setPosition((prev) => (prev - 1 + images.length) % images.length);
  };


  return (
    <section className="swiper container" id="photo">
      <h2 className="swiper__title">НАШИ ФОТО</h2>
      <p className="swiper__text">
        Результаты наших гимнасток и благодарность родителей — лучшее
        подтверждение работы клуба{" "}
        <span className="swiper__text-span">«Триумф»</span>
      </p>
      <div className="swiper__carousel">
        <button className="swiper__button" onClick={moveLeft}>
          <svg className="swiper__button-img" width="15" height="27" viewBox="0 0 15 27" fill="none">
            <path d="M14 0L0 13L14 26" stroke="#000" strokeWidth="1" strokeLinejoin="round" strokeLinecap="round" />
          </svg>
        </button>
        <img
          className="swiper__img"
          src={images[position]}
          alt={`Фото ${position + 1}`}
        />
        <button className="swiper__button" onClick={moveRight}>
          <svg className="swiper__button-img" width="15" height="27" viewBox="0 0 15 27" fill="none">
            <path d="M0 26L14 13L0 0" stroke="#000" strokeWidth="1" strokeLinejoin="round" strokeLinecap="round" />
          </svg>
        </button>
      </div>
    </section>
  );
}

export default PhotoCarousel;

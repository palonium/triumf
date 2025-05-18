import React from "react";

function CategoriesCard({ title, description, imgSrc, text, type }) {
  return (
    <article className="categories__item">
      <figure className="categories__img-wraper">
        <img src={imgSrc} alt="" className="categories__img"/>
      </figure>

      <h3 className="categories__item-title">{title}</h3>

      <p className="categories__type">{type}</p>
      <p className="categories__text">{description}</p>
      <p className="categories__text">{text}</p> 
      
  </article>
  );
}

export default CategoriesCard;

import React from "react";

function AdvantageCard({ title, text }) {
    return (
      <li className="advantages__item">
        <p className="advantages__title">{title}</p>
        <p className="advantages__text">{text}</p>
      </li>
    );
  }
  
export default AdvantageCard;
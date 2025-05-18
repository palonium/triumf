import React from "react";
import AdvantageCard from "../components/Cards/AdvantageCard";
import { advantages } from "../data/contentData";

function AdvantagesSection() {
  return (
    <div className="advantages container">
        <div className="advantages__container">
            <ul className="advantages__list">
                {advantages.map((item, index) => (
                <AdvantageCard key={index} title={item.title} text={item.text} />
                ))}
            </ul>

            <div className="advantages__img-wrap">
                <img src="images/advantages.jpeg" alt="" className="advantages__img" />
            </div>
        </div>
    </div>
  );
}

export default AdvantagesSection;

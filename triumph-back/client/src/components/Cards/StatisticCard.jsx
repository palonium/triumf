import React from "react";

function StatisticCard({ title, description }) {
  return (
    <article className="statistics__item">
      <h2 className="statistics__title">{title}</h2>
      <p className="statistics__description">{description}</p>
    </article>
  );
}

export default StatisticCard;

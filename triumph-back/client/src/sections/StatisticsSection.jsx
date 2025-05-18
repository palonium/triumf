import React from "react";
import StatisticCard from "../components/Cards/StatisticCard";
import { statistics } from "../data/contentData";

function StatisticsSection(){
    return(
        <section id="triumf" className="triumf container">
            <h2 className="triumf__title">Триумф – ваш путь к совершенству!</h2>
            <p className="triumf__description">
                Направление, которое объединило в себе гимнастику и акробатику, современный танец и театральное искусство
            </p>
            <div className="triumf__statistics">
            {statistics.map((item, index) => (
                <StatisticCard key={index} title={item.title} description={item.description} />
            ))}
            </div>
        </section>
    )
}

export default StatisticsSection
import React from "react";
import { categories } from "../data/contentData";
import CategoriesCard from "../components/Cards/CategoriesCard";

function CategoriesSection() {
  return (
    <section class="categories container">
      <h2 class="catigories__title">У НАС ТРЕНИРУЮТСЯ</h2>

      <div class="categories__items">
        {categories.map((item, index)=>(
            <CategoriesCard key={index} title={item.title} description={item.description} text={item.text} type={item.type} imgSrc={item.imgSrc}/>
        ))}
      </div>
        
    </section>
  );
}

export default CategoriesSection;

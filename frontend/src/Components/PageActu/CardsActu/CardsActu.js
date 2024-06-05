import React from 'react';
import './CardsActu.css';
import CardData from './CardData'; // Importation des données

function CardsActu() {
  return (
    <div className="cards-container">
      {CardData.map((card) => (
        <div key={card.id} className="cardA">
          <img src={card.image} alt={card.title} className="card-image" />
          <h3>{card.title}</h3>
          <p>{card.description}</p>
          <div className="card-date"><p>{card.date}</p></div>
        </div>
      ))}
    </div>
  );
}

export default CardsActu;

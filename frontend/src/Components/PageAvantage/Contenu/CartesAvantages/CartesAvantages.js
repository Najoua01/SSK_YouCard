import React from 'react'
import './CartesAvantages.css';
import { cards } from './cards';
import NuitDesChoeurs from '../../../../assets/imagesAvantages/NuitDesChoeurs.jpeg';
import Lemon8Store from '../../../../assets/imagesAvantages/Lemon8Store.jpeg';
import CampingDirect from '../../../../assets/imagesAvantages/CampingDirect.jpeg';
import LaBoiteATout from '../../../../assets/imagesAvantages/LaBoiteATout.jpeg';
import Optic from '../../../../assets/imagesAvantages/Optic.jpeg';
import Titanic from '../../../../assets/imagesAvantages/Titanic.jpeg';

const imageMap = {
  NuitDesChoeurs: NuitDesChoeurs,
  Lemon8Store: Lemon8Store,
  CampingDirect: CampingDirect,
  LaBoiteATout: LaBoiteATout,
  Optic: Optic,
  Titanic: Titanic,
};


function CartesAvantages({ category, licence }) {
  // const filteredCards = category === 'All' ? cards : cards.filter((card) => card.category === category);

  const filteredCards = cards.filter((card) => {
    if (category === 'All') {
      return true;
    }
    
    return card.category === category;
  });


  return (
    <section class="container-av">
      {filteredCards.map((card) => (
        <div className='carte-av' key={card.id}>
           <img src={imageMap[card.imageName]} alt={card.name} className='img-carte-av' />
          <div className='texte-carte'>
            <span>{card.name}</span>
            <p className='texte-redu'>{card.reduction}</p>
          </div>
        </div>
      ))}
        
    </section>
    
  );
};

export default CartesAvantages
// import React, { useState, useEffect } from 'react';
// import './Carrousel.css';
// import '../../PageAvantage/Contenu/CartesAvantages/CartesAvantages.css';
// import { cards } from '../../PageAvantage/Contenu/CartesAvantages/cards';
// import NuitDesChoeurs from '../../../assets/imagesAvantages/NuitDesChoeurs.jpeg';
// import Lemon8Store from '../../../assets/imagesAvantages/Lemon8Store.jpeg';
// import CampingDirect from '../../../assets/imagesAvantages/CampingDirect.jpeg';
// import LaBoiteATout from '../../../assets/imagesAvantages/LaBoiteATout.jpeg';
// import Optic from '../../../assets/imagesAvantages/Optic.jpeg';
// import Titanic from '../../../assets/imagesAvantages/Titanic.jpeg';

// const imageMap = {
//   NuitDesChoeurs: NuitDesChoeurs,
//   Lemon8Store: Lemon8Store,
//   CampingDirect: CampingDirect,
//   LaBoiteATout: LaBoiteATout,
//   Optic: Optic,
//   Titanic: Titanic,
// };

// function Carrousel() {
//   const [currentCardIndex, setCurrentCardIndex] = useState(0);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentCardIndex((prevIndex) => (prevIndex + 1) % cards.length);
//     }, 3000);
//     return () => clearInterval(interval);
//   }, []);

//   const goToPreviousCard = () => {
//     setCurrentCardIndex((prevIndex) => (prevIndex - 1 + cards.length) % cards.length);
//   };

//   const goToNextCard = () => {
//     setCurrentCardIndex((prevIndex) => (prevIndex + 1) % cards.length);
//   };

//   const goToCard = (index) => {
//     setCurrentCardIndex(index);
//   };

//   return (
//     <div className='c-container'>
//       <div className='text-events'>
//         <h2>Événements à ne pas manquer!</h2>
//         <p>Découvrez ici les évènements recommandé par Youcard qui vous feront vivre des expériences inoubliables a des prix réduits!</p>
//       </div>
//       <div className='big-carrousel'>
//         <div className='prev' onClick={goToPreviousCard}>&lt;</div>
//         <div className='slide-panel'>
//           {cards.map((card, index) => (
//             <div className={`carte-av ${index === currentCardIndex? 'active' : ''}`} key={card.id}>
//               <img src={imageMap[card.imageName]} alt={card.name} className='img-carte-av' />
//               <div className='texte-carte'>
//                 <span>{card.name}</span>
//                 <p className='texte-redu'>{card.reduction}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//         <div className='next' onClick={goToNextCard}>&gt;</div>
//       </div>
//       <div className='dots'>
//         {cards.map((_, index) => (
//           <span
//             key={index}
//             className={`dot ${index === currentCardIndex? 'active' : ''}`}
//             onClick={() => goToCard(index)}
//           ></span>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Carrousel;


import React, { useState, useEffect } from 'react';
import './Carrousel.css';
import '../../PageAvantage/Contenu/CartesAvantages/CartesAvantages.css';
import { cards } from '../../PageAvantage/Contenu/CartesAvantages/cards';
import NuitDesChoeurs from '../../../assets/imagesAvantages/NuitDesChoeurs.jpeg';
import Lemon8Store from '../../../assets/imagesAvantages/Lemon8Store.jpeg';
import CampingDirect from '../../../assets/imagesAvantages/CampingDirect.jpeg';
import LaBoiteATout from '../../../assets/imagesAvantages/LaBoiteATout.jpeg';
import Optic from '../../../assets/imagesAvantages/Optic.jpeg';
import Titanic from '../../../assets/imagesAvantages/Titanic.jpeg';

const imageMap = {
  NuitDesChoeurs: NuitDesChoeurs,
  Lemon8Store: Lemon8Store,
  CampingDirect: CampingDirect,
  LaBoiteATout: LaBoiteATout,
  Optic: Optic,
  Titanic: Titanic,
};

function Carrousel() {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCardIndex((prevIndex) => (prevIndex + 1) % cards.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const goToPreviousCard = () => {
    setCurrentCardIndex((prevIndex) => (prevIndex - 1 + cards.length) % cards.length);
  };

  const goToNextCard = () => {
    setCurrentCardIndex((prevIndex) => (prevIndex + 1) % cards.length);
  };

  const goToCard = (index) => {
    setCurrentCardIndex(index);
  };

  return (
    <div className='c-container'>
      <div className='text-events'>
        <h2>Événements à ne pas manquer!</h2>
        <p>Découvrez ici les évènements recommandé par Youcard qui vous feront vivre des expériences inoubliables a des prix réduits!</p>
      </div>
      <div className='big-carrousel'>
        <div className='prev' onClick={goToPreviousCard}>&lt;</div>
        <div className='slide-panel'>
          <div className='cards-wrapper' style={{ transform: `translateX(-${currentCardIndex * (100 / cards.length)}%)` }}>
            {cards.map((card, index) => (
              <div className={`carte-av ${index === currentCardIndex ? 'active' : ''}`} key={card.id}>
                <img src={imageMap[card.imageName]} alt={card.name} className='img-carte-av' />
                <div className='texte-carte'>
                  <span>{card.name}</span>
                  <p className='texte-redu'>{card.reduction}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className='next' onClick={goToNextCard}>&gt;</div>
      </div>
      <div className='dots'>
        {cards.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === currentCardIndex ? 'active' : ''}`}
            onClick={() => goToCard(index)}
          ></span>
        ))}
      </div>
    </div>
  );
}

export default Carrousel;

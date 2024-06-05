import React, { useState, useEffect } from 'react'
import './CarteAv.css'
import img1 from '../../../assets/carousel/image-1.png'
import img2 from '../../../assets/carousel/image-2.png'
import img3 from '../../../assets/carousel/image-3.png'
import img4 from '../../../assets/carousel/image-4.png'
import img5 from '../../../assets/carousel/image-5.png'
import img6 from '../../../assets/carousel/image-6.png'

function CarteAv() {
  const categories = [
    { name: "Alimentaire" },
    { name: "Animaliers" },
    { name: "Art & Expositions" },
    { name: "Beauté" },
    { name: "Commerce" },
    { name: "Commerce de services" },
    { name: "Education et culture" },
    { name: "Espace" },
    { name: "Hotel" },
    { name: "Loisirs créatifs" },
    { name: "Mode" },
    { name: "Shopping" },
    { name: "Spectacle & événements" },
    { name: "Tourisme" },
    { name: "Transports" },
    { name: "Utilitaire" },
  ];

  const Pays = [
    { name: "Belgique" },
    { name: "Pays-bas" },
    { name: "Luxembourg" },
    { name: "France" },
  ];
  const [category, setCategory] = useState('Categories');
  const [country, setCountry] = useState('Pays');
  const images = [img1, img2, img3, img4, img5, img6];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); 
    return () => clearInterval(interval); 
  }, [images.length]);

  const goToPreviousImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const goToNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const goToImage = (index) => {
    setCurrentImageIndex(index);
  };
    return (
            <div className='card-container'>
              <div className='card-av'> 
              <h1>Recherchez des avantages </h1>
              <div className='search-box'>
                <input type='text' placeholder='Recherche'/>
              </div>
              <div className="dropdown">
              <select className="categories" value={category}>
                <option className="dropdown-content"> Categories </option>
                {categories.map(ctr =>(
                    <option value={ctr.name}>{ctr.name}</option>
                ))}
              </select>

              <br />
              <select className="categories" value={country}>
                <option className="dropdown-content"> Pays </option>
                {Pays.map(ctr =>(
                    <option value={ctr.name}>{ctr.name}</option>
                ))}
              </select> 
              </div>
                <div className='codepost-home'>
                <input type='text' placeholder='Code postal'/>
                </div>
                <button className='btnav'>Rechercher</button>
              </div>

              <div className='card-carou'>
              <h1>Ils ont rejoint YouCard </h1>
                <div className='image'>
                  <div className='prev'onClick={goToPreviousImage}></div>
                  <div className='slide-panel'>
                      <img src={images[currentImageIndex]} alt={`Slide ${currentImageIndex + 1}`} />
                  </div>
                  <div className='next' onClick={goToNextImage}></div>
                </div>
                <div className='dots'>
          {images.map((_, index) => (
            <span
              key={index}
              className={`dot ${index === currentImageIndex ? 'active' : ''}`}
              onClick={() => goToImage(index)}
            ></span>
          ))}
        </div>
              </div>
            </div>
          )
        }
        
        export default CarteAv

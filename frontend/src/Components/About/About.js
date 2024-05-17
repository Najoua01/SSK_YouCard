import React from 'react'
import './About.css'
import bannerbackground from '../../assets/home-banner.png'
import bannerimage from '../../assets/home-image.png'
function About () {
  return (
    <div className='intro'>
      <div className='banner-image'>
          <img src={bannerbackground} alt="" />
        </div>
      <div className='banner-container'>
      
        <div className='home-text-section'>
          <h1 className='primary-heading'>
            YouCard</h1>
          <h2 className='secondary-heading'> 
          Des avantages offerts à tous !</h2>
          <p className='primary-text'>YouCard est une carte nominative réservée aux membres des personnels de l'enseignement en activité en Fédération Wallonie-Bruxelles, tous réseaux et fonctions confondus, et dont le traitement est pris en charge par le Ministère de la Fédération Wallonie-Bruxelles.
</p>
        </div>
        <div className='home-image-container'>
          <img src={bannerimage} alt="" />
        </div>
      </div>
      
  
    </div>
    
  )
}

export default About

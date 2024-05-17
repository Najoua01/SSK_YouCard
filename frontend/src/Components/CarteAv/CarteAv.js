import React, { useState } from 'react'
import './CarteAv.css'
import carou1 from '../../assets/carou1.png'

function CarteAv () {
    const [isActive, setIsActive] = useState(false)
  return (
    <div className='card-container'>
      <div className='card-av'> 
      <h1>Recherchez des avantages </h1>
      <div className="dropdown">
        <div className='categories' onClick={e => setIsActive(!isActive)}>Catégories</div>
        {isActive && ( 
            <div className="dropdown-content">
                <div className="dropdown-item">Musée</div>
                <div className="dropdown-item">Exposition</div>
            </div>
        )}
    </div>
        <div className="dropdown">
            <div className='categories' onClick={e => setIsActive(!isActive)}>Pays</div>
            {isActive && ( 
                <div className="dropdown-content">
                    <div className="dropdown-item">Belgique</div>
                    <div className="dropdown-item">France</div>
                </div>
            )}
        </div>
        <div className="dropdown">
            <div className='categories' onClick={e => setIsActive(!isActive)}>Provinces</div>
            {isActive && ( 
                <div className="dropdown-content">
                    <div className="dropdown-item">Bruxelles</div>
                    <div className="dropdown-item">Wavre</div>
                </div>
            )}
        </div>
        <button className='btnav'>Rechercher</button>
      </div>
      <div className='card-carou'>
      <h1>Ils ont rejoint YouCard </h1>
      <div className='image'>
            <img src={carou1} alt="offre" />
        </div>
      </div>
    </div>
  )
}

export default CarteAv

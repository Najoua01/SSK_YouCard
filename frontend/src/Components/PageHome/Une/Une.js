import React from 'react'
import './Une.css'
import Uneimage from '../../../assets/image-une.png'
function Une () {
  return (
    <div className='card-container-u'>
        <h1 className='home-titles'> A la une...</h1>
        <div className='card-containerrr'>
            <div className='cont-image'>
                <img src={Uneimage} alt="" />
            </div>
         <div className='text-une'>
            <h2 className='card-title'>
            Ne jetez pas votre Carte PROF 2022-2023 
            </h2>
            <p>Vous l'aurez remarqué, votre Carte PROF arrive bientôt à échéance. Pourtant cette année, vous ne devez pas la jeter : elle reste valable jusqu'au 5 juillet 2024 ! </p>
            <button className='btnune'>
               Lire la suite 
            </button>
        </div>
        </div>
    </div>
  )
}

export default Une


import React from 'react'
import './Actu.css'

function Actu () {
  return (
    <div className='section-act'>
        <h1 className='home-titles'> Actualités </h1>
        <div className='container-act'>
            <div className='actu-titles'>
               <h2><span>23/04/2024</span >Végétales au Centre culturel de Hotton</h2>
                <hr />
                <h2><span>22/04/2024</span >CONCOURS ! 2 lots DVD Les Inséparables</h2>
                <hr />
                <h2><span>21/04/2024 </span >PaCi Combustibles devient partenaire Carte PROF</h2>
                <hr />
                <h2><span>20/04/2024</span >Sport-Histoire-Santé au Musée de la Médecine</h2>
                <hr />
                <h2><span>19/04/2024 </span >Les voyages intimistes de Thomas Chable au Musée de la Photographie</h2>
            </div>
        </div>
        <p>Toutes les actualités...</p>
    </div>
  )
}

export default Actu

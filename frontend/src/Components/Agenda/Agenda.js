import React from 'react'
import './Agenda.css'
import imageag from '../../assets/ag-prov.png'

function Agenda () {
  return (
    <div className='section-ag'>
      <h1 className='home-titles'> Agenda </h1>
        <div className='container-ag'>
            <div className='agenda'>
                <img src={imageag} alt="" />
            </div>
            <div className='agenda-act'>

                <h2>TRÉSORS VIVANTS Didier Mélon et ses invités</h2>
                <p>Le 26 April 2024 à Bruxelles-Schaerbeek</p>
                <hr />
               
                <h2>La Vie trépidante de Brigitte Tornade Camille Kohler</h2>
                <p>Du 01 Mai 2024 au 26 Mai 2024 à Brussels</p>
                <hr />
                
                <h2>KUNSTENFESTIVALDESARTS</h2>
                <p>Du 10 Mai 2024 au 1 Juin 2024 à Brussels-Schaerbeek</p>
                <hr />
                
                <h2>La Petite Sirène at the Sucrerie de Wavre</h2>
                <p>Du 11 Mai 2024 au 12 Mai 2024 à Brussels-Schaerbeek</p>
                
            </div>

        </div>
        <p>Tout l'agenda...</p>
    </div>
  )
}

export default Agenda

import React from 'react'
import './Contenu.css'
import Sidebar from './Sidebar/Sidebar'
import Filtre from './Filtre-section/Filtre'

function Contenu() {
  return (
    <div className='Layout'>
      <Sidebar/>
      <Filtre/>
    </div>
  )
}

export default Contenu


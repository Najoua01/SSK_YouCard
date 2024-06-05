import React, { useState } from 'react'
import './Contenu.css'
import Sidebar from './Sidebar/Sidebar'
import Filtre from './Filtre-section/Filtre'
import CartesAvantages from './CartesAvantages/CartesAvantages'

function Contenu() {
  const [category, setCategory] = useState('All'); // Default category to "All"
  const [licence, setLicence] = useState();

  return (
    <div className='layout'>
      <div className='sidebar'>
      <Sidebar setCategory={setCategory} setLicence={setLicence}/>
      </div>
      <div className='main-content'>
      <Filtre setCategory={setCategory}/>
      <CartesAvantages category={category} licence={licence}/>
      </div>
    </div>
  )
}

export default Contenu

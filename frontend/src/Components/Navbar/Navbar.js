import React from 'react'
import'./Navbar.css'
const Navbar = () => {
  return (
    <nav className='container'>
      <h1> Youcard</h1>
      <ul>
        <li>Avantages</li>
        <li>Actualités</li>
        <li>Agenda</li>
        <li>Partenaires</li>
        <li>Devenir Membre</li>
        <li><button className='btn'>Connexion</button></li>
      </ul>
    </nav>
  )
}

export default Navbar

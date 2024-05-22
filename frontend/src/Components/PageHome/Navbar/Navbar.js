import React from 'react'
import'./Navbar.css'
function Navbar () {
  return (
    <nav className='container'>
      <h1> Youcard</h1>
      <ul>
        <a href="/Avantages"><li>Avantages</li></a>
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

import React from 'react'
import './Sidebar.css'
import Category from './Category/Category'
import Licence from './Licence/Licence'

function Sidebar() {
  return (
    <div className='side-section'>
     <section className='sidebar'>
        <div className='logo-container'>
            <h3>Filtre</h3>
            <hr />
            <br />
        </div>
        <Category/>
        <Licence /> 
     </section>
    </div>
  )
}

export default Sidebar

import React from 'react'
import './Category.css'

function Category() {
  return (
    <div> 
      <h2 className='sidebar-title'> Catégories </h2>
      <div>
        <label className='sidebar-label-container'>
          <input type='radio'name='test'/>
          <span className='checkmark'></span>Alimentaire
        </label>
        <label className='sidebar-label-container'>
          <input type='radio'name='test'/>
          <span className='checkmark'></span>Animaliers
        </label>
        <label className='sidebar-label-container'>
          <input type='radio'name='test'/>
          <span className='checkmark'></span>Art et exposition
        </label>
        <label className='sidebar-label-container'>
          <input type='radio'name='test'/>
          <span className='checkmark'></span>Beauté
        </label>
        <label className='sidebar-label-container'>
          <input type='radio'name='test'/>
          <span className='checkmark'></span>Commerce 
        </label>
        <label className='sidebar-label-container'>
          <input type='radio'name='test'/>
          <span className='checkmark'></span>Commerce de services 
        </label>
      </div>
    </div>
  )
}

export default Category

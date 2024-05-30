import React from 'react'

function Licence() {
  return (
    <div> 
      <h2 className='sidebar-title-pric-title'> Licence </h2>
      <div>
              <label className='sidebar-label-container'>
                <input type='radio'name='test2'/>
                <span className='checkmark'></span>Gratuit
              </label>
              <label className='sidebar-label-container'>
                <input type='radio'name='test2'/>
                <span className='checkmark'></span>Avantage +
              </label>
              <label className='sidebar-label-container'>
                <input type='radio'name='test2'/>
                <span className='checkmark'></span>Avantage ++
              </label>
      </div>
    </div>
  )
}

export default Licence

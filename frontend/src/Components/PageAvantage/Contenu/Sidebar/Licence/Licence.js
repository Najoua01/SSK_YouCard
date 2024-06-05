import React from 'react'

function Licence(props) {

  const handleLicenceChange = (event) => {
    props.onLicenceChange(event.target.value);
  }; 
  return (
    <div className='lic-container'> 
      <h2 className='sidebar-title-prix-title'> Licence </h2>
      <div>
              <label className='sidebar-label-container'>
                <input type='radio'
                name='licence'
                checked={props.selectedValue === "gratuit"}
                onChange={handleLicenceChange}
                />
                <span className='checkmark'></span>Gratuit
              </label>

              <label className='sidebar-label-container'>
                <input type='radio'
                name='licence'
                checked={props.selectedValue === "avantagePlus"}
                onChange={handleLicenceChange}/>
                <span className='checkmark'></span>Avantage +
              </label>
              <label className='sidebar-label-container'>
                <input type='radio'name='licence'checked={props.selectedValue === "avantagePlusPlus"}
                onChange={handleLicenceChange}/>
                <span className='checkmark'></span>Avantage ++
              </label>
      </div>
    </div>
  )
}

export default Licence

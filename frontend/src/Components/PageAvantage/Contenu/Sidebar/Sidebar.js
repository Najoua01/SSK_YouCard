import React, {useState} from 'react'
import './Sidebar.css'
import Category from './Category/Category'
import Licence from './Licence/Licence'

function Sidebar() {
  const [category, setCategory] = useState();
  const [licence, setLicence] = useState();
  return (
    <div className='side-section'>
     <section className='sidebar'>
        <div className='logo-container'>
            <h3>Filtre</h3>
            <hr />
            <br />
        </div>
        <Category selectedValue={category} onCategoryChange={setCategory}/>
        <Licence selectedValue={licence} onLicenceChange={setLicence}/> 
     </section>
    </div>
  )
}

export default Sidebar

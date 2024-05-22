import React from 'react'
import Navbar from '../Components/PageAvantage/Navbar/Navbar';
import Title from '../Components/PageAvantage/Title/Title';
// import Sidebar from '../Components/PageAvantage/Sidebar/Categories';
import Categories from '../Components/PageAvantage/Sidebar/Categories'; 
import Footer from '../Components/PageAvantage/Footer/Footer'; 

function Avantages() {
  return (
    <div>
      <Navbar/> 
      <Title/>
      {/* <Sidebar/> */}
      <Categories/>
      <Footer/>
    </div>
  )
}

export default Avantages


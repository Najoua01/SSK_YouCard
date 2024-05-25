import React from 'react'
import Navbar from '../Components/PageAvantage/Navbar/Navbar';
import Title from '../Components/PageAvantage/Title/Title';
import Footer from '../Components/PageAvantage/Footer/Footer'; 
import Sidebar from '../Components/PageAvantage/Contenu/Sidebar/Sidebar';
import Filtre from '../Components/PageAvantage/Contenu/Filtre-section/Filtre';
import Contenu from '../Components/PageAvantage/Contenu/Contenu';


function Avantages() {
  return (
    <div>
      <Navbar/> 
      <Title/>
      {/* <Sidebar/>
      <Filtre/> */}
      <Contenu/>
      <Footer/>
    </div>
  )
}

export default Avantages


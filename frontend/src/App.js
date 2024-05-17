import React from 'react';
import Navbar from './Components/Navbar/Navbar';
import About from './Components/About/About'
import CarteAv from './Components/CarteAv/CarteAv'
import Une from './Components/Une/Une'
import Agenda from './Components/Agenda/Agenda'
import Actu from './Components/Actu/Actu'
import Footer from './Components/Footer/Footer'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Devenir_Membre from './pages/Devenir_Membre';

function App() {
  return (
    <div>
    <Navbar/>
    <About/>
    <CarteAv/>
    <Une/>
    <Agenda/>
    <Actu/>
    <Footer/>
    </div>
    // <Router>
    //   <Routes>
    //     <Route path="/" element={<Home />} />
    //     <Route path="/devenir_membre" element={<Devenir_Membre />} />
    //   </Routes>
    // </Router>
  );
}

export default App;
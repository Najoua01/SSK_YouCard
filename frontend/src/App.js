import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Avantages from './pages/Avantages';
import Devenir_Membre from './pages/Devenir_Membre';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/devenir_membre" element={<Devenir_Membre />} />
        <Route path="/Avantages" element={<Avantages/>} />
      </Routes>
    </Router>
  );
}

export default App;
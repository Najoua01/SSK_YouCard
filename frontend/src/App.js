import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Devenir_Membre from './pages/Devenir_Membre';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/devenir_membre" element={<Devenir_Membre />} />
      </Routes>
    </Router>
  );
}

export default App;
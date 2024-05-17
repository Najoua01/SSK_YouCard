import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Pages/Home';
import DevenirMembre from './Pages/DevenirMembre';
import ProfilePage from './Pages/ProfilePage';
import Navbar from './Components/NavBar/NavBar';
import Footer from './Components/Footer/Footer';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('http://localhost:8000/check-auth', { credentials: 'include' });
        if (response.ok) {
          const data = await response.json();
          setIsLoggedIn(data.authenticated);
        }
      } catch (error) {
        console.error('Erreur lors de la vérification de l\'authentification:', error);
      }
    };

    checkAuth();
  }, []);

  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:8000/logout', { method: 'GET' });
      if (response.ok) {
        setIsLoggedIn(false);
        window.location.href = '/';
      } else {
        console.error('Erreur lors de la déconnexion.');
      }
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
    }
  };

  return (
    <div className="App">
      <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/devenir-membre" element={<DevenirMembre />} />
        <Route path="/profil" element={<ProfilePage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;

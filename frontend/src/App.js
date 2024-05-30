<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Pages/Home';
import Avantages from './Pages/Avantages';
import Actualites from './Pages/Actualites';
import Agenda from './Pages/Agenda';
import Partenaires from './Pages/Partenaires';
import DevenirMembre from './Pages/DevenirMembre';
import ProfilePage from './Pages/ProfilePage';
import Navbar from './Components/NavBar/NavBar';
import Footer from './Components/Footer/Footer';
import Connexion from './Pages/Connexion';
import LogoutButton from './Components/LogoutButton/LogoutButton';

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
    console.log("Déconnexion en cours..."); 
    try {
      const response = await fetch('http://localhost:8000/logout', { 
        method: 'GET',
        credentials: 'include'
      });
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
        <Route path="/avantages" element={<Avantages />} />
        <Route path="/actualites" element={<Actualites />} />
        <Route path="/agenda" element={<Agenda />} />
        <Route path="/partenaires" element={<Partenaires />} />
        <Route path="/devenir-membre" element={<DevenirMembre />} />
        <Route path="/connexion" element={isLoggedIn ? <Home /> : <Connexion />} />
        <Route path="/profil" element={<ProfilePage />} />
      </Routes>
      {isLoggedIn && <LogoutButton onLogout={handleLogout} />}
      <Footer />
    </div>
  );
}

export default App;
=======
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
>>>>>>> officiel/YouCard-official

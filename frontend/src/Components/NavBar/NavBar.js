import React from 'react';
import { Link } from 'react-router-dom';
import LogoutButton from '../LogoutButton/LogoutButton';

function Navbar({ isLoggedIn, onLogout }) {
return (
    <nav>
        <Link to="/">YouCard</Link>
        <Link to="/avantages">Avantages</Link>
        <Link to="/actualites">Actualités</Link>
        <Link to="/agenda">Agenda</Link>
        <Link to="/partenaires">Partenaires</Link>
        <Link to="/devenir-membre">Devenir membre</Link>
        <Link to="/connexion">Connexion</Link>
        <Link to="/profil">Profil</Link>
        {isLoggedIn && <LogoutButton onLogout={onLogout} />}
    </nav>
    );
}

export default Navbar;

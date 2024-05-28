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
        {isLoggedIn ? (
                <>
                    <Link to="/profil">Profil</Link>
                    <LogoutButton onLogout={onLogout} />
                </>
            ) : (
                <Link to="/connexion">Connexion</Link>
            )}
    </nav>
    );
}

export default Navbar;

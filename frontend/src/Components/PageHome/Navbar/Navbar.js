import React from 'react';
import { Link } from 'react-router-dom';
import LogoutButton from '../../LogoutButton/LogoutButton';
import'./Navbar.css';

function Navbar({ isLoggedIn, onLogout }) {
return (
    <nav className='container'>
        <h1>Youcard</h1>
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

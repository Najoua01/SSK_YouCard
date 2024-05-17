import React from 'react';
import { Link } from 'react-router-dom';
import LogoutButton from '../LogoutButton/LogoutButton';

function Navbar({ isLoggedIn, onLogout }) {
return (
<nav>
    <Link to="/">Accueil</Link>
    <Link to="/devenir-membre">Devenir membre</Link>
    <Link to="/profil">Profil</Link>
    {isLoggedIn && <LogoutButton onLogout={onLogout} />}
</nav>
);
}

export default Navbar;

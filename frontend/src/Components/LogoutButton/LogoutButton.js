import React from "react";

function LogoutButton({onLogout}) {
    const handleClick = () => {
        console.log("Bouton de déconnexion cliqué");  // test
        onLogout();
    };
    return (
        <button onClick={handleClick}>Déconnexion</button>
    );
}

export default LogoutButton;


import React from "react";

function LogoutButton({OnLogout}) {
    return (
        <button onClick={OnLogout}>Déconnexion</button>
    );
}

export default LogoutButton;
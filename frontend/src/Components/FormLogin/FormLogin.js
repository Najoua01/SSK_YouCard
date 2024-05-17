import React, { useState } from 'react';

const LoginForm = () => {
const [username, setUsername] = useState('');
const [password, setPassword] = useState('');

const handleSubmit = async (event) => {
event.preventDefault();

try {
    const response = await fetch('/login', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
    window.location.href = '/profil';
    } else {
    const errorData = await response.json();
    alert('Erreur lors de la connexion : ' + (errorData.error || 'Erreur inconnue'));
    }
} catch (error) {
    alert('Erreur lors de la connexion : ' + error.message);
}
};

return (
<form id="login-form" onSubmit={handleSubmit}>
    <input type="text" id="login-username" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Nom d'utilisateur" />
    <input type="password" id="login-password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Mot de passe" />
    <button type="submit">Se connecter</button>
</form>
);
};

export default LoginForm;

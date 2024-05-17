import React, { useState } from 'react';

const SignupForm = () => {
const [username, setUsername] = useState('');
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');

const handleSubmit = async (event) => {
event.preventDefault();

if (!username || !email || !password) {
    alert('Tous les champs sont obligatoires.');
    return;
}

try {
    const response = await fetch('/signup', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, email, password }),
    });

    if (response.ok) {
    alert('Inscription réussie!');
    setUsername('');
    setEmail('');
    setPassword('');
    } else {
    const errorData = await response.json();
    alert('Erreur lors de l\'inscription : ' + errorData.error);
    }
} catch (error) {
    alert('Erreur lors de l\'inscription : ' + error.message);
}
};

return (
<form id="signup-form" onSubmit={handleSubmit}>
    <input type="text" id="signup-username" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Nom d'utilisateur" />
    <input type="email" id="signup-email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
    <input type="password" id="signup-password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Mot de passe" />
    <button type="submit">S'inscrire</button>
</form>
);
};

export default SignupForm;

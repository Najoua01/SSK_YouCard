import React, { useState } from 'react';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password, rememberMe }),
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
            <label htmlFor="login-email">Adresse email</label>
            <input type="text" id="login-email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Adresse mail" />
            <br/>
            <label htmlFor="login-password">Mot de passe</label>
            <input type="password" id="login-password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Mot de passe" />
            <div>
                <input type="checkbox" id="remember-me" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />
                <label htmlFor="remember-me">Se souvenir de moi</label>
            </div>
            <button type="submit">Connexion</button>
        </form>
    );
};

export default LoginForm;

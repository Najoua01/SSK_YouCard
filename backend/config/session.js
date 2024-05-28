const session = require('express-session');

const sessionConfig = {
    secret: 'secret',  // Clé secrète pour signer le cookie de session
    resave: false,     // Ne pas sauvegarder la session si elle n'a pas été modifiée
    saveUninitialized: false,  // Ne pas créer de session pour les requêtes non initialisées
    cookie: {
        secure: process.env.NODE_ENV === 'production',  // Utiliser des cookies sécurisés en production
        httpOnly: true,  // Empêche l'accès au cookie par les scripts côté client
        maxAge: 1000 * 60 * 60 * 24 // Durée de vie du cookie en millisecondes (ici, par exemple, 1 jour)
    }
};

module.exports = session(sessionConfig);

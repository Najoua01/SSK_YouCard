// Vérifie si l'utilisateur est authentifié
exports.isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.status(401).json({ message: 'Non autorisé. Veuillez vous connecter.' });
};

// Éventuellement, vous pouvez avoir besoin d'un middleware pour rediriger ou gérer les utilisateurs non authentifiés
exports.isNotAuthenticated = (req, res, next) => {
    if (!req.isAuthenticated()) {
        return next();
    }
    // Redirige l'utilisateur s'il est déjà authentifié
    res.redirect('/dashboard');  // Modifiez selon la logique appropriée de votre application
};

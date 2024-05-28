exports.getUserData = (req, res) => {
    if (!req.isAuthenticated()) {
        return res.status(401).json({ error: 'Non authentifié' });
    }
    const userData = {
        nom: req.user.nom ? req.user.nom : "Non spécifié",
        prenom: req.user.prenom ? req.user.prenom : "Non spécifié",
        email: req.user.email,
        pays: req.user.pays ? req.user.pays : "Non spécifié",
        ville: req.user.ville ? req.user.ville : "Non spécifié",
        codePostal: req.user.codePostal ? req.user.codePostal : "Non spécifié"
    };
    res.json(userData);
};

exports.checkAuth = (req, res) => {
    if (req.isAuthenticated()) {
        res.json({ authenticated: true });
    } else {
        res.json({ authenticated: false });
    }
};

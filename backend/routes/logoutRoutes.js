app.get('/logout', (req, res) => {
    req.logout(function(err) {
        if (err) {
            return res.status(500).json({ error: 'Erreur interne du serveur' });
        }
        req.session.destroy((err) => {
            if (err) {
                return res.status(500).json({ error: 'Erreur lors de la destruction de la session' });
            }
            res.clearCookie('connect.sid'); // Nom du cookie de session par défaut
            res.status(200).json({ message: 'Déconnexion réussie' });
        });
    });
});

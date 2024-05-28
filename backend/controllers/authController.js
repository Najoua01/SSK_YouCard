const bcrypt = require('bcrypt');
const connection = require('../config/database');
const passport = require('../config/passport');
const password = '';
const saltrounds = 10;

exports.signupMembre = async (req, res) => {
    const { nom, prenom, email, pays, ville, codePostal, password, dateNaiss } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, saltrounds);
        const query = 'INSERT INTO users (nom, prenom, email, pays, ville, codePostal, password, Roles_Id) VALUES (?, ?, ?, ?, ?, ?, ?, (SELECT Id_Roles FROM roles WHERE role_name = ?))';
        const values = [nom, prenom, email, pays, ville, codePostal, hashedPassword, 'membre'];
        connection.query(query, values, (err, result) => {
            if (err) {
                console.error('Erreur lors de l\'insertion dans la base de données :', err);
                return res.status(500).json({ error: 'Erreur interne du serveur' });
            }
            res.status(200).json({ message: 'Inscription membre réussie!' });
        });
    } catch (error) {
        console.error('Erreur lors du hachage du mot de passe :', error);
        res.status(500).json({ error: 'Erreur interne du serveur' });
    }
};

exports.signupPartenaire = async (req, res) => {
    const { nom, prenom, email, pays, ville, codePostal, password, siteUrl, tva, telephone, contactNom, contactPrenom, contactEmail, contactTelephone } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, saltrounds);
        const query = 'INSERT INTO users (nom, prenom, email, pays, ville, codePostal, password, Roles_Id) VALUES (?, ?, ?, ?, ?, ?, ?, (SELECT Id_Roles FROM roles WHERE role_name = ?))';
        const values = [nom, prenom, email, pays, ville, codePostal, hashedPassword, 'partenaire'];
        connection.query(query, values, (err, result) => {
            if (err) {
                console.error('Erreur lors de l\'insertion dans la base de données :', err);
                return res.status(500).json({ error: 'Erreur interne du serveur' });
            }
            res.status(200).json({ message: 'Inscription partenaire réussie!' });
        });
    } catch (error) {
        console.error('Erreur lors du hachage du mot de passe :', error);
        res.status(500).json({ error: 'Erreur interne du serveur' });
    }
};

exports.login = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return res.status(500).json({ error: 'Erreur du serveur lors de la tentative de connexion' });
        }
        if (!user) {
            return res.status(401).json({ error: info ? info.message : 'Erreur d\'authentification' });
        }
        req.logIn(user, function(err) {
            if (err) {
                return res.status(500).json({ error: 'Erreur du serveur lors de la création de la session utilisateur' });
            }
            return res.status(200).json({ message: 'Connexion réussie' });
        });
    })(req, res, next);
};

exports.logout = (req, res) => {
    req.logout(function(err) {
        if (err) {
            return res.status(500).json({ error: 'Erreur interne du serveur' });
        }
        req.session.destroy((err) => {
            if (err) {
                return res.status(500).json({ error: 'Erreur lors de la destruction de la session' });
            }
            res.clearCookie('connect.sid');
            res.redirect('/');
        });
    });
};

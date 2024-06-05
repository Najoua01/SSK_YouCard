const bcrypt = require('bcrypt');
const connection = require('../config/database');
const passport = require('../config/passport');
const password = '';
const saltrounds = 10;

exports.signupMembre = async (req, res) => {
    const { nom, prenom, email, pays, ville, codePostal, password, dateNaiss } = req.body;
    try {
        const emailCheckQuery = 'SELECT email FROM users WHERE email = ?';
        const emailResult = await connection.promise().query(emailCheckQuery, [email]);
        if (emailResult[0].length > 0) {
            return res.status(409).json({ error: 'Email déjà utilisé' });
        }
        const hashedPassword = await bcrypt.hash(password, saltrounds);
        const usersInsertQuery = 'INSERT INTO users (nom, prenom, email, pays, ville, codePostal, password, Roles_Id) VALUES (?, ?, ?, ?, ?, ?, ?, (SELECT Id_Roles FROM roles WHERE role_name = ?))';
        const usersValues = [nom, prenom, email, pays, ville, codePostal, hashedPassword, 'membre'];
        connection.query(usersInsertQuery, usersValues, async (err, result) => {
            if (err) {
                console.error('Erreur lors de l\'insertion dans la base de données :', err);
                return res.status(500).json({ error: 'Erreur interne du serveur' });
            }
            const users_Id = result.insertId;
            const membresInsertQuery = 'INSERT INTO membres (dateNaiss, Users_Id) VALUES (?,?)';
            const membresValues = [dateNaiss, users_Id];
            await connection.query(membresInsertQuery, membresValues, (err, membresResult) => {
                if (err) {
                    console.log('Erreur lors de l\'insertion dans la table membres :', err);
                    return res.status(500).json({ error: 'Erreur lors de l\'enregistrement des détails du membre' });
                }
                res.status(200).json({message: 'Inscription membre réussie!', users_Id: users_Id});
            });
        });
    } catch (error) {
        console.error('Erreur lors du hachage du mot de passe :', error);
        res.status(500).json({ error: 'Erreur interne du serveur' });
    }
};

exports.signupPartenaire = async (req, res) => {
    const { nom, prenom, email, pays, ville, codePostal, password, siteUrl, tva, telephone, contactNom, contactPrenom, contactEmail, contactTelephone } = req.body;
    try {
        const emailCheckQuery = 'SELECT email FROM users WHERE email = ?';
        const emailResult = await connection.promise().query(emailCheckQuery, [email]);
        if (emailResult[0].length > 0) {
            return res.status(409).json({ error: 'Email déjà utilisé' });
        }
        const hashedPassword = await bcrypt.hash(password, saltrounds);
        const usersInsertQuery = 'INSERT INTO users (nom, prenom, email, pays, ville, codePostal, password, Roles_Id) VALUES (?, ?, ?, ?, ?, ?, ?, (SELECT Id_Roles FROM roles WHERE role_name = ?))';
        const usersValues = [nom, prenom, email, pays, ville, codePostal, hashedPassword, 'partenaire'];
        connection.query(usersInsertQuery, usersValues, (err, result) => {
            if (err) {
                console.error('Erreur lors de l\'insertion dans la base de données :', err);
                return res.status(500).json({ error: 'Erreur interne du serveur' });
            }
            const users_Id = result.insertId;
            const partenairesInsertQuery = `
                INSERT INTO partenaires (siteUrl, tva, telephone, contactNom, contactPrenom, contactEmail, contactTelephone, Users_Id)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            `;
            const partenairesValues = [siteUrl, tva, telephone, contactNom, contactPrenom, contactEmail, contactTelephone, users_Id];
            
            connection.query(partenairesInsertQuery, partenairesValues, (err, partenairesResult) => {
                if (err) {
                    console.error('Erreur lors de l\'insertion dans la table partenaires :', err);
                    return res.status(500).json({ error: 'Erreur lors de l\'enregistrement des détails du partenaire' });
                }
                res.status(200).json({message: 'Inscription partenaire réussie!', users_Id: users_Id});
            });
            res.status(200).json({ message: 'Inscription partenaire réussie!', users_Id: users_Id });
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

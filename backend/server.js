const express = require('express');
const path = require('path');  // facilite le chemin des fichiers
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const cors = require('cors');
// const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 8000;
const password = '';
const saltrounds = 10;

// cors c'est pour réunir le back et le front
app.use(cors({                    
    origin: 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH']
}));

app.use(express.static(path.join(__dirname, '..', 'frontend', 'public')));
app.use(express.static(path.join(__dirname, '..', 'frontend', 'src')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: 'secret',  // Clé secrète pour signer le cookie de session
    resave: false,     // Ne pas sauvegarder la session si elle n'a pas été modifiée
    saveUninitialized: false,  // Ne pas créer de session pour les requêtes non initialisées
    cookie: {
        secure: process.env.NODE_ENV === 'production',  // Utiliser des cookies sécurisés en production
        httpOnly: true,  // Empêche l'accès au cookie par les scripts côté client
        maxAge: 1000 * 60 * 60 * 24 // Durée de vie du cookie en millisecondes (ici, par exemple, 1 jour)
    }
}));

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

// Créez une connexion à votre base de données MySQL
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'youcardbd'
});

// Connectez-vous à la base de données
connection.connect((err) => {
    if (err) {
        console.error('Erreur de connexion à la base de données :', err);
        return;
    }
    console.log('Connecté à la base de données MySQL'); // test
});

// Utilisez la connexion pour exécuter des requêtes SQL
connection.query('SELECT * FROM users', (err, rows) => {
    if (err) {
        console.error('Erreur lors de l\'exécution de la requête :', err);
        return;
    }
    // console.log('Résultat de la requête :', rows); test
});

bcrypt.hash('', saltrounds, (err, hash) => {
    if(err){
        console.log('Erreur lors du hachage du mot de passe:', err);
        return;
    }
    // console.log('Mot de passe haché:', hash); test
});

// Configure Passport.js with LocalStrategy pour comparer email et password == bd de la connexion
// attention: par défaut passeport utilise username et password pour se connecter. ici je veux email et non username
passport.use(new LocalStrategy(
    {usernameField: 'email'}, // indique que email sera l'inditifiant
    (email, password, done) => {
        console.log('Tentative de connexion avec:', email);  // test
        connection.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
            if (err) {
                console.error('Erreur de requête SQL:', err); // test
                return done(err);
            }
            if (results.length === 0) {
                console.log('Aucun utilisateur trouvé avec cet email.');  // test
                return done(null, false, { message: 'Adresse mail incorrect.' });
            }

            const user = results[0];
            bcrypt.compare(password, user.password, (err, isValid) => {
                if (err) {
                    console.error('Erreur de comparaison du mot de passe:', err);  // test
                    return done(err);
                }
                if (!isValid) {
                    console.log('Mot de passe incorrect pour l\'utilisateur:', email);  // test
                    return done(null, false, { message: 'Mot de passe incorrect.' });
                }
                console.log('Authentification réussie pour l\'utilisateur:', email); // test
                return done(null, user);
            });
        });
    }
));

// serializeUser détermine quelles données de l'utilisateur sont stockées en session de connexion
passport.serializeUser((user, done) => {
    done(null, user.Id_Users);
});

// deserializeUser est utilisé pour récupérer l'utilisateur complet à partir de l'ID stocké en session.
passport.deserializeUser((Id_Users, done) => {
    connection.query('SELECT * FROM users WHERE Id_Users = ?', [Id_Users], (err, rows) => {
        if (err) {
            return done(err);
        }
        const user = rows[0]; // retourne la première ligne dont l'id correspond
        done(null, user);
    });
});

// let transporter = nodemailer.createTransport({
//     service: 'gmail', 
//     auth: {
//         user: 'your-email@gmail.com',
//         pass: 'your-password'
//     }
// });

    // ceci est a rajouter dans app.post('/signup') si besoin de nodemailer
    // let mailOptions = {
    //     from: 'your-email@gmail.com',
    //     to: email,
    //     subject: 'Confirmation d\'inscription',
    //     text: `Bonjour ${username},\n\nMerci de vous être inscrit sur notre site. Veuillez confirmer votre adresse email en cliquant sur le lien suivant: [Insérer un lien de confirmation]`
    // };

    // // Envoyer l'email
    // transporter.sendMail(mailOptions, (error, info) => {
    //     if (error) {
    //         console.log('Erreur lors de l\'envoi de l\'email:', error);
    //         res.status(500).send('Erreur lors de l\'envoi de l\'email');
    //     } else {
    //         console.log('Email envoyé: ' + info.response);
    //         res.status(200).send('Inscription réussie et email envoyé');
    //     }
    // });

app.post('/signup-membre', async (req, res) => {
    const { nom, prenom, email, pays, ville, codePostal, password, dateNaiss } = req.body;
    console.log(req.body); // Log request body

    connection.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
        if (err) {
            console.error('Erreur lors de la recherche de l\'email dans la base de données :', err);
            return res.status(500).json({ error: 'Erreur interne du serveur' });
        }
        if (results.length > 0) {
            return res.status(400).json({ error: 'Vous êtes déjà inscrit.' });
        } else {
            try {
                const hashedPassword = await bcrypt.hash(password, saltrounds);
                connection.query(
                    'INSERT INTO users (nom, prenom, email, pays, ville, codePostal, password, Roles_Id) VALUES (?, ?, ?, ?, ?, ?, ?, (SELECT Id_Roles FROM roles WHERE role_name = ?))',
                    [nom, prenom, email, pays, ville, codePostal, hashedPassword, 'membre'],
                    (err, result) => {
                        if (err) {
                            console.error('Erreur lors de l\'insertion dans la base de données :', err);
                            return res.status(500).json({ error: 'Erreur interne du serveur' });
                        }
                        
                        const userId = result.insertId;

                        connection.query(
                            'INSERT INTO membres (users_id, dateNaiss) VALUES (?, ?)',
                            [userId, dateNaiss],
                            (err) => {
                                if (err) {
                                    console.error('Erreur lors de l\'insertion dans la table membres :', err);
                                    return res.status(500).json({ error: 'Erreur interne du serveur' });
                                }
                                res.status(200).json({ message: 'Inscription membre réussie!' });
                            }
                        );
                    }
                );
            } catch (error) {
                console.error('Erreur lors du hachage du mot de passe :', error);
                res.status(500).json({ error: 'Erreur interne du serveur' });
            }
        }
    });
});

app.post('/signup-partenaire', async (req, res) => {
    const { nom, prenom, email, pays, ville, codePostal, password, siteUrl, tva, telephone, contactNom, contactPrenom, contactEmail, contactTelephone } = req.body;
    console.log(req.body); // Log request body

    connection.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
        if (err) {
            console.error('Erreur lors de la recherche de l\'email dans la base de données :', err);
            return res.status(500).json({ error: 'Erreur interne du serveur' });
        }
        if (results.length > 0) {
            return res.status(400).json({ error: 'Vous êtes déjà inscrit.' });
        } else {
            try {
                const hashedPassword = await bcrypt.hash(password, saltrounds);
                connection.query(
                    'INSERT INTO users (nom, prenom, email, pays, ville, codePostal, password, Roles_Id) VALUES (?, ?, ?, ?, ?, ?, ?, (SELECT Id_Roles FROM roles WHERE role_name = ?))',
                    [nom, prenom, email, pays, ville, codePostal, hashedPassword, 'partenaire'],
                    (err, result) => {
                        if (err) {
                            console.error('Erreur lors de l\'insertion dans la base de données :', err);
                            return res.status(500).json({ error: 'Erreur interne du serveur' });
                        }
                        
                        const userId = result.insertId;

                        connection.query(
                            'INSERT INTO partenaires (users_id, siteUrl, tva, telephone, contactNom, contactPrenom, contactEmail, contactTelephone) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
                            [userId, siteUrl, tva, telephone, contactNom, contactPrenom, contactEmail, contactTelephone],
                            (err) => {
                                if (err) {
                                    console.error('Erreur lors de l\'insertion dans la table partenaires :', err);
                                    return res.status(500).json({ error: 'Erreur interne du serveur' });
                                }
                                res.status(200).json({ message: 'Inscription partenaire réussie!' });
                            }
                        );
                    }
                );
            } catch (error) {
                console.error('Erreur lors du hachage du mot de passe :', error);
                res.status(500).json({ error: 'Erreur interne du serveur' });
            }
        }
    });
});

app.post('/login', function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
        if (err) {
            console.error('Erreur Passport:', err);  // test
            return res.status(500).json({ error: 'Erreur du serveur lors de la tentative de connexion' });
        }
        if (!user) {
            console.log('Échec de l\'authentification:', info ? info.message : 'Aucun message');
            return res.status(401).json({ error: info ? info.message : 'Erreur d\'authentification' });
        }
        req.logIn(user, function(err) {
            if (err) {
                console.error('Erreur lors de la création de la session:', err);
                return res.status(500).json({ error: 'Erreur du serveur lors de la création de la session utilisateur' });
            }
            if (req.body.rememberMe) {
                req.session.cookie.maxAge = 30 * 24 * 60 * 60 * 1000; // 30 jours
            } else {
                req.session.cookie.expires = false; // Session expire lorsque le navigateur est fermé
            }
            console.log('Connexion réussie pour l\'utilisateur:', user);
            return res.status(200).json({ message: 'Connexion réussie' });
        });
    })(req, res, next);
});

app.get('/userData', (req, res) => {
    if (req.isAuthenticated()) {
        const userData = {
            nom: req.user.nom ? req.user.nom : "Non spécifié",
            prenom: req.user.prenom ? req.user.prenom : "Non spécifié",
            email: req.user.email,
            pays: req.user.pays ? req.user.pays : "Non spécifié",
            ville: req.user.ville ? req.user.ville : "Non spécifié",
            codePostal: req.user.codePostal ? req.user.codePostal : "Non spécifié"
        };
        res.json(userData);
    } else {
        res.status(401).json({ error: 'Accès non autorisé. Veuillez vous connecter.' });
    }
});

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
            res.redirect('/');
        });
    });
});

app.get('/check-auth', (req, res) => {
    if (req.isAuthenticated()) {
        res.json({ authenticated: true });
    } else {
        res.json({ authenticated: false });
    }
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'frontend', 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});

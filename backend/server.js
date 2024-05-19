
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

app.use(express.static(path.join(__dirname, '..', 'frontend', 'public')));
app.use(express.static(path.join(__dirname, '..', 'frontend', 'src')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({ 
    secret: 'secret', 
    resave: false, 
    saveUninitialized: false 
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

// Créez une connexion à votre base de données MySQL
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'youCardBD'
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

bcrypt.hash(password, saltrounds, (err, hash) => {
    if(err){
        console.log('Erreur lors du hachage du mot de passe:', err);
        return;
    }
    // console.log('Mot de passe haché:', hash); test
});

// Configure Passport.js with LocalStrategy pour comparer email et password == bd de la connexion
passport.use(new LocalStrategy(
    {usernameField: 'email'}, // indique que email sera l'inditifiant
    (email, password, done) => {
        connection.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
            if (err) {
                return done(err);
            }
            if (results.length === 0) {
                return done(null, false, { message: 'Adresse mail incorrect.' });
            }

            const user = results[0];
            bcrypt.compare(password, user.password, (err, isValid) => {
                if (err) {
                    return done(err);
                }
                if (!isValid) {
                    return done(null, false, { message: 'Mot de passe incorrect.' });
                }
                return done(null, user);
            });
        });
    }
));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    connection.query('SELECT * FROM users WHERE id = ?', [id], (err, rows) => {
        if (err) {
            return done(err);
        }
        const user = rows[0]; // Supposons que vous avez un seul utilisateur avec cet ID
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

app.post('/signup', async (req, res) => {
    const { nom, prenom, dateNaiss, email, pays, codePostal, password } = req.body;

    // Vérifier si l'email est déjà présent dans la base de données
    connection.query(
        'SELECT * FROM users WHERE email = ?',
        [email],
        async (err, results) => {
            if (err) {
                console.error('Erreur lors de la recherche de l\'email dans la base de données :', err);
                return res.status(500).json({ error: 'Erreur interne du serveur' });
            }
            if (results.length > 0) {
                // L'email est déjà présent dans la base de données
                return res.status(400).json({ error: 'Vous êtes déjà inscrit.' });
            } else {
                // L'email n'est pas déjà présent dans la base de données, procéder à l'inscription
                try {
                    const hashedPassword = await bcrypt.hash(password, saltrounds);

                    connection.query(
                        'INSERT INTO users (nom, prenom, dateNaiss, email, pays, codePostal, password) VALUES (?, ?, ?, ?, ?, ?, ?)',
                        [nom, prenom, dateNaiss, email, pays, codePostal, hashedPassword],
                        async (err) => {
                            if (err) {
                                console.error('Erreur lors de l\'insertion dans la base de données :', err);
                                return res.status(500).json({ error: 'Erreur interne du serveur' });
                            }
                            res.status(200).json({ message: 'Inscription réussie!' });
                        }
                    );
                } catch (error) {
                    console.error('Erreur lors du hachage du mot de passe :', error);
                    res.status(500).json({ error: 'Erreur interne du serveur' });
                }
            }
        }
    );
});

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

app.post('/login', passport.authenticate('local', {
    successRedirect: '/profil',
    failureRedirect: '/login',
    failureFlash: true
}));

app.get('/userData', (req, res) => {
    if (req.isAuthenticated()) {
        const userData = {
            nom: req.user.nom ? req.user.nom : "Non spécifié",
            prenom: req.user.prenom ? req.user.prenom : "Non spécifié",
            dateNaiss: req.user.dateNaiss ? req.user.dateNaiss : "Non spécifiée",
            email: req.user.email,
            pays: req.user.pays ? req.user.pays : "Non spécifié",
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
        res.redirect('/');
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
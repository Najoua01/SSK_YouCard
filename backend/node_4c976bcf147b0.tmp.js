
const express = require('express');
const path = require('path');  // facilite le chemin des fichiers
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const cors = require('cors');

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
    origin: 'http://localhost:8000',
    credentials: true
}));

// Créez une connexion à votre base de données MySQL
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'auth'
});

// Connectez-vous à la base de données
connection.connect((err) => {
    if (err) {
        console.error('Erreur de connexion à la base de données :', err);
        return;
    }
    console.log('Connecté à la base de données MySQL');
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

// Configure Passport.js with LocalStrategy pour comparer username et password == bd
passport.use(new LocalStrategy(
    (username, password, done) => {
        connection.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
            if (err) {
                return done(err);
            }
            if (results.length === 0) {
                return done(null, false, { message: 'Nom d\'utilisateur incorrect.' });
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

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'frontend', 'public', 'index.html'));
});

app.get('/devenir-membre', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'frontend', 'src', 'form.html'));
});

app.post('/signup', async (req, res) => {
    console.log('Corps de la requête:', req.body); //test
    const { username, email, password } = req.body;

    // Vérifier si tous les champs requis sont fournis
    if (!username || !email || !password) {
        return res.status(400).json({ error: 'Tous les champs sont obligatoires' });
    }
    try{
        // Hacher le mot de passe
        const hashedPassword = await bcrypt.hash(password, saltrounds);

        // Insérer l'utilisateur dans la base de données
        connection.query(
            'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
            [username, email, hashedPassword],
            async (err) => {
                if (err) {
                    console.error('Erreur lors de l\'insertion dans la base de données :', err);
                    return res.status(500).json({ error: 'Erreur interne du serveur' });
                }
                res.status(200).json({ message: 'Inscription réussie et email envoyé!' });
        });
    } catch (error) {
        console.error('Erreur lors du hachage du mot de passe :', error);
        res.status(500).json({ error: 'Erreur interne du serveur' });
    }
});

app.post('/login', passport.authenticate('local', {
    successRedirect: '/profil',
    failureRedirect: '/login',
    failureFlash: true
}));

app.get('/profil', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'frontend', 'src', 'profil.html'));
});

app.get('/userData', (req, res) => {
    console.log(req.session); // Debug session
    console.log(req.user); // Debug user
    if (req.isAuthenticated()) {
        const userData = {
            nom: req.user.nom ? req.user.nom : "Non spécifié",
            prenom: req.user.prenom ? req.user.prenom : "Non spécifié",
            email: req.user.email,
            ville: req.user.ville ? req.user.ville : "Non spécifiée"
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

app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});
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

bcrypt.hash(password, saltrounds, (err, hash) => {
    if(err){
        console.log('Erreur lors du hachage du mot de passe:', err);
        return;
    }
    console.log('Mot de passe haché:', hash);
});

app.use(express.static(path.join(__dirname, '..', 'frontend')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({ 
    secret: 'secret', 
    resave: false, 
    saveUninitialized: false 
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(cors());

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
    console.log('Résultat de la requête :', rows);
});

// Configure Passport.js with LocalStrategy
passport.use(new LocalStrategy(
    (username, password, done) => {
        connection.query('SELECT * FROM users WHERE username = ? AND password = ?', [username,email, password], (err, results) => {
            if (err) {
                return done(err);
            }
            if (results.length === 0) {
                return done(null, false, { message: 'Nom d\'utilisateur ou mot de passe incorrect.' });
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
    res.sendFile(path.join(__dirname, '..', 'frontend', 'index.html'));
});


app.get('/devenir-membre', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'frontend', 'form.html'));
});

app.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;

    // Vérifier si tous les champs requis sont fournis
    if (!username && !email || !password) {
        return res.status(400).json({ error: 'Tous les champs sont obligatoires' });
    }

    // Hacher le mot de passe
    const hashedPassword = await bcrypt.hash(password, saltrounds);

    // Insérer l'utilisateur dans la base de données
    connection.query(
        'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
        [username, email, hashedPassword],
        (err, result) => {
            if (err) {
                console.error('Erreur lors de l\'insertion dans la base de données :', err);
                return res.status(500).json({ error: 'Erreur interne du serveur' });
            }
            return res.status(201).json({ message: 'Inscription réussie!' });
        }
    );
});

app.post('/login', passport.authenticate('local', {
    successRedirect: '/profil',
    failureRedirect: '/login',
    failureFlash: true
}));

app.get('/profil', (req, res) => {
    if (req.isAuthenticated()) {
        res.sendFile(path.join(__dirname, 'frontend', 'profil.html'));
    } else {
        res.send('Accès non autorisé. Veuillez vous connecter.');
    }
});

app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});
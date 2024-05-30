const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 8000;
const passport = require('./config/passport');
const session = require('./config/session');
const authController = require('./controllers/authController');
const userController = require('./controllers/userController');
const authMiddleware = require('./middleware/authMiddleware');
const publicPath = path.join(__dirname, '..', 'frontend', 'public');

app.use(session); // Configuration de session
app.use(passport.initialize());
app.use(passport.session());
app.use(cors({                    
    origin: 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(publicPath));
app.use(articleRoutes);
// app.use(express.static(path.join(__dirname, '..', 'frontend', 'public')));
// app.use(express.static(path.join(__dirname, '..', 'frontend', 'src')));

app.get('/private', authMiddleware.isAuthenticated, (req, res) => {
    res.send('Zone sécurisée');
});

app.get('/login', authMiddleware.isNotAuthenticated, (req, res) => {
    res.send('Page de connexion');
});

app.post('/signup-membre', authController.signupMembre);
app.post('/signup-partenaire', authController.signupPartenaire);
app.post('/login', authController.login);
app.get('/logout', authController.logout);
app.get('/userData', userController.getUserData);
app.get('/check-auth', userController.checkAuth);

// Renvoie toujours index.html pour toute autre requête non traitée explicitement
app.get('*', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
    // res.sendFile(path.join(__dirname, '..', 'frontend', 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});
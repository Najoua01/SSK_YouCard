const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const connection = require('./database');

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

module.exports = passport;
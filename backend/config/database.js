const mysql = require('mysql2');

// Configuration de la connexion à la base de données
const connection = mysql.createConnection({
host: 'localhost',
user: 'root',
password: '',
database: 'youcardbd'
});

// Connexion à la base de données
connection.connect(err => {
if (err) {
    console.error('Erreur de connexion à la base de données :', err);
    process.exit(1); // Arrête l'exécution de l'application en cas d'échec de connexion
}
console.log('Connecté à la base de données youcardbd');
});

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'react_node_mysql'
});

db.connect(err => {
    if (err) {
        console.error('Erreur de connexion à la base de données react_node_mysql:', err);
        process.exit(1);
    }
    console.log('Connecté à la base de données react_node_mysql');
});

module.exports = connection;

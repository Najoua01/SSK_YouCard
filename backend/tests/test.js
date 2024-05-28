const connection = require('../config/database');

// Tests de la base de données
function testDatabase() {
    console.log("Début des tests de la base de données...");
    // Exécution d'une requête simple
    connection.query('SELECT * FROM users', (err, results) => {
        if (err) {
            console.error('Test échoué:', err);
            return;  // Assurez-vous de gérer l'arrêt des tests en cas d'erreur
        }
        console.log('Test réussi: Nombre d\'utilisateurs trouvés', results.length);
    });
}

// Tests de l'API (exemple)
function testAPI() {
    // Simuler un appel API ou utiliser un client HTTP pour tester l'API
    console.log("Test de l'API non implémenté");
    // Simulez ici une requête à votre API si nécessaire
}

// Exécuter tous les tests de manière asynchrone
async function runAllTests() {
    console.log('Début des tests...');
    await testDatabase();  // S'assurer que les tests sont exécutés de manière asynchrone si nécessaire
    testAPI();  // Cette fonction peut être asynchrone si vous ajoutez des requêtes réelles
}

runAllTests();

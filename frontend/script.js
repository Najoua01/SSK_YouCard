$(document).ready(function() {
    $('#signup-form').submit(function(event) {
        event.preventDefault(); // Empêche le formulaire de se soumettre normalement
        
        // Récupérer les valeurs entrées par l'utilisateur
        var username = $('#username').val();
        var email = $('#email').val();
        var password = $('#password').val();
        
        // Envoyer les données via AJAX
        $.ajax({
            type: 'POST',
            url: '/signup', // L'URL de votre route pour l'inscription
            data: { username: username, email: email, password: password },
            success: function(response) {
                // Gérer la réponse du serveur ici
                alert('Inscription réussie!');
            },
            error: function(err) {
                // Gérer les erreurs ici
                alert('Erreur lors de l\'inscription : ' + err.responseJSON.error);
            }
        });
    });
});

$(document).ready(function() {
    $('#login-form').submit(function(event) {
        event.preventDefault(); // Empêche le formulaire de se soumettre normalement
        
        // Récupérer les valeurs entrées par l'utilisateur
        var username = $('#username').val();
        var password = $('#password').val();
        
        // Vous pouvez maintenant envoyer ces valeurs à votre serveur pour traitement
        // Par exemple, via une requête AJAX
        $.ajax({
            type: 'POST',
            url: '/login', // L'URL de votre route pour la connexion
            data: { username: username, password: password },
            success: function(response) {
                // Gérer la réponse du serveur ici (par exemple, afficher un message)
            },
            error: function(err) {
                // Gérer les erreurs ici (par exemple, afficher un message d'erreur)
            }
        });
    });
});

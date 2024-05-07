$(document).ready(function() {
    $('#signup-form').submit(function(event) {
        event.preventDefault(); // Empêche le formulaire de se soumettre normalement
        
        // Récupérer les valeurs entrées par l'utilisateur
        var username = $('#signup-username').val();
        var email = $('#signup-email').val();
        var password = $('#signup-password').val();

        // console.log({username, email, password}); // test

        // Envoyer les données via AJAX
        $.ajax({
            type: 'POST',
            url: '/signup', // L'URL de votre route pour l'inscription
            data: { username, email, password },
            success: function(response) {
                alert('Inscription réussie!');
            },
            error: function(err) {
                console.log('Erreur AJAX:', err);
                alert('Erreur lors de l\'inscription : ' + err.responseJSON.error);
            }
        });
    });
});

$(document).ready(function() {
    $('#login-form').submit(function(event) {
        event.preventDefault(); // Empêche le formulaire de se soumettre normalement
        
        // Récupérer les valeurs entrées par l'utilisateur
        var username = $('#login-username').val();
        var password = $('#login-password').val();
        
        
        console.log({username, password}); // test

        // Vous pouvez maintenant envoyer ces valeurs à votre serveur pour traitement
        // Par exemple, via une requête AJAX
        $.ajax({
            type: 'POST',
            url: '/login', // L'URL de votre route pour la connexion
            data: { username, password },
            success: function(response) {
                alert('Connxion réussie!');    
            },
            error: function(err) {
                alert('Erreur lors de la connexion:', (err.responseJSON?.error || 'Erreur inconnue'));
            }
        });
    });
});

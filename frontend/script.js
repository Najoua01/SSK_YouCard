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
                window.location.href = '/profil';    
            },
            error: function(err) {
                alert('Erreur lors de la connexion:', (err.responseJSON?.error || 'Erreur inconnue'));
            }
        });
    });
});

$(document).ready(function() {
    // Fonction pour récupérer les données de l'utilisateur
    function getUserData() {
        $.ajax({
            type: 'GET',
            url: '/userdata', // Endpoint à créer sur le serveur
            success: function(response) {
                // Mettre à jour les éléments HTML avec les données reçues
                $('.profile p:nth-child(1)').text('Nom: ' + response.nom);
                $('.profile p:nth-child(2)').text('Prénom: ' + response.prenom);
                $('.profile p:nth-child(3)').text('Email: ' + response.email);
                $('.profile p:nth-child(4)').text('Ville: ' + response.ville);
            },
            error: function(err) {
                console.log('Erreur lors de la récupération des données de l\'utilisateur:', err);
            }
        });
    }
    getUserData();
});

$(document).ready(function() {
    $('#logout-btn').click(function() {
        $.ajax({
            type: 'GET',
            url: '/logout', // L'URL de votre route de déconnexion
            success: function(response) {
                window.location.href = '/';
            },
            error: function(err) {
                console.error('Erreur lors de la déconnexion:', err);
            }
        });
    });
});


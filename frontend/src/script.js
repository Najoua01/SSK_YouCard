$(document).ready(function() {
    $('#signup-form').submit(function(event) {
        event.preventDefault(); // Empêche le formulaire de se soumettre normalement
        
        // Récupérer les valeurs entrées par l'utilisateur
        let username = $('#signup-username').val();
        let email = $('#signup-email').val();
        let password = $('#signup-password').val();

        if (!username || !email || !password) {
            alert('Tous les champs sont obligatoires. script.js');
            return;
        }
        // console.log({username, email, password}); // test
        // Envoyer les données via AJAX
        $.ajax({
            type: 'POST',
            url: '/signup',
            data: { username: username, email: email, password: password },
            success: function(response) {
                alert('Inscription réussie!');
                $('#signup-username').val('');
                $('#signup-email').val('');
                $('#signup-password').val('');
            },
            error: function(err) {
                alert('Erreur lors de l\'inscription : ' + err.responseJSON.error);
            }
        });
    });

    $('#login-form').submit(function(event) {
        event.preventDefault();
        
        let username = $('#login-username').val();
        let password = $('#login-password').val();
        
        // console.log({username, password}); // test

        $.ajax({
            type: 'POST',
            url: '/login',
            data: { username, password },
            success: function(response) {
                window.location.href = '/profil';
            },
            error: function(err) {
                alert('Erreur lors de la connexion:', (err.responseJSON?.error || 'Erreur inconnue'));
            }
        });
    });

    function getUserData() {
        $.ajax({
            type: 'GET',
            url: '/userdata',
            xhrFields: {
                withCredentials: true
            },
            success: function(response) {
                // Mettre à jour les éléments HTML avec les données reçues
                $('.profile p:nth-child(1)').text('Nom: ' + response.nom);
                $('.profile p:nth-child(2)').text('Email: ' + response.email);
                $('.profile p:nth-child(3)').text('Pays: ' + response.pays);
                $('.profile p:nth-child(4)').text('Âge: ' + response.age);
            },
            error: function(err) {
                console.log('Erreur lors de la récupération des données de l\'utilisateur:', err);
            }
        });
    }

    getUserData();

    $('#logout-btn').click(function() {
        $.ajax({
            type: 'GET',
            url: '/logout',
            success: function(response) {
                window.location.href = '/';
            },
            error: function(err) {
                console.error('Erreur lors de la déconnexion:', err);
            }
        });
    });

    $(document).ready(function() {
        $.ajax({
            type: 'GET',
            url: '/check-auth',
            xhrFields: { withCredentials: true },
            success: function(response) {
                if (response.authenticated) {
                    $('#logout-btn').show();
                    $('#login-btn').hide();
                    // Chargement des données utilisateur, si nécessaire
                } else {
                    $('#logout-btn').hide();
                    $('#login-btn').show();
                }
            }
        });
    });

});
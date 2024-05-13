document.addEventListener('DOMContentLoaded', function() {
    const signupForm = document.getElementById('signup-form');
    signupForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        let username = document.getElementById('signup-username').value;
        let email = document.getElementById('signup-email').value;
        let password = document.getElementById('signup-password').value;

        fetch('/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, email, password })
        })
        .then(response => response.json())
        .then(data => {
            alert('Inscription réussie!');
        })
        .catch(err => {
            console.log('Erreur AJAX:', err);
            alert('Erreur lors de l\'inscription : ' + err.message);
        });
    });

    const loginForm = document.getElementById('login-form');
    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();

        let username = document.getElementById('login-username').value;
        let password = document.getElementById('login-password').value;

        fetch('/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        })
        .then(response => response.json())
        .then(data => {
            window.location.href = '/profil';    
        })
        .catch(err => {
            alert('Erreur lors de la connexion:', (err.message || 'Erreur inconnue'));
        });
    });

    function getUserData() {
        fetch('/userdata', {
            method: 'GET'
        })
        .then(response => response.json())
        .then(data => {
            document.querySelector('.profile p:nth-child(1)').textContent = 'Nom: ' + data.nom;
            document.querySelector('.profile p:nth-child(2)').textContent = 'Prénom: ' + data.prenom;
            document.querySelector('.profile p:nth-child(3)').textContent = 'Email: ' + data.email;
            document.querySelector('.profile p:nth-child(4)').textContent = 'Ville: ' + data.ville;
        })
        .catch(err => {
            console.log('Erreur lors de la récupération des données de l\'utilisateur:', err);
        });
    }
    getUserData();

    const logoutBtn = document.getElementById('logout-btn');
    logoutBtn.addEventListener('click', function() {
        fetch('/logout', {
            method: 'GET'
        })
        .then(response => response.json())
        .then(data => {
            window.location.href = '/';
        })
        .catch(err => {
            console.error('Erreur lors de la déconnexion:', err);
        });
    });
});

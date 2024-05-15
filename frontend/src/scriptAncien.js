document.addEventListener('DOMContentLoaded', function() {
    const signupForm = document.getElementById('signup-form');
    signupForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        let username = document.getElementById('signup-username').value;
        let email = document.getElementById('signup-email').value;
        let password = document.getElementById('signup-password').value;

        axios.post('/signup', {
            username,
            email,
            password
        })
        .then(response => {
            alert(`Inscription réussie! Message de réponse: ${response.data.message}`);
        })
        .catch(err => {
            console.log('Erreur lors de l\'inscription:', err);
            alert('Erreur lors de l\'inscription : ' + (err.response.data.error || 'Erreur inconnue'));
        });
    });

    const loginForm = document.getElementById('login-form');
    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();

        let username = document.getElementById('login-username').value;
        let password = document.getElementById('login-password').value;

        axios.post('/login', {
            username,
            password
        })
        .then(response => {
            window.location.href = '/profil';    
        })
        .catch(err => {
            alert('Erreur lors de la connexion:', (err.message || 'Erreur inconnue'));
        });
    });

    function getUserData() {
        axios.get('/userdata')
        .then(response => {
            const data = response.data;
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
        axios.get('/logout')
        .then(response => {
            window.location.href = '/';
        })
        .catch(err => {
            console.error('Erreur lors de la déconnexion:', err);
        });
    });
});

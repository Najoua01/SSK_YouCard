import React, { useEffect, useState } from 'react';

const UserProfile = () => {
    const [userData, setUserData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch('/userdata', { credentials: 'include' });
                if (response.ok) {
                    const data = await response.json();
                    setUserData(data);
                } else {
                    console.error('Erreur lors de la récupération des données de l\'utilisateur.');
                }
            } catch (error) {
                console.error('Erreur lors de la récupération des données de l\'utilisateur:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchUserData();
    }, []);

    if (isLoading) {
        return <div>Chargement...</div>;
    }

    if (!userData) {
        return <div>Aucune donnée utilisateur trouvée.</div>;
    }

    return (
        <div className="profile">
            <p>Nom: {userData.nom}</p>
            <p>Prénom: {userData.prenom}</p>
            <p>Date de Naissance: {userData.dateNaiss}</p>
            <p>Email: {userData.email}</p>
            <p>Pays: {userData.pays}</p>
            <p>Code Postal: {userData.codePostal}</p>
        </div>
    );
};

export default UserProfile;

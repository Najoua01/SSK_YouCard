import React, { useState } from 'react';
import Select from 'react-select';
import countries from 'i18n-iso-countries';
import { City } from 'country-state-city';

countries.registerLocale(require('i18n-iso-countries/langs/fr.json')); // Enregistre la locale française

const SignupForm = () => {
    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [dateNaiss, setDateNaiss] = useState('');
    const [email, setEmail] = useState('');
    const [pays, setPays] = useState('');
    const [ville, setVille] = useState('');
    const [codePostal, setCodePostal] = useState('');
    const [password, setPassword] = useState('');
    const [acceptConditions, setAcceptConditions] = useState(false);
    const [noNewsletter, setNoNewsletter] = useState(false);
    const [cities, setCities] = useState([]);

    const handleCountryChange = (selectedOption) => {
        const countryCode = selectedOption.value;
        setPays(selectedOption.label);
        setVille(''); // Reset the city when country changes
        setCities(City.getCitiesOfCountry(countryCode).map(city => ({ label: city.name, value: city.name })));
    };

    const handleCityChange = (selectedOption) => {
        setVille(selectedOption.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!nom || !prenom || !dateNaiss || !email || !pays || !codePostal || !password) {
            alert('Tous les champs sont obligatoires.');
            return;
        }

        if (!acceptConditions) {
            alert('Vous devez accepter les conditions générales.');
            return;
        }

        try {
            const response = await fetch('/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nom, prenom, dateNaiss, email, pays, ville, codePostal, password, noNewsletter }),
            });

            if (response.ok) {
                alert('Inscription réussie!');
                setNom('');
                setPrenom('');
                setDateNaiss('');
                setEmail('');
                setPays('');
                setVille('');
                setCodePostal('');
                setPassword('');
                setAcceptConditions(false);
                setNoNewsletter(false);
            } else {
                const errorData = await response.json();
                alert('Erreur lors de l\'inscription : ' + errorData.error);
            }
        } catch (error) {
            alert('Erreur lors de l\'inscription : ' + error.message);
        }
    };

    const countryOptions = Object.entries(countries.getNames("fr")).map(([code, name]) => ({ label: name, value: code }));

    return (
        <form id="signup-form" onSubmit={handleSubmit}>
            <label>Nom</label>
            <input type="text" id="signup-nom" value={nom} onChange={(e) => setNom(e.target.value)} placeholder="Nom" />
            <br/>
            <label>Prénom</label>
            <input type="text" id="signup-prenom" value={prenom} onChange={(e) => setPrenom(e.target.value)} placeholder="Prénom" />
            <br/>
            <label>Date de naissance</label>
            <input type="date" id="signup-dateNaiss" value={dateNaiss} onChange={(e) => setDateNaiss(e.target.value)} placeholder="Date de Naissance" />
            <br/>
            <label>Adresse email</label>
            <input type="email" id="signup-email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
            <br/>
            <label>Pays</label>
            <Select
                name="pays"
                options={countryOptions}
                value={countryOptions.find(option => option.label === pays)}
                onChange={handleCountryChange}
                placeholder="Sélectionnez un pays"
            />
            <br/>
            <label>Ville</label>
            <Select
                name="ville"
                options={cities}
                value={cities.find(option => option.value === ville)}
                onChange={handleCityChange}
                placeholder="Sélectionnez une ville"
                isDisabled={!pays}
            />
            <br/>
            <label>Code postal</label>
            <input type="text" id="signup-codePostal" value={codePostal} onChange={(e) => setCodePostal(e.target.value)} placeholder="Code Postal" />
            <br/>
            <label>Mot de passe</label>
            <input type="password" id="signup-password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Mot de passe" />
            <div>
                <input type="checkbox" id="accept-conditions" checked={acceptConditions} onChange={(e) => setAcceptConditions(e.target.checked)} />
                <label htmlFor="accept-conditions">J'accepte les conditions générales</label>
            </div>
            <div>
                <input type="checkbox" id="no-newsletter" checked={noNewsletter} onChange={(e) => setNoNewsletter(e.target.checked)} />
                <label htmlFor="no-newsletter">Je ne souhaite pas être inscrit à la newsletter</label>
            </div>
            <button type="submit">Confirmer</button>
        </form>
    );
};

export default SignupForm;

import React, { useState } from 'react';
import Select from 'react-select';
import countries from 'i18n-iso-countries';
import { City } from 'country-state-city';

countries.registerLocale(require('i18n-iso-countries/langs/fr.json'));

const SignupForm = () => {
    const defaultFormData = {
        nom: '',
        prenom: '',
        dateNaiss: '',
        email: '',
        pays: '',
        ville: '',
        codePostal: '',
        password: '',
        confirmPassword: '',
        acceptConditions: false,
        noNewsletter: false,
        role: 'membre'
    };

    const [formData, setFormData] = useState(defaultFormData);
    const [errorMessage, setErrorMessage] = useState('');
    const countryOptions = ['BE', 'FR', 'LU', 'NL'].map(code => ({
        label: countries.getName(code, 'fr'),
        value: code
    }));
    const [cities, setCities] = useState([]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleCountryChange = (selectedOption) => {
        const countryCode = selectedOption.value;
        setFormData({
            ...formData,
            pays: selectedOption.label,
            ville: ''
        });
        setCities(City.getCitiesOfCountry(countryCode).map(city => ({ label: city.name, value: city.name })));
    };

    const handleCityChange = (selectedOption) => {
        setFormData({
            ...formData,
            ville: selectedOption.value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const { nom, prenom, dateNaiss, email, pays, ville, codePostal, password, confirmPassword, acceptConditions, noNewsletter, role } = formData;

        if (!nom || !prenom || !dateNaiss || !email || !pays || !codePostal || !password) {
            setErrorMessage('Tous les champs sont obligatoires.');
            return;
        }

        if (password !== confirmPassword) {
            setErrorMessage('Les mots de passe ne correspondent pas.');
            return;
        }

        if (!acceptConditions) {
            setErrorMessage('Vous devez accepter les conditions générales.');
            return;
        }

        console.log(JSON.stringify({ nom, prenom, dateNaiss, email, pays, ville, codePostal, password, noNewsletter, role }));  // test

        try {
            const response = await fetch('http://localhost:8000/signup-membre', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nom, prenom, dateNaiss, email, pays, ville, codePostal, password, noNewsletter, role }),
            });

            if (response.ok) {
                alert('Inscription réussie!');
                setFormData(defaultFormData); // Réinitialiser le formulaire
                setErrorMessage('');
            } else {
                const errorData = await response.json();
                setErrorMessage('Erreur lors de l\'inscription : ' + errorData.error);
            }
        } catch (error) {
            setErrorMessage('Erreur lors de l\'inscription : ' + error.message);
        }
    };

    return (
        <form id="signup-form" onSubmit={handleSubmit}>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            <label>Nom</label>
            <input type="text" name="nom" value={formData.nom} onChange={handleChange} placeholder="Nom" />
            <br/>
            <label>Prénom</label>
            <input type="text" name="prenom" value={formData.prenom} onChange={handleChange} placeholder="Prénom" />
            <br/>
            <label>Date de naissance</label>
            <input type="date" name="dateNaiss" value={formData.dateNaiss} onChange={handleChange} placeholder="Date de Naissance" />
            <br/>
            <label>Adresse email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
            <br/>
            <label>Pays</label>
            <Select
                name="pays"
                options={countryOptions}
                value={countryOptions.find(option => option.label === formData.pays)}
                onChange={handleCountryChange}
                placeholder="Sélectionnez un pays"
            />
            <br/>
            <label>Ville</label>
            <Select
                name="ville"
                options={cities}
                value={cities.find(option => option.value === formData.ville)}
                onChange={handleCityChange}
                placeholder="Sélectionnez une ville"
                isDisabled={!formData.pays}
            />
            <br/>
            <label>Code postal</label>
            <input type="text" name="codePostal" value={formData.codePostal} onChange={handleChange} placeholder="Code Postal" />
            <br/>
            <label>Mot de passe</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Mot de passe" />
            <br/>
            <label>Confirmer le mot de passe</label>
            <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="Confirmer le mot de passe" />
            <div>
                <input type="checkbox" name="acceptConditions" checked={formData.acceptConditions} onChange={handleChange} />
                <label htmlFor="accept-conditions">J'accepte les conditions générales</label>
            </div>
            <div>
                <input type="checkbox" name="noNewsletter" checked={formData.noNewsletter} onChange={handleChange} />
                <label htmlFor="no-newsletter">Je ne souhaite pas être inscrit à la newsletter</label>
            </div>
            <button type="submit">Confirmer</button>
        </form>
    );
};

export default SignupForm;

// {/* <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
// <script src="script.js"></script> */}

import React from 'react';
import Abonnement from '../Components/Abonnement/Abonnement';
import FormSignup from '../Components/FormSignup/FormSignup';
import FormLogin from '../Components/FormLogin/FormLogin';

const DevenirMembre = () => {
    return (
        <div>
            <Abonnement />
            <FormSignup />
            <FormLogin />
        </div>
    );
}

export default DevenirMembre;

import React, { useState } from 'react';
import { auth, signInWithEmailAndPassword } from './firebaseConfig';

const SignIn = () => {
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');

const handleSignIn = async () => {
try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log('User signed in:', userCredential.user);
} catch (error) {
    console.error('Error signing in:', error);
}
};

    return (
        <div>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
            <button onClick={handleSignIn}>Sign In</button>
        </div>
    );
};

export default SignIn;
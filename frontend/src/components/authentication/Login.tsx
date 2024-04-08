import React, { useState } from 'react';
import axios from 'axios';

const Login: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    let loginUrl: string = process.env.REACT_APP_BACKEND_URL + '/authentication/login';

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            let response = await axios.post(loginUrl, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                },
                data: {
                    'email': email,
                    'password': password
                }
            });

            setEmail('');
            setPassword('');
        } catch (error) {
            console.error('Error creating user:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button type="submit">Login</button>
        </form>
    );
};

export default Login;

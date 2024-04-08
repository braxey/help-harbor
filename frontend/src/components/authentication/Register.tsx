import React, { useState } from 'react';
import axios from 'axios';

const Register: React.FC = () => {
    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    let registerUrl: string = process.env.REACT_APP_BACKEND_URL + '/authentication/register';

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            let response = await axios.post(registerUrl, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                },
                data: {
                    'username': username,
                    'email': email,
                    'password': password
                }
            });

            setUsername('');
            setEmail('');
            setPassword('');

            if (response.status === 200) {
                console.log('win');
            }
        } catch (error) {
            console.error('Error creating user:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button type="submit">Create User</button>
        </form>
    );
};

export default Register;

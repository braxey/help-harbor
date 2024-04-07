import React, { useState } from 'react';
import axios from 'axios';

const CreateUserForm: React.FC = () => {
    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [age, setAge] = useState<number | undefined>(undefined);

    let createUserUrl: string = process.env.REACT_APP_BACKEND_URL + '/user/create';

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post(createUserUrl, {
                'username': username,
                'email': email,
                'age': age
            });
            console.log('User created:', response);

            setUsername('');
            setEmail('');
            setAge(undefined);
        } catch (error) {
            console.error('Error creating user:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="number" placeholder="Age" value={age || ''} onChange={(e) => setAge(parseInt(e.target.value))} />
            <button type="submit">Create User</button>
        </form>
    );
};

export default CreateUserForm;

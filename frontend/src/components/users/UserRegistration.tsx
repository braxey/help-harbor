import React, { useState } from 'react';
import axios from '../../axiosConfig';

const CreateUserForm: React.FC = () => {
    const [data, setData] = useState<string>('');

    let dataUrl: string = process.env.REACT_APP_BACKEND_URL + '/api/example';

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        let response = await axios.get(dataUrl, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        });
        let message: string = response.data.data;
        setData(message);
    };

    return (
        <div>
            <div>
                <p>Data: { data }</p>
            </div>
            <form onSubmit={handleSubmit}>
                <button type="submit">Get Data</button>
            </form>
        </div>
    );
};

export default CreateUserForm;

import React, {useState} from 'react';
import { useNavigate} from 'react-router-dom';

const RegisterPage = () => {

    // declare the email and password with useState and useNavigate
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        // when the user hits the submit button after inputting credentials 
        e.preventDefault();

        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // tells server that the request is being sent as a json package
                },
                body: JSON.stringify({username, email, password}),
            });

            if (!response.ok) {
                throw new Error('Login failed')
            }

            // sent back the web token and navigate client to dashboard page
            const data = await response.json();
            navigate('/login');
            
        } catch (error) {
            console.error('Error', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder='Username'
            />

            <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Email'
            />

            <input
            type="password"
            value={password}
            onChange={(p) => setPassword(p.target.value)}
            placeholder='Password'
            />
            <button>Submit</button>
        </form>
    );
};

export default RegisterPage;
import React, {useState} from 'react';
import { useNavigate} from 'react-router-dom';

const LoginPage = () => {
    // 1) make two state variable with email and password 
    // 2) create a form for the email and password and submit inputs button 
    // 3) each input variable should change it state whenever user types with onChange

    // declare the email and password with useState and useNavigate
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        // when the user hits the submit button after inputting credentials 
        e.preventDefault();

        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // tells server that the request is being sent as a json package
                },
                body: JSON.stringify({email, password}),
            });

            if (!response.ok) {
                throw new Error('Login failed')
            }

            // sent back the web token and saved into storage when login is sucessfull + navigate client to dashboard page
            const data = await response.json();
            localStorage.setItem('token', data.token);
            navigate('/dashboard');
            
        } catch (error) {
            console.error('Error', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
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

export default LoginPage;
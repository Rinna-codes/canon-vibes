import React, {useState} from 'react';
import { useNavigate, Link} from 'react-router-dom';

const LoginPage = () => {
    // 1) make two state variable with email and password 
    // 2) create a form for the email and password and submit inputs button 
    // 3) each input variable should change it state whenever user types with onChange
    // 4) if login successful, sent back the web token
        // 5) save the token into storage
        // 6) navigate client to dashboard page

    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({email, password}),
            });

            if (!response.ok) {
                throw new Error('Login failed')
            }

            const data = await response.json();
            localStorage.setItem('token', data.token);
            localStorage.setItem('username', data.username); // get the username for the user for dashboard greeting
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
            <button type="submit">Submit</button>

            <Link to="/register">Don't have an account? Register here</Link>
        </form>
    );
};

export default LoginPage;
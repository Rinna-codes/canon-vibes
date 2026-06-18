import React, {useState} from 'react';
import { useNavigate, Link} from 'react-router-dom';

const RegisterPage = () => {
    // declare the email and password with useState and useNavigate
    // sent back the web token and navigate client to dashboard page

    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({username, email, password}),
            });

            if (!response.ok) {
                throw new Error('Registering Log in failed')
            }

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

            <Link to="/login">Have an account already? Login here!</Link>
        </form>
    );
};

export default RegisterPage;
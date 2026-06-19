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

    // used for better readability and better comprehension for the return statement.
    const classes = {
        pageBody: 'h-screen flex bg-white-bg1',
        formContainer:
            'w-full max-w-md m-auto bg-white rounded-lg border border-primaryBorder shadow-default py-10 px-16',
        formHeading: 'text-2xl  font-medium text-primary mt-4 mb-12 text-center',
        btnContainer: 'bg-indigo-500 rounded-lg w-25 py-1 flex justify-center items-center mt-5 mx-auto'};

    return (
        <div className='container-wrapper'>
            <div className={classes.pageBody}>
                <div className={classes.formContainer}>
                    <h1 className={classes.formHeading}> Login into your account </h1>

                    <form onSubmit={handleSubmit}>
                    <div>
                        {/* <label htmlFor='email'>Email Address</label> for putting Email Address label above the input field */}
                        <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder='Email Address'/>
                    </div>

                    <div>
                        <input
                        type="password"
                        value={password}
                        onChange={(p) => setPassword(p.target.value)}
                        placeholder='Password'
                        />
                    </div>
                    
                    <Link to="/register">Don't have an account? Register here</Link>

                    <div className={classes.btnContainer}>
                        <button type="submit">Submit</button>
                    </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
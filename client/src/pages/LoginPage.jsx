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

    // object use for better readability and better comprehension for the return statement.
    const classes = {
        pageBody: 'h-screen flex bg-[#FFAFCC]',
        formContainer:
            'w-full max-w-md m-auto bg-[#A2D2FF] rounded-lg border border-primaryBorder shadow-default py-15 px-20',
        formHeading: 'font-mono text-[25px] mt-5 mb-5 text-center',
        btnContainer: 'bg-[#FFC8DD] font-semibold rounded-lg w-40 py-2 flex justify-center items-center mt-5 mx-auto',};

    return (
        <div className='container-wrapper'>
            <div className={classes.pageBody}>
                <div className={classes.formContainer}>
                    <h1 className={classes.formHeading}> Login into your account </h1>

                    <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <label htmlFor='Email Address' className='block text-[20px] font-mono'>Email</label>
                        <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={{backgroundColor: 'white', margin: '1px', borderRadius: '4px', width: '250px', height: '35px'}}/>
                    </div>

                    <div className="mb-6">
                        <label htmlFor='Password' className='block text-[20px] font-mono'>Password</label>
                        <input
                        type="password"
                        value={password}
                        onChange={(p) => setPassword(p.target.value)}
                        style={{backgroundColor: 'white', margin: '1px', borderRadius: '4px', width: '250px', height: '35px'}}/>
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
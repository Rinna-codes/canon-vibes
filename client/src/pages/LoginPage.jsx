import React, {useState} from 'react';
import { useNavigate, Link} from 'react-router-dom';
import canonBurst from '.../assets/canon-vibes-burst.svg';

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
    const pageForm = {
        webPageGrid: 'bg-white-900 py-12 sm:py-16',
        panelContainer:'mx-auto max-w-7xl px-6 lg:px-8',
        panelGrid: 'grid grid-cols-1 gap-6 lg:grid-cols-6'
    };

    const comicPanels = {
        topLeftPanel: 'relative flex min-h-45 flex-col items-center justify-center rounded-lg bg-[#CDB4DB] border-5 border-black px-8 py-10 lg:col-span-3',
        topRightPanel: 'flex min-h-45 flex-col items-center justify-center gap-4 rounded-lg bg-[#A2D2FF] border-5 border-black px-8 py-10 sm:flex-row lg:col-span-3',
        mainSection: 'flex flex-col items-center rounded-lg bg-[#FFC8DD] border-5 border-black px-8 py-10 sm:px-10 lg:col-span-6',
        bottomPanels: 'min-h-40 rounded-lg border-5 border-black px-8 py-8 lg:col-span-2',
        bottomrightPanel: 'flex min-h-40 flex-col items-center justify-center rounded-lg border-5 border-black px-8 py-8 text-center lg:col-span-2'
    };
    
    const comicWording = {
        appTitle: 'relative z-10 -rotate-12 text-5xl font-bold tracking-tight text-black',
        navLinks: 'text-5xl font-bold text-white hover:text-black',
        loginHeader: 'mb-6 text-2xl font-semibold text-black',
        Labels: 'mb-1 text-sm font-medium text-black'
    };

    const comicActions = {
        titleBurst: 'absolute inset-0 h-full w-full scale-125 object-contain',
    };

    return (
        <div className={pageForm.webPageGrid}> 
            <div className={pageForm.panelContainer}>
                <div className={pageForm.panelGrid}>

                    {/* top left panel, title of web application */}
                    <div className={comicPanels.topLeftPanel}>
                    <img src={canonBurst} alt="" className={comicActions.titleBurst}/>
                    <p className={comicWording.appTitle}>
                        Canon Vibes</p>
                    </div>

                    {/* top right panel, navigation links*/}
                    <div className={comicPanels.topRightPanel}>
                        <Link to='/' className={comicWording.navLinks}>Home</Link>
                        <Link to='/register' className={comicWording.navLinks}>Register</Link>
                        <Link to='' className={comicWording.navLinks}>About</Link>
                    </div>
                    
                    {/* largest, main panel, login form */}
                    <div className={comicPanels.mainSection}>
                        <h1 className={comicWording.loginHeader}>Login into your account</h1>
                        <form onSubmit={handleSubmit} className='w-full max-w-sm'>

                            <div className='mb-6'>
                                <label htmlFor='email' className={comicWording.loginLabels}>Email</label>
                                <input
                                id='email'
                                type='email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className='h-10 w-full rounded-md bg-white px-3 text-gray-900 focus:outline-2 focus:outline-indigo-500'/>
                            </div>
                            
                            <div className='mb-6'>
                                <label htmlFor='password' className={comicWording.Labels}>Password</label>
                                <input
                                id='password'
                                type='password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className='h-10 w-full rounded-md bg-white px-3 text-gray-900 focus:outline-2 focus:outline-indigo-500'/>
                            </div>

                            <Link to='/register' className={comicWording.Labels}>Don&apos;t have an account? Register here!</Link>

                            <div className='mt-6 flex justify-center'>
                                <button
                                type='submit'
                                className='rounded-full bg-[#CDB4DB] px-6 py-2 text-sm font-semibold text-black hover:text-white hover:bg-black'>Submit</button>
                            </div>
                        </form> 
                    </div>

                    {/* bottom left panel, TBD*/}
                    <div className={comicPanels.bottomPanels}>
                       {/* Context TBD */} 
                    </div>

                    {/* bottom middle panel, TBD*/}
                    <div className={comicPanels.bottomPanels}>
                       {/* Context TBD */} 
                    </div>

                    {/* bottom right panel, TBD*/}
                    <div className={comicPanels.bottomrightPanel}>
                       <p className={comicWording.loginLabels}>Create your soundtrack cards!</p>
                       <p className="mt-2 text-sm text-indigo-400">Try it out!</p>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default LoginPage;
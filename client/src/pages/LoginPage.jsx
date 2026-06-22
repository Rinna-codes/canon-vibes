import React, {useState} from 'react';
import { useNavigate, Link} from 'react-router-dom';
import canonBurst from '../assets/canon-vibes-burst.svg';
import SpeechBubble from '../components/SpeechBubble.jsx';

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
        appTitle: 'relative z-10 -rotate-12 font-comic text-7xl text-white [-webkit-text-stroke:2px_black] text-shadow-[5px_5px_0_#000]',
        navLinks: 'text-5xl font-comic text-white hover:text-black',
        loginCard: 'relative z-10 bg-[#BDE0FE] rounded-lg border-5 border-black shadow-xl/50 px-10 py-8',
        loginHeader: 'mb-6 text-center text-2xl font-comic text-black',
        Labels: 'mb-1 text-lg font-comic text-black'
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
                        <SpeechBubble>
                            <Link to='/' className={comicWording.navLinks}>Home</Link>
                        </SpeechBubble>
                        <SpeechBubble>
                            <Link to='/register' className={comicWording.navLinks}>Register</Link>
                        </SpeechBubble>
                        <SpeechBubble>
                            <Link to='' className={comicWording.navLinks}>About</Link>
                        </SpeechBubble>
                    </div>
                    
                    {/* largest, main panel, login form */}
                    <div className={comicPanels.mainSection}>
                        
                        {/* new div container to hold the blue block behind the login card */}
                        <div className={comicWording.loginCard}>
                            <h2 className={comicWording.loginHeader}>Welcome Back!</h2>
                            <form onSubmit={handleSubmit} className='w-full max-w-sm'>

                                <div className='mb-6'>
                                    <label htmlFor='email' className={comicWording.Labels}>Email</label>
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

                                {/* TO DO: implement the forgot password functionality later */}
                                <Link to='/' className={comicWording.Labels}>Forgot Password? Click Here!</Link>

                                <div className='mt-6 flex justify-center'>
                                    <button
                                    type='submit'
                                    className='rounded-full bg-[#CDB4DB] px-6 py-2 text-sm font-comic text-black hover:text-white hover:bg-black'>Submit</button>
                                </div>
                            </form>
                        </div> 
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
                       <p className={comicWording.Labels}>Create your soundtrack cards!</p>
                       <p className="mt-2 text-sm font-comic text-indigo-400">Try it out!</p>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default LoginPage;
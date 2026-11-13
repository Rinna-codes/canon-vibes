import React, {useState} from 'react';
import { useNavigate, Link} from 'react-router-dom';
import canonBurst from '../assets/canon-vibes-burst.svg';
import herbie from '../assets/herbie.svg';
import background1 from '../assets/canon-vibes-bg1.svg';
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

    const [showPassword, setShowPassword] = useState(false);
    const [remember, setRemember] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        
        // save email in local storage if remember is checked by user
        if (remember) {
            localStorage.setItem('email', email);
        } else {
            localStorage.removeItem('email');
        }

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
            setError('Wrong email or password for login. Please try again');
        }
    };

    // object use for better readability and better comprehension for the return statement.
    const pageForm = {
        webPageGrid: 'bg-white py-12 sm:py-5',
        panelContainer:'mx-auto max-w-7xl px-6 lg:px-8',
        panelGrid: 'grid grid-cols-1 gap-3 lg:grid-cols-6'
    };

    const comicPanels = {
        topLeftPanel: 'relative flex min-h-45 flex-col items-center justify-center rounded-lg bg-[#CDB4DB] border-5 border-black px-8 py-10 lg:col-span-3',
        topRightPanel: 'flex min-h-45 flex-col items-center justify-center gap-4 rounded-lg bg-[#A2D2FF] border-5 border-black px-8 py-10 sm:flex-row lg:col-span-3',
        mainLeftSection: 'flex flex-col justify-center rounded-[28px] bg-[#A2D2FF] border-5 border-black shadow-[3px_3px_0_#111] p-9 lg:col-span-3',
        mainRightSection: 'flex flex-col items-center justify-center gap-8 rounded-lg bg-[#FFC8DD] border-5 border-black lg:col-span-3',
        footerPanel: 'flex flex-col items-center justify-between gap-3 rounded-lg bg-[#BDE0FE] border-5 border-black px-8 py-5 sm:flex-row lg:col-span-6'
    };
    
    const comicWording = {
        appTitle: 'relative z-10 -rotate-12 font-comic text-7xl text-white [-webkit-text-stroke:2px_black] text-shadow-[5px_5px_0_#000]',
        navLinks: 'text-5xl font-comic text-white hover:text-black',
        loginHeader: 'mb-6 my-3 text-5xl font-comic text-black',
        Labels: 'mb-1 block font-sans font-bold text-base font-bold text-black',
        subText: 'mt-1 mb-8 font-sans text-base text-black/80',
    };

    const formStyles = {
        titleBurst: 'absolute inset-0 h-full w-full scale-125 object-contain',
        input: 'h-12 w-full rounded-2xl border-4 border-black px-4 font-comic text-black bg-white focus:outline-4 focus:outline-[#F7E96B] focus:shadow-[2px_2px_0_#111]',
        showButton: 'absolute right-2 top-1/2 -translate-y-1/2 rounded-lg border-3 border-black bg-[#CDB4DB] px-3 py-1 font-comic text-sm text-black hover:bg-black hover:text-white',
        primaryButton: 'w-full rounded-2xl border-4 border-black bg-[#F7E96B] py-3 font-comic text-3xl tracking-wide text-black shadow-[4px_4px_0_#111] transition hover:-translate-y-0.5 active:translate-y-1 active:shadow-none',
        checkBox: 'h-6 w-6 accent-black',
        link: 'font-comic font-bold text-black underline hover:text-white',
        error: 'mb-6 rounded-lg border-4 border-black bg-white px-4 py-2 font-comic font-bold text-red-700',
    };

    return (
        <div className={pageForm.webPageGrid}> 
            <div className={pageForm.panelContainer}>
                <div className={pageForm.panelGrid}>

                    {/* top left panel, title of web application */}
                    <div className={comicPanels.topLeftPanel}>
                        <img src={canonBurst} alt="" className={formStyles.titleBurst}/>
                        <p className={comicWording.appTitle}>
                            Canon Vibes</p>
                    </div>

                    {/* top right panel, navigation links*/}
                    <div className={comicPanels.topRightPanel}>
                        <SpeechBubble>
                            <Link to='' className={comicWording.navLinks}>Home</Link>
                        </SpeechBubble>
                        <SpeechBubble>
                            <Link to='/register' className={comicWording.navLinks}>Register</Link>
                        </SpeechBubble>
                        <SpeechBubble>
                            <Link to='' className={comicWording.navLinks}>About</Link>
                        </SpeechBubble>
                    </div>
                    
                    {/* largest, main left panel, login form */}
                    <div className={comicPanels.mainLeftSection}>
                        <h1 className={comicWording.loginHeader}>Welcome Back!</h1>
                        <p className={comicWording.subText}>Log in to your Canon Vibes account</p> 

                           <form onSubmit={handleSubmit} className='w-full'>
                                {error && <p role='alert' className={formStyles.error}>OOPS! {error}</p>}

                                <div className='mb-6'>
                                    <label htmlFor='email' className={formStyles.Labels}>Email</label>
                                    <input
                                    id='email'
                                    type='email'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className={formStyles.input}/>
                                </div>
                                
                                <div className='mb-6'>
                                    <label htmlFor='password' className={formStyles.Labels}>Password</label>
                                    <div className='relative'>
                                        <input
                                            id='password'
                                            type={showPassword ? 'text' : 'password'}
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className={`${formStyles.input} pr-24`}/>
                                        <button
                                            type='button'
                                            onClick={() => setShowPassword(!showPassword)}
                                            className={formStyles.showButton}>
                                            {showPassword ? 'Hide' : 'Show'}
                                        </button>
                                    </div>
                                </div>

                                <div className='mb-8 flex items-center justify-between'>
                                    <label htmlFor='remember' className='flex items-center gap-3 font-sans text-black'>
                                        <input
                                            id='remember'
                                            type='checkbox'
                                            checked={remember}
                                            onChange={(e) => setRemember(e.target.checked)}
                                            className={formStyles.checkbox}/>
                                        Remember me
                                    </label>

                                    {/* TO DO: implement the forgot password functionality later */}
                                    <Link to='/' className={comicWording.Labels}>Forgot Password? Click Here!</Link>
                                </div>

                                <div className='mt-6 my-3 flex justify-center'>
                                    <button
                                    type='submit'
                                    className={formStyles.primaryButton}>Log in</button>
                                </div>

                                <p className='mt-6 text-center font-sans text-black'>
                                    New here? <Link to='/register' className={formStyles.link}>Create an account</Link>
                                </p>
                            </form>
                    </div>

                    {/* main right panel: Herbie */}
                    {/*TODO: Change/replace the SVG of Herbie to the given one on final Figma Design*/}
                    <div className={comicPanels.mainRightSection}>
                        <SpeechBubble>
                            <p className='font-comic text-4xl text-black'>Welcome back!</p>
                            <p className='font-sans text-sm text-black'>Log in to jump back into your universe.</p>
                        </SpeechBubble>
                        <img src={herbie} alt='Herbie' className='h-50 w-50'/>
                    </div>

                    {/* footer panel */}
                    <footer className={comicPanels.footerPanel}>
                        <p className='font-sans text-black'>© 2026 Canon Vibes</p>
                        <nav className='flex gap-6 font-sans font-bold text-black'>
                            <Link to='/' className='underline'>About</Link>
                            <Link to='/' className='underline'>Privacy</Link>
                            <Link to='/' className='underline'>Contact</Link>
                        </nav>
                    </footer>

                </div>
            </div>
        </div>
    );
};

export default LoginPage;
import React, {useState} from 'react';
import { useNavigate, Link} from 'react-router-dom';
import canonBurst from '../assets/canon-vibes-burst.svg';
import SpeechBubble from '../components/SpeechBubble.jsx';
import happyHerbie from '../assets/herbieHappy.svg';

const RegisterPage = () => {
    // declare the email and password with useState and useNavigate
    // sent back the web token and navigate client to dashboard page

    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // TODO: add error handling for registration form under the handleSubmit function
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

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

            setSuccess('Account created! Redirecting to login...');

            // Let the user see a success registeration message before going to the login page
            setTimeout(() => navigate('/login'), 5000);
            
        } catch (error) {
            console.error('Error', error);
            setError('Registration failed. Please try again.');
        }
    };

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
    };


    const comicWording = {
        appTitle: 'relative z-10 rotate-12 font-comic text-7xl text-white [-webkit-text-stroke:2px_black] text-shadow-[5px_5px_0_#000]',
        navLinks: 'text-5xl font-comic text-white hover:text-black',
        registerCard: 'relative z-10 bg-[#BDE0FE] rounded-[70px] border-5 border-black px-10 py-2',
        registerHeader: 'mb-6 my-3 text-center text-2xl font-comic text-black',
        Labels: 'mb-1 text-lg font-comic text-black'    
    };

    const comicActions = {
        titleBurst: 'absolute inset-0 rotate-15 h-full w-full scale-125 object-contain',
    };

    return (
        <div className={pageForm.webPageGrid}>
            <div className={pageForm.panelContainer}>
                <div className={pageForm.panelGrid}>
                    
                    {/* top left panel, Canon Vibes titles */}
                    <div className={comicPanels.topLeftPanel}>
                        <img src={canonBurst} alt="Canon Vibes Burst" className={comicActions.titleBurst}/>
                        <p className={comicWording.appTitle}>Canon Vibes</p>
                    </div>

                    {/* top right panel, navigation links */}
                    <div className={comicPanels.topRightPanel}>
                        <SpeechBubble>
                            <Link to='' className={comicWording.navLinks}>Home</Link>
                        </SpeechBubble>

                        <SpeechBubble>
                            <Link to='/login' className={comicWording.navLinks}>Login</Link>
                        </SpeechBubble>

                        <SpeechBubble>
                            <Link to='' className={comicWording.navLinks}>About</Link>
                        </SpeechBubble>
                    </div>

                    {/* main left section, registration card form */}
                    <div className={comicPanels.mainLeftSection}>
                        <h2 className={comicWording.registerHeader}>Create an account!</h2>
                        
                        {/*TODO: Change the color of the text to something visually better*/}
                        {success && <p className="text-green-600">{success}</p>}

                        <div className='mb-6'>
                            <label htmlFor='username' className={comicWording.Labels}>Username</label>
                            <input
                                id='username'
                                type='username'
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className='h-10 w-full rounded-md bg-white px-3 text-gray-900 focus:outline-2 focus:outline-indigo-500'
                            />
                        </div>

                        <div className='mb-6'>
                            <label htmlFor='email' className={comicWording.Labels}>Email</label>
                            <input
                                id='email'
                                type='email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className='h-10 w-full rounded-md bg-white px-3 text-gray-900 focus:outline-2 focus:outline-indigo-500'
                            />
                        </div>

                        <div className='mb-6'>
                            <label htmlFor='password' className={comicWording.Labels}>Password</label>
                            <input
                                id='password'
                                type='password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className='h-10 w-full rounded-md bg-white px-3 text-gray-900 focus:outline-2 focus:outline-indigo-500'
                            />
                        </div>

                        <div className='mt-6 my-3 flex justify-center'>
                            <button
                            type='submit'
                            className='rounded-full bg-[#CDB4DB] px-6 py-2 text-sm font-comic text-black hover:text-white hover:bg-black'>Register</button>
                        </div>
                    </div>

                    <div className={comicPanels.mainRightSection}>
                        <SpeechBubble>
                            <p className='font-comic text-4xl text-black'>Join the crew!</p>
                            <p className='font-sans text-sm text-black'>Make an account and start creating your cards!</p>
                        </SpeechBubble>
                        <img src={happyHerbie} alt='Herbie' className='h-80 w-80'/>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
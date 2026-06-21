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
    const pageForm = {
        webPageGrid: 'bg-white-900 py-12 sm:py-16',
        panelContainer:'mx-auto max-w-7xl px-6 lg:px-8',
        panelGrid: 'grid grid-cols-1 gap-6 lg:grid-cols-6'
    };

    const comicPanels = {
        topLeftPanel: 'relative flex min-h-45 flex-col items-center justify-center rounded-lg bg-[#CDB4DB] border-5 border-black px-8 py-10 lg:col-span-3',
        topRightPanel: 'flex min-h-45 flex-col items-center justify-center gap-4 rounded-lg bg-[#A2D2FF] border-5 border-black px-8 py-10 sm:flex-row lg:col-span-3'
    }
    
    const comicWording = {
        appTitle: 'relative z-10 -rotate-12 text-5xl font-bold tracking-tight text-black',
        navLinks: 'text-5xl font-bold text-white hover:text-black'
    };

    const comicActions = {
        titleBurst: 'absolute inset-0 h-full w-full scale-125 object-contain'
    };

    return (
        <div className={pageForm.webPageGrid}> 
            <div className={pageForm.panelContainer}>
                <div className={pageForm.panelGrid}>

                    {/* top left panel, title of web application */}
                    <div className={comicPanels.topLeftPanel}>
                    <img src='src/assets/canon-vibes-burst.svg' alt="" className={comicActions.titleBurst}/>
                    <p className={comicWording.appTitle}>
                        Canon Vibes</p>
                    </div>

                    {/* top right panel, navigation links*/}
                    <div className={comicPanels.topRightPanel}>
                        <Link to='/' className={comicWording.navLinks}>Home</Link>
                        <Link to='/register' className={comicWording.navLinks}>Register</Link>
                        <Link to='' className={comicWording.navLinks}>About</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
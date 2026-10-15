import React, {useState} from 'react';
import { useNavigate, Link} from 'react-router-dom';
import canonBurst from '../assets/canon-vibes-burst.svg';
import SpeechBubble from '../components/SpeechBubble.jsx';

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

    const pageForm = {
        webPageGrid: 'bg-white py-12 sm:py-5',
        panelContainer:'mx-auto max-w-7xl px-6 lg:px-8',
        panelGrid: 'grid grid-cols-1 gap-3 lg:grid-cols-6'
    };

    const comicPanels = {
        topLeftPanel: 'relative flex min-h-45 flex-col items-center justify-center rounded-lg bg-[#CDB4DB] border-5 border-black px-8 py-10 lg:col-span-3',
        topRightPanel: 'flex min-h-45 flex-col items-center justify-center gap-4 rounded-lg bg-[#A2D2FF] border-5 border-black px-8 py-10 sm:flex-row lg:col-span-3',
        mainSection: 'flex flex-col lg:flex-row items-center rounded-lg bg-[#FFC8DD] border-5 border-black gap-20 px-8 py-5 sm:px-30 lg:col-span-6',
        bottomLeftPanel: 'min-h-40 rounded-lg bg-[#A2D2FF] border-5 border-black px-8 py-8 lg:col-span-2',
        bottomMiddlePanel: 'min-h-40 rounded-lg bg-[#FFAFCC] border-5 border-black px-8 py-8 lg:col-span-2',
        bottomRightPanel: 'flex min-h-40 flex-col bg-[#BDE0FE] items-center justify-center rounded-lg border-5 border-black px-8 py-8 text-center lg:col-span-2'
    };


    {/*TO DO: Need to edit the login designs to fit more for the registration card*/}
    const comicWording = {
        appTitle: 'relative z-10 -rotate-12 font-comic text-7xl text-white [-webkit-text-stroke:2px_black] text-shadow-[5px_5px_0_#000]',
        navLinks: 'text-5xl font-comic text-white hover:text-black',
        loginCard: 'relative z-10 bg-[#BDE0FE] rounded-[70px] border-5 border-black px-10 py-2',
        loginHeader: 'mb-6 my-3 text-center text-2xl font-comic text-black',
        Labels: 'mb-1 text-lg font-comic text-black',
        bannerHeader: '-rotate-5 font-comic text-lg text-black',
        bannerSubText: 'mt-2 text-sm -rotate-3 font-comic text-indigo-400'
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
                            <Link to='/login' className={comicWording.navLinks}>Login</Link>
                        </SpeechBubble>

                        <SpeechBubble>
                            <Link to='' className={comicWording.navLinks}>Home</Link>
                        </SpeechBubble>

                        <SpeechBubble>
                            <Link to='' className={comicWording.navLinks}>About</Link>
                        </SpeechBubble>
                    </div>

                    {/* main section, registration form */}
                    <div className={comicPanels.mainSection}>
                        {/*TO DO: Fill out the rest of the design for the bottom comic panel*/}
                    </div>

                    {/* bottom left panel */}
                    <div className={comicPanels.bottomLeftPanel}>
                        {/*TO DO: Fill out the rest of the design for the bottom comic panel*/}
                    </div>

                    {/* bottom middle panel */}
                    <div className={comicPanels.bottomMiddlePanel}>
                        {/*TO DO: Fill out the rest of the design for the bottom comic panel*/}
                    </div>

                    {/* bottom right panel */}
                    <div className={comicPanels.bottomRightPanel}>
                        {/*TO DO: Fill out the rest of the design for the bottom comic panel*/}
                    </div>

                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
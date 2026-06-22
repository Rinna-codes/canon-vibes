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

    const pageForm = {
        webPageGrid: 'bg-white-900 py-12 sm:py-16',
        panelContainer:'mx-auto max-w-7xl px-6 lg:px-8',
        panelGrid: 'grid grid-cols-1 gap-6 lg:grid-cols-6'
    };

    const comicPanels = {
        topLeftPanel: 'relative flex min-h-45 flex-col items-center justify-center rounded-lg bg-[#CDB4DB] border-5 border-black px-8 py-10 lg:col-span-3',
        topRightPanel: 'flex min-h-45 flex-col items-center justify-center gap-4 rounded-lg bg-[#A2D2FF] border-5 border-black px-8 py-10 sm:flex-row lg:col-span-3',
        mainSection: 'flex flex-col lg:flex-row items-center rounded-lg bg-[#FFC8DD] border-5 border-black gap-20 px-8 py-10 sm:px-10 lg:col-span-6',
        bottomLeftPanel: 'min-h-40 rounded-lg bg-[#A2D2FF] border-5 border-black px-8 py-8 lg:col-span-2',
        bottomMiddlePanel: 'min-h-40 rounded-lg bg-[#FFAFCC] border-5 border-black px-8 py-8 lg:col-span-2',
        bottomrRightPanel: 'flex min-h-40 flex-col bg-[#BDE0FE] items-center justify-center rounded-lg border-5 border-black px-8 py-8 text-center lg:col-span-2'
    };

    return (
        <div className={pageForm.webPageGrid}>
            <div className={pageForm.panelContainer}>
                {/* top left panal, Canon Vibes titles */}
                
            </div>
        </div>
    );
};

export default RegisterPage;
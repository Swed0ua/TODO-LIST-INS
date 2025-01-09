import React from 'react'
import { useNavigate } from 'react-router-dom';
import MainBtn from '../../shared/MainBtn';

const WelcomeContainer: React.FC = () => {
    const navigate = useNavigate();

    const goToRegistration = () => {
        navigate('/registration');
    };

    return (
        <div className="flex flex-col items-center justify-center text-gray-800">
            <h1 className="text-4xl font-bold text-blue-600 mb-4">Welcome to the app!</h1>
            <p className="text-lg mb-4">Our todo app helps you stay organized and manage your tasks efficiently.</p>
            <p className="text-lg mb-6">Create, track, and complete your tasks with ease. Join us now and start your productivity journey!</p>
            <MainBtn onClick={goToRegistration}>SignUp</MainBtn>
        </div>);
}

export default WelcomeContainer

import React, { useEffect, useState } from 'react';
import {  useNavigate } from 'react-router-dom';

const Home = () => {
    const history = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Simulate checking if the user is logged in
    useEffect(() => {
        const userLoggedIn = localStorage.getItem('isLoggedIn');
        setIsLoggedIn(userLoggedIn === 'true');
    }, []);

    // Redirect to the appropriate page based on login status
    const handleGetStarted = () => {
        if (isLoggedIn) {
            history('/tasks');
        } else {
            history('/login');
        }
    };

    return (
        <div className="home-page-container">
            <h1>Welcome to Task Management</h1>
            <p>Organize your tasks efficiently.</p>
            <button onClick={handleGetStarted}>Get Started</button>
        </div>
    );
};

export default Home;

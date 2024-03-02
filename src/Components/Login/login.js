import React, { useState, useEffect } from 'react';
import './login.css'; // Import CSS file for styling
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [errorMsg, setErrorMsg] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/login', formData);
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
            setFormData({
                email: '',
                password: ''
            });
            setErrorMsg('');
            navigate('/task');
        } catch (err) {
            console.error(err);
            if (err.response && err.response.data && err.response.data.error) {
                setErrorMsg(err.response.data.error);
            } else {
                setErrorMsg('An unexpected error occurred');
            }
        }
    };

    const formFields = [
        { name: 'email', label: 'Email', type: 'email' },
        { name: 'password', label: 'Password', type: 'password' }
    ];

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            navigate('/task');
        }
    }, [navigate]);

    return (
        <div className='login-main-container'>
            <div className="login-container">
                <h1>Login</h1>
                <form onSubmit={handleSubmit} className='login-form-container'>
                    {formFields.map((field, index) => (
                        <div key={index} className="form-group">
                            <label htmlFor={field.name}>{field.label}</label>
                            <input
                                type={field.type}
                                name={field.name}
                                id={field.name}
                                value={formData[field.name]}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    ))}
                    <button type="submit">Login</button>
                </form>
                {errorMsg && <p className="error-message">{errorMsg}</p>}
                <div>
                    <p>Don't have an account? <Link to="/register">Register here</Link></p>
                </div>
            </div>
        </div>
    );
}

export default Login;

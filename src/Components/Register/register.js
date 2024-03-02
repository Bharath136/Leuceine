import React, { useState } from 'react';
import './register.css'; // Import CSS file for styling
import { Link, useNavigate } from 'react-router-dom'; // Make sure react-router-dom is installed
import axios from 'axios';

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });

    const navigate = useNavigate()

    const [errorMsg, setErrorMsg] = useState('');

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
            const response = await axios.post('http://localhost:8000/register', formData);
            console.log(response);
            // Clear form data on successful registration
            navigate('/login')
            
            setFormData({
                username: '',
                email: '',
                password: ''
            });
            // Clear any previous error messages
            setErrorMsg('');
        } catch (err) {
            console.error(err);
            if (err.response && err.response.data && err.response.data.error) {
                setErrorMsg(err.response.data.error);
            } else {
                setErrorMsg('An unexpected error occurred');
            }
        }
    };

    // Define an array of form fields
    const formFields = [
        { name: 'username', label: 'Username', type: 'text' },
        { name: 'email', label: 'Email', type: 'email' },
        { name: 'password', label: 'Password', type: 'password' }
    ];

    return (
        <div className='register-main-container'>
            <div className="register-container">
                <h1>Register</h1>
                <form onSubmit={handleSubmit} className='register-form-container'>
                    {/* Loop through the formFields array */}
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
                    <button type="submit">Register</button>
                </form>
                {errorMsg && <p style={{ color: 'red' }}>{errorMsg}</p>}
                <div>
                    <p>Already have an account? <Link to="/login">Login here</Link></p>
                </div>
            </div>
        </div>
    );
}

export default Register;

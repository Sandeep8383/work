import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './login.css';
import backgroundImage from './bg3.jpg'; // Importing the same background image as in login.js

export default function SignUpPage() {
    const [inputs, setInputs] = useState({
        username: '',
        email: '',
        password: '',
    });

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputs(prev => ({
            ...prev,
            [name]: value,
        }));
    }

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior
    
        try {
            const formData = new URLSearchParams();
            formData.append('username', inputs.username);
            formData.append('email', inputs.email);
            formData.append('password', inputs.password);
    
            const response = await fetch('http://localhost:5000/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: formData,
            });
    
            if (!response.ok) {
                throw new Error('Something went wrong with the signup process');
            }
    
            const data = await response.json();
            console.log(data);
            alert('Signup successful!'); // Optionally redirect the user or clear the form
        } catch (error) {
            console.error('Signup error:', error);
            alert('Error signing up. Please try again.');
        }
    }
    
    return (
        <div className="outer-container" style={{ backgroundImage: `url(${backgroundImage})` }}>
            <div className="signup-container">
            <div className="signup-content">
                <h2>Join us</h2>
                <h5>Create your personal account</h5>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={inputs.username}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email address</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={inputs.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={inputs.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input type="checkbox" id="checkbox" name="checkbox" required />
                        <label htmlFor="checkbox">I agree all statements in <Link to="/terms-of-service">terms of service</Link>.</label>
                    </div>
                    <button className="register-btn" type="submit">Register</button>
                </form>
                <div className="footer-links">
                    <p><Link to="/">Back to Homepage</Link>.</p>
                </div>
            </div>
        </div>
        </div>
    );
}

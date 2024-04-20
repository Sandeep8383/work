import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './login.css';
import backgroundImage from './bg3.jpg';

export default function SignInPage() {

    // State to store input values
    const [inputs, setInputs] = useState({
        username: '',
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
            formData.append('email', inputs.username); // 'username' should match your input field name
            formData.append('password', inputs.password);
    
            const response = await fetch('http://localhost:5000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: formData,
            });
    
            if (!response.ok) {
                throw new Error('Login failed');
            }
    
            const data = await response.json();
            console.log(data);
            alert('Login successful!'); // Optionally redirect the user or clear the form
        } catch (error) {
            console.error('Login error:', error);
            alert('Error logging in. Please try again.');
        }
    }

    return (
        <div className="outer-container" style={{ backgroundImage: `url(${backgroundImage})` }}>
            <div className="login-container">
            <div className="login-content">
                <h2>Sign in</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="username">Username or email address</label>
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
                        <label htmlFor="password">Password</label>
                        <Link to="/forget-password" className="forgot-password">Forgot password?</Link>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={inputs.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button className="login-btn" type="submit">Login</button>
                </form>
                <div className="footer-links">
                    <p>First time? <Link to="/signup">Create an account</Link>.</p>
                    <p><Link to="/">Back to Homepage</Link>.</p>
                </div>
            </div>
        </div>
        </div>
    );
}

                            
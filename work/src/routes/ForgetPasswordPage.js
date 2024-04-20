import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './login.css';

export default function ForgetPasswordPage() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/forgot', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    email: email,
                }),
            });
            const data = await response.json();
            setMessage(data.message); // assuming the response contains a message field
        } catch (error) {
            console.error('Error:', error);
            setMessage('Failed to send password reset email');
        }
    };

    return (
        <div className="login-container">
            <div className="login-content">
                <h2>Reset your password</h2>
                <h5>Enter your email address and we will send you a new password</h5>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Email address</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <button className="login-btn" type="submit">Send password reset email</button>
                </form>
                {message && <p>{message}</p>}
                <div className="footer-links">
                    <p>First time? <Link to="/Signup">Create an account</Link>.</p>
                    <p><Link to="/">Back to Homepage</Link>.</p>
                </div>
            </div>
        </div>
    );
}

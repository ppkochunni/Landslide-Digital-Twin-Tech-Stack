import React, { useState } from 'react';
import './Auth.css';

const Auth = ({ onLoginSuccess }) => {
    // State to toggle between Login and Signup view
    const [isLogin, setIsLogin] = useState(true);
    
    // Form fields state
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    // Handle input changes
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Basic validation for signup
        if (!isLogin && formData.password !== formData.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        // Determine target backend API URL
        const endpoint = isLogin ? '/api/login' : '/api/signup';
        const payload = isLogin 
            ? { email: formData.email, password: formData.password }
            : { username: formData.username, email: formData.email, password: formData.password };

        console.log(`Sending data to Node.js backend (${endpoint}):`, payload);

        try {
            // Live connection to your Node.js server running on port 5000
            const response = await fetch(`http://localhost:5000${endpoint}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            
            const data = await response.json();
            
            if (response.ok) {
                alert(data.message); 
                
                if (!isLogin) {
                    // If they just registered, flip to login view
                    setIsLogin(true);
                    setFormData({ username: '', email: '', password: '', confirmPassword: '' });
                } else {
                    // If they successfully logged in, pass user data up to App.js to trigger the Welcome view
                    onLoginSuccess(data.user);
                }
            } else {
                alert(data.message || "Something went wrong.");
            }
        } catch (err) {
            console.error("Backend connection error:", err);
            alert("Could not connect to the backend server. Make sure your Node.js server is running on port 5000!");
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                
                {/* Left Side: Crimson Amrita Identity Showcase Panel */}
                <div className="auth-sidebar">
                    <img 
                        src="/amrita.jpeg" 
                        alt="Amrita Emblem" 
                        className="sidebar-logo" 
                    />
                    <h1>LANDSLIDE</h1>
                    <h2>Digital Twin Platform</h2>
                </div>
                
                {/* Right Side: Clean White Interactive Form Workspace */}
                <div className="auth-main-form">
                    <h3 className="auth-title">{isLogin ? 'Sign In' : 'Create Account'}</h3>
                    
                    <form onSubmit={handleSubmit} className="auth-form">
                        {!isLogin && (
                            <div className="form-group">
                                <label>Username</label>
                                <input 
                                    type="text" 
                                    name="username" 
                                    value={formData.username} 
                                    onChange={handleChange} 
                                    placeholder="Enter your full name" 
                                    required 
                                />
                            </div>
                        )}

                        <div className="form-group">
                            <label>Email Address</label>
                            <input 
                                type="email" 
                                name="email" 
                                value={formData.email} 
                                onChange={handleChange} 
                                placeholder="name@example.com" 
                                required 
                            />
                        </div>

                        <div className="form-group">
                            <label>Password</label>
                            <input 
                                type="password" 
                                name="password" 
                                value={formData.password} 
                                onChange={handleChange} 
                                placeholder="••••••••" 
                                required 
                            />
                        </div>

                        {!isLogin && (
                            <div className="form-group">
                                <label>Confirm Password</label>
                                <input 
                                    type="password" 
                                    name="confirmPassword" 
                                    value={formData.confirmPassword} 
                                    onChange={handleChange} 
                                    placeholder="••••••••" 
                                    required 
                                />
                            </div>
                        )}

                        <button type="submit" className="auth-btn">
                            {isLogin ? 'Login' : 'Sign Up'}
                        </button>
                    </form>

                    <p className="auth-toggle-text">
                        {isLogin ? "Don't have an account? " : "Already have an account? "}
                        <span onClick={() => setIsLogin(!isLogin)} className="auth-toggle-link">
                            {isLogin ? 'Sign Up here' : 'Login here'}
                        </span>
                    </p>
                </div>

            </div>
        </div>
    );
};

export default Auth;
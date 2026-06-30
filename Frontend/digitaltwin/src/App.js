import React, { useState } from 'react';
import NewTest from './components/NewTest'; // Make sure this file is created in the same folder!

// Combined CSS to ensure the preview environment styles everything correctly in a single file
const globalCSS = `
/* --- Auth Styles --- */
.auth-container { display: flex; justify-content: center; align-items: center; min-height: 100vh; background: #f1f5f9; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 20px; }
.auth-card { display: flex; background: #ffffff; border-radius: 16px; box-shadow: 0 15px 35px rgba(0, 0, 0, 0.06); width: 100%; max-width: 850px; min-height: 520px; overflow: hidden; }
.auth-sidebar { flex: 1; background: #7a1b30; display: flex; flex-direction: column; justify-content: center; align-items: center; padding: 40px; color: #ffffff; text-align: center; }
.sidebar-logo { width: 100%; max-width: 240px; height: auto; margin-bottom: 15px; background: #ffffff; padding: 5px; border-radius: 8px; box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15); object-fit: contain; }
.auth-sidebar h1 { margin: 0; font-size: 2.2rem; font-weight: 700; letter-spacing: 2px; color: #ffffff; }
.auth-sidebar h2 { margin: 8px 0 0 0; font-size: 0.95rem; color: #f3e8ff; text-transform: uppercase; letter-spacing: 1.5px; font-weight: 400; }
.auth-main-form { flex: 1.2; padding: 50px 45px; display: flex; flex-direction: column; justify-content: center; background: #ffffff; }
.auth-title { font-size: 1.6rem; font-weight: 600; margin-bottom: 25px; color: #1e293b; }
.auth-form { display: flex; flex-direction: column; gap: 18px; }
.form-group { display: flex; flex-direction: column; gap: 6px; }
.form-group label { font-size: 0.85rem; font-weight: 600; color: #475569; }
.form-group input { padding: 12px 14px; border-radius: 8px; border: 1px solid #cbd5e1; background: #f8fafc; color: #334155; font-size: 0.95rem; transition: all 0.2s ease; }
.form-group input:focus { outline: none; border-color: #7a1b30; background: #ffffff; box-shadow: 0 0 0 3px rgba(122, 27, 48, 0.1); }
.auth-btn { background: #7a1b30; color: #ffffff; padding: 13px; border: none; border-radius: 8px; font-size: 1rem; font-weight: 600; cursor: pointer; transition: background 0.2s ease; margin-top: 10px; box-shadow: 0 4px 12px rgba(122, 27, 48, 0.15); }
.auth-btn:hover { background: #5f1324; }
.auth-toggle-text { text-align: center; margin-top: 25px; font-size: 0.9rem; color: #64748b; }
.auth-toggle-link { color: #7a1b30; cursor: pointer; font-weight: 600; }
.auth-toggle-link:hover { text-decoration: underline; }
@media (max-width: 768px) { .auth-card { flex-direction: column; max-width: 450px; } .auth-sidebar { padding: 30px; } .auth-main-form { padding: 35px 30px; } }

/* --- Dashboard Layout --- */
.dashboard-container { min-height: 100vh; background: #f1f5f9; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; }
.dashboard-navbar { display: flex; justify-content: space-between; align-items: center; background: #ffffff; padding: 12px 40px; box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05); border-bottom: 3px solid #7a1b30; }
.navbar-left h2 { margin: 0; color: #7a1b30; font-size: 1.4rem; letter-spacing: 1px; font-weight: 700; }
.navbar-right { display: flex; align-items: center; gap: 24px; }
.overview-btn { background: #f8fafc; color: #1e293b; border: 1px solid #cbd5e1; padding: 8px 16px; border-radius: 6px; font-size: 0.9rem; font-weight: 600; cursor: pointer; transition: all 0.2s ease; }
.overview-btn:hover { background: #7a1b30; color: #ffffff; border-color: #7a1b30; box-shadow: 0 2px 8px rgba(122, 27, 48, 0.15); }
.profile-info { display: flex; flex-direction: column; text-align: right; border-left: 2px solid #e2e8f0; padding-left: 24px; }
.profile-name { font-size: 0.95rem; font-weight: 600; color: #1e293b; }
.profile-email { font-size: 0.8rem; color: #64748b; }
.logout-btn-nav { background: none; border: none; color: #475569; font-size: 0.9rem; font-weight: 600; cursor: pointer; transition: color 0.2s ease; padding: 0; }
.logout-btn-nav:hover { color: #7a1b30; text-decoration: underline; }

/* --- Sub-Navbar Action Bar --- */
.action-bar { display: flex; justify-content: flex-end; gap: 15px; padding: 20px 40px 0; width: 100%; box-sizing: border-box; }
.action-btn { background: #ffffff; color: #7a1b30; border: 2px solid #7a1b30; padding: 8px 24px; border-radius: 6px; font-size: 0.95rem; font-weight: 600; cursor: pointer; transition: all 0.2s ease; box-shadow: 0 2px 5px rgba(0,0,0,0.05); }
.action-btn:hover { background: #7a1b30; color: #ffffff; box-shadow: 0 4px 10px rgba(122, 27, 48, 0.2); }

/* --- Main Content Area --- */
.dashboard-content { padding: 20px 40px 40px 40px; display: flex; justify-content: center; }
.dashboard-card { background: #ffffff; border-radius: 12px; box-shadow: 0 10px 25px rgba(0, 0, 0, 0.04); width: 100%; max-width: 1000px; padding: 40px; }
.dashboard-card h3 { color: #1e293b; margin-top: 0; font-size: 1.5rem; border-bottom: 1px solid #f1f5f9; padding-bottom: 15px; margin-bottom: 20px; }
.overview-section { margin-bottom: 30px; padding-bottom: 20px; border-bottom: 1px solid #f1f5f9; }
.overview-text { color: #475569; line-height: 1.7; font-size: 1rem; margin-bottom: 15px; }

/* --- Image Overlay Simulator --- */
.test-bed-container { display: flex; flex-direction: column; align-items: center; margin-top: 10px; }
.test-bed-container h3 { color: #1e293b; font-size: 1.3rem; margin-bottom: 20px; }
.image-simulator-scene { position: relative; width: 100%; max-width: 500px; aspect-ratio: 3 / 4; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; margin-bottom: 30px; overflow: hidden; box-shadow: inset 0 4px 10px rgba(0, 0, 0, 0.05); }
.static-frame-img { position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: contain; z-index: 1; }
.dynamic-bed-img { position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: contain; z-index: 2; transition: transform 0.15s linear; transform-origin: 75% 82%; }

/* --- Controls Section --- */
.controls-container { background: #ffffff; padding: 25px 40px; border-radius: 12px; border: 1px solid #e2e8f0; display: flex; flex-direction: column; align-items: center; gap: 15px; box-shadow: 0 4px 15px rgba(0, 0, 0, 0.03); width: 100%; max-width: 400px; }
.controls-container label { font-weight: 700; color: #7a1b30; font-size: 1.2rem; }
.angle-slider { width: 100%; cursor: pointer; accent-color: #7a1b30; }
.slider-labels { display: flex; justify-content: space-between; width: 100%; font-size: 0.8rem; color: #64748b; font-weight: 600; }
`;

// Integrated Auth Component
const Auth = ({ onLoginSuccess }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!isLogin && formData.password !== formData.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        const endpoint = isLogin ? '/api/login' : '/api/signup';
        const payload = isLogin 
            ? { email: formData.email, password: formData.password }
            : { username: formData.username, email: formData.email, password: formData.password };

        try {
            const response = await fetch(`http://localhost:5000${endpoint}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            }).catch(() => null); 
            
            if (response && response.ok) {
                const data = await response.json();
                alert(data.message); 
                
                if (!isLogin) {
                    setIsLogin(true);
                    setFormData({ username: '', email: '', password: '', confirmPassword: '' });
                } else {
                    onLoginSuccess(data.user);
                }
            } else {
                console.warn("Backend not found, utilizing preview mock auth...");
                if (!isLogin) {
                    alert("Mock: User registered successfully!");
                    setIsLogin(true);
                } else {
                    alert("Mock: Welcome back!");
                    onLoginSuccess({ username: formData.email.split('@')[0], email: formData.email });
                }
            }
        } catch (err) {
            console.error("Backend connection error:", err);
            alert("Could not connect to the backend server.");
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <div className="auth-sidebar">
                    <div style={{ width: '150px', height: '150px', background: '#fff', borderRadius: '8px', marginBottom: '15px' }} className="sidebar-logo">
                        <span style={{color: '#7a1b30', display: 'flex', height: '100%', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold'}}>LOGO</span>
                    </div>
                    <h1>LANDSLIDE</h1>
                    <h2>Digital Twin Platform</h2>
                </div>
                
                <div className="auth-main-form">
                    <h3 className="auth-title">{isLogin ? 'Sign In' : 'Create Account'}</h3>
                    
                    <form onSubmit={handleSubmit} className="auth-form">
                        {!isLogin && (
                            <div className="form-group">
                                <label>Username</label>
                                <input 
                                    type="text" name="username" value={formData.username} 
                                    onChange={handleChange} placeholder="Enter your full name" required 
                                />
                            </div>
                        )}
                        <div className="form-group">
                            <label>Email Address</label>
                            <input 
                                type="email" name="email" value={formData.email} 
                                onChange={handleChange} placeholder="name@example.com" required 
                            />
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input 
                                type="password" name="password" value={formData.password} 
                                onChange={handleChange} placeholder="••••••••" required 
                            />
                        </div>
                        {!isLogin && (
                            <div className="form-group">
                                <label>Confirm Password</label>
                                <input 
                                    type="password" name="confirmPassword" value={formData.confirmPassword} 
                                    onChange={handleChange} placeholder="••••••••" required 
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

// Main App Component
export default function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [showOverview, setShowOverview] = useState(false); 
  const [tiltAngle, setTiltAngle] = useState(0); 
  
  // State to track which view is currently active
  const [activeView, setActiveView] = useState('simulator'); // Options: 'simulator', 'newTest', 'history', 'tutorial'

  const handleLogout = () => {
    setCurrentUser(null);
  };

  return (
    <>
      <style>{globalCSS}</style>
      <div className="App">
        {currentUser ? (
          <div className="dashboard-container">
            
            {/* Top Navigation Bar */}
            <nav className="dashboard-navbar">
              <div className="navbar-left">
                <h2>LANDSLIDE</h2>
              </div>
              
              <div className="navbar-right">
                <button 
                  className="overview-btn" 
                  onClick={() => setShowOverview(!showOverview)}
                >
                  {showOverview ? 'Hide Overview' : 'Overview'}
                </button>
                
                <div className="profile-info">
                  <span className="profile-name">{currentUser.username || 'Explorer'}</span>
                  <span className="profile-email">{currentUser.email}</span>
                </div>
                
                <button className="logout-btn-nav" onClick={handleLogout}>Log Out</button>
              </div>
            </nav>

            {/* ACTION BAR - Triggers the state changes to update the view */}
            <div className="action-bar">
                <button className="action-btn" onClick={() => setActiveView('newTest')}>New Test</button>
                <button className="action-btn" onClick={() => setActiveView('history')}>History</button>
                <button className="action-btn" onClick={() => setActiveView('tutorial')}>Tutorial</button>
                
                {/* Dynamically show a Back button if they are not on the main simulator view */}
                {activeView !== 'simulator' && (
                    <button className="action-btn" style={{ background: '#f8fafc', color: '#475569', borderColor: '#cbd5e1' }} onClick={() => setActiveView('simulator')}>
                        Back to Simulator
                    </button>
                )}
            </div>

            <div className="dashboard-content">
              <div className="dashboard-card">
                
                {showOverview && (
                  <div className="overview-section">
                    <h3>System Overview</h3>
                    <p className="overview-text">
                      Welcome to the Digital Twin platform. This system utilizes an integrated IoT, GIS, 
                      and Remote Sensing approach for dynamic slope stability assessment. Monitor real-time 
                      soil moisture telemetry and adjust simulation parameters below to evaluate failure thresholds 
                      under varying environmental conditions.
                    </p>
                  </div>
                )}

                {/* --- CONDITIONAL RENDERING BASED ON ACTIVE VIEW --- */}
                
                {/* 1. New Test View (loads the new component) */}
                {activeView === 'newTest' && (
                    <NewTest />
                )}

                {/* 2. History View Placeholder */}
                {activeView === 'history' && (
                    <div style={{ textAlign: 'center', padding: '40px' }}>
                        <h3>Test History</h3>
                        <p style={{ color: '#64748b' }}>Your previous slope stability assessments will appear here.</p>
                    </div>
                )}

                {/* 3. Tutorial View Placeholder */}
                {activeView === 'tutorial' && (
                    <div style={{ textAlign: 'center', padding: '40px' }}>
                        <h3>Tutorial</h3>
                        <p style={{ color: '#64748b' }}>Learn how to calibrate soil moisture and telemetry sensors.</p>
                    </div>
                )}

                {/* 4. Default Simulator View */}
                {activeView === 'simulator' && (
                    <div className="test-bed-container">
                      <h3>Slope Stability Simulator</h3>
                      
                      <div className="image-simulator-scene">
                        <div className="static-frame-img" style={{background: '#cbd5e1', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                            <span style={{color: '#475569', fontWeight: 'bold'}}>FRAME.jpg (Background)</span>
                        </div>
                        
                        <div 
                          className="dynamic-bed-img" 
                          style={{ 
                              transform: `rotate(${-tiltAngle * 0.6}deg)`,
                              background: 'rgba(122, 27, 48, 0.7)',
                              borderTop: '2px solid #7a1b30',
                              display: 'flex', 
                              alignItems: 'center', 
                              justifyContent: 'center',
                              clipPath: 'polygon(0 50%, 100% 50%, 100% 100%, 0% 100%)' 
                          }} 
                        >
                            <span style={{color: '#fff', fontWeight: 'bold', transform: `rotate(${tiltAngle * 0.6}deg)`}}>BED.jpg (Tilting Overlay)</span>
                        </div>
                      </div>

                      <div className="controls-container">
                        <label>Slope Angle: {tiltAngle}°</label>
                        <input 
                          type="range" 
                          min="0" 
                          max="60" 
                          value={tiltAngle} 
                          onChange={(e) => setTiltAngle(e.target.value)}
                          className="angle-slider"
                        />
                        <div className="slider-labels">
                          <span>0° (Flat)</span>
                          <span>60° (Critical)</span>
                        </div>
                      </div>
                    </div>
                )}

              </div>
            </div>

          </div>
        ) : (
          <Auth onLoginSuccess={(user) => setCurrentUser(user)} />
        )}
      </div>
    </>
  );
}
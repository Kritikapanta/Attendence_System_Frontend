import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/landing.css';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/login');
  };

  return (
    <div className="landing-container">
      <div className="landing-content">
        {/* Center Image */}
        <div className="image-container">
          <img 
            src={require('../assets/center_pic.png')} 
            alt="Attendance System" 
            className="center-image"
          />
        </div>

        {/* Quote */}
        <div className="quote-container">
          <p className="quote-text">Your time matters. Make today count.</p>
        </div>

        {/* Get Started Button */}
        <div className="button-container">
          <button className="get-started-btn" onClick={handleGetStarted}>
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
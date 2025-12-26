import React, { useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { database } from '../config/firebase';
import { ref, set } from 'firebase/database';
import '../styles/signup.css';

const Signup = () => {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const videoRef = useRef(null);
  const [userType, setUserType] = useState('employee');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [jobRole, setJobRole] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [cameraPermission, setCameraPermission] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);
  const [stream, setStream] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email.toLowerCase());
  };

  const validateAdminEmail = (email) => {
    return email === 'pantakritika5@gmail.com';
  };

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'user' } 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
      
      setStream(mediaStream);
      setCameraPermission(true);
      setCameraActive(true);
    } catch (error) {
      console.error('Error accessing camera:', error);
      setError('Camera permission denied. You need to scan your face to signup.');
      setCameraPermission(false);
      setCameraActive(false);
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setCameraActive(false);
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    // Validation
    if (!fullName.trim()) {
      return setError('Please enter your full name.');
    }

    if (!validateEmail(email)) {
      return setError('Please enter a valid email address.');
    }

    if (userType === 'admin' && !validateAdminEmail(email)) {
      return setError('Only pantakritika5@gmail.com can sign up as admin.');
    }

    if (userType === 'employee' && !jobRole.trim()) {
      return setError('Please enter your job role.');
    }

    if (userType === 'employee' && !cameraPermission) {
      return setError('You need to scan your face to signup as an employee.');
    }

    if (password.length < 8) {
      return setError('Password must be at least 8 characters.');
    }

    if (password !== confirmPassword) {
      return setError('Passwords do not match.');
    }

    try {
      setError('');
      setLoading(true);
      
      // Create user in Firebase Authentication
      const userCredential = await signup(email, password);
      const user = userCredential.user;
      
      // Save user data to Realtime Database
      await set(ref(database, 'users/' + user.uid), {
        uid: user.uid,
        fullName,
        email,
        userType,
        jobRole: userType === 'employee' ? jobRole : 'Admin',
        createdAt: new Date().toISOString(),
        cameraPermission: userType === 'employee'
      });

      alert('Signup successful! You can now login.');
      navigate('/login');
      
      // Clean up camera
      stopCamera();
    } catch (error) {
      setError('Signup Error: ' + error.message);
    }
    setLoading(false);
  };

  const handleUserTypeChange = (type) => {
    setUserType(type);
    if (type === 'admin' && cameraActive) {
      stopCamera();
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-form-container">
        <div className="signup-form-header">
          <h1 className="signup-title">Sign Up</h1>
          <button 
            className="close-button"
            onClick={() => navigate('/')}
            type="button"
          >
            ×
          </button>
        </div>

        {error && <div className="error-message">{error}</div>}

        <div className="user-type-container">
          <div className="radio-option">
            <input
              type="radio"
              id="admin"
              name="userType"
              checked={userType === 'admin'}
              onChange={() => handleUserTypeChange('admin')}
              className="radio-input"
            />
            <label htmlFor="admin" className="radio-label">
              <span className="radio-circle"></span>
              Administrator
            </label>
          </div>
          
          <div className="radio-option">
            <input
              type="radio"
              id="employee"
              name="userType"
              checked={userType === 'employee'}
              onChange={() => handleUserTypeChange('employee')}
              className="radio-input"
            />
            <label htmlFor="employee" className="radio-label">
              <span className="radio-circle"></span>
              Employee
            </label>
          </div>
        </div>

        <form onSubmit={handleSignup}>
          <label className="signup-label">
            Full Name:
          </label>
          <input
            type="text"
            className="signup-input"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />

          <label className="signup-label">
            Email:
          </label>
          <input
            type="email"
            className="signup-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoCapitalize="none"
            required
          />

          {userType === 'employee' && (
            <>
              <label className="signup-label">
                Job Role:
              </label>
              <input
                type="text"
                className="signup-input"
                value={jobRole}
                onChange={(e) => setJobRole(e.target.value)}
                required={userType === 'employee'}
              />

              <div className="camera-section">
                <label className="signup-label">
                  Face Scan:
                </label>
                <button
                  type="button"
                  className="camera-button"
                  onClick={cameraActive ? stopCamera : startCamera}
                >
                  {cameraActive ? 'Stop Camera' : 'Open Camera'}
                </button>
                
                {cameraActive && (
                  <div className="video-container">
                    <video
                      ref={videoRef}
                      autoPlay
                      playsInline
                      className="camera-video"
                    />
                  </div>
                )}
                
                {cameraPermission && (
                  <p className="camera-status">✓ Camera permission granted</p>
                )}
              </div>
            </>
          )}

          <label className="signup-label">
            Password:
          </label>
          <input
            type="password"
            className="signup-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <label className="signup-label">
            Confirm Password:
          </label>
          <input
            type="password"
            className="signup-input"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          <div className="signup-button-container">
            <button 
              type="submit" 
              className="signup-button"
              disabled={loading}
            >
              {loading ? 'Signing up...' : 'Confirm'}
            </button>
          </div>
        </form>
      </div>

      <div className="signup-footer">
        <p className="signup-footer-text">
          Already have an account?{' '}
          <Link to="/login" className="signup-login-link">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
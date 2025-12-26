import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { database } from '../config/firebase';
import { ref, set } from 'firebase/database';
import '../styles/signup.css';

const Signup = () => {
  const navigate = useNavigate();
  const { signup } = useAuth();

  const [userType, setUserType] = useState('employee');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email.toLowerCase());
  };

  const validateAdminEmail = (email) => {
    return email === 'pantakritika5@gmail.com';
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
        createdAt: new Date().toISOString()
      });

      alert('Signup successful! You can now login.');
      navigate('/login');
    } catch (error) {
      setError('Signup Error: ' + error.message);
    }

    setLoading(false);
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
              onChange={() => setUserType('admin')}
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
              onChange={() => setUserType('employee')}
              className="radio-input"
            />
            <label htmlFor="employee" className="radio-label">
              <span className="radio-circle"></span>
              Employee
            </label>
          </div>
        </div>

        <form onSubmit={handleSignup}>
          <label className="signup-label">Full Name:</label>
          <input
            type="text"
            className="signup-input"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />

          <label className="signup-label">Email:</label>
          <input
            type="email"
            className="signup-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoCapitalize="none"
            required
          />

          <label className="signup-label">Password:</label>
          <input
            type="password"
            className="signup-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <label className="signup-label">Confirm Password:</label>
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

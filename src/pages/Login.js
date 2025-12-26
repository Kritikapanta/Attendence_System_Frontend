import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { database } from '../config/firebase';
import { ref, get } from 'firebase/database';
import '../styles/login.css';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Function to find user by email in database
  const findUserByEmail = async (email) => {
    try {
      const usersRef = ref(database, 'users');
      const snapshot = await get(usersRef);
      console.log('Database snapshot:', snapshot.exists()); // Debug log
      
      if (snapshot.exists()) {
        const users = snapshot.val();
        console.log('All users in database:', users); // Debug log
        
        // Find user with matching email
        for (const userId in users) {
          console.log('Checking user:', users[userId].email, 'against:', email); // Debug
          if (users[userId].email === email) {
            console.log('User found! Type:', users[userId].userType); // Debug
            return users[userId];
          }
        }
      }
      console.log('No user found with email:', email); // Debug
      return null;
    } catch (error) {
      console.error('Error finding user:', error);
      return null;
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      setError('');
      setLoading(true);
      
      console.log('Attempting login with:', email); // Debug
      
      // 1. Login with Firebase Authentication
      await login(email, password);
      console.log('Firebase login successful'); // Debug
      
      // 2. Find user in database to get userType
      const userData = await findUserByEmail(email);
      console.log('User data found:', userData); // Debug
      
      // 3. Redirect based on userType
      if (userData) {
        console.log('User type:', userData.userType); // Debug
        if (userData.userType === 'admin') {
          console.log('Redirecting to /administrator'); // Debug
          navigate('/administrator');
        } else {
          console.log('Redirecting to /attendance'); // Debug
          navigate('/attendance');
        }
      } else {
        console.log('No user data found, redirecting to attendance'); // Debug
        // If user data not found, redirect to attendance as default
        navigate('/attendance');
      }
      
    } catch (error) {
      console.error('Login error:', error); // Debug
      setError('Failed to log in: ' + error.message);
      alert('Login Failed: ' + error.message);
    }
    setLoading(false);
  };

  return (
    <div className="login-container">
      <div className="login-form-container">
        <div className="login-form-header">
          <h1 className="login-title">Log In</h1>
          <button 
            className="close-button"
            onClick={() => navigate('/')}
            type="button"
          >
            ×
          </button>
        </div>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleLogin}>
          <label className="login-label">
            Email:
          </label>
          <input
            type="email"
            className="login-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoCapitalize="none"
            required
          />

          <label className="login-label">
            Password:
          </label>
          <input
            type="password"
            className="login-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <div className="login-button-container">
            <button 
              type="submit" 
              className="login-button"
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Confirm'}
            </button>
          </div>
        </form>
      </div>

      <div className="login-footer">
        <p className="login-footer-text">
          If you don't have an account, please {' '}
          <Link to="/signup" className="login-signup-link">
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
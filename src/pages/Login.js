import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/login.css';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      setError('');
      setLoading(true);
      await login(email, password);
      navigate('/attendance');
    } catch (error) {
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
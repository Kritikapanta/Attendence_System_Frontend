import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { database } from '../config/firebase';
import { ref, set } from 'firebase/database';
import '../styles/register.css';

const Register = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('employee');
  const [jobRole, setJobRole] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email.toLowerCase());
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!fullName.trim()) {
      return setError('Please enter full name.');
    }

    if (!validateEmail(email)) {
      return setError('Please enter a valid email address.');
    }

    if (password.length < 8) {
      return setError('Password must be at least 8 characters.');
    }

    if (userType === 'employee' && !jobRole.trim()) {
      return setError('Please enter job role for employee.');
    }

    try {
      setError('');
      setLoading(true);

      // In a real app, you would create the user using Firebase Admin SDK on backend
      // For frontend demo, we'll just save to database
      const userId = Date.now().toString(); // Temporary ID
      
      await set(ref(database, 'users/' + userId), {
        id: userId,
        fullName,
        email,
        userType,
        jobRole: userType === 'employee' ? jobRole : 'Administrator',
        createdBy: currentUser?.email || 'admin',
        createdAt: new Date().toISOString(),
        password: password // ⚠️ In real app, NEVER store plain passwords!
      });

      alert('User registered successfully!');
      navigate('/administrator');
    } catch (error) {
      setError('Registration failed: ' + error.message);
    }
    setLoading(false);
  };

  return (
    <div className="register-container">
      <div className="register-form-container">
        <div className="register-form-header">
          <h1 className="register-title">Register New User</h1>
          <button 
            className="close-button"
            onClick={() => navigate('/administrator')}
            type="button"
          >
            ×
          </button>
        </div>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleRegister}>
          <div className="user-type-container">
            <div className="radio-option">
              <input
                type="radio"
                id="admin-reg"
                name="userType"
                checked={userType === 'admin'}
                onChange={() => setUserType('admin')}
                className="radio-input"
              />
              <label htmlFor="admin-reg" className="radio-label">
                <span className="radio-circle"></span>
                Administrator
              </label>
            </div>
            
            <div className="radio-option">
              <input
                type="radio"
                id="employee-reg"
                name="userType"
                checked={userType === 'employee'}
                onChange={() => setUserType('employee')}
                className="radio-input"
              />
              <label htmlFor="employee-reg" className="radio-label">
                <span className="radio-circle"></span>
                Employee
              </label>
            </div>
          </div>

          <label className="register-label">
            Full Name:
          </label>
          <input
            type="text"
            className="register-input"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />

          <label className="register-label">
            Email:
          </label>
          <input
            type="email"
            className="register-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          {userType === 'employee' && (
            <>
              <label className="register-label">
                Job Role:
              </label>
              <input
                type="text"
                className="register-input"
                value={jobRole}
                onChange={(e) => setJobRole(e.target.value)}
                required
              />
            </>
          )}

          <label className="register-label">
            Password:
          </label>
          <input
            type="password"
            className="register-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <div className="register-button-container">
            <button 
              type="submit" 
              className="register-button"
              disabled={loading}
            >
              {loading ? 'Registering...' : 'Register User'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
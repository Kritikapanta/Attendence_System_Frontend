import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/administrator.css';

const Administrator = () => {
  const navigate = useNavigate();

  const handleAddUser = () => {
    navigate('/register');
  };

  const handleRemoveUser = () => {
    navigate('/remove-user');
  };

  return (
    <div className="admin-container">
      <h1 className="admin-title">Administrator Dashboard</h1>
      
      <div className="admin-grid">
        {/* Add New User Card */}
        <div className="admin-card" onClick={handleAddUser}>
          <div className="card-icon add-icon">+</div>
          <h2 className="card-title">Add New User</h2>
          <p className="card-description">Register a new employee or administrator</p>
          <button className="card-button add-button">
            Add User
          </button>
        </div>

        {/* Remove User Card */}
        <div className="admin-card" onClick={handleRemoveUser}>
          <div className="card-icon remove-icon">−</div>
          <h2 className="card-title">Remove User</h2>
          <p className="card-description">Remove an existing user from the system</p>
          <button className="card-button remove-button">
            Remove User
          </button>
        </div>
      </div>
    </div>
  );
};

export default Administrator;
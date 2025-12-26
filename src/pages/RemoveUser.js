import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { database } from '../config/firebase';
import { ref, get, remove } from 'firebase/database';
import '../styles/removeuser.css';

const RemoveUser = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const usersRef = ref(database, 'users');
      const snapshot = await get(usersRef);
      
      if (snapshot.exists()) {
        const usersData = snapshot.val();
        const usersList = Object.keys(usersData).map(key => ({
          id: key,
          ...usersData[key]
        }));
        setUsers(usersList);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleRemoveUser = async (e) => {
    e.preventDefault();

    if (!selectedUser) {
      return setError('Please select a user to remove.');
    }

    try {
      setError('');
      setSuccess('');
      setLoading(true);

      await remove(ref(database, 'users/' + selectedUser));
      
      setSuccess('User removed successfully!');
      setSelectedUser('');
      fetchUsers(); // Refresh the list
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(''), 3000);
    } catch (error) {
      setError('Failed to remove user: ' + error.message);
    }
    setLoading(false);
  };

  return (
    <div className="removeuser-container">
      <div className="removeuser-form-container">
        <div className="removeuser-form-header">
          <h1 className="removeuser-title">Remove User</h1>
          <button 
            className="close-button"
            onClick={() => navigate('/administrator')}
            type="button"
          >
            ×
          </button>
        </div>

        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}

        <form onSubmit={handleRemoveUser}>
          <label className="removeuser-label">
            Select User to Remove:
          </label>
          <select
            className="removeuser-select"
            value={selectedUser}
            onChange={(e) => setSelectedUser(e.target.value)}
            required
          >
            <option value="">-- Select a user --</option>
            {users.map(user => (
              <option key={user.id} value={user.id}>
                {user.fullName} ({user.email}) - {user.userType}
              </option>
            ))}
          </select>

          {selectedUser && (
            <div className="user-details">
              <h3>User Details:</h3>
              {users.find(u => u.id === selectedUser) && (
                <>
                  <p><strong>Name:</strong> {users.find(u => u.id === selectedUser).fullName}</p>
                  <p><strong>Email:</strong> {users.find(u => u.id === selectedUser).email}</p>
                  <p><strong>Type:</strong> {users.find(u => u.id === selectedUser).userType}</p>
                  {users.find(u => u.id === selectedUser).jobRole && (
                    <p><strong>Job Role:</strong> {users.find(u => u.id === selectedUser).jobRole}</p>
                  )}
                </>
              )}
            </div>
          )}

          <div className="removeuser-button-container">
            <button 
              type="submit" 
              className="removeuser-button"
              disabled={loading || !selectedUser}
            >
              {loading ? 'Removing...' : 'Remove User'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RemoveUser;
import React from 'react';
import { useAuth } from '../context/AuthContext';
import '../styles/attendance.css';

const Attendance = () => {
  const { currentUser, userData } = useAuth();

  return (
    <div className="attendance-container">
      <h1 className="attendance-title">Attendance Dashboard</h1>
      
      <div className="welcome-section">
        <h2>Welcome, {userData?.fullName || currentUser?.email || 'User'}!</h2>
        <p className="user-role">
          Role: {userData?.userType === 'admin' ? 'Administrator' : 'Employee'}
          {userData?.jobRole && ` (${userData.jobRole})`}
        </p>
      </div>
      
      <div className="attendance-info">
        <p>This page will later show face recognition attendance.</p>
        <div className="placeholder-box">
          <h3>Attendance Features Coming Soon:</h3>
          <ul>
            <li>✅ Face Recognition Login</li>
            <li>✅ Check-in / Check-out</li>
            <li>✅ Attendance History</li>
            <li>✅ Monthly Reports</li>
            <li>✅ Real-time Tracking</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Attendance;
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Attendance from './pages/Attendance';
import Administrator from './pages/Administrator'; // Add this
import Register from './pages/Register'; // Add this
import RemoveUser from './pages/RemoveUser'; // Add this
import Navbar from './components/Navbar';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/attendance" element={<Attendance />} />
            <Route path="/administrator" element={<Administrator />} />
            <Route path="/register" element={<Register />} />
            <Route path="/remove-user" element={<RemoveUser />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
import React from "react";
import "./../styles/navbar.css";

function Navbar() {
  return (
    <div className="navbar">
      <h2>Attendance System</h2>
      <div className="nav-links">
        <a href="/">Home</a>
        <a href="/login">Login</a>
      </div>
    </div>
  );
}

export default Navbar;

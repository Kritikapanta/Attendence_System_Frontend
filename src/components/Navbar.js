import React from "react";
import { Link } from "react-router-dom";
import "../styles/navbar.css";
import logo from "../assets/logo.png";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-left">
        <img src={logo} alt="Logo" className="nav-logo" />
      </div>

      <div className="nav-right">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/login" className="nav-link login-btn">Login</Link>
      </div>
    </nav>
  );
};

export default Navbar;
import React from "react";
import "./../styles/landing.css";

function LandingPage() {
  return (
    <div className="landing-container">
      <h1>Welcome to the Smart Attendance System</h1>
      <p>Face recognition based automatic attendance recording.</p>

      <a href="/login">
        <button className="btn">Get Started</button>
      </a>
    </div>
  );
}

export default LandingPage;

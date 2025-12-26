import React, { useState } from "react";
import "../styles/Attendance.css"; 
function Attendance() { 
  const [message, setMessage] = useState("");

  const markAttendance = async () => {
    setMessage("📷 Scanning face...");

    // Simulated API call
    setTimeout(() => {
      setMessage("✅ Attendance marked successfully");
    }, 2000);
  };

  return (
    <div className="attendance-page">
      <h2>Face Recognition Attendance</h2>

      <div className="attendance-box">
        <button className="camera-btn" onClick={markAttendance}>
          Mark Attendance
        </button>

        <p>{message}</p>
      </div>
    </div>
  );
}

export default Attendance; 

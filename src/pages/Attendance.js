import React, { useState, useRef } from "react";
import "../styles/Attendance.css"; 

function Attendance() { 
  const [message, setMessage] = useState("");
  const [cameraActive, setCameraActive] = useState(false);
  const [stream, setStream] = useState(null);
  const videoRef = useRef(null);

  // Open camera
  const openCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
      setStream(mediaStream);
      setCameraActive(true);

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        videoRef.current.muted = true; 
        await videoRef.current.play(); 
      }

      setMessage("📷 Camera opened. Ready to mark attendance.");
    } catch (err) {
      alert("Cannot access camera: " + err.message);
    }
  };

  // Stop camera
  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setCameraActive(false);
      setStream(null);
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
    }
  };

  // Mark attendance (simulate face recognition)
  const markAttendance = () => {
    if (!cameraActive) {
      alert("Please open the camera first!");
      return;
    }

    setMessage("📷 Scanning face...");
    
    setTimeout(() => {
      setMessage("✅ Attendance marked successfully");
      stopCamera();
    }, 2000);
  };

  return (
    <div className="attendance-page">
      <h2>Face Recognition Attendance</h2>

      <div className="attendance-box">
        {!cameraActive && (
          <button className="camera-btn" onClick={openCamera}>
            Open Camera
          </button>
        )}

        {cameraActive && (
          <div className="camera-container">
            <video ref={videoRef} autoPlay playsInline width="300" />
            <div>
              <button className="camera-btn" onClick={markAttendance}>
                Mark Attendance
              </button>
              <button className="camera-btn" onClick={stopCamera}>
                Close Camera
              </button>
            </div>
          </div>
        )}

        <p>{message}</p>
      </div>
    </div>
  );
}

export default Attendance;

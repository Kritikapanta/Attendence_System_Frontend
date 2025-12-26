import React, { useState } from "react";
import "../styles/Register.css";   // ✅ correct relative path

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    dob: "",
    phone: "",
    email: "",
    position: "",
    responsibilities: "",
    password: "",
    confirmPassword: "",
  });

  const [faceRecognized, setFaceRecognized] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!faceRecognized) {
      alert("Please complete face recognition before submitting!");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    console.log("Form Data Submitted:", formData);
    alert("Registration Successful!");
  };

  const handleCameraClick = () => {
    const recognized = window.confirm("Simulate face recognition success?");
    setFaceRecognized(recognized);

    if (recognized) {
      alert("Face recognized successfully!");
    } else {
      alert("Face recognition failed. Try again.");
    }
  };

  return (
    <div className="signup-container">
      <h1>Register</h1>

      <form onSubmit={handleSubmit}>
        <h3>Employee Details</h3>

        <div className="name-flex">
          <div className="input-group">
            <label htmlFor="firstName">First Name</label>
            <input id="firstName" value={formData.firstName} onChange={handleChange} required />
          </div>

          <div className="input-group">
            <label htmlFor="middleName">Middle Name</label>
            <input id="middleName" value={formData.middleName} onChange={handleChange} />
          </div>

          <div className="input-group">
            <label htmlFor="lastName">Last Name</label>
            <input id="lastName" value={formData.lastName} onChange={handleChange} required />
          </div>
        </div>

        <div className="input-group">
          <label htmlFor="dob">Date of Birth</label>
          <input type="date" id="dob" value={formData.dob} onChange={handleChange} required />
        </div>

        <h3>Contact</h3>

        <div className="input-group">
          <label htmlFor="phone">Phone Number</label>
          <input id="phone" value={formData.phone} onChange={handleChange} required />
        </div>

        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" value={formData.email} onChange={handleChange} required />
        </div>

        <h3>Position & Responsibilities</h3>

        <div className="input-group">
          <label htmlFor="position">Position</label>
          <input id="position" value={formData.position} onChange={handleChange} required />
        </div>

    

        <div className="button-group">
          <button type="submit" className="submit-btn" disabled={!faceRecognized}>
            Submit
          </button>

          <button type="button" className="camera-btn" onClick={handleCameraClick}>
            Open Camera
          </button>
        </div>

        {!faceRecognized && (
          <p>Please complete face recognition before submitting.</p>
        )}
      </form>
    </div>
  );
};

export default Register;

import React, { useState } from "react";
import "../styles/removeuser.css";
import removeIcon from "../assets/remove.gif";

const Removeuser = () => {
  const [userData, setUserData] = useState({
    email: "",
    reason: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setUserData({ ...userData, [id]: value });
  };

  const handleRemove = (e) => {
    e.preventDefault();

    if (!userData.email) {
      alert("Please enter user email!");
      return;
    }

    const confirmDelete = window.confirm(
      `Are you sure you want to remove user with email: ${userData.email}?`
    );

    if (!confirmDelete) return;

    console.log("User Removed:", userData);
    alert("User removed successfully!");

    setUserData({
      email: "",
      reason: "",
    });
  };

  return (
    <div className="remove-container">
      
      {/* Remove Icon */}
      <img src={removeIcon} alt="Remove User" className="remove-icon" />

      <h1>Remove User</h1>

      <form onSubmit={handleRemove}>
        <div className="input-group">
          <label htmlFor="email">Employee Email</label>
          <input
            type="email"
            id="email"
            value={userData.email}
            onChange={handleChange}
            placeholder="Enter employee email"
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="reason">Reason (optional)</label>
          <textarea
            id="reason"
            value={userData.reason}
            onChange={handleChange}
            placeholder="Reason for removal"
          />
        </div>

        <button type="submit" className="remove-btn">
          Remove User
        </button>
      </form>
    </div>
  );
};

export default Removeuser;

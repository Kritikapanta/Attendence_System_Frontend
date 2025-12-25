import React from "react";

function Login() {
  return (
    <div style={{ padding: "30px" }}>
      <h2>Login</h2>
      <input type="text" placeholder="Enter your email" /><br/><br/>
      <input type="password" placeholder="Enter your password" /><br/><br/>
      <button>Login</button>
    </div>
  );
}

export default Login;

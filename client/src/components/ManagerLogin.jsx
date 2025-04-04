import React, { useState } from 'react';
import { Link } from "react-router-dom";

const ManagerLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State for checkbox

  function handleUsernameChange(event) {
    setUsername(event.target.value);
    checkInputs(event.target.value, password); // Update checkbox state
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
    checkInputs(username, event.target.value); // Update checkbox state
  }

  function handleCheckboxChange() {
    if (password) {
      setShowPassword(!showPassword);
    } else {
      setShowPassword(false);
    }
  }

  function checkInputs(user, pass) {
    if (!user && !pass) {
      setShowPassword(false); // Uncheck if both fields are empty
    }
  }

  return (
    <div className="login-body">
      <h2 className="login-header">Welcome!</h2>
      <div className='login-card'>
        <input
          className="username-text"
          type="text"
          value={username}
          placeholder="Username"
          onChange={handleUsernameChange}
        /> <br />
        <input
          className="password-text"
          type={showPassword ? "text" : "password"} // Toggle password visibility
          value={password}
          placeholder="Password"
          onChange={handlePasswordChange}
        /> <br />
        <input
          className="show"
          type="checkbox"
          checked={showPassword} // Controlled checkbox state
          onChange={handleCheckboxChange}
        /> Show Password <br />
        <Link to="/Manager">
          <button className="login">Login</button>
        </Link>
      </div>
      <p>Username: {username}</p>
      <p>Password: {password}</p>
      <Link to="/">
        <button>Go to Home Page</button>
      </Link>
    </div>
  );
};

export default ManagerLogin;

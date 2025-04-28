import React, { useState, useContext } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { GlobalContext } from './GlobalContext';

const ManagerLogin = () => {
  const navigate = useNavigate();
  const {setLoginID} = useContext(GlobalContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State for checkbox

  function handleUsernameChange(event) {
    const val = event.target.value;
    if(val === "" || /^\d+$/.test(val)){
      setUsername(val);
    }
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

  const handleLogin = () => {
    if(/^\d+$/.test(username)){
      setLoginID(Number(username));
      navigate(`/Manager`);
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
        <button className="login" onClick={handleLogin}>Login</button>
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

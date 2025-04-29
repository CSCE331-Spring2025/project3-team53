import React, { useState, useContext } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { GoogleSignIn } from './GoogleSignIn';
import { GlobalContext } from './GlobalContext';
import * as func from '../apiCall'

const OverallLogin = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State for checkbox
  const {setCustomerLoggedIn} = useContext(GlobalContext);

  function handleUsernameChange(event) {
    let val = event.target.value;
    if(/^[a-zA-Z0-9-_]*$/.test(val) || val === ""){
      setUsername(val);
    }
    checkInputs(val, password); // Update checkbox state
  }

  function handlePasswordChange(event) {
    let val = event.target.value;
    if(!val.includes(' ')){
      setPassword(event.target.value);
    }
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

  const handleSignOn = async () => {
    if (username && password){
      let res = await func.login_signup(username,password);
      console.log(res);
      if(!res.error){
        func.dequeue_order(0);
        setCustomerLoggedIn(username);
        navigate('/CustomerOptions');
      }
    }
  }

  const handleLogIn = async () => {
    if (username && password){
      let res = await func.login_signin(username,password,false);
      console.log(res);
      if(!res.error){
        func.dequeue_order(0);
        let savedCart = JSON.parse(res.data);
        savedCart.forEach(element => {
          func.enqueue_order(element[0], element[1], element[2], element[3], element[4]);
        });
        setCustomerLoggedIn(username);
        navigate('/CustomerOptions');
      }
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
          type={showPassword ? "text" : "password"} 
          value={password}
          placeholder="Password"
          onChange={handlePasswordChange}
        /> <br />
        <input
          className="show"
          type="checkbox"
          checked={showPassword} 
          onChange={handleCheckboxChange}
        /> Show Password <br />
        <button className="login" onClick={handleSignOn}>Sign Up</button>
        <button className="login" onClick={handleLogIn}>Log In</button>
        <p> or</p>
        {/* <Link to="/Debug">
          <button className="login2">Login</button>
        </Link> */}
        <GoogleSignIn/>
      </div>
      <p>Username: {username}</p>
      <p>Password: {password}</p>
      <Link to="/CustomerOptions">
        <button>Go Back</button>
      </Link>
    </div>
  );
};

export default OverallLogin;

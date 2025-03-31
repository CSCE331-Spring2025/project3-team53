import React, { useState } from 'react';
import { Link } from "react-router-dom";

function myFunction() {
  var x = document.getElementById("myInput");
  if (x.type === "password") {
    x.type = "text";
  } else {
    x.type = "password";
  }
}

const ManagerLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleUsernameChange(event) {
    setUsername(event.target.value);
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  return (

    <div className = "login-body">
      <h2 className = "login-header">Welcome!</h2>
      <div className='login-card'>
        <input className = "username-text" type="text" value={username} placeholder = "Username" onChange={handleUsernameChange} /> <br />
        <input className = "password-text" type="password" id="myInput" value={password} placeholder = "Password" onChange={handlePasswordChange} /> <br />
        <input className = "show" type="checkbox" onClick={myFunction} /> Show Password <br/>
        <Link to="/Manager">
          <button className="login" >Login</button>
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

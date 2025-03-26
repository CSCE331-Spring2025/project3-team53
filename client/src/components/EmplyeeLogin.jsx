import React, { useState } from 'react';
import { Link } from "react-router-dom";



const EmployeeLogin = () => {
  const [ID, setID] = useState("");

  function handleIDChange(event) {
    setID(event.target.value);
  }


  return (

    <div className = "login-body">
      <h2 className = "login-header">Welcome!</h2>
      <div className='login-card'>
        <input className = "username-text" type="text" value={ID} placeholder = "Employee ID" onChange={handleIDChange} /> <br />
        <Link to="/Drinks">
        <button className = "login">Login</button>
        </Link>
      </div>
      <p>Employee ID: {ID}</p>
      <Link to="/">
        <button>Go to Home Page</button>
      </Link>
    </div>
  );
};

export default EmployeeLogin;

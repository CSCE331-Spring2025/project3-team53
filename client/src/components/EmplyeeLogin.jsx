import React, { useContext, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { GlobalContext } from './GlobalContext';

const EmployeeLogin = () => {
  const {setLoginID} = useContext(GlobalContext)
  const [ID, setID] = useState('');
  const navigate = useNavigate();

  function handleIDChange(event) {
    const val = event.target.value;
    if(val === "" || /^\d+$/.test(val)){
      setID(event.target.value);
    }
  }

  const handleLogin = () => {
    if(/^\d+$/.test(ID)){
      setLoginID(Number(ID));
      navigate(`/Categories`);
    }
  }

  return (
    <div className = "login-body">
      <h2 className = "login-header">Welcome!</h2>
      <div className='login-card'>
        <input className = "username-text" type="text" value={ID} placeholder = "Employee ID" onChange={handleIDChange} /> 
        <br />
        <button className = "login" onClick={handleLogin}>Login</button>
      </div>
      <p>Employee ID: {ID}</p>
      <Link to="/">
        <button>Go to ome Page</button>
      </Link>
    </div>
  );
};

export default EmployeeLogin;

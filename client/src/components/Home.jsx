import React from "react";
import { Link } from "react-router-dom";
import invisible from './Nothing.jpg'

const Home = () => {
  return (
    <div>
      <h1>Nothing is happening here</h1>
      <img  className = "Hohn" src = {invisible} alt = "picture of the best group"></img><br/>
      <Link to="/Malogin">
          <button className="manButton">Go to Manager Login Page</button>
        </Link>
        <Link to="/Drinks">
          <button className="drinkButton">Go to Drinks Page</button>
        </Link>
        <Link to="/Emplogin">
          <button className="empButton" >Go to Employee Login</button>
        </Link>
    </div>
  );
};

export default Home;
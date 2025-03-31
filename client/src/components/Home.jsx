import React from "react";
import { Link } from "react-router-dom";


const Home = () => {
  return (
    <div>
      <h1>Nothing is happening here, pretty neat right?</h1>
      <img  className = "Hohn" src = "./Nothing.jpg" alt = "picture of the best group"></img><br/>
      <Link to="/Malogin">
          <button className="manButton">Go to Manager Login Page</button>
        </Link>
        <Link to="/Categories">
          <button className="drinkButton">Go to Menu Page</button>
        </Link>
        <Link to="/Emplogin">
          <button className="empButton" >Go to Employee Login</button>
        </Link>
        <Link to="/Checkout">
          <button className="empButton" >Go to Checkout</button>
          </Link>
        <Link to="/Options">
          <button className="empButton" >Go to Options</button>
        </Link>
    </div>
  );
};

export default Home;
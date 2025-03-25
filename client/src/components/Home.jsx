import React from "react";
import { Link } from "react-router-dom";
import invisible from './Nothing.jpg'

const Home = () => {
  return (
    <div>
      <h1>Nothing is happening here</h1>
      <img  src = {invisible} alt = "picture of the best group"></img><br/>
      <Link to="/About">
          <button>Go to About Page</button>
        </Link>
        <Link to="/Drinks">
          <button>Go to Drinks Page</button>
        </Link>
    </div>
  );
};

export default Home;
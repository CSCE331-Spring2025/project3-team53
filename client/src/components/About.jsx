import React from "react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div>
      <h1>About Us</h1>
      <p>Hello, please give us a 2.</p>
      <Link to="/">
          <button>Go to Home Page</button>
        </Link>
    </div>
  );
};

export default About;
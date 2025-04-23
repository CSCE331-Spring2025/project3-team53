import React from "react";
import { Link } from "react-router-dom";

const Logging = () => {
  return (
    <>
      <h2 className="login-header">X-Report</h2>
      <div
        style={{
          width: "80vw",
          height: "30vw",
          backgroundColor: "#cccccc",
          border: "2px solid black",
          margin: "0 auto",
          marginBottom: "2vw",
          display: "flex", 
          alignItems: "center", 
          justifyContent: "center", 
        }}
      >
        <div style={{ textAlign: "center" }}>
          <p>This is placeholder to make sure it can store the X Report.</p>
        </div>
      </div>
      <input className = "date"type="date" placeholder="Select a date" />
      <br/>
      <div>
        <button className="log">Make Report</button>
        <button className="log">Clear</button>
      </div>
      <Link to="/Manager">
        <button>Go Back</button>
      </Link>

      <Link to="/ZReport">
        <button className="rider">Go to Z Report</button>
      </Link>
    </>
  );
};

export default Logging;
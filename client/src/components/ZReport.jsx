import React, {useContext, useEffect, useState} from "react";
import { Link } from "react-router-dom";
import { GlobalContext } from './GlobalContext';

const Logging = () => {
  const { stashedZ, setStashedZ } = useContext(GlobalContext);
  const [zData, setZ] = useState([0,0,0]);

  const handleMakeReport = () => {
    setZ([stashedZ, stashedZ*0.0825, stashedZ*0.9175]);
    setStashedZ(0);
  };

  const handleClear = () => {
    setZ([0,0,0]);
  };


  return (
    <>
      <div
        style={{
          width: "40vw",
          height: "40vw",
          backgroundColor: "#cccccc",
          border: "2px solid black",
          margin: "0 auto",
          marginBottom: "2vw",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div>
          <p className="login-header2">Z-Report</p>
          <p className="login-header2">BruhBa Tea Company</p>
          <p className="login-header3">123 Spence Street</p>
          <p className="login-header35">College Station, USA</p>
          
          <div style={{ display: "flex", alignItems: "center", marginBottom: "1vw" }}>
            <p className="login-header4" style={{ marginRight: "1vw" }}>Gross Profit: </p>
            <div
              style={{
                width: "10vw",
                height: "2vw",
                marginTop: "1.5vw",
                backgroundColor: "#cccccc",
                border: "2px solid black",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
            {zData[0].toFixed(2)}
            </div>
          </div>
          
          <div style={{ display: "flex", alignItems: "center", marginBottom: "1vw" }}>
            <p className="login-header4" style={{ marginRight: "1vw" }}>Sales Tax: </p>
            <div
              style={{
                width: "10vw",
                height: "2vw",
                backgroundColor: "#cccccc",
                marginTop: "1.5vw",
                border: "2px solid black",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
            ${zData[1].toFixed(2)}
            </div>
          </div>
          
          <div style={{ display: "flex", alignItems: "center" }}>
            <p className="login-header4" style={{ marginRight: "1vw" }}>Total:</p>
            <div
              style={{
                width: "10vw",
                height: "2vw",
                backgroundColor: "#cccccc",
                marginTop: "1.5vw",
                border: "2px solid black",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}>
              ${zData[2].toFixed(2)}
            </div>
          </div>
        </div>
        {/* <p className="login-header4">Select Date</p> <br/>
        <input className = "dates"type="date" placeholder="Select a date" /> */}
        <div>
          <button className="log2" onClick={handleMakeReport}>Make Report</button>
          <button className="log3">Clear</button>
        </div>
        <Link Link to="/Logging">
          <button className="back_z">Go to X Report</button>
        </Link>

      </div>
    </>
  );
};

export default ZReport;

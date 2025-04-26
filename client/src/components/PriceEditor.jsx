import { Link } from "react-router-dom";
import React, { useState } from 'react';


//Component to allow for the editing of prices for pre-existing drinks
const PriceEditor = () => {

const [ID, setID] = useState("");
const [ID4, setID4] = useState("");
return (
    <>
     <p className="login-header">Edit Prices</p>

     <div className="ID_2">
        <label>Enter ID of the Drink:</label>
        <br />
        <input
          id="drink-id"
          className="text-input2"
          type="number"
          value={ID}
          onChange={(e) => setID(e.target.value)}
        />
      </div>

      
      <div className="ID_5">
        <label>Enter The New Price:</label>
        <br />
        <input
          id="new-price"
          className="text-input4"
          type="text"
          value={ID4}
          onChange={(e) => setID4(e.target.value)}
        />
      </div>
      <button className="button-sub">Submit</button>
    </>
);
};
export default PriceEditor
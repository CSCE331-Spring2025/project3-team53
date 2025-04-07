import { Link } from "react-router-dom";
import React, { useState } from 'react';

const PriceEditor = () => {

const [ID, setID] = useState("1");
const [ID4, setID4] = useState("4");
return (
    <>
     <p className="edit-header2">Edit Prices</p>

     <div className="ID_2">
        <label htmlFor="drink-id">Enter ID of the Drink:</label>
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
        <label htmlFor="new-price">Enter The New Price:</label>
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
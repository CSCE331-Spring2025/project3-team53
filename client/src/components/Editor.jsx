import { Link } from "react-router-dom";
import React, { useState } from 'react';

const IngredientsSelector = () => {
  const [selectedIngredient, setSelectedIngredient] = useState(null);

  const handleSelect = (ingredient) => {
    setSelectedIngredient(ingredient);
  };

  const ingredients = [
    "aloe_vera", "wintermelon", "black_pearl", "creamer", "creama",
    "ice_cream", "matcha", "strawberry_juice", "mint", "pineapple_jam",
    "honey", "mango_jam", "ginger_tea", "oreo", "thai_tea",
    "cocoa_powder", "mini_pearl", "red_bean", "green_tea", "passion_fruit",
    "orange_jam", "pudding", "black_tea", "lime_juice", "crystal_boba",
    "wintermelon_tea", "lime_slice", "kiwi_jam", "oolong_tea", "aiju_jelly",
    "grapefruit_jam", "milk", "taro_paste", "lemonade", "coffee",
  ];

  return (
    <>
      <div className="scrollable-container">
        {ingredients.map((ingredient) => (
          <div
            key={ingredient}
            className={`ingredient-item ${selectedIngredient === ingredient ? "selected" : ""}`}
            onClick={() => handleSelect(ingredient)}
          >
            {ingredient}
          </div>
        ))}
      </div>
      <div className='sides'>
      <button className="button-ing">Add Item</button>
      <button className="button-ing2">Add Ingredient</button>
      </div>
    </>
  );
};

const Editor = () => {
  const [name, setName] = useState("BoBruh");
  const [ID, setID] = useState("");
  const [ID2, setID2] = useState("");
  const [ID3, setID3] = useState("");
  const [ID4, setID4] = useState("");
  const [ID5, setID5] = useState("");

  return (
    <>
      <h2 className="login-header">Editor</h2>
      <div className="connect">
        <p className="edit-header">Edit Menu</p>
        <p className="edit-header2">Edit Prices</p>
        <p className="edit-header3">Edit Employees</p>
      </div>

      <div className="Enter_ID">
        <label >Enter Name of the Drink to Add:</label>
        <br />
        <input
          id="drink-name"
          className="text-input"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

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

      <div className="ID_3">
        <label htmlFor="employee-id">Enter Employee ID:</label>
        <br />
        <input
          id="employee-id"
          className="text-input2"
          type="number"
          value={ID2}
          onChange={(e) => setID2(e.target.value)}
        />
      </div>

      <div className="ID_4">
        <label htmlFor="drink-price">Enter The Price:</label>
        <br />
        <input
          id="drink-price"
          className="text-input3"
          type="text"
          value={ID3}
          onChange={(e) => setID3(e.target.value)}
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

      <div className='sides'>
        <button className="button-sub">Submit</button>
        <button className="button-sub2">Add Employee</button>
        </div>
        <div>
        <button className="button-sub3">Remove Employee</button>
      </div>

      <IngredientsSelector />

      <div className="ID6">
        <label >Enter ID of the Drink to Remove:</label>
        <br />
        <input
          id="drink-rem"
          className="text-input5"
          type="number"
          value={ID5}
          onChange={(e) => setID5(e.target.value)}
        />
      </div>
      <button className="button-ing3">Remove Item</button>
      <div>
      <Link to="/Manager">
      <button className = "back">Back</button>
      </Link>
      </div>
    </>
  );
};

export default Editor;

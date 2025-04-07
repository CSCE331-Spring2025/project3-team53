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
      <div className="sides">
        <button className="button-ing">Add Item</button>
        <button className="button-ing2">Add Ingredient</button>
      </div>
    </>
  );
};

const MenuEditor = () => {  // Fixed syntax here
  const [name, setName] = useState("BoBruh");
  const [ID3, setID3] = useState("3");
  const [ID5, setID5] = useState("6");

  return (
    <>  {/* Added Fragment wrapper */}
      <p className="edit-header">Edit Menu</p>
      <div className="Enter_ID">
        <label>Enter Name of the Drink to Add:</label>
        <br />
        <input
          id="drink-name"
          className="text-input"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
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

      <div className="ID6">
        <label>Enter ID of the Drink to Remove:</label>
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
          <button className="back">Back</button>
        </Link>
      </div>
    </>
  );
};

export default MenuEditor;

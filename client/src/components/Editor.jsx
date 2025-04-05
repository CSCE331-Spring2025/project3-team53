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
    </>
  );
};

const Editor = () => {
  const [name, setName] = useState("BoBruh");
  const [ID, setID] = useState("");
  const [ID2, setID2] = useState("");
  const [ID3, setID3] = useState("");
  const [ID4, setID4] = useState("");

  const handleNameChange = (event) => setName(event.target.value);
  const handleIDChange = (event) => setID(event.target.value);
  const handleID2Change = (event) => setID2(event.target.value);
  const handleID3Change = (event) => setID3(event.target.value);
  const handleID4Change = (event) => setID4(event.target.value);

  return (
    <>
      <h2 className="login-header">Editor</h2>
      <div className="connect">
        <p className="edit-header">Edit Menu</p>
        <p className="edit-header2">Edit Prices</p>
        <p className="edit-header3">Edit Employees</p>
      </div>

      <div>
        <div className="Enter_ID">
          <label htmlFor="drink-name">Enter Name of the Drink to Add:</label>
          <br />
          <input
            id="drink-name"
            className="text-input"
            type="text"
            value={name}
            onChange={handleNameChange}
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
            onChange={handleIDChange}
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
            onChange={handleID2Change}
          />
        </div>

        <div className="ID_4">
          <label htmlFor="drink-price">Enter The Price:</label>
          <br />
          <input
            id="drink-price"
            className="text-input3"
            value={ID3}
            onChange={handleID3Change}
          />
        </div>

        <div className="ID_5">
          <label htmlFor="drink-price">Enter The New Price:</label>
          <br />
          <input
            id="new-price"
            className="text-input4"
            value={ID4}
            onChange={handleID4Change}
          />
        </div>
        <div>
        <button className="button-sub">Submit</button>
        </div>

        <div>
        <button className="button-sub2">Add Employees</button>
        </div>

        <IngredientsSelector />
      </div>
    </>
  );
};

export default Editor;

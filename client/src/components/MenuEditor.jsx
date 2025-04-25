import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import IngredientsSelector from './IngredientsSelector';
import { add_new_drink, delete_entry } from '../apiCall.js';

const MenuEditor = () => {
  const [name, setName] = useState("");
  const [ID3, setID3] = useState(""); 
  const [ID5, setID5] = useState(""); 
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [ingredientCounts, setIngredientCounts] = useState({});

  const handleAddDrink = async () => {
    const price = parseFloat(ID3);
    if (!name) {
      alert("Please enter a drink name.");
      return;
    }
    if(isNaN(price)){
      alert("Please enter a valid price");
      return;
    }
    if(selectedIngredients.length === 0){
      alert("Please select at least 1 ingredient");
      return;
    }

    const ingredients = selectedIngredients;
    const amounts = selectedIngredients.map((ingredient) => ingredientCounts[ingredient]);

    try {
      await add_new_drink(name, "Specialty", ingredients, amounts, price);
      alert("Drink added successfully!");
    } catch (error) {
      alert("Error adding drink.");
      console.error(error);
    }
  };

  const handleRemoveDrink = async () => {
    const id = parseInt(ID5);
    if (isNaN(id)) {
      alert("Enter a valid drink ID.");
      return;
    }

    try {
      await delete_entry(1, id);
      alert("Drink removed successfully!");
    } catch (error) {
      alert("Error removing drink.");
      console.error(error);
    }
  };

  return (
    <>
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

      <IngredientsSelector 
        selectedIngredients={selectedIngredients}
        setSelectedIngredients={setSelectedIngredients}
        ingredientCounts={ingredientCounts}
        setIngredientCounts={setIngredientCounts}
      />

      <button className="button-ing" onClick={handleAddDrink}>Add Item</button>

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

      <button className="button-ing3" onClick={handleRemoveDrink}>Remove Item</button>

      <Link to="/Editor">
        <button className="back">Back</button>
      </Link>
    </>
  );
};

export default MenuEditor;

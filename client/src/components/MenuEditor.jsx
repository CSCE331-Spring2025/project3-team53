import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import IngredientsSelector from './IngredientsSelector';
import { add_new_drink, delete_entry, get_menu, refresh_menu } from '../apiCall.js';

//component to add new drinks and delete old ones
const MenuEditor = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(""); 
  const [selectedDrinkId, setSelectedDrinkId] = useState(""); 
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [ingredientCounts, setIngredientCounts] = useState({});
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMenu = async () => {
      const drinks = await get_menu();
      setMenu(drinks);
      setLoading(false);
    };
    fetchMenu();
  }, []);

  const handleAddDrink = async () => {
    const priceAsNumber = parseFloat(price);
    if (!name) {
      alert("Please enter a drink name.");
      return;
    }
    if(isNaN(priceAsNumber)){
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
      await add_new_drink(name, "Special", ingredients, amounts, priceAsNumber);
      alert("Drink added successfully!");  
      await refresh_menu();
      const updatedMenu = await get_menu();
      setMenu(updatedMenu);
    } catch (error) {
      alert("Error adding drink.");
      console.error(error);
    }
  };

  const handleRemoveDrink = async () => {
    if (!selectedDrinkId) {
      alert("Please select a drink to remove.");
      return;
    }

    const id = parseInt(selectedDrinkId);
    if (isNaN(id)) {
      alert("Invalid drink ID.");
      return;
    }

    try {
      await delete_entry(1, id);
      alert("Drink removed successfully!");
      await refresh_menu();
      const updatedMenu = await get_menu();
      setMenu(updatedMenu);
      setSelectedDrinkId("");
    } catch (error) {
      alert("Error removing drink.");
      console.error(error);
    }
  };

  if (loading) {
    return <p>Loading menu...</p>;
  }

  return (
    <div className="menu-editor-page" style={{ padding: '20px' }}>
      <p className="edit-header">Edit Menu</p>
      
      {/* Add Drink Section */}
      <div className="editor-section" style={{ marginBottom: '30px' }}>
        <h3 className="section-title">Add New Drink</h3>
        <div className="input-group">
          <label className="input-label">Drink Name:</label>
          <input
            className="text-input"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ width: '100%' }}
          />
        </div>

        <div className="input-group">
          <label className="input-label">Price:</label>
          <input
            className="text-input"
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            style={{ width: '100%' }}
          />
        </div>

        <IngredientsSelector 
          selectedIngredients={selectedIngredients}
          setSelectedIngredients={setSelectedIngredients}
          ingredientCounts={ingredientCounts}
          setIngredientCounts={setIngredientCounts}
        />

        <button className="button-ing" onClick={handleAddDrink} style={{ marginTop: '20px' }}>
          Add Drink
        </button>
      </div>

      {/* Remove Drink Section */}
      <div className="editor-section" style={{ marginBottom: '30px' }}>
        <h3 className="section-title">Remove Drink</h3>
        <div className="input-group">
          <label className="input-label">Select Drink:</label>
          <select
            className="text-input"
            value={selectedDrinkId}
            onChange={(e) => setSelectedDrinkId(e.target.value)}
            style={{ width: '100%', height: '40px' }}
          >
            <option value="">-- Select a drink --</option>
            {Array.isArray(menu) && menu.map((drink) => (
              <option key={drink.id} value={drink.id}>
                {drink.drink_name} (ID: {drink.id})
              </option>
            ))}
          </select>
        </div>

        <button 
          className="button-ing3" 
          onClick={handleRemoveDrink}
          style={{ marginTop: '20px' }}
        >
          Remove Drink
        </button>
      </div>

      <div style={{ textAlign: 'center', marginTop: '30px' }}>
        <Link to="/Editor">
          <button className="back" style={{marginRight: "8000px"}}>Back</button>
        </Link>
      </div>
    </div>
  );
};

export default MenuEditor;
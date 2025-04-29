import { Link } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import { get_menu, edit_drink_price, refresh_menu } from "../apiCall.js"; 

//component to change prices of drinks
const PriceEditor = () => {
  const [menu, setMenu] = useState([]); 
  const [selectedDrinkId, setSelectedDrinkId] = useState(""); 
  const [newPrice, setNewPrice] = useState(""); 
  const [loading, setLoading] = useState(true);

 
  useEffect(() => {
    const fetchMenu = async () => {
      const drinks = await get_menu();
      console.log(drinks);
      setMenu(drinks);
      setLoading(false); 
    };
    fetchMenu();
  }, []);

  const handleSubmit = async () => {
    if (!selectedDrinkId || !newPrice) {
      alert("Please select a drink and enter a new price.");
      return;
    }
    //convert price and id to numeric
    const priceAsNumber = parseFloat(newPrice);
    if (isNaN(priceAsNumber)) {
      alert("Please enter a valid price.");
      return;
    }

    const drinkIdAsNumber = parseInt(selectedDrinkId, 10); 
    if (isNaN(drinkIdAsNumber)) {
      alert("Invalid drink ID.");
      return;
    }

    try {
      await edit_drink_price(drinkIdAsNumber, priceAsNumber);
      alert("Price updated successfully!");
      const updatedMenu = menu.map(drink =>
        drink.id === drinkIdAsNumber
          ? { ...drink, item_price: priceAsNumber }
          : drink
      );
      await refresh_menu();
      setMenu(updatedMenu); 
    } catch (error) {
      console.error("Error updating price:", error);
      alert("Failed to update price.");
    }
  };

  if (loading) {
    return <p>Loading menu...</p>;
  }

  return (
    <>
      <p className="login-header">Edit Prices</p>

      <div className="ID_2">
        <label>Select a Drink:</label>
        <br />
        <select
          className="text-input2"
          value={selectedDrinkId}
          onChange={(e) => setSelectedDrinkId(e.target.value)}
        >
          <option value="">-- Select a drink --</option>
          {Array.isArray(menu) && menu.map((drink) => (
            <option key={drink.id} value={drink.id}>
              {drink.drink_name} - ${parseFloat(drink.item_price).toFixed(2)}
            </option>
          ))}
        </select>
      </div>

      <div className="ID_5">
        <label>Enter The New Price:</label>
        <br />
        <input
          id="new-price"
          className="text-input4"
          type="text"
          value={newPrice}
          onChange={(e) => setNewPrice(e.target.value)}
        />
      </div>

      <div>
        <button className="button-sub" onClick={handleSubmit}>Submit</button>
        <div>
          <Link to="/Editor">
            <button className="back">Back</button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default PriceEditor;

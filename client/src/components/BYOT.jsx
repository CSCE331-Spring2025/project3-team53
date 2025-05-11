import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as func from "../apiCall.js";

const ingredientList = [
  "aloe_vera", "black_pearl", "matcha", "strawberry_juice", "honey",
  "mango_jam", "ginger_tea", "oreo", "thai_tea", "green_tea",
  "passion_fruit", "orange_jam", "pudding", "black_tea", "lime_juice",
  "crystal_boba", "milk", "taro_paste", "lemonade", "coffee",
];

const formatName = (name) =>
  name
    .split("_")
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join(" ");

const BYOT = ({ cart, setCart, totalPrice, setTotalPrice, cartChanged, setCartChanged }) => {
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [ingredientCounts, setIngredientCounts] = useState({});
  const [customName, setCustomName] = useState("");
  const [showCheckout, setShowCheckout] = useState(false);
  const navigate = useNavigate();

  const handleSelectIngredient = (ingredient) => {
    setSelectedIngredients((prev) => {
      if (prev.includes(ingredient)) {
        const newList = prev.filter((i) => i !== ingredient);
        const newCounts = { ...ingredientCounts };
        delete newCounts[ingredient];
        setIngredientCounts(newCounts);
        return newList;
      } else {
        setIngredientCounts({ ...ingredientCounts, [ingredient]: 1 });
        return [...prev, ingredient];
      }
    });
  };

  const handleAddToCart = async () => {
    if (!customName.trim()) {
      alert("Please name your drink.");
      return;
    }
    if (selectedIngredients.length === 0) {
      alert("Please select at least one topping.");
      return;
    }

    try {
      const amounts = selectedIngredients.map((i) => ingredientCounts[i]);
      const price = 4.99 + selectedIngredients.length * 0.5;
      await func.add_new_drink(customName, "BYOT", selectedIngredients, amounts, price);
      alert("Your custom drink has been added!");
      setCartChanged(!cartChanged);
    } catch (error) {
      console.error("Error adding custom drink:", error);
      alert("Failed to add custom drink.");
    }
  };

  return (
    <div className="byot-container">
      <h2>Build Your Own Tea Menu</h2>

      <div className="cart">
        <button className="checkoutButton" onClick={() => setShowCheckout(true)}>
        </button>
      </div>

      <input
        type="text"
        placeholder="Name your drink"
        value={customName}
        onChange={(e) => setCustomName(e.target.value)}
        className="name-input"
      />

      <div className="ingredient-grid">
        {ingredientList.map((ingredient) => (
          <div
            key={ingredient}
            className={`ingredient-card ${selectedIngredients.includes(ingredient) ? "selected" : ""}`}
            onClick={() => handleSelectIngredient(ingredient)}
              style={{ backgroundImage: `url('/${ingredient}.png')` }}
              >
            <p className="ingredient-name">{formatName(ingredient)}</p>
          </div>
        ))}
      </div>

      <button className="add-to-cart" onClick={handleAddToCart}>
        Add to Cart
      </button>

      {showCheckout && (
        <div className="checkout-overlay">
          <div className="overlay-content">
            <span className="close-btn" onClick={() => setShowCheckout(false)}>
              &times;
            </span>
            <h2>Your Cart</h2>
            {Array.from(cart).map(([key, values]) => (
              <p className="cart-item" key={key}>
                <span
                  className="close-btn"
                  onClick={() => {
                    func.dequeue_order(key);
                    setCartChanged(!cartChanged);
                  }}
                >
                  &times;
                </span>
                {values[0]} - ${values[3].toFixed(2)}
                <br />
                <span style={{ margin: "0em 0em 0em 2em" }}>{values[1]} - {values[2]}</span>
                <br />
                <span style={{ margin: "0em 0em 0em 2em" }}>{values[4]}</span>
              </p>
            ))}
            <p>Total: ${totalPrice.toFixed(2)}</p>
            <button
              onClick={() => {
                navigate("/Checkout", { state: { back_page: "/menu/build-your-own-tea" } });
              }}
            >
              Proceed to Payment
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BYOT;
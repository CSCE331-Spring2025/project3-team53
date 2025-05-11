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

const BYOT_emp = ({ cart, setCart, totalPrice, setTotalPrice, cartChanged, setCartChanged }) => {
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [ingredientCounts, setIngredientCounts] = useState({});
  const [customName, setCustomName] = useState("");
  const [showCheckout, setShowCheckout] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [ice, setIce] = useState(2);
  const [sugar, setSugar] = useState(4);
  const [addons, setAddons] = useState([true, false, false, false, false, false, false, false, false, false]);

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

  const handleIce = (level) => {
    setIce(level);
  };

  const handleSugar = (level) => {
    setSugar(level);
  };

  const handleAddons = (index) => {
    let newAddons = [...addons];
    newAddons[index] = !newAddons[index];
    if (index === 0 && newAddons[0]) {
      newAddons = [true, false, false, false, false, false, false, false, false, false];
    } else {
      newAddons[0] = false;
    }
    setAddons(newAddons);
  };

  const handleSubmitDrink = () => {
    if (!customName.trim()) {
      alert("Please name your drink.");
      return;
    }
    setShowPopup(true);
  };

  const handleAddToCart = async () => {
    const temp = [];
    if (!addons[0]) {
      addons.slice(1).forEach((bool, index) => {
        if (bool) {
          temp.push(["black_pearl", "mini_pearl", "ice_cream", "pudding", "aloe_vera", "red_bean", "creama", "aiyu_jelly", "crystal_boba"][index]);
        }
      });
    }

    try {
      const amounts = selectedIngredients.map((i) => ingredientCounts[i]);
      const price = 4.99 + selectedIngredients.length * 0.5;
      //await func.add_new_drink(customName, "BYOT", selectedIngredients, amounts, price);
      await func.add_new_drink("Debug Drink", "BYOT", ["matcha", "milk"], [1, 2], 5.49);
      func.enqueue_order(0, 0, ice, sugar, temp);
      setCartChanged(!cartChanged);
      setShowPopup(false);
      alert("Your custom drink has been added!");
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
          >
            <p className="ingredient-name">{formatName(ingredient)}</p>
          </div>
        ))}
      </div>

      <button className="add-to-cart" onClick={handleSubmitDrink}>
        Submit Drink
      </button>

      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <span className="close-btn2" onClick={() => setShowPopup(false)}>
              &times;
            </span>
            <b>Level Of Ice</b>
            <div className="button-container">
              {["None", "Light Ice", "Normal Ice", "Extra Ice"].map((label, i) => (
                <button
                  key={i}
                  className="b1"
                  onClick={() => handleIce(i)}
                  style={{ backgroundColor: ice === i ? 'aqua' : 'GhostWhite' }}
                >
                  {label}
                </button>
              ))}
            </div>
            <b className="Sugar">Level Of Sugar</b>
            <div className="button-container">
              {["None", "25%", "50%", "75%", "100%"].map((label, i) => (
                <button
                  key={i}
                  className="b1"
                  onClick={() => handleSugar(i)}
                  style={{ backgroundColor: sugar === i ? 'aqua' : 'GhostWhite' }}
                >
                  {label}
                </button>
              ))}
            </div>
            <b className="Sugar">Toppings</b>
            <div className="button-container">
              {["None", "Pearl", "Mini Pearl", "Ice Cream", "Pudding", "Aloe Vera", "Red Bean", "Crema", "Aiju Jelly", "Crystal Boba"].map((label, i) => (
                <button
                  key={i}
                  className="b1"
                  onClick={() => handleAddons(i)}
                  style={{ backgroundColor: addons[i] ? 'aqua' : 'GhostWhite' }}
                >
                  {label}
                </button>
              ))}
            </div>
            <button className="b2" onClick={handleAddToCart}> Add to cart</button>
          </div>
        </div>
      )}

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

export default BYOT_emp;

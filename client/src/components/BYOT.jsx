import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import * as func from "../apiCall.js";
import { GlobalContext } from "./GlobalContext";

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

const BYOT = () => {
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [ingredientCounts, setIngredientCounts] = useState({});
  const [customName, setCustomName] = useState("");
  const [showCheckout, setShowCheckout] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [ice, setIce] = useState(2);
  const [sugar, setSugar] = useState(4);
  const [addons, setAddons] = useState([true, false, false, false, false, false, false, false, false, false]);
  const [cart, setCart] = useState(new Map());
  const [totalPrice, setTotalPrice] = useState(0);
  const [cartChanged, setCartChanged] = useState(false);
  const { customerLoggedIn } = useContext(GlobalContext);

  const navigate = useNavigate();

  useEffect(() => {
    const newCart = new Map();
    (async () => {
      const prices = await func.get_stash_price();
      setTotalPrice(prices.get(0));
      for (const [key, value] of func.get_order_queue()) {
        const name = (await func.get_menu()).find(d => d.id === value[1])?.drink_name;
        const iceLevels = ["None", "Light Ice", "Normal Ice", "Extra Ice"];
        const sugarLevels = ["None", "25%", "50%", "75%", "100%"];
        const toppingLabels = ["black_pearl", "mini_pearl", "ice_cream", "pudding", "aloe_vera", "red_bean", "creama", "aiyu_jelly", "crystal_boba"];
        const toppingDisplay = toppingLabels.map((label, i) => value[4].includes(label) ? formatName(label) : null).filter(Boolean).join(", ");
        newCart.set(key, [name, iceLevels[value[2]], sugarLevels[value[3]], prices.get(key), toppingDisplay]);
      }
      if (customerLoggedIn) {
        func.login_save_cart(customerLoggedIn, Array.from(func.get_order_queue().values()));
      }
      setCart(newCart);
    })();
  }, [cartChanged]);

  const handleSelectIngredient = (ingredient) => {
    if (selectedIngredients.includes(ingredient)) {
      const newCounts = { ...ingredientCounts };
      newCounts[ingredient] += 1;
      setIngredientCounts(newCounts);
    } else {
      setSelectedIngredients([...selectedIngredients, ingredient]);
      setIngredientCounts({ ...ingredientCounts, [ingredient]: 1 });
    }
  };

  const handleIce = (level) => setIce(level);
  const handleSugar = (level) => setSugar(level);

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

      const result = await func.add_new_drink(customName, "BYOT", selectedIngredients, amounts, price, true);
      console.log("add_new_drink response:", result);
      const newDrinkId = result?.data?.id;

      if (!newDrinkId) {
        throw new Error("add_new_drink did not return a valid ID");
      }

      await func.enqueue_order(0, newDrinkId, ice, sugar, temp);
      console.log("Enqueued drink:", newDrinkId, temp);
      setShowPopup(false);
      setCartChanged(!cartChanged);
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
        <button className="checkoutButton" onClick={() => setShowCheckout(true)} />
      </div>
      <input
        type="text"
        placeholder="Name your drink"
        value={customName}
        onChange={(e) => setCustomName(e.target.value)}
        className="name-input"
      />
      <div className="ingredient-grid">
        {ingredientList.map((ingredient) => {
          const selected = selectedIngredients.includes(ingredient);
          return (
            <div
              key={ingredient}
              className={`ingredient-card ${selected ? "selected" : ""}`}
              style={{ backgroundImage: `url('/${ingredient}.png')` }}
            >
              <p className="ingredient-name">{formatName(ingredient)}</p>
              {!selected ? (
                <button onClick={() => handleSelectIngredient(ingredient)}>Add</button>
              ) : (
                <div className="count-controls">
                  <button onClick={() => {
                    const count = ingredientCounts[ingredient];
                    if (count <= 1) {
                      setSelectedIngredients(selectedIngredients.filter((i) => i !== ingredient));
                      const newCounts = { ...ingredientCounts };
                      delete newCounts[ingredient];
                      setIngredientCounts(newCounts);
                    } else {
                      setIngredientCounts({ ...ingredientCounts, [ingredient]: count - 1 });
                    }
                  }}>-</button>
                  <span>{ingredientCounts[ingredient]}</span>
                  <button onClick={() => setIngredientCounts({ ...ingredientCounts, [ingredient]: ingredientCounts[ingredient] + 1 })}>+</button>
                </div>
              )}
            </div>
          );
        })}
      </div>
      <button className="add-to-cart" onClick={handleSubmitDrink}>Submit Drink</button>
      {selectedIngredients.length > 0 && (
        <div className="selected-ingredients">
          <h3>Selected Ingredients</h3>
          <ul>
            {selectedIngredients.map((ingredient) => (
              <li key={ingredient}>{formatName(ingredient)} x{ingredientCounts[ingredient]}</li>
            ))}
          </ul>
        </div>
      )}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <span className="close-btn2" onClick={() => setShowPopup(false)}>&times;</span>
            <b>Level Of Ice</b>
            <div className="button-container">
              {["None", "Light Ice", "Normal Ice", "Extra Ice"].map((label, i) => (
                <button key={i} className="b1" onClick={() => handleIce(i)} style={{ backgroundColor: ice === i ? 'aqua' : 'GhostWhite' }}>{label}</button>
              ))}
            </div>
            <b className="Sugar">Level Of Sugar</b>
            <div className="button-container">
              {["None", "25%", "50%", "75%", "100%"].map((label, i) => (
                <button key={i} className="b1" onClick={() => handleSugar(i)} style={{ backgroundColor: sugar === i ? 'aqua' : 'GhostWhite' }}>{label}</button>
              ))}
            </div>
            <b className="Sugar">Toppings</b>
            <div className="button-container">
              {["None", "Pearl", "Mini Pearl", "Ice Cream", "Pudding", "Aloe Vera", "Red Bean", "Crema", "Aiju Jelly", "Crystal Boba"].map((label, i) => (
                <button key={i} className="b1" onClick={() => handleAddons(i)} style={{ backgroundColor: addons[i] ? 'aqua' : 'GhostWhite' }}>{label}</button>
              ))}
            </div>
            <button className="b2" onClick={handleAddToCart}>Add to cart</button>
          </div>
        </div>
      )}
      {showCheckout && (
        <div className="checkout-overlay">
          <div className="overlay-content">
            <span className="close-btn" onClick={() => setShowCheckout(false)}>&times;</span>
            <h2>Your Cart</h2>
            {Array.from(cart || []).map(([key, values]) => (
              <p className="cart-item" key={key}>
                <span className="close-btn" onClick={() => { func.dequeue_order(key); setCartChanged(!cartChanged); }}>&times;</span>
                {values[0]} - ${values[3].toFixed(2)}<br />
                <span style={{ marginLeft: "2em" }}>{values[1]} - {values[2]}</span><br />
                <span style={{ marginLeft: "2em" }}>{values[4]}</span>
              </p>
            ))}
            <p>Total: ${totalPrice.toFixed(2)}</p>
            <button onClick={() => navigate("/Checkout", { state: { back_page: "/menu/build-your-own-tea" } })}>Proceed to Payment</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BYOT;
import React, { useState, useEffect, useContext } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { SERVER_DOMAIN, PROTOCOL } from "./config";
import * as func from "../apiCall";
import { GlobalContext } from './GlobalContext';

const ice_encoding = new Map([[0, "No Ice"], [1, "Light Ice"], [2, "Normal Ice"], [3, "Extra Ice"]]);
const sugar_encoding = new Map([[0, "0% Sugar"], [1, "25% Sugar"], [2, "50% Sugar"], [3, "75% Sugar"], [4, "100% Sugar"]]);
const addon_options = ["black_pearl", "mini_pearl", "ice_cream", "pudding", "aloe_vera", "red_bean", "creama", "aiyu_jelly", "crystal_boba"];
const addon_encoding = new Map([
  ["black_pearl", "Pearl"], ["mini_pearl", "Mini Pearl"], ["ice_cream", "Ice Cream"],
  ["pudding", "Pudding"], ["aloe_vera", "Aloe Vera"], ["red_bean", "Red Bean"],
  ["creama", "Creama"], ["aiyu_jelly", "Aiyu Jelly"], ["crystal_boba", "Crystal Boba"]
]);

const CustomerMenu = () => {
  const { category } = useParams();
  const navigation = useNavigate();
  const images = new Map([
    ["Milk-Tea", "/milk_tea.jpg"], ["Fruit-Tea", "/fruit-tea.jpg"], ["Brewed-Tea", "/brewed-tea.jpg"],
    ["Fresh-Milk", "/fresh-milk.jpg"], ["Ice-Blended", "/ice-blended.jpg"], ["Mojito", "/mojito-tea.jpg"],
    ["Crema", "/crema-tea.jpg"], ["Specialty", "/specialty-tea.jpg"]
  ]);

  const [drinks, setDrinks] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedDrink, setSelectedDrink] = useState(null);
  const [showCheckout, setShowCheckout] = useState(false);
  const [sugar, setSugar] = useState(4);
  const [ice, setIce] = useState(2);
  const [addons, setAddons] = useState([true, false, false, false, false, false, false, false, false, false]);
  const [cart, setCart] = useState(new Map());
  const [cartChanged, setCartChanged] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const { customerLoggedIn } = useContext(GlobalContext);

  const allergenFlags = (ingredients) => {
    const flags = { dairy: false, soy: false, egg: false, gluten: false };
    for (const ing of ingredients) {
      const name = ing.toLowerCase();
      if (name.includes("milk") || name.includes("creama") || name.includes("creamer") || name.includes("pudding") || name.includes("ice_cream")) flags.dairy = true;
      if (name.includes("creamer") || name.includes("oreo")) flags.soy = true;
      if (name.includes("pudding")) flags.egg = true;
      if (name.includes("oreo")) flags.gluten = true;
    }
    return flags;
  };

  useEffect(() => {
    fetch(`${PROTOCOL}://${SERVER_DOMAIN}/api/drinks/${category}`)
      .then((res) => res.json())
      .then(async (data) => {
        const enriched = await Promise.all(data.map(async (drink) => {
          const calories = (await func.get_calories(drink.id)).data;
          const price = await func.get_order_price(drink.id, []);
          const ingredients = await func.fetch_drink_ingredients(drink.id);
          return {
            ...drink,
            calories,
            price,
            flags: allergenFlags(ingredients.ingredients)
          };
        }));
        setDrinks(enriched);
      })
      .catch((err) => console.error("Drink fetch error:", err));
  }, [category]);

  useEffect(() => {
    const newCart = new Map();
    (async () => {
      const prices = await func.get_stash_price();
      setTotalPrice(prices.get(0));
      for (const [key, value] of func.get_order_queue()) {
        const name = (await func.get_menu()).find(d => d.id === value[1])?.drink_name;
        newCart.set(key, [
          name,
          ice_encoding.get(value[2]),
          sugar_encoding.get(value[3]),
          prices.get(key),
          value[4].map(el => addon_encoding.get(el)).join(", ")
        ]);
      }
      if (customerLoggedIn) {
        func.login_save_cart(customerLoggedIn, Array.from(func.get_order_queue().values()));
      }
      setCart(newCart);
    })();
  }, [cartChanged]);

  const handleAddToCart = () => {
    const temp = addons[0] ? [] : addon_options.filter((_, i) => addons[i + 1]);
    func.enqueue_order(0, selectedDrink.id, ice, sugar, temp);
    setIce(2);
    setSugar(4);
    setAddons([true, false, false, false, false, false, false, false, false, false]);
    setShowPopup(false);
    setCartChanged(!cartChanged);
  };

  return (
    <>
      <h2 className="title-m">{category.replace("-", " ")} Menu</h2>
      <div className="cart">
        <button className="checkoutButton" onClick={() => setShowCheckout(true)}></button>
      </div>
      <center>
        <div className="card-container">
          {drinks.map(drink => (
            <div key={drink.id} className="card3" onClick={() => { setSelectedDrink(drink); setShowPopup(true); }} style={{ cursor: "pointer" }}>
              <img className="card-image3" src={images.get(category)} alt={`Picture of ${drink.drink_name}`} />
              <p className="card-text">{drink.drink_name}</p>
              <div className="price-cals">
                <span>${drink.price.toFixed(2)}</span>
                <span>{drink.calories} Cal</span>
              </div>
              <div className="nutrients">
                {drink.flags.dairy && <span>🥛 Dairy</span>}
                {drink.flags.soy && <span>🌱 Soy</span>}
                {drink.flags.egg && <span>🥚 Egg</span>}
                {drink.flags.gluten && <span>🌾 Gluten</span>}
              </div>
            </div>
          ))}
        </div>
      </center>

      {showCheckout && (
        <div className="checkout-overlay">
          <div className="overlay-content">
            <span className="close-btn" onClick={() => setShowCheckout(false)}>&times;</span>
            <h2>Your Cart</h2>
            {Array.from(cart).map(([key, values]) => (
              <p className="cart-item" key={key}>
                <span className="close-btn" onClick={() => { func.dequeue_order(key); setCartChanged(!cartChanged); }}>&times;</span>
                {values[0]} - ${values[3].toFixed(2)}<br />
                <span style={{ marginLeft: "2em" }}>{values[1]} - {values[2]}</span><br />
                <span style={{ marginLeft: "2em" }}>{values[4]}</span>
              </p>
            ))}
            <p>Total: ${totalPrice.toFixed(2)}</p>
            <button onClick={() => navigation("/Checkout", { state: { back_page: `/CustomerMenu/${category}` } })}>
              Proceed to Payment
            </button>
          </div>
        </div>
      )}

      {showPopup && selectedDrink && (
        <div className="popup-overlay">
          <div className="popup-content">
            <span className="close-btn2" onClick={() => setShowPopup(false)}>&times;</span>
            <b>Level Of Ice</b>
            <div className="button-container">
              {["None", "Light Ice", "Normal Ice", "Extra Ice"].map((label, i) => (
                <button className="b1" key={i} onClick={() => setIce(i)} style={{ backgroundColor: ice === i ? 'aqua' : 'GhostWhite' }}>{label}</button>
              ))}
            </div>
            <b className="Sugar">Level Of Sugar</b>
            <div className="button-container">
              {["None", "25%", "50%", "75%", "100%"].map((label, i) => (
                <button className="b1" key={i} onClick={() => setSugar(i)} style={{ backgroundColor: sugar === i ? 'aqua' : 'GhostWhite' }}>{label}</button>
              ))}
            </div>
            <b className="Sugar">Toppings</b>
            <div className="button-container">
              {["None", "Pearl", "Mini Pearl", "Ice Cream", "Pudding", "Aloe Vera", "Red Bean", "Crema", "Aiju Jelly", "Crystal Boba"].map((label, i) => (
                <button className="b1" key={i} onClick={() => {
                  const newAddons = [...addons];
                  newAddons[i] = !newAddons[i];
                  if (i === 0 && newAddons[0]) {
                    for (let j = 1; j < newAddons.length; j++) newAddons[j] = false;
                  } else {
                    newAddons[0] = false;
                  }
                  setAddons(newAddons);
                }} style={{ backgroundColor: addons[i] ? 'aqua' : 'GhostWhite' }}>{label}</button>
              ))}
            </div>
            <button className="b2" onClick={handleAddToCart}>Add to cart</button>
          </div>
        </div>
      )}

      <Link to="/CustomerOptions">
        <button className="drinksButton">Go Back</button>
      </Link>
    </>
  );
};

export default CustomerMenu;
import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import * as func from '../apiCall.js';
import { SERVER_DOMAIN } from "./config";

const ice_encoding = new Map([[0,"No Ice"], [1,"Light Ice"], [2,"Normal Ice"], [3,"Extra Ice"]]);
const sugar_encoding = new Map([[0,"0% Sugar"], [1,"25% Sugar"], [2,"50% Sugar"], [3,"75% Sugar"], [4,"100% Sugar"]]);
const addon_encoding = new Map([["black_pearl", "Pearl"], ["mini_pearl", "Mini Pearl"], ["ice_cream", "Ice Cream"], 
  ["pudding", "Pudding"], ["aloe_vera", "Aloe Vera"], ["red_bean", "Red Bean"], 
  ["aiyu_jelly", "Aiyu Jelly"], ["creama", "Creama"], ["crystal_boba", "Crystal Boba"]
])


const Menu = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  
  const [drinks, setDrinks] = useState([]);
  const [showCheckout, setShowCheckout] = useState(false);
  const [drinkPrices, setDrinkPrices] = useState({});
  const [cart, setCart] = useState(new Map());
  const [cartChanged, setCartChanged] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);

  //fetch infomation about drinks and their prices
  useEffect(() => {
    fetch(`http://${SERVER_DOMAIN}/api/drinks/${category}`)
      .then((response) => response.json())
      .then((data) => {
        setDrinks(data);

        const fetchPrices = async () => {
          const prices = {};
          await Promise.all(
            data.map(async (drink) => {
              try {
                const price = await func.get_order_price(drink.id, []);
                prices[drink.id] = parseFloat(price).toFixed(2);
                ;
              } catch (err) {
                console.error(`Error fetching price for drink ID ${drink.id}:`, err);
                prices[drink.id] = "N/A";
              }
            })
          );
          setDrinkPrices(prices);
        };

        fetchPrices();
      })
      .catch((error) => console.error("Error fetching drinks:", error));
  }, [category]);

  //updates the cart whenever stash gets changed
  useEffect(() =>{
    let newCart = new Map();
    (async () => {
      let prices = await func.get_stash_price();
      setTotalPrice(prices.get(0));
      func.get_order_queue().forEach((value, key, _) => {
        let name = func.get_menu().find(obj => obj.id === value[1]).drink_name;
        newCart.set(key, 
          [name, ice_encoding.get(value[2]), sugar_encoding.get(value[3]), prices.get(key), 
          value[4].map((element) => addon_encoding.get(element)).join(", ")]);
      });
      setCart(newCart);
    })();
  },[cartChanged]);

  const handleCardClick = (drinkId) => {
    navigate(`/Options?drink=${drinkId}`, {state: {category: category}});
  };

  return (
    <>
      <h2 className="title-m">{category.replace("-", " ")} Menu</h2>

      <div className="cart">
        <button className="checkoutButton" onClick={() => setShowCheckout(true)}>
          View Cart
        </button>
      </div>

      {/*drinks mapping*/}
      <center>
        <div className="card-container">
          {drinks.map((drink) => (
            <div
              key={drink.id}
              className="card"
              onClick={() => handleCardClick(drink.id)}
              style={{ cursor: "pointer" }}
            >
              <img
                className="card-image"
                src="/placeholder.jpg"
                alt={`Picture of ${drink.drink_name}`}
              />
              <p className="card-text" style={{marginBottom: "0px",}}>{drink.drink_name}</p>
              <h3 className="card-price">
                {drinkPrices[drink.id] !== undefined
                  ? `$${drinkPrices[drink.id]}`
                  : "Loading..."}
              </h3>
            </div>
          ))}
        </div>
      </center>

      {/*cart overlay*/}
      {showCheckout && (
        <div className="checkout-overlay">
          <div className="overlay-content">
            <span className="close-btn" onClick={() => setShowCheckout(false)}>
              &times;
            </span>
            <h2>Your Cart</h2>
            {
              Array.from(cart).map(([key, values]) => {
                return  <>
                          <p className="cart-item">
                            <span className="close-btn" onClick={() => {func.dequeue_order(key); setCartChanged(!cartChanged)}}>&times;</span>
                            {values[0]} - ${values[3].toFixed(2)}<br/>
                            <span style={{margin: "0em 0em 0em 2em"}}>{values[1]} - {values[2]}</span> <br/>
                            <span style={{margin: "0em 0em 0em 2em"}}>{values[4]}</span>
                          </p>
                        </>
              })
            }
            
            {<p>Total: ${totalPrice.toFixed(2)}</p>}
            <button onClick={() => {navigate("/Checkout", {state: {back_page: `/menu/${category}`}})}}>Proceed to Payment</button>
          </div>
        </div>
      )}

      <Link to="/Categories">
        <button className="drinksButton">Go Back</button>
      </Link>
    </>
  );
};

export default Menu;
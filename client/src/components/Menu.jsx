import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import * as func from '../apiCall.js';
import { SERVER_DOMAIN } from "./config";

const Menu = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  
  const [drinks, setDrinks] = useState([]);
  const [showCheckout, setShowCheckout] = useState(false);
  const [drinkPrices, setDrinkPrices] = useState({});

  useEffect(() => {
    console.log(func.get_order_queue());
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

      {showCheckout && (
        <div className="checkout-overlay">
          <div className="overlay-content">
            <span className="close-btn" onClick={() => setShowCheckout(false)}>
              &times;
            </span>
            <h2>Your Cart</h2>
            <p>Milk Bruhba 1 - $10</p>
            <p>Milk Bruhba 2 - $15</p>
            <p>Total: $25</p>
            <button>Proceed to Payment</button>
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
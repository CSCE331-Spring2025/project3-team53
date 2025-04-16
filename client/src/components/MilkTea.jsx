import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import * as func from '../apiCall.js';
import { SERVER_DOMAIN } from "./config";

const MilkTea = () => {
  const navigate = useNavigate();

  const handleCardClick = (drinkId) => {
    navigate(`/Options`);
  };

  const [drinks, setDrinks] = useState([]);
  const [showCheckout, setShowCheckout] = useState(false);
  const [drinkPrices, setDrinkPrices] = useState({}); 
  const [category, setCategory] = useState(/*TODO Refactor to fetch the selected category*/);
  //Refactor to have only one menu file.



  // Fetch drinks
  useEffect(() => {
    fetch("http://" + SERVER_DOMAIN + "/api/drinks/milk-tea")
      .then((response) => response.json())
      .then((data) => {
        setDrinks(data);

        // For each drink, fetch price (no add-ons)
        const fetchPrices = async () => {
          const prices = {};
          await Promise.all(
            data.map(async (drink) => {
              try {
                const price = await func.get_order_price(drink.id, []);
                prices[drink.id] = price;
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
  }, []);

  return (
    <>
      <h2 className="title-m">Milk Tea Menu</h2>
      <div>
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
                <p className="card-text">{drink.drink_name}</p>
                <p className="card-price">
                  {drinkPrices[drink.id] !== undefined
                    ? `$${drinkPrices[drink.id]}`
                    : "Loading..."}
                </p>
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
      </div>
    </>
  );
};

export default MilkTea;

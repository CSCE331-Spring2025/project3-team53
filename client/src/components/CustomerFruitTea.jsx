import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { SERVER_DOMAIN } from "./config";

const CustomerFruitTea = () => {
  const navigate = useNavigate();

  const handleCardClick = (drink) => {
    setSelectedDrink(drink); 
    setShowPopup(true);
  };


  const [drinks, setDrinks] = useState([]);  
  const [showPopup, setShowPopup] = useState(false);
  const [selectedDrink, setSelectedDrink] = useState(null);
  const [showCheckout, setShowCheckout] = useState(false);

  useEffect(() => {
    fetch("http://" + SERVER_DOMAIN + "/api/drinks/fruit-tea")
      .then((response) => response.json())
      .then((data) => setDrinks(data)) 
      .catch((error) => console.error("Error fetching drinks:", error));
  }, []);

  return (
    <>
      <h2 className="title-m">Fruit Tea Menu</h2>
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
                className="card3"
                onClick={() => handleCardClick(drink.id)}
                style={{ cursor: "pointer" }}
              >
                <img
                  className="card-image3"
                  src="/placeholder.jpg"
                  alt={`Picture of ${drink.drink_name}`}
                />
                <p className="card-text">{drink.drink_name}</p>
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
              <Link to="/Checkout">
                <button>Proceed to Payment</button>
              </Link>
            </div>
          </div>
        )}
        {showPopup && (
            <div className="popup-overlay">
            <div className="popup-content">
                <span className="close-btn" onClick={() => setShowPopup(false)}>
                        &times;
                   </span>
                        </div>
                          </div>
                        )}


        <Link to="/CustomerOptions">
          <button className="drinksButton">Go Back</button>
        </Link>
      </div>
    </>
  );
};

export default CustomerFruitTea;

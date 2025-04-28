import React, { useState, useEffect} from "react";
import { Link, useParams  } from "react-router-dom";
import { SERVER_DOMAIN } from "./config";

//TODO - refactor for each drink type
const CustomerMenu = () => {
  const { category } = useParams();

  const images = new Map([
    ["Milk-Tea", "/milk_tea.jpg"], ["Fruit-Tea", "/fruit-tea.jpg"], ["Brewed-Tea", "/brewed-tea.jpg"],
    ["Fresh-Milk", "/fresh-milk.jpg"], ["Ice-Blended", "/ice-blended.jpg"], ["Mojito", "/mojito-tea.jpg"],
    ["Crema", "/crema-tea.jpg"], ["Specialty", "/specialty-tea.jpg"]
  ])


  const handleCardClick = (drink) => {
    setSelectedDrink(drink); 
    setShowPopup(true);
  };

  const [drinks, setDrinks] = useState([]);  
  const [showPopup, setShowPopup] = useState(false);
  const [selectedDrink, setSelectedDrink] = useState(null);
  const [showCheckout, setShowCheckout] = useState(false);

  useEffect(() => {
    fetch(`http://${SERVER_DOMAIN}/api/drinks/${category}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched drinks:", data)
        setDrinks(data);
      })
      .catch((error) => console.error("Error fetching drinks:", error));
  }, [category]);

  return (
    <>
      <h2 className="title-m">{category.replace("-", " ")} Menu</h2>
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
                onClick={() => handleCardClick(drink)}
                style={{ cursor: "pointer" }}
              >
                <img
                  className="card-image3"
                  src={images.get(category)}
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
              <p>Milk Bruhba 1 - $10</p> {/*TODO: Carry over cart logic from employees*/}
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
      <span className="close-btn2" onClick={() => setShowPopup(false)}>
        &times;
      </span>
      <b>Level Of Ice</b>
      <div className="button-container">
        <button className = "b1">None</button>
        <button className = "b1">Light Ice</button>
        <button className = "b1">Normal Ice</button>
        <button className = "b1">Extra Ice</button>
      </div>
      <b className="Sugar">Level Of Sugar</b>
      <div className="button-container">
        <button className = "b1">None</button>
        <button className = "b1">25%</button>
        <button className = "b1">50%</button>
        <button className = "b1">75%</button>
        <button className = "b1">100%</button>
      </div>
      <b className="Sugar">Toppings</b>
      <div className="button-container">
        <button className = "b1">None</button>
        <button className = "b1">Pearl</button>
        <button className = "b1">Mini Pearl</button>
        <button className = "b1">Ice Cream</button>
        <button className = "b1">Pudding</button>
        <button className = "b1">Aloe Vera</button>
        <button className = "b1">Red Bean</button>
        <button className = "b1">Crema</button>
        <button className = "b1">Aiju Jelly</button>
        <button className = "b1">Crystal Boba</button>
      </div>
      <button className = "b2"> Add to cart</button>
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

export default CustomerMenu;

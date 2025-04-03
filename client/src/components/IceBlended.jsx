import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


const IceBlended = () => {
    const navigate = useNavigate();

    const handleCardClick = () => {
        // Navigate to the options page for the selected drink
        navigate(`/Options`);
    };
    const [drinks, setDrinks] = useState([]);
    
      useEffect(() => {
        fetch("http://localhost:5000/api/drinks/ice-blended") 
          .then((response) => response.json())
          .then((data) => setDrinks(data))
          .catch((error) => console.error("Error fetching drinks:", error));
      }, []); 
    
      return (
        <div>
          <h2 className="title-m">Ice Blended Menu</h2>
          <center>
          <div className="card-container">
            {drinks.map((drink) => (
              <div key={drink.id} className="card" 
              onClick={() => handleCardClick(drink.id)} 
              style={{ cursor: "pointer" }}>
                <img
                  className="card-image"
                  src="/placeholder.jpg" 
                  alt={`Picture of ${drink.drink_name}`}
                />
                <p className="card-text">{drink.drink_name}</p>
              </div>
            ))}
          </div>
          </center>
          <Link to="/Categories">
          <button className="drinksButton" >Go Back</button>
          </Link>
        </div>
      );
};

export default IceBlended;

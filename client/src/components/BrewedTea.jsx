import React, { useState, useEffect } from "react";

const BrewedTea = () => {
    const [drinks, setDrinks] = useState([]);
    
      // Fetch data when the component mounts (only once)
      useEffect(() => {
        fetch("http://localhost:5000/api/drinks/brewed-tea") // Your API endpoint
          .then((response) => response.json())
          .then((data) => setDrinks(data))  // Set the fetched data in state
          .catch((error) => console.error("Error fetching drinks:", error));
      }, []); // Empty dependency array to run the effect only once
    
      return (
        <div>
          <h2 className="title-m">Brewed Tea Menu</h2>
          <div className="card-container">
            {/* Map over the drinks array and render each drink */}
            {drinks.map((drink) => (
              <div key={drink.id} className="card">
                <img
                  className="card-image"
                  src="/placeholder.jpg" // Static image for all drinks
                  alt={`Picture of ${drink.drink_name}`}
                />
                <p className="card-text">{drink.drink_name}</p> {/* Dynamic drink name */}
              </div>
            ))}
          </div>
        </div>
      );
};

export default BrewedTea;

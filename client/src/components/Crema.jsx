import React, { useState, useEffect } from "react";

const Crema = () => {
    const [drinks, setDrinks] = useState([]);
    
      useEffect(() => {
        fetch("http://localhost:5000/api/drinks/crema")
          .then((response) => response.json())
          .then((data) => setDrinks(data))
          .catch((error) => console.error("Error fetching drinks:", error));
      }, []);
    
      return (
        <div>
          <h2 className="title-m">Creama Menu</h2>
          <div className="card-container">
            {drinks.map((drink) => (
              <div key={drink.id} className="card">
                <img
                  className="card-image"
                  src="/placeholder.jpg"
                  alt={`Picture of ${drink.drink_name}`}
                />
                <p className="card-text">{drink.drink_name}</p>
              </div>
            ))}
          </div>
        </div>
      );
};

export default Crema;

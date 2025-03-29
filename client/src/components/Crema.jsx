import React from "react";
import bobaPic from "./placeholder.jpg";

const cremaDrinks = [
    { id: 17, name: "Black Crema Tea", img: bobaPic},
    { id: 18, name: "Wintermelon Crema", img: bobaPic }
];

const Crema = () => {
    return (
        <div>
            <h2 className = "title-m">Crema Menu</h2>
            <div className="card-container">
                {cremaDrinks.map((drink) => (
                    <div key={drink.id} className="card">
                        <img
                            className="card-image"
                            src={drink.img}
                            alt={`Picture of ${drink.name}`}
                        />
                        <p className="card-text">{drink.name}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Crema;

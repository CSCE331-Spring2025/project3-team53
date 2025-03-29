import React from "react";
import bobaPic from "./placeholder.jpg";

const milkTeaDrinks = [
    { id: 1, name: "Black Classic Milk Tea", img: bobaPic },
    { id: 2, name: "Coffee Milk Tea", img: bobaPic },
    { id: 3, name: "Thai Milk Tea", img: bobaPic },
    { id: 4, name: "Matcha Red Bean Milk Tea", img: bobaPic }
];

const MilkTea = () => {
    return (
        <div>
            <h2 className = "title-m">Milk Tea Menu</h2>
            <div className="card-container">
                {milkTeaDrinks.map((drink) => (
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

export default MilkTea;
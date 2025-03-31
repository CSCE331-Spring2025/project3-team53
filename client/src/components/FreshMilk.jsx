import React from "react";
import { useNavigate } from "react-router-dom";
import bobaPic from "./placeholder.jpg";

const freshMilkDrinks = [
    { id: 15, name: "Cocoa Lover with Fresh Milk", img: bobaPic},
    { id: 16, name: "Handmade Taro with Fresh Milk", img: bobaPic }
];

const FreshMilk = () => {
    const navigate = useNavigate();

    const handleCardClick = () => {
        // Navigate to the options page for the selected drink
        navigate(`/Options`);
    };
    return (
        <div>
            <h2 className = "title-m">Fresh Milk Menu</h2>
            <div className="card-container">
                {freshMilkDrinks.map((drink) => (
                                        <div
                                        key={drink.id}
                                        className="card"
                                        onClick={() => handleCardClick(drink.id)} 
                                        style={{ cursor: "pointer" }} 
                                    >
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

export default FreshMilk;

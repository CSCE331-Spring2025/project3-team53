import React from "react";
import { useNavigate } from "react-router-dom";
import bobaPic from "./placeholder.jpg";

const iceBlendedDrinks = [
    { id: 13, name: "Oreo Ice Blended with Pearl", img: bobaPic},
    { id: 14, name: "Taro Ice Blended with pudding", img: bobaPic }
];

const IceBlended = () => {
    const navigate = useNavigate();

    const handleCardClick = () => {
        // Navigate to the options page for the selected drink
        navigate(`/Options`);
    };
    return (
        <div>
            <h2 className = "title-m">Ice Blended Menu</h2>
            <div className="card-container">
                {iceBlendedDrinks.map((drink) => (
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

export default IceBlended;

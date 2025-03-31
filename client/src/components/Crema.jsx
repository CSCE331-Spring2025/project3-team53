import React from "react";
import { useNavigate } from "react-router-dom";
import bobaPic from "./placeholder.jpg";

const cremaDrinks = [
    { id: 17, name: "Black Crema Tea", img: bobaPic},
    { id: 18, name: "Wintermelon Crema", img: bobaPic }
];

const Crema = () => {
    const navigate = useNavigate();

    const handleCardClick = () => {
        // Navigate to the options page for the selected drink
        navigate(`/Options`);
    };
    return (
        <div>
            <h2 className = "title-m">Crema Menu</h2>
            <div className="card-container">
                {cremaDrinks.map((drink) => (
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

export default Crema;

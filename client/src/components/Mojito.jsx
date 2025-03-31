import React from "react";
import { useNavigate } from "react-router-dom";
import bobaPic from "./placeholder.jpg";

const mojitoDrinks = [
    { id: 19, name: "Lime Mojito", img: bobaPic},
    { id: 20, name: "Strawberry Mojito", img: bobaPic }
];


const Mojito = () => {
    const navigate = useNavigate();

    const handleCardClick = () => {
        // Navigate to the options page for the selected drink
        navigate(`/Options`);
    };
    return (
        <div>
            <h2 className = "title-m">Mojito Menu</h2>
            <div className="card-container">
                {mojitoDrinks.map((drink) => (
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

export default Mojito;

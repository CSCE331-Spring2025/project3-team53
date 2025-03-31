import React from "react";
import { useNavigate } from "react-router-dom";
import bobaPic from "./placeholder.jpg";

const fruitTeaDrinks = [
    { id: 5, name: "Hawaii Fruit Tea", img: bobaPic },
    { id: 6, name: "Kiwi Fruit Tea", img: bobaPic },
    { id: 7, name: "Honey Lemonade with Aloe Vera", img: bobaPic },
    { id: 8, name: "Mango and Passion Fruit Tea", img: bobaPic },
];

const FruitTea = () => {
    const navigate = useNavigate();

    const handleCardClick = () => {
        // Navigate to the options page for the selected drink
        navigate(`/Options`);
    };

    return (
        <div>
            <h2 className="title-m">Fruit Tea Menu</h2>
            <div className="card-container">
                {fruitTeaDrinks.map((drink) => (
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

export default FruitTea;
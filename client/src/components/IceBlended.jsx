import React from "react";
import bobaPic from "./placeholder.jpg";

const iceBlendedDrinks = [
    { id: 13, name: "Oreo Ice Blended with Pearl", img: bobaPic},
    { id: 14, name: "Taro Ice Blended with pudding", img: bobaPic }
];

const IceBlended = () => {
    return (
        <div>
            <h2 className = "title-m">Ice Blended Menu</h2>
            <div className="card-container">
                {iceBlendedDrinks.map((drink) => (
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

export default IceBlended;

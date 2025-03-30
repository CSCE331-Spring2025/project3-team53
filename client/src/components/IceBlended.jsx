import React from "react";

const iceBlendedDrinks = [
    { id: 13, name: "Oreo Ice Blended with Pearl", img: "/placeholder.jpg"},
    { id: 14, name: "Taro Ice Blended with pudding", img: "/placeholder.jpg" }
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

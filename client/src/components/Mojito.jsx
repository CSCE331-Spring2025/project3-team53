import React from "react";

const mojitoDrinks = [
    { id: 19, name: "Lime Mojito", img: "/placeholder.jpg"},
    { id: 20, name: "Strawberry Mojito", img: "/placeholder.jpg" }
];


const Mojito = () => {
    return (
        <div>
            <h2 className = "title-m">Mojito Menu</h2>
            <div className="card-container">
                {mojitoDrinks.map((drink) => (
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

export default Mojito;

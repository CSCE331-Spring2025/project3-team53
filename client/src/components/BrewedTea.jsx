import React from "react";

const brewedTeaDrinks = [
    { id: 9, name: "Classic Oolong Tea", img: "/placeholder.jpg"},
    { id: 10, name: "Ginger Tea", img: "/placeholder.jpg" },
    { id: 11, name: "Wintermelon Tea", img: "/placeholder.jpg"},
    { id: 12, name: "Honey Oolong Tea", img: "/placeholder.jpg"}
];

const BrewedTea = () => {
    return (
        <div>
            <h2 className="title-m">Brewed Tea Menu</h2>
            <div className="card-container">
                {brewedTeaDrinks.map((drink) => (
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

export default BrewedTea;

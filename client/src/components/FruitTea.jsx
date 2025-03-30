import React from "react";

const fruitTeaDrinks = [
    { id: 5, name: "Hawaii Fruit Tea", img: "/placeholder.jpg"},
    { id: 6, name: "Kiwi Fruit Tea", img: "/placeholder.jpg"},
    { id: 7, name: "Honey Lemonade with Aloe Vera", img: "/placeholder.jpg"},
    { id: 8, name: "Mango and Passion Fruit Tea", img: "/placeholder.jpg"},
    
];

const FruitTea = () => {
    return (
        <div>
            <h2 className = "title-m">Fruit Tea Menu</h2>
            <div className="card-container">
                {fruitTeaDrinks.map((drink) => (
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

export default FruitTea;
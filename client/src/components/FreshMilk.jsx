import React from "react";

const freshMilkDrinks = [
    { id: 15, name: "Cocoa Lover with Fresh Milk", img: "/placeholder.jpg"},
    { id: 16, name: "Handmade Taro with Fresh Milk", img: "/placeholder.jpg" }
];

const FreshMilk = () => {
    return (
        <div>
            <h2 className = "title-m">Fresh Milk Menu</h2>
            <div className="card-container">
                {freshMilkDrinks.map((drink) => (
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

export default FreshMilk;

import React from "react";
import bobaPic from "./placeholder.jpg";

const specialtyDrinks = [
    { id: 21, name: "Pineapple Honey Lemonade with Crystal Boba", img: bobaPic},
    { id: 22, name: "Christmas Tea", img: bobaPic },
    { id: 23, name: "Spring Tea", img: bobaPic}
];


const Specialty = () => {
    return (
        <div>
            <h2 className = "title-m">Specialty Menu</h2>
            <div className="card-container">
                {specialtyDrinks.map((drink) => (
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

export default Specialty;

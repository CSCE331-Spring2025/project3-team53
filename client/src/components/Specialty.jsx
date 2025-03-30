import React from "react";

const specialtyDrinks = [
    { id: 21, name: "Pineapple Honey Lemonade with Crystal Boba", img: "/placeholder.jpg" },
    { id: 22, name: "Christmas Tea", img: "/placeholder.jpg" },
    { id: 23, name: "Spring Tea", img: "/placeholder.jpg" }
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

import React, { useState } from "react";
import { Link } from "react-router-dom";
import bobaPic from './placeholder.jpg';


const milkTeaDrinks = [
    { id: 1, name: "Black Classic Milk Tea", img: bobaPic},
    { id: 2, name: "Coffee Milk Tea", img: bobaPic},
    { id: 3, name: "Thai Milk Tea", img: bobaPic},
    { id: 4, name: "Matcha Red Bean Milk Tea", img: bobaPic}
];

const fruitTeaDrinks = [
    { id: 5, name: "Hawaii Fruit Tea", img: bobaPic},
    { id: 6, name: "Kiwi Fruit Tea", img: bobaPic},
    { id: 7, name: "Honey Lemonade with Aloe Vera", img: bobaPic},
    { id: 8, name: "Mango and Passion Fruit Tea", img: bobaPic},
    
];

const brewedTeaDrinks = [
    { id: 9, name: "Classic Oolong Tea", img: bobaPic},
    { id: 10, name: "Ginger Tea", img: bobaPic },
    { id: 11, name: "Wintermelon Tea", img: bobaPic},
    { id: 12, name: "Honey Oolong Tea", img: bobaPic}
];

const iceBlendedDrinks = [
    { id: 13, name: "Oreo Ice Blended with Pearl", img: bobaPic},
    { id: 14, name: "Taro Ice Blended with pudding", img: bobaPic }
];

const freshMilkDrinks = [
    { id: 15, name: "Cocoa Lover with Fresh Milk", img: bobaPic},
    { id: 16, name: "Handmade Taro with Fresh Milk", img: bobaPic }
];

const cremaDrinks = [
    { id: 17, name: "Black Crema Tea", img: bobaPic},
    { id: 18, name: "Wintermelon Crema", img: bobaPic }
];

const mojitoDrinks = [
    { id: 19, name: "Lime Mojito", img: bobaPic},
    { id: 20, name: "Strawberry Mojito", img: bobaPic }
];

const specialtyDrinks = [
    { id: 21, name: "Pineapple Honey Lemonade with Crystal Boba", img: bobaPic},
    { id: 22, name: "Christmas Tea", img: bobaPic },
    { id: 23, name: "Spring Tea", img: bobaPic}
];

const Drinks = () => {
    const [currentMenu, setCurrentMenu] = useState("milkTea");
  
    const drinkMenus = {
      milkTea: milkTeaDrinks,
      fruitTea: fruitTeaDrinks,
      brewedTea: brewedTeaDrinks,
      iceBlended: iceBlendedDrinks,
      freshMilk: freshMilkDrinks,
      crema: cremaDrinks,
      mojito: mojitoDrinks,
      specialty: specialtyDrinks
    };
  
    return (
      <div className="app-container">
        <h1>Boba Menu</h1>
        <select
          className="menu-selector"
          onChange={(e) => setCurrentMenu(e.target.value)}
          value={currentMenu}
        >
          <option value="milkTea">Milk Tea</option>
          <option value="fruitTea">Fruit Tea</option>
          <option value="brewedTea">Brewed Tea</option>
          <option value="iceBlended">Ice Blended</option>
          <option value="freshMilk">Fresh Milk</option>
          <option value="crema">Crema</option>
          <option value="mojito">Mojito</option>
          <option value="specialty">Specialty</option>
        </select>
        <div className="card-container">
          {drinkMenus[currentMenu].map((drink) => (
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
        <Link to="/">
          <button>Go to Home Page</button>
        </Link>
      </div>
    );
  };
  
  export default Drinks;
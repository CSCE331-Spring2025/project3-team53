import React, { useState } from "react";

const Options = () => {
  const [ice, setIce] = useState("");
  const [sugar, setSugar] = useState("");
  const [topping, setTopping] = useState("");

  return (
    <div style={{ padding: "20px" }}>
      <h1>Modify Order</h1>
      
      <div>
        <h3>Ice</h3>
        {["No Ice", "Little Ice", "Medium Ice", "Large Ice"].map((option) => (
          <label key={option}>
            <input
              type="radio"
              value={option}
              checked={ice === option}
              onChange={(e) => setIce(e.target.value)}
            />
            {option}
          </label>
        ))}
      </div>

      <div>
        <h3>Sugar</h3>
        {["0%", "25%", "50%", "75%", "100%"].map((level) => (
          <label key={level}>
            <input
              type="radio"
              value={level}
              checked={sugar === level}
              onChange={(e) => setSugar(e.target.value)}
            />
            {level}
          </label>
        ))}
      </div>

      <div>
        <h3>Toppings</h3>
        {["None", "Tapioca", "Lychee Jelly", "Grape Jelly"].map((toppingOption) => (
          <label key={toppingOption}>
            <input
              type="radio"
              value={toppingOption}
              checked={topping === toppingOption}
              onChange={(e) => setTopping(e.target.value)}
            />
            {toppingOption}
          </label>
        ))}
      </div>
    </div>
  );
};

export default Options;

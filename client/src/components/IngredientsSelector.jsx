import React from 'react';
import '../styles/IngredientSelector.css';

const IngredientsSelector = ({ selectedIngredients, setSelectedIngredients, ingredientCounts, setIngredientCounts }) => {
  const ingredients = [
    "aloe_vera", "wintermelon", "black_pearl", "creamer", "creama",
    "ice_cream", "matcha", "strawberry_juice", "mint", "pineapple_jam",
    "honey", "mango_jam", "ginger_tea", "oreo", "thai_tea",
    "cocoa_powder", "mini_pearl", "red_bean", "green_tea", "passion_fruit",
    "orange_jam", "pudding", "black_tea", "lime_juice", "crystal_boba",
    "wintermelon_tea", "lime_slice", "kiwi_jam", "oolong_tea", "aiyu_jelly",
    "grapefruit_jam", "milk", "taro_paste", "lemonade", "coffee",
  ];

  const handleAdd = (ingredient) => {
    // update ingredientCounts
    setIngredientCounts((prev) => ({
      ...prev,
      [ingredient]: (prev[ingredient] || 0) + 1,
    }));
  
    // check if selected ingredient is new
    setSelectedIngredients((prev) =>
      prev.includes(ingredient) ? prev : [...prev, ingredient]
    );
  };

  const handleClear = () => {
    setSelectedIngredients([]);
    setIngredientCounts({});
  };

  const getCount = (ingredient) => ingredientCounts[ingredient] || 0;

  return (
    <div className="ingredient-section">
      <div className="scrollable-container">
        {ingredients.map((ingredient) => {
          const count = getCount(ingredient);
          return (
            <div
              key={ingredient}
              className={`ingredient-item ${count > 0 ? "selected" : ""}`}
              onClick={() => handleAdd(ingredient)}
            >
              <span className="ingredient-name">{ingredient}</span>
              {count > 0 && <span className="counter-badge">×{count}</span>}
            </div>
          );
        })}
      </div>

      <div className="selected-display">
        <h4>Selected Ingredients:</h4>
        {selectedIngredients.length === 0 ? (
          <p>No ingredients added.</p>
        ) : (
          <ul>
            {selectedIngredients.map((ing, idx) => (
              <li key={idx}>
                {ing} - {ingredientCounts[ing]} units
              </li>
            ))}
          </ul>
        )}
        <button onClick={handleClear} className="clear-btn">Clear All</button>
      </div>
    </div>
  );
};

export default IngredientsSelector;
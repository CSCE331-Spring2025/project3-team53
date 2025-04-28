import React, { useState, useEffect, useContext} from "react";
import { useNavigate, Link, useLocation, useSearchParams} from "react-router-dom";
import * as func from '../apiCall.js';
import { GlobalContext } from './GlobalContext';

const encoding = new Map([
  ["No Ice",0], ["Light Ice",1], ["Normal Ice",2], ["Extra Ice",3],
  ["0%",0], ["25%",1], ["50%",2], ["75%",3], ["100%",4],
  ["Pearl", "black_pearl"], ["Mini Pearl", "mini_pearl"], ["Ice Cream", "ice_cream"], 
  ["Pudding", "pudding"], ["Aloe Vera", "aloe_vera"], ["Red Bean", "red_bean"], 
  ["Aiyu Jelly", "aiyu_jelly"], ["Creama", "creama"], ["Crystal Boba", "crystal_boba"]
])

const Options = () => {
  const navigate = useNavigate();

  //get drink id from url parameter
  const [searchParams, setSearchParams] = useSearchParams();
  const drink = Number.parseInt(searchParams.get("drink"));

  //get category selected for back button navigation
  const { state } = useLocation();
  const { category } = state;

  //saved state for stashing order
  const [ice, setIce] = useState("Normal Ice");
  const [sugar, setSugar] = useState("100%");
  const [checked, setChecked] = useState(new Map([
    ["None", true], ["Pearl", false], ["Mini Pearl", false], 
    ["Ice Cream", false], ["Pudding", false], ["Aloe Vera", false], 
    ["Red Bean", false], ["Creama", false], ["Aiyu Jelly", false], 
    ["Crystal Boba", false]]
  ));

  //get global state for stashing orders
  const {loginID} = useContext(GlobalContext)

  return (
    <>
    <div style={{ padding: "20px" }}>
      <h1>Modify Order</h1>
      
      {/*ice options*/}
      <div>
        <h3>Ice</h3>
        {["No Ice", "Light Ice", "Normal Ice", "Extra Ice"].map((option) => (
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

      {/*sugar options*/}
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

      {/*extra add ons options*/}
      <div>
        <h3>Toppings</h3>
        {
          ["None", "Pearl", "Mini Pearl", "Ice Cream",
           "Pudding", "Aloe Vera", "Red Bean", "Creama", 
           "Aiyu Jelly", "Crystal Boba"].map((toppingOption) => (
            <label key={toppingOption}>
              <input
                type="checkbox" 
                checked={checked.get(toppingOption)}
                onChange={() => {
                  let newMap = new Map(checked);
                  newMap.set(toppingOption, !newMap.get(toppingOption));
                  if(toppingOption === "None" && newMap.get(toppingOption)){
                      newMap.forEach((values, keys) => {
                        newMap.set(keys, false);
                    });
                    newMap.set("None",true);
                  }
                  else{
                    newMap.set("None",false);
                  }
                  setChecked(newMap);
                }}
              />
              {toppingOption}
            </label>
          ))
        }

      </div>

      <div>
      <Link to={`/menu/${category}`}>
        <button className="drinksButton">Go Back</button>
      </Link>

      <button className="drinksButton"
        onClick = {() => {
          const add_ons = [];
          if(!checked.get("None")){
            checked.forEach((value, key) => {
              if(value){
                add_ons.push(encoding.get(key));
              }
            });
          };
          func.enqueue_order(loginID, drink, encoding.get(ice), encoding.get(sugar), add_ons);
          navigate(`/menu/${category}`,);
        }}
      >
        Send it Baby
      </button>
      </div>
      </div>
    </>
  );
};

export default Options;

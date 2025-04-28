import React, { useState, useEffect} from "react";
import { Link, useParams  } from "react-router-dom";
import { SERVER_DOMAIN } from "./config";
import * as func from "../apiCall";

const ice_encoding = new Map([[0,"No Ice"], [1,"Light Ice"], [2,"Normal Ice"], [3,"Extra Ice"]]);
const sugar_encoding = new Map([[0,"0% Sugar"], [1,"25% Sugar"], [2,"50% Sugar"], [3,"75% Sugar"], [4,"100% Sugar"]]);
const addon_options =  ["black_pearl", "mini_pearl", "ice_cream", "pudding", 
                        "aloe_vera", "red_bean", "creama", "aiyu_jelly", "crystal_boba"]
const addon_encoding = new Map([["black_pearl", "Pearl"], ["mini_pearl", "Mini Pearl"], ["ice_cream", "Ice Cream"], 
  ["pudding", "Pudding"], ["aloe_vera", "Aloe Vera"], ["red_bean", "Red Bean"], 
  ["creama", "Creama"], ["aiyu_jelly", "Aiyu Jelly"], ["crystal_boba", "Crystal Boba"]])

//TODO - refactor for each drink type
const CustomerMenu = () => {
  const { category } = useParams();

  const images = new Map([
    ["Milk-Tea", "/milk_tea.jpg"], ["Fruit-Tea", "/fruit-tea.jpg"], ["Brewed-Tea", "/brewed-tea.jpg"],
    ["Fresh-Milk", "/fresh-milk.jpg"], ["Ice-Blended", "/ice-blended.jpg"], ["Mojito", "/mojito-tea.jpg"],
    ["Crema", "/crema-tea.jpg"], ["Specialty", "/specialty-tea.jpg"]
  ])

  const [drinks, setDrinks] = useState([]);  
  const [showPopup, setShowPopup] = useState(false);
  const [selectedDrink, setSelectedDrink] = useState(null);
  const [showCheckout, setShowCheckout] = useState(false);
  const [sugar, setSugar] = useState(4);
  const [ice, setIce] = useState(2);
  const [addons, setAddons] = useState([true, false, false, false, false, false,
  false, false, false, false]);
  const [cart, setCart] = useState(new Map());
  const [cartChanged, setCartChanged] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    fetch(`http://${SERVER_DOMAIN}/api/drinks/${category}`)
      .then((response) => response.json())
      .then((data) => {
        //console.log("Fetched drinks:", data)
        setDrinks(data);
      })
      .catch((error) => console.error("Error fetching drinks:", error));
  }, [category]);

    //updates the cart whenever stash gets changed
    useEffect(() =>{
      let newCart = new Map();
      (async () => {
        let prices = await func.get_stash_price();
        setTotalPrice(prices.get(0));
        func.get_order_queue().forEach((value, key, _) => {
          let name = func.get_menu().find(obj => obj.id === value[1]).drink_name;
          newCart.set(key, 
            [name, ice_encoding.get(value[2]), sugar_encoding.get(value[3]), prices.get(key), 
            value[4].map((element, index) => addon_encoding.get(element)).join(", ")]);
        });
        setCart(newCart);
      })();
    },[cartChanged]);

  const handleCardClick = (drink) => {
    setSelectedDrink(drink); 
    setShowPopup(true);
  };

  const handleSugar = (level) => {
    setSugar(level);
  }
  const handleIce = (level) => {
    setIce(level);
  }
  const handleAddons = (level) => {
    let newAddons = addons.slice();
    newAddons[level] = !newAddons[level];
    if(level === 0 && newAddons[0]){
      newAddons = [true, false, false, false, false, false, false, false, false, false];
    }
    else{
      newAddons[0] = false;
    }
    setAddons(newAddons);
  }

  const handleAddToCart = () => {
    let temp = [];
    if(!addons[0]){
      addons.slice(1).forEach((bool, index) => {
        if(bool){
          temp.push(addon_options[index]);
        }
      })};
    //console.log(0, selectedDrink.id, ice, sugar, temp);
    func.enqueue_order(0, selectedDrink.id, ice, sugar, temp);
    setIce(2);
    setSugar(4);
    setAddons([true, false, false, false, false, false,
      false, false, false, false]);
    setShowPopup(false)
  }

  return (
    <>
      <h2 className="title-m">{category.replace("-", " ")} Menu</h2>
      <div>
        <div className="cart">
          <button className="checkoutButton" onClick={() => setShowCheckout(true)}>
            View Cart
          </button>
        </div>
        <center>
          <div className="card-container">
            {drinks.map((drink) => (
              <div
                key={drink.id}
                className="card3"
                onClick={() => handleCardClick(drink)}
                style={{ cursor: "pointer" }}
              >
                <img
                  className="card-image3"
                  src={images.get(category)}
                  alt={`Picture of ${drink.drink_name}`}
                />
                <p className="card-text">{drink.drink_name}</p>
              </div>
            ))}
          </div>
        </center>

        {showCheckout && (
          <div className="checkout-overlay">
            <div className="overlay-content">
              <span className="close-btn" onClick={() => setShowCheckout(false)}>
                &times;
              </span>
              <h2>Your Cart</h2>
              {Array.from(cart).map(([key, values]) => {
                return <><p className="cart-item">
                        <span className="close-btn" onClick={() => {func.dequeue_order(key); setCartChanged(!cartChanged)}}>&times;</span>
                        {values[0]} - ${values[3]}<br/>
                        <span style={{margin: "0em 0em 0em 2em"}}>{values[1]} - {values[2]}</span> <br/>
                        <span style={{margin: "0em 0em 0em 2em"}}>{values[4]}</span>
                      </p></>
              })

              }
              <p>Total: ${totalPrice}</p>
              <Link to="/Checkout">
                <button>Proceed to Payment</button>
              </Link>
            </div>
          </div>
        )}
{showPopup && (
  <div className="popup-overlay">
    <div className="popup-content">
      <span className="close-btn2" onClick={() => setShowPopup(false)}>
        &times;
      </span>
      <b>Level Of Ice</b>
      <div className="button-container">
        <button className = "b1" onClick={() => {handleIce(0)}} 
        style={{ backgroundColor: ice === 0 ? 'aqua' : 'GhostWhite' }}>None</button>
        <button className = "b1" onClick={() => {handleIce(1)}}
        style={{ backgroundColor: ice === 1 ? 'aqua' : 'GhostWhite' }}>Light Ice</button>
        <button className = "b1" onClick={() => {handleIce(2)}}
        style={{ backgroundColor: ice === 2 ? 'aqua' : 'GhostWhite' }}>Normal Ice</button>
        <button className = "b1" onClick={() => {handleIce(3)}}
        style={{ backgroundColor: ice === 3 ? 'aqua' : 'GhostWhite' }}>Extra Ice</button>
      </div>
      <b className="Sugar">Level Of Sugar</b>
      <div className="button-container">
        <button className = "b1" onClick={() => {handleSugar(0)}}
        style={{ backgroundColor: sugar === 0 ? 'aqua' : 'GhostWhite' }}>None</button>
        <button className = "b1" onClick={() => {handleSugar(1)}}
        style={{ backgroundColor: sugar === 1 ? 'aqua' : 'GhostWhite' }}>25%</button>
        <button className = "b1" onClick={() => {handleSugar(2)}}
        style={{ backgroundColor: sugar === 2 ? 'aqua' : 'GhostWhite' }}>50%</button>
        <button className = "b1" onClick={() => {handleSugar(3)}}
        style={{ backgroundColor: sugar === 3 ? 'aqua' : 'GhostWhite' }}>75%</button>
        <button className = "b1" onClick={() => {handleSugar(4)}}
        style={{ backgroundColor: sugar === 4 ? 'aqua' : 'GhostWhite' }}>100%</button>
      </div>
      <b className="Sugar">Toppings</b>
      <div className="button-container">
        <button className = "b1" onClick={() => {handleAddons(0)}} style={{ backgroundColor: addons[0]? 'aqua' : 'GhostWhite' }}>None</button>
        <button className = "b1" onClick={() => {handleAddons(1)}} style={{ backgroundColor: addons[1]? 'aqua' : 'GhostWhite' }}>Pearl</button>
        <button className = "b1" onClick={() => {handleAddons(2)}} style={{ backgroundColor: addons[2]? 'aqua' : 'GhostWhite' }}>Mini Pearl</button>
        <button className = "b1" onClick={() => {handleAddons(3)}} style={{ backgroundColor: addons[3]? 'aqua' : 'GhostWhite' }}>Ice Cream</button>
        <button className = "b1" onClick={() => {handleAddons(4)}} style={{ backgroundColor: addons[4]? 'aqua' : 'GhostWhite' }}>Pudding</button>
        <button className = "b1" onClick={() => {handleAddons(5)}} style={{ backgroundColor: addons[5]? 'aqua' : 'GhostWhite' }}>Aloe Vera</button>
        <button className = "b1" onClick={() => {handleAddons(6)}} style={{ backgroundColor: addons[6]? 'aqua' : 'GhostWhite' }}>Red Bean</button>
        <button className = "b1" onClick={() => {handleAddons(7)}} style={{ backgroundColor: addons[7]? 'aqua' : 'GhostWhite' }}>Crema</button>
        <button className = "b1" onClick={() => {handleAddons(8)}} style={{ backgroundColor: addons[8]? 'aqua' : 'GhostWhite' }}>Aiju Jelly</button>
        <button className = "b1" onClick={() => {handleAddons(9)}} style={{ backgroundColor: addons[9]? 'aqua' : 'GhostWhite' }}>Crystal Boba</button>
      </div>
      <button className = "b2" onClick={handleAddToCart}> Add to cart</button>
    </div>
  </div>
)}


        <Link to="/CustomerOptions">
          <button className="drinksButton">Go Back</button>
        </Link>
      </div>
    </>
  );
};

export default CustomerMenu;

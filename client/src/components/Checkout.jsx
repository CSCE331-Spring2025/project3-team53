import React, { useState, useEffect, useContext} from "react";
import { Link, useLocation } from "react-router-dom";
import * as func from '../apiCall.js';
import { GlobalContext } from './GlobalContext';

const ice_encoding = new Map([[0,"No Ice"], [1,"Light Ice"], [2,"Normal Ice"], [3,"Extra Ice"]]);
const sugar_encoding = new Map([[0,"0% Sugar"], [1,"25% Sugar"], [2,"50% Sugar"], [3,"75% Sugar"], [4,"100% Sugar"]]);
const addon_encoding = new Map([["black_pearl", "Pearl"], ["mini_pearl", "Mini Pearl"], ["ice_cream", "Ice Cream"], 
    ["pudding", "Pudding"], ["aloe_vera", "Aloe Vera"], ["red_bean", "Red Bean"], 
    ["aiyu_jelly", "Aiyu Jelly"], ["creama", "Creama"], ["crystal_boba", "Crystal Boba"]
  ])
  

function Checkout() {
    console.log(func.get_order_queue());
    const { state } = useLocation();
    const { back_page } = state;

    const [name, setName] = useState("Guest");
    const [comment, setComment] = useState("");
    const [payment, setPayment] = useState("");
    const [shipping, setShipping] = useState("Pick Up");
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState([0,0])
    const [orderConfirmed, setOrderConfirmed] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [refreshFlag, setRefreshFlag] = useState(false);
    const deliveryFee = shipping === "Delivery" ? 3.0 : 0.0;

    useEffect(() => {
        (async () => {
            let cart = func.get_order_queue();
            let prices = await func.get_stash_price();
            let newCartItems = [];
            cart.forEach((value, key, _) => {
                let name = func.get_menu().find(obj => obj.id === value[1]).drink_name;
                newCartItems.push({
                    name:name, price:prices.get(key), ice:ice_encoding.get(value[2]), sugar:sugar_encoding.get(value[3]), 
                    add_on: value[4].map((element) => addon_encoding.get(element)).join(", "),
                    drink_id: key 
                });
            })
            setCartItems(newCartItems);
            setTotalPrice([prices.get(0), prices.get(0)+deliveryFee]);
        })();
    },[refreshFlag])

    function handleNameChange(event) {
        setName(event.target.value);
    }

    function handleCommentChange(event) {
        setComment(event.target.value);
    }

    function handlePaymentChange(event) {
        setPayment(event.target.value);
    }

    function handleShippingChange(event) {
        setRefreshFlag(!refreshFlag);
        setShipping(event.target.value);
    }

    async function handlePlaceOrder(event) {
        event.preventDefault();

        // Validation
        if (!name) {
            alert("Please enter your name!");
            return;
        }
        if (!payment) {
            alert("Please select a payment method!");
            return;
        }
        if (shipping === "Delivery" && !comment) {
            alert("Please provide delivery instructions!");
            return;
        }

        setIsLoading(true);
        await func.send_order_queue();
        setOrderConfirmed(true);
    }

    return (
        <div className="checkout">
            {!orderConfirmed ? (
                <form onSubmit={handlePlaceOrder}>
                    <h2>Checkout</h2>

                    <h3>Order Summary</h3>
                    <ul style={{listStyle: "none"}}>
                        {cartItems.map((item, index) => (
                            <li key={index}>
                                <span className="close-btn" onClick={() => {func.dequeue_order(item.drink_id); setRefreshFlag(!refreshFlag);}}>&times;</span>
                                {item.name} - ${(item.price).toFixed(2)} <br/>
                                <span style={{margin: "0em 0em 0em 2em"}}>{item.ice}</span><br/>
                                <span style={{margin: "0em 0em 0em 2em"}}>{item.sugar}</span><br/>
                                <span style={{margin: "0em 0em 0em 2em"}}>{item.add_on}</span>
                            </li>
                        ))}
                    </ul>
                    <p>Subtotal: ${totalPrice[0]}</p>
                    <p>Delivery Fee: ${deliveryFee}</p>
                    <p>Grand Total: ${totalPrice[1]}</p>
                    <div>
                    <label>
                        Name:
                        <input
                            value={name}
                            onChange={handleNameChange}
                            required
                        />
                    </label>

                    {shipping === "Delivery" && (
                        <label>
                            Delivery Instructions:
                            <textarea
                                value={comment}
                                onChange={handleCommentChange}
                                placeholder="Enter delivery instructions"
                            />
                        </label>
                    )}

                    <label>
                        Payment:
                        <select
                            value={payment}
                            onChange={handlePaymentChange}
                            required
                        >
                            <option value="">Select an option</option>
                            <option value="Visa">Visa</option>
                            <option value="Mastercard">Mastercard</option>
                            <option value="Gift card">Gift card</option>
                        </select>
                    </label>

                    <h3>Shipping</h3>
                    <div >
                    <label className="pickup">
                    <input
                    type="radio"
                    value="Pick Up"
                    checked={shipping === "Pick Up"}
                    onChange={handleShippingChange}
                     />
                    <p>Pick Up</p>
                    </label>
                    <label className="delivery">
                    <input
                         type="radio"
                        value="Delivery"
                        checked={shipping === "Delivery"}
                        onChange={handleShippingChange}
                        />
                        Delivery
                     </label>
                    </div>
                    </div>
                    <button type="submit" disabled={isLoading}>
                        {isLoading ? "Placing Order..." : "Place Order"}
                    </button>
                </form>
            ) : (
                <div>
                    <h2>Thank you, {name}!</h2>
                    <p>Your order has been placed.</p>
                    <p>Your order will be prepared shortly</p>
                    <Link to="/">
                        <button>Back to Home</button>
                    </Link>
                </div>
            )}
        <Link to={back_page}>
            <button  >Go Back</button>
        </Link>
        </div>
    );
}

export default Checkout;

import React, { useState } from "react";
import { Link } from "react-router-dom";

function Checkout() {
    const [name, setName] = useState("Guest");
    const [quantity, setQuantity] = useState(1);
    const [comment, setComment] = useState("");
    const [payment, setPayment] = useState("");
    const [shipping, setShipping] = useState("Delivery");
    const [cartItems, setCartItems] = useState([
        { name: "Water", price: 999.0, quantity: 2 },
        { name: "Air", price: 2000.0, quantity: 1 },
    ]);
    const [orderConfirmed, setOrderConfirmed] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const deliveryFee = shipping === "Delivery" ? 3.0 : 0.0;

    function handleNameChange(event) {
        setName(event.target.value);
    }

    function handleQuantityChange(event) {
        setQuantity(event.target.value);
    }

    function handleCommentChange(event) {
        setComment(event.target.value);
    }

    function handlePaymentChange(event) {
        setPayment(event.target.value);
    }

    function handleShippingChange(event) {
        setShipping(event.target.value);
    }

    function handlePlaceOrder(event) {
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
    }

    return (
        <div className="checkout">
            {!orderConfirmed ? (
                <form onSubmit={handlePlaceOrder}>
                    <h2>Checkout</h2>

                    <h3>Order Summary</h3>
                    <ul>
                        {cartItems.map((item, index) => (
                            <li key={index}>
                                {item.name} x {item.quantity} - $
                                {(item.price * item.quantity).toFixed(2)}
                            </li>
                        ))}
                    </ul>
                    <p>Subtotal: $0</p>
                    <p>Delivery Fee: $0</p>
                    <p>Grand Total: $0</p>
                    <div>
                    <label>
                        Name:
                        <input
                            value={name}
                            onChange={handleNameChange}
                            required
                        />
                    </label>
                    <label>
                        Quantity:
                        <input
                            value={quantity}
                            onChange={handleQuantityChange}
                            type="number"
                            min="1"
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
                    <label>
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
        </div>
    );
}

export default Checkout;

import React from "react";
import cartEmpty from "../../img/cart-empty.jpg";
import { AppContext } from "../../context/appContext.js";
import { UserContext } from "../../App.js";
import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// import prodlist from "../product/products.json"
import "./Cart.css";
import { Navigate } from "react-router-dom";
export default function Cart() {
  const navigate = useNavigate();
  const { cartItems, setCartItems, products, orders, setOrders } =
    useContext(AppContext);
  const { user } = useContext(UserContext);
  const [order, setOrder] = useState({});
  const [orderValue, setOrderValue] = useState(0);

  useEffect(() => {
    setOrderValue((prev) =>
      products.reduce((total, value) => {
        return total + value.price * (cartItems[value.id] ?? 0);
      }, 0)
    );
  }, [cartItems]);

  const updateCart = (id, qty) => {
    setCartItems((prev) => ({ ...prev, [id]: qty }));
  };

  const submitOrder = () => {
    order.date = Date().slice(0, 15);
    order.email = user.email;
    order.details = cartItems;
    order.total = orderValue;
    order.status = "pending";
    setOrder((prev) => ({ ...prev, order }));
    setOrders((prev) => [...prev, order]);
    setCartItems(() => []);
    navigate("/ecomm-react/order");
  };

  return (
    <div className="Cart-container">
      {products.map((elem) => {
        if (cartItems[elem.id]) {
          return (
            <div key={elem.id} ClassName="Cart-items">
              <br></br>
              <table>
                <tr>
                  <td> <img src={elem.image} width={75} height={70}></img><br></br></td>
                  <td><b>{elem.name}</b>-{elem.price} &#8377;</td>
                  <td> <button className="Cart-button"
                  onClick={() => updateCart(elem.id, cartItems[elem.id] - 1)}>
                  -
                  </button>
                  {cartItems[elem.id]}
                  <button  className="Cart-button"
                    onClick={() => updateCart(elem.id, cartItems[elem.id] + 1)}>
                  +
                  </button></td>
                </tr>
              </table>
              <hr></hr>
            </div>
            
          );
        }
      })}
      <div className="Order-value">Order Value:<h2>{orderValue} &#8377;</h2> </div>
=======
      {Object.keys(cartItems).length > 0 ? (
        <>
          <div className="Cart-div-left">
            <table className="Cart-table">
              <tr>
                <th>Item</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
              </tr>
              {products.map((elem) => {
                if (cartItems[elem.id]) {
                  return (
                    <tr key={elem.id} ClassName="Cart-items">
                      <td className="Cart-item-name">{elem.name}</td>
                      <td className="Cart-item-cells">₹{elem.price}</td>
                      <td className="Cart-item-buttons">
                        <button
                          className="Cart-button"
                          onClick={() =>
                            updateCart(elem.id, cartItems[elem.id] - 1)
                          }
                        >
                          -
                        </button>
                        <span style={{ padding: "5px" }}>
                          {cartItems[elem.id]}
                        </span>
                        <button
                          className="Cart-button"
                          onClick={() =>
                            updateCart(elem.id, cartItems[elem.id] + 1)
                          }
                        >
                          +
                        </button>
                      </td>
                      <td className="Cart-item-cells">
                        ₹{elem.price * cartItems[elem.id]}
                      </td>
                    </tr>
                  );
                }
              })}
              {/* <tr><td colspan="3">Total Order Value</td><td className="Cart-order-value">{orderValue}</td></tr> */}
            </table>
          </div>
          <div className="Cart-div-right">
            <div className="Cart-order-value">Order Value: ₹{orderValue}</div>
            <div className="Cart-order-value">
              <button onClick={submitOrder} className="Cart-place-order">
                Submit Order
              </button>
            </div>
          </div>
          {orders.length}
        </>
      ) : (
        <div>
          <img src={cartEmpty} alt="Cart is empty"></img>
        </div>
      )}
      </div>
  );
}

import React from "react";
import cartEmpty from "../../img/cart-empty.jpg";
import { AppContext } from "../../context/appContext.js";
import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// import prodlist from "../product/products.json"
import "./Cart.css";
import { Navigate } from "react-router-dom";
export default function Cart() {
  const navigate = useNavigate();
  const { flag, cartItems, setCartItems, products, orders, setOrders, user } =
    useContext(AppContext);
  const [order, setOrder] = useState({});
  const [orderValue, setOrderValue] = useState(0);
  const [items, setItems] = useState(0);

  useEffect(() => {
    setOrderValue((prev) =>
      products.reduce((total, value) => {
        return total + value.price * (cartItems[value.id] ?? 0);
      }, 0)
    );
    const values = Object.values(cartItems);
    let total = values.filter(((elem)=>elem>0))
    total = total.length;
    setItems(() => total);
  }, [cartItems]);

  const updateCart = (id, qty) => {
      setCartItems((prev) => ({ ...prev, [id]: qty }));
  };

  const submitOrder = () => {
    if (flag < 2) {
      navigate("/ecomm-react/login");
    } else {
      order.date = Date().slice(0, 15);
      order.email = user.email;
      order.details = cartItems;
      order.total = orderValue;
      order.status = "pending";
      setOrder((prev) => ({ ...prev, order }));
      setOrders((prev) => [...prev, order]);
      setCartItems(() => []);
      navigate("/ecomm-react/order");
    }
  };

  return (
    <div className="Cart-container">
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
            <div className="Cart-order-value">
              Subtotal({items} item{items > 1 && "s"}): ₹{orderValue}
            </div>
            <div className="Cart-order-value">
              <button onClick={submitOrder} className="Cart-place-order">
                Proceed to Buy
              </button>
            </div>
          </div>
      
        </>
      ) : (
        <div>
          <img src={cartEmpty} alt="Cart is empty"></img>
        </div>
      )}
    </div>
  );
}
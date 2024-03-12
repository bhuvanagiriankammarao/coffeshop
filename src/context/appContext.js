import { createContext,useState } from "react";
import products from "../components/product/products.json";
export const AppContext = createContext(null);

export const AppContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const [orders,setOrders] = useState([])
  const val = { cartItems, setCartItems, products, orders,setOrders };
  return <AppContext.Provider value={val}>{props.children}</AppContext.Provider>;
};

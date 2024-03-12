import { createContext, useState } from "react";
export const UserContext = createContext(null);
export const UserContextProvider = (props) => {
  const [user, setuser] = useState({});
  const val = { user, setuser };
  return (
    <UserContext.Provider value={val}>
      {props.children}
    </UserContext.Provider>
  );
};

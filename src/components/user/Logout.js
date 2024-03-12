import React, { useContext, useState } from "react";
import { UserContext } from "../../App";
export default function Logout() {
  const { user, setuser } = useContext(UserContext);
  return (
    <div>
      <button onClick={() => setuser((prev) => null)}>Logout</button>
    </div>
  );
}

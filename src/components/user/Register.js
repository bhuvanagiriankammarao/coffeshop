import React from "react";
import "./Register.css";
import { useContext, useState } from "react";
import { UserContext } from "../../App";
export default function Register() {
  const { flag, setFlag, user, setUser, users, setUsers } =
    useContext(UserContext);
  // const [user, setUser] = useState({ name: "", email: "", pass: "" });
  const newUser = () => {
    setUsers((prev) => [...prev, user]);
    setFlag(() => 2);
  };

  return (
    <div id="myModal" className="modal">
      <div className="modal-content">
        <div className="Rigister-header">
          <div className="Register-signup-title">Sign Up</div>
          <div onClick={() => setFlag(() => 0)} className="close">
            &times;
          </div>
        </div>
        <div className="Register-text-box">
          <input
            onChange={(e) =>
              setUser((prev) => ({ ...prev, name: e.target.value }))
            }
            placeholder="Enter Name"
            autoFocus
          ></input>
        </div>
        <div className="Register-text-box">
          <input
            onChange={(e) =>
              setUser((prev) => ({ ...prev, email: e.target.value }))
            }
            placeholder="Enter Email"
          ></input>
        </div>
        <div className="Register-text-box">
          <input
            onChange={(e) =>
              setUser((prev) => ({ ...prev, pass: e.target.value }))
            }
            type="password"
            placeholder="New Password"
          ></input>
        </div>

        <div>
          <button onClick={newUser}> Sign Up</button>
        </div>
      </div>
    </div>
  );
}
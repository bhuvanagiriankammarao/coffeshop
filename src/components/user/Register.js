import React from 'react'
import { useState} from "react";

export default function Register() {
    const[username, setUsername] = useState();
    const[password, setPassword] = useState();
    const[emailid, setEmailid] = useState();
    const[login, setLogin] = useState([]);
    const handleSubmit = (e) => {
        e.preventDefault();
        const newDetails = { uname: username, pass: password, email:emailid };
        setLogin([...login, newDetails]);
        setUsername('');
        setPassword('');
        setEmailid('');
    };
  return (
    <div className='main'>
    <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            value={username}
            onChange={(e) =>
            setUsername(e.target.value)}
            placeholder="Enter Name"
          ></input>
        </div>
        <div>
          <input
            type="password"
            value={emailid}
            onChange={(e) =>
            setEmailid(e.target.value)}
            placeholder="Enter Email"
          ></input>
        </div>
        <div>
          <input
            type="password"
            value={password}
            onChange={(e) =>
            setPassword(e.target.value)}
            placeholder="Enter Password"
          ></input>
        </div>
          <button>Submit</button>
          </form> 
          <div>
                <h2>Registered Users</h2>
                <ul>
                    {login.map((user, index) => (
                        <li key={index}>
                            Username: {user.uname}, Password: {user.pass}, Email: {user.email}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
       );
}
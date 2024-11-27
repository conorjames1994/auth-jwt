import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

export function Protected (){
const navigate = useNavigate();
const [secret, setSecret] = useState("");
const [user, setUser] = useState('');

  useEffect(() => { //when the page loads but before it renders, we use this to check if the jwt token is valid.
    const token = localStorage.getItem("token");

    axios.get("http://localhost:5000/protected", {headers: {
      Authorization: token
    }}).then((response) => {
      const newArray = Object.values(response.data)
      const { username } = newArray[1];
      setSecret(newArray[0]);
      setUser(username);
    }).catch((err) => {
      alert(`error - ${err}, please re-login`)
     navigate('/login')
    }
    );

  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  }

 if(localStorage.getItem("token")){
  
  return (
    <div>
      <button onClick={logout}>Logout</button>
      <h1>User authorised, welcome {user}</h1>
      <h2>Protected message from the server-end - {secret}</h2>
    </div>
  )
 }

  return(
    <div>
      <h1>Protected material, to access please login</h1>
    </div>
  )

  
}
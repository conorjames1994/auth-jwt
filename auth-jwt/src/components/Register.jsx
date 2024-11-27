import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { NavLink } from "react-router";
import { useEffect } from "react";

export function Register (){
  const [username, setUserName] = useState('')
 const [password, setPassword] = useState('');
 const navigate = useNavigate();
 
 const submit = () => {
 
  axios.post("http://localhost:5000/register", {username, password}).then((response) => {

  if(response.status === 200){
    alert("Registration successful, you will be redirected to login page");
    navigate("/login")
  } else if (response.status === 400){
    alert("Error, please try again.")
  }
}).catch((err) => {alert(`error - ${err}`)})
 };

 //to prevent the Register page being accessable once logged in.
 useEffect(() => { 
  const token = localStorage.getItem("token");

  axios.get("http://localhost:5000/protected", {headers: {
    Authorization: token
  }}).then((response) => {
    console.log(response)
    navigate("/protected")
  }).catch((err) => {
    console.log(err);
   
  }
  );

}, []);

  return (
    <div>
      <h1>Register Page</h1>
      <input type="text" placeholder="Username" value={username} onChange={(e) => setUserName(e.target.value)}/>
      <input type="text" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
      <button onClick={submit}>Submit</button>
      <br />
      <NavLink to={"/login"}>Already Registered?</NavLink>
    </div>
  )
}
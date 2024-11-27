import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import { NavLink } from "react-router";

export function Login(){
 const [username, setUserName] = useState('')
 const [password, setPassword] = useState('');
 const navigate = useNavigate();

 //login logic, if successfull, sends token and redirects to protected page
 const submit = () => {
  console.log(username, password)
axios.post("http://localhost:5000/login", {username, password}).then((user) => {
  if(!user){alert("invalid user, retry with correct username & password")}
  alert("Logging in !")
  localStorage.setItem("token", user.data.token)//stores token in front end for use.
  navigate('/protected')
}).catch((err) => {console.log(err);
  alert("Login unsuccessful, please retry with correct username & password")
})
 };

 //this logic is so that once authenticated and accessing the protected page, you can no longer access the login page.
 //done by, if you load /login now but you have a token in storage, it will navigate to protected.
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
      <h1>Login Page</h1>
      <input type="text" placeholder="Username" value={username} onChange={(e) => setUserName(e.target.value)}/>
      <input type="text" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
      <button onClick={submit}>Submit</button>
      <br />
      <NavLink to="/register">Need to register?</NavLink>
    </div>
  )
}
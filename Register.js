import React, { Component, useState } from "react";
import { useNavigate, Link } from 'react-router-dom'
import '../Register.css'
export default function Register() {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmpassword, setConfirmPassword] = useState('')
  const [userType, setUserType] = useState("");
  const [secretKey, setSecretKey] = useState("");

  const registeruser = (e) => {
    if (userType == "Admin" && secretKey != "AdarshT") {
      e.preventDefault();
      alert("Invalid Admin");
    } else {
      e.preventDefault();

      console.log(name,  email, password);
      fetch("http://localhost:5000/api/register", {
        method: "POST",
        crossDomain: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          confirmpassword,
          userType,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data, "userRegister");
          if (data.status == "ok") {
            alert("Registration Successful");
            navigate("/")
          } else {
            alert("Something went wrong");
          }
        });
    }
  };

  return (
    <div class="wrapper-reg">
    <h2>Registration</h2>
    <form onSubmit={registeruser}>
      <div>
        Register As
        <input
          type="radio"
          name="UserType"
          value="User" style={{marginLeft:"1em"}}
          onChange={(e) => setUserType(e.target.value)} option="selected"
          // ="default" 
        />
        User
        <input
          type="radio"
          name="UserType"
          value="Admin" style={{marginLeft:"1em"}}
          onChange={(e) => setUserType(e.target.value)}
        />
        Admin
      </div>
      {userType === "Admin" ? (
        <div class="input-box">
          <input
            name='Secret Key'
            value={secretKey}
            onChange={(e) => setSecretKey(e.target.value)}
            type="text"
            placeholder="Enter Secret Key" required />
        </div>
      ) : null}
      <div class="input-box">
        <input
          name='name'
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="Enter your name" required />
      </div>
      <div class="input-box">
        <input
          name='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Enter your email" required />
      </div>
      <div class="input-box">
        <input
          name='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Create password" required />
      </div>
      <div class="input-box">
        <input
          name='confirmpassword'
          value={confirmpassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          type="password"
          placeholder="Re-enter the Password " required />
      </div>
      <div class="input-box button">
        <input type="Submit" value="Register Now" />
      </div>
      <div class="text">
        <h3>Already have an account? <Link to="/login">Login now</Link></h3>
      </div>
    </form>
  </div>

  );
}
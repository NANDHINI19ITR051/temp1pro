import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import '../Login.css';
const Login = () => {
    const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const loginuser=()=>{

  }
  return (
    <div class="container-log">
    <div class="wrapper">
      <div class="title"><span>Login Form</span></div>
      <form onSubmit={loginuser}>
        <div class="row">
          <i class="fas fa-user"></i>
          <input
            name='email'
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            type="email"
            placeholder="Email " required />
        </div>
        <div class="row">
          <i class="fas fa-lock"></i>
          <input
            name='password'
            value={password}
           onChange={(e)=>setPassword(e.target.value)}
            type="password"
            placeholder="Password" required />
        </div>
        <div class="row button">
          <input type="submit" value="Login" />
        </div>
        <div class="signup-link">Not a member? <Link to="/">Register now</Link></div>
      </form>
    </div>
  </div>
  )
}

export default Login

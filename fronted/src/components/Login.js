import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleSubmit = () => {
    axios.post(`${process.env.REACT_APP_SERVER}/login`, {email,password})
      .then((res) => {
        if(res.status === 200) {
          localStorage.setItem('user',JSON.stringify(res.data.user))
          localStorage.setItem('token',JSON.stringify(res.data.token))
          navigate('/')
        } else{
          alert(res.data)
          navigate('/signup')
        }
        
      })
      .catch((e) => {
        alert(e.response.data)
        console.log(e);
      })
  }

  return (
    <div className='form'>
      <h1>LOGIN</h1>
      <input className='inputBox' type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter your Email" />
      <input className='inputBox' type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter your password" />
      <button className='submit-btn' type="submit" onClick={handleSubmit}>LogIn</button>
      <p><Link to='/signup'>New User? </Link></p>
    </div>
  )
}

export default Login
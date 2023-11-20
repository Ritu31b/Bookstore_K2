import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom';

function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem('user')
    if(auth) {
      navigate('/')
    }
  }, [])

  const handleSubmit = () => {
    axios.post(`${process.env.REACT_APP_SERVER}/register`, {name,email,password})
      .then((result) => {
          localStorage.setItem('user',JSON.stringify(result.data.user))
          localStorage.setItem('token',JSON.stringify(result.data.token))
          navigate('/')
      })
      .catch(e => {
        alert(e.response.data)
        console.log(e);
      });
  }

  return (
    <div className='form'>
      <h1>REGISTER</h1>
      <input className='inputBox' type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Enter your username" />
      <input className='inputBox' type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter your Email" />
      <input className='inputBox' type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter your password" />
      <button className='submit-btn' type="submit" onClick={handleSubmit}>Submit</button>
      <p><Link to='/login'>Already Registered? </Link></p>
    </div>
  )
}

export default SignUp
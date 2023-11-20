import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Navbar() {
  const auth = localStorage.getItem('user')
  const navigate = useNavigate()
  const logout = () =>{
    localStorage.clear()
    navigate('/signup')
  }
  return (
    <div className='nav'>   
      {
        auth ? <ul className='nav-ul'>
                  <li><Link to='/'>Home </Link></li>
                  <li><Link to='/add'>Add </Link></li>
                  <li><Link to='/list'>List </Link></li>
                  <li><Link to='/profile'>Profile </Link></li>
                  <li><Link onClick={logout} to='/signup'>Logout </Link></li>
               </ul>
              : <ul className='nav-ul nav-right'>
                  <li><Link to='/login'>Login </Link></li>
                  <li><Link to='/signup'>Signup </Link></li>
                </ul>
      }
    </div>
  )
}

export default Navbar
import React from 'react'
import { Outlet } from 'react-router-dom'
import SignUp from './SignUp'

function PrivateComponent() {
    const auth = localStorage.getItem('user')
  return (auth ? <Outlet/> : <SignUp/>)
}

export default PrivateComponent
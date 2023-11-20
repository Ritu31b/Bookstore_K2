import React from 'react'

function Profile() {
    const user = JSON.parse( localStorage.getItem('user') )
    return (
        <div className='profile'> 
            <i>{user.userID}</i>
            <h3>Mr. {user.name}</h3>
            <h4>{user.email}</h4>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius aspernatur neque itaque sequi dolor esse, sapiente provident quis vel recusandae ipsam tenetur? Eius ipsa laboriosam, neque architecto cum id quibusdam!</p>
        </div>
    )
}

export default Profile
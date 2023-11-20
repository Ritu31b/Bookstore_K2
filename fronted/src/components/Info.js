import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';


function Info() {
    const [info, setInfo] = useState([])
    const params= useParams();
    const navigate = useNavigate()

    useEffect(() => { 
        axios.get(`${process.env.REACT_APP_SERVER}/books/${params.id}`,{
            headers:{
                Authorization: JSON.parse(localStorage.getItem('token'))
            }
        })
        .then((result) => {
            setInfo(result.data)
        })
        .catch(err => console.log(err))
    },[])

  return (
    <div className="grid-item-info">
        <h4>Name : {info.title}</h4>
        <h5>Author : <i>{info.author}</i> </h5>
        <p>Published in : {info.published}</p>
        <i>category : {info.category}</i>
        <p>Price: {info.price} /-</p>
        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Labore minima, exercitationem voluptatibus omnis facilis aliquid at doloribus aut? Qui eos aperiam provident explicabo aliquid fugit iusto veniam deleniti illum maiores.</p>
        <button className='back-btn' onClick={() => navigate('/list')}>back</button>
    </div>
  )
}

export default Info
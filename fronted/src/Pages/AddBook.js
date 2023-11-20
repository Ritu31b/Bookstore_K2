import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function AddBook() {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [category, setCategory] = useState('')
  const [price, setPrice] = useState('')
  const [error, setError] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = () => { 

    if(!title || !author || !published || !category || !price) {
        setError(true);
        return false;
    }

    const userID = JSON.parse( localStorage.getItem('user') ).userID
    axios.post(`${process.env.REACT_APP_SERVER}/add`, {title, author, published, category, price, owner: userID}, {
      headers:{
        Authorization: JSON.parse(localStorage.getItem('token'))
    }
    })
      .then((res) => {
        console.log(res.data)
        navigate('/')
      })
      .catch(e => console.log(e))
  }

  const handleCancel = () => {
    navigate('/')
  }

  return (
    <div className='form'>
      <h1>Add Book</h1>

      <input className='inputBox' type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Enter Book's title" />
      {error && !title && <span className='invalid-input'>Enter a Valid Name</span>}
      <input className='inputBox' type="text" value={author} onChange={e => setAuthor(e.target.value)} placeholder="Enter Author's name" />
      {error && !author && <span className='invalid-input'>Enter a Valid Author</span>}
      <input className='inputBox' type="number" value={published} onChange={e => setPublished(e.target.value)} placeholder="Enter Published Year" />
      {error && !published && <span className='invalid-input'>Enter a Valid Year</span>}
      <input className='inputBox' type="text" value={category} onChange={e => setCategory(e.target.value)} placeholder="Enter category of book" />
      {error && !category && <span className='invalid-input'>Enter a Valid Category</span>}
      <input className='inputBox' type="number" value={price} onChange={e => setPrice(e.target.value)} placeholder="Enter the Price" />
      {error && !price && <span className='invalid-input'>Enter a Valid Price</span>}

      <button className='submit-btn' type="submit" onClick={handleSubmit}>Add</button>
      <button className='cancel-btn' type="submit" onClick={handleCancel}>Cancel</button>
    </div>
  )
}

export default AddBook
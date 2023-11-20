import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

function EditBook() {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [category, setCategory] = useState('')
  const [price, setPrice] = useState('')
  const [error, setError] = useState(false)
  const navigate = useNavigate()
  const params = useParams()
  
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_SERVER}/books/${params.id}`, {
      headers:{
          Authorization: JSON.parse(localStorage.getItem('token'))
      }
  })
        .then((result) => {
            setTitle(result.data.title)
            setAuthor(result.data.author)
            setPublished(result.data.published)
            setCategory(result.data.category)
            setPrice(result.data.price)
        })
        .catch(e => console.log(e))
    // prefillForm();
  }, [])


    //prefilling the fields
    // const prefillForm = () => {
  
    // }



  const handleUpdate = () => { 
    if(!title || !author || !published || !category || !price) {
        setError(true);
        return false;
    }

    axios.put(`${process.env.REACT_APP_SERVER}/books/${params.id}`, {title, author, published, category, price}, {
      headers:{
        Authorization: JSON.parse(localStorage.getItem('token'))
      }
    })
      .then((res) => {
        console.log('Book updated',res)
        navigate('/list')
      })
      .catch(e => console.log(e))
  }



  const handleCancel = () => {
    navigate('/list')
  }

 

  return (
    <div className='form'>
      <h1>Edit Book Details</h1>

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

      <button className='submit-btn' type="submit" onClick={handleUpdate}>Update</button>
      <button className='cancel-btn' type="submit" onClick={handleCancel}>Cancel</button>
    </div>
  )
}

export default EditBook
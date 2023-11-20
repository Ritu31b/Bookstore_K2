import React, { useState,useEffect } from 'react'
import axios from 'axios'
import BookCard from '../components/BookCard'

function Home() {
  const [bookArr, setBookArr] = useState([])

  useEffect(()=>{
      getBooks()
  }, [])


  const getBooks = ()=>{
      axios.get(`${process.env.REACT_APP_SERVER}/books`, {
          headers: {
              Authorization: JSON.parse(localStorage.getItem('token'))
          }
      })
          .then((res) => {
            if(Array.isArray(res.data)) {
              setBookArr(res.data);
            } else {
              setBookArr([])
            }
          })
          .catch(e => console.log(e))
  }


  return (
    <div className='grid-container'> 
        {bookArr.map((item,idx) => 
          <BookCard {...item} key={idx+1}/>
        )}
    </div>
  )
}

export default Home
import React from 'react'

function BookCard(prop) {
  return (
    <div className="grid-item">
        <h4>{prop.title}</h4>
        <h5>by <i>{prop.author}</i> </h5>
        <p>Published in : {prop.published}</p>
        <i>category : {prop.category}</i>
        <p>Price: {prop.price} /-</p>
    </div>
  )
}

export default BookCard
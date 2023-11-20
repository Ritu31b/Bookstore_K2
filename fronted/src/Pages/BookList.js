import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Icon from '@mdi/react';
import { mdiDeleteForeverOutline, mdiInformationVariantBoxOutline, mdiSquareEditOutline } from '@mdi/js';
import { useNavigate } from 'react-router-dom';



function BookList() {
    const [bookArr, setBookArr] = useState([])
    const navigate = useNavigate();

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
                setBookArr(res.data);
            })
            .catch(e => console.log(e))
    }



    const handleDelete = (id) => {
        axios.delete(`${process.env.REACT_APP_SERVER}/books/${id}`, {
            headers:{
                Authorization: JSON.parse(localStorage.getItem('token'))
            }
        })
            .then(() => {
                console.log('Book deleted');
                getBooks()
                navigate('/list')
            })
            .catch(e => console.log(e))
    }




    const handleSearch = (e) => {
        let key = e.target.value
        if(key){
            axios.get(`${process.env.REACT_APP_SERVER}/books/search/${key}`,{
                headers:{
                    Authorization: JSON.parse(localStorage.getItem('token'))
                }
            })
            .then((result) => {
                setBookArr(result.data);
            })
            .catch(err => console.log(err))
        } else {
            getBooks()
        }
    }


    

    const handleEdit = (id) => {
        navigate(`/edit/${id}`)
    }

    const handleInfo = (id) => {
        // console.log(id);
        navigate(`/info/${id}`)
    }


  return (
    <div className='book-list'>
        <h1>List of Books</h1>

        <input className='searchBox' type="text" placeholder="Search here" onChange={handleSearch}/>
        
        <table className="styled-table">
            <thead>
                <tr>
                    <th>S. No.</th>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Published</th>
                    <th>category</th>
                    <th>Price</th>
                    <th>CRUD</th>
                </tr>
            </thead>
            <tbody>
                {bookArr.map((item,idx) =>
                <tr key={idx+1}>
                    <td>{idx+1}</td>
                    <td>{item.title}</td>
                    <td>{item.author}</td>
                    <td>{item.published}</td>
                    <td>{item.category}</td>
                    <td>{item.price}</td>
                    <td>
                        <span onClick={() => handleInfo(item._id)} className='infoIcon'>
                            <Icon path={mdiInformationVariantBoxOutline} size={1} />
                        </span>
                        <span onClick={() => handleEdit(item._id)} className='editIcon'>
                            <Icon path={mdiSquareEditOutline} size={1} />
                        </span>
                        <span onClick={() => handleDelete(item._id)} className='dltIcon'>
                            <Icon path={mdiDeleteForeverOutline} size={1}/>
                        </span>
                        
                    </td>
                </tr>
                )}
            </tbody>
        </table>
        {(bookArr.length === 0) ? <h3>No results found</h3> : ""}
    </div>
  )
}

export default BookList
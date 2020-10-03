import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';

const Bookings = () => {
  const [bookings,setBookings]=useState([])
  const [loggedInUser,setLoggedInUser]=useContext(UserContext);

  useEffect(()=>{
    fetch('http://localhost:5000/bookings?email='+loggedInUser.email,{
      method: 'GET',
      headers: {
        'content-type':'application/json',
        Authorization : `Bearer ${sessionStorage.getItem('token')}`
      }

    })
    .then(res => res.json())
    .then(data =>setBookings(data));
  },[])
  return (
    <div>
      <h2>you have: {bookings.length} bookings</h2>
      {
        bookings.map(book =><li key={book._id}>{book.name} from:{(new Date(book.CheckIn).toDateString('dd/MM/yyyy'))} To: {(new Date(book.CheckOut).toDateString('dd/MM/yyyy'))}</li>)
      }
    </div>
  );
};

export default Bookings;
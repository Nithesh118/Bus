import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Navbar from '../Navbar';
import { useSelector } from 'react-redux';

function MovieDetailsWithBooking() {
  const user = useSelector((store) => store.auth.user);
  const { postId } = useParams();
  const [post, setPost] = useState({ start_location: '',end_location:'', start_datetime: '', fare: '' });
  const [selectedDate, setSelectedDate] = useState("2024-05-13");
  const navigate = useNavigate();

  useEffect(() => {
    console.log('postId:', postId);
    if (user && user.token) {
      axios.get(`http://127.0.0.1:8000/vieww/${postId}/`, {
        headers: { Authorization: `Token ${user.token}` }
      })
     .then(response => {
        setPost(response.data);
      })
     .catch(error => {
        console.error("Failed to fetch movie details:", error);
      });
    }
  }, [postId, user]);

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  return (
    <div className='nishu'>
      <Navbar />
      <div className="container justify-content-center movie">
        <div className="row ">
          <div className="col-12">
            <div className="card">
              <div className="card-header"><h3>BUS ROUTE : {post.start_location} - {post.end_location}</h3></div>
              <div className="card-header"><h3>BUS TIME : {post.start_datetime}</h3></div>
              <div className="card-header"><h3>TICKET AMOUNT : {post.fare}</h3></div>
              <div className='card-header'>
              <label className='card-header'>SELECT DATE: </label>
              <input
                  type="date"
                  style={{ width: "130px" }} className="form-control"
                  
                  id="selectDate"
                  name="selectDate"
                  value={selectedDate}
                  onChange={handleDateChange}
                />
              </div>
              <Link style={{ color: 'black' }} to={`/blog/post/${postId}?date=${selectedDate}`} className="btn btn-info float-right">BOOKING</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetailsWithBooking;
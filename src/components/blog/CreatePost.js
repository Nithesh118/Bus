import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import React from 'react';
import { useSelector } from "react-redux";


function CreateBusRoute() {
  const [busName, setBusName] = useState('');
  const [startLocation, setStartLocation] = useState('');
  const [endLocation, setEndLocation] = useState('');
  const [startDatetime, setStartDatetime] = useState('');
  const [endDatetime, setEndDatetime] = useState('');
  const [availableSeats, setAvailableSeats] = useState(0);
  const [fare, setFare] = useState(0.0);
  const [errorMessage, setErrorMessage] = useState('');
  const user = useSelector(store => store.auth.user);
  const navigate = useNavigate();

  function addBusRoute(e) {
    e.preventDefault();
    setErrorMessage(''); // Clear previous error messages
  
    if (!busName ||!startLocation ||!endLocation ||!startDatetime ||!endDatetime || availableSeats <= 0 || fare <= 0) {
      setErrorMessage('All fields are required and must be valid.');
      return;
    }
  
    if (!user ||!user.token) {
      setErrorMessage('You are not logged in. Please log in to create a bus route.');
      navigate('/login'); // Redirect to the login page
      return;
    }
  
    axios.post(
        'http://127.0.0.1:8000/create',
        {
          bus_name: busName,
          start_location: startLocation,
          end_location: endLocation,
          start_datetime: startDatetime,
          end_datetime: endDatetime,
          available_seats: availableSeats,
          fare: fare,
        },
        {
          headers: {
            Authorization: `Token ${user.token}`, // Include the token in the headers
          },
        }
      )
     .then((response) => {
        console.log('Bus route created successfully:', response.data);
        navigate('/My');
      })
     .catch((error) => {
        console.error('Error while creating bus route:', error.response?.data);
        if (error.response?.status === 401) {
          setErrorMessage('Your token is invalid or has expired. Please log in again.');
          navigate('/login'); // Redirect to the login page
        } else {
          setErrorMessage('Error while creating bus route. Please try again.');
        }
      });
  }
  
  const handleAvailableSeatsChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setAvailableSeats(value);
  };
  
  const handleFareChange = (e) => {
    const value = parseFloat(e.target.value);
    setFare(value);
  };
  
  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="row">
          <div className="col-8 offset-2">
            <h1 className="text-center">Create Bus Route</h1>
            <form onSubmit={addBusRoute}>
              <div className="form-group">
                <label>Bus Name:</label>
                <input
                  type="text"
                  className="form-control"
                  value={busName}
                  onChange={(event) => setBusName(event.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Start Location:</label>
                <textarea
                  className="form-control"
                  value={startLocation}
                  onChange={(event) => setStartLocation(event.target.value)}
                />
              </div>
              <div className="form-group">
                <label>End Location:</label>
                <textarea
                  className="form-control"
                  value={endLocation}
                  onChange={(event) => setEndLocation(event.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Start Datetime:</label>
                <input
                  type="datetime-local"
                  className="form-control"
                  value={startDatetime}
                  onChange={(event) => setStartDatetime(event.target.value)}
                />
              </div>
              <div className="form-group">
                <label>End Datetime:</label>
                <input
                  type="datetime-local"
                  className="form-control"
                  value={endDatetime}
                  onChange={(event) => setEndDatetime(event.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Available Seats:</label>
                <input
                  type="number"
                  className="form-control"
                  value={availableSeats}
                  onChange={handleAvailableSeatsChange}
                />
              </div>
              <div className="form-group">
                <label>Fare:</label>
                <input
                  type="number"
                  className="form-control"
                  step="0.01"
                  value={fare}
                  onChange={handleFareChange}
                />
              </div>
              {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
              <button className="btn btn-primary" type="submit">Create Bus Route</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateBusRoute;
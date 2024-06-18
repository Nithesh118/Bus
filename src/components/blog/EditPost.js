import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import { useSelector } from "react-redux";

function EditPost() {
  const { postId } = useParams();
  const [busName, setBusName] = useState("");
  const [startLocation, setStartLocation] = useState("");
  const [endLocation, setEndLocation] = useState("");
  const [startDatetime, setStartDatetime] = useState("");
  const [endDatetime, setEndDatetime] = useState("");
  const [availableSeats, setAvailableSeats] = useState(0);
  const [fare, setFare] = useState(0.0);
  let navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
     .get(`http://127.0.0.1:8000/vieww/${postId}`, {
        headers: {
          Authorization: `Token ${user.token}`,
        },
      })
     .then((response) => {
        const busRoute = response.data;
        setBusName(busRoute.bus_name);
        setStartLocation(busRoute.start_location);
        setEndLocation(busRoute.end_location);
        setStartDatetime(busRoute.start_datetime);
        setEndDatetime(busRoute.end_datetime);
        setAvailableSeats(busRoute.available_seats);
        setFare(busRoute.fare);
      })
     .catch((error) => {
        console.error("Error while fetching bus route:", error);
        if (error.response && error.response.status === 401) {
          setError("You are not authorized to view this content.");
        } else {
          setError("An error occurred while fetching the bus route. Please try again later.");
        }
      });
  }, [postId, user]);

  function updatePost() {
    const requestData = {
      bus_name: busName,
      start_location: startLocation,
      end_location: endLocation,
      start_datetime: startDatetime,
      end_datetime: endDatetime,
      available_seats: availableSeats,
      fare: fare,
    };
  
    console.log('Request data:', requestData);
  
    axios.put(`http://127.0.0.1:8000/update/${postId}/`, requestData, {
      headers: {
        Authorization: `Token ${user.token}`,
      },
    })
      .then((response) => {
        navigate("/blog/posts");
        
      })
      .catch((error) => {
        console.error("Error while updating bus route:", error);
        if (error.response && error.response.status === 401) {
          setError("You are not authorized to update this content.");
        } else {
          setError("An error occurred while updating the bus route. Please try again later.");
        }
      });
  }

  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="row">
          <div className="col-8 offset-2">
            {error && <p className="text-danger">{error}</p>}
            <h1 className="text-center">Edit Bus Route</h1>
            <div className="form-group">
              <label>Bus Name:</label>
              <input
                type="text"
                className="form-control"
                value={busName}
                onChange={(event) => {
                  setBusName(event.target.value);
                }}
              />
            </div>
            <div className="form-group">
              <label>Start Location:</label>
              <input
                type="text"
                className="form-control"
                value={startLocation}
                onChange={(event) => {
                  setStartLocation(event.target.value);
                }}
              />
            </div>
            <div className="form-group">
              <label>End Location:</label>
              <input
                type="text"
                className="form-control"
                value={endLocation}
                onChange={(event) => {
                  setEndLocation(event.target.value);
                }}
              />
            </div>
            <div className="form-group">
              <label>Start Datetime:</label>
              <input
                type="datetime-local"
                className="form-control"
                value={startDatetime}
                onChange={(event) => {
                  setStartDatetime(event.target.value);
                }}
              />
            </div>
            <div className="form-group">
              <label>End Datetime:</label>
              <input
                type="datetime-local"
                className="form-control"
                value={endDatetime}
                onChange={(event) => {
                  setEndDatetime(event.target.value);
                }}
              />
            </div>
            <div className="form-group">
              <label>Available Seats:</label>
              <input
                type="number"
                className="form-control"
                value={availableSeats}
                onChange={(event) => {
                  setAvailableSeats(event.target.value);
                }}
              />
            </div>
            <div className="form-group">
              <label>Fare:</label>
              <input
                type="number"
                className="form-control"
                value={fare}
                onChange={(event) => {
                  setFare(event.target.value);
                }}
              />
            </div>
            <div className="form-group">
              <button className="btn btn-primary float-right" onClick={updatePost}>
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditPost;
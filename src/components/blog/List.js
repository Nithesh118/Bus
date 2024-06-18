import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import Navbar from "../Navbar";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Listposts() {
  const user = useSelector((store) => store.auth.user);
  const [posts, setPosts] = useState([]);

  const fetchPosts = useCallback(() => {
    if (user) {
      axios.get("http://127.0.0.1:8000/listt", {
        headers: { Authorization: "Token " + user.token },
      }).then((response) => {
        setPosts(response.data);
      }).catch((error) => {
        console.error("Failed to fetch posts:", error);
      });
    }
  }, [user]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return (
    <div className="list">
      <Navbar />
      <div className="container mt-4">
        <div className="row justify-content-center mov">
          <div className="col-md-12 border rounded p-6 bg-warning" style={{ borderRadius: "15px", boxShadow: "0 0 10px rgb(0, 0, 0)" }}>
            <h1 style={{ color: 'red' }} className="text-center my-4"> BUS LIST</h1>
            {posts.length === 0 ? (
              <center><h3 style={{fontStyle:'italic'}} className="text-md-center bg-warning ">NO BUS FOUND...</h3></center>
            ) : (
              <div className="row">
                {posts.map(post => (
                  <div key={post.id} className="col-md-3">
                    <Link style={{ textDecoration: 'none' }} to={"/blog/posts/" + post.id}>
                      <div className="card-body">
                        <center><h3 style={{ color: 'black' }} className="card-title">{post.bus_name}</h3></center>
                        <center><h3 style={{ color: 'Red' }} className="card-title">{post.start_location}-{post.end_location}</h3></center><br />
                        <center><h3 className="card-title">{post.fare}</h3></center>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Listposts;

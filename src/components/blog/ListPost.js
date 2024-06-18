import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../Navbar";
import { useSelector } from "react-redux";

function ListPosts() {
  const user = useSelector((state) => state.auth.user);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const token = user.token;
      const response = await axios.get(`http://127.0.0.1:8000/viewww/`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      setPosts(response.data);
    } catch (error) {
      if (error.response.status === 401) {
        // Redirect to login page
        window.location.href = "/login";
      } else {
        setError(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const deletePost = async (postId) => {
    try {
      const token = user.token;
      await axios.delete(`http://127.0.0.1:8000/deletee/${postId}`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      setPosts(posts.filter((post) => post.id!== postId));
    } catch (error) {
      if (error.response.status === 401) {
        // Redirect to login page
        window.location.href = "/login";
      } else {
        setError(error.message);
      }
    }
  };

  useEffect(() => {
    if (user) {
      fetchPosts();
    }
  }, [user]);

  return (
    <div className="list">
      <Navbar />
      <div className="row justify-content-center">
        <div className="col-md-3">
          <Link to="/blog/posts/create" className="btn btn-primary btn-block mt-3">
            Create Post
          </Link>
        </div>
      </div>
      <div className="container mt-4">
        <div className="row justify-content-center mov">
          <div className="col-md-12 border rounded p-6 bg-warning" style={{ borderRadius: "15px", boxShadow: "0 0 10px rgb(0, 0, 0)" }}>
            <h1 style={{ color: "red" }} className="text-center my-4">
              BUS LIST
            </h1>
            {loading? (
              <p>Loading...</p>
            ) : posts.length === 0? (
              <center>
                <h3 style={{ fontStyle: "italic" }} className="text-md-center bg-warning ">
                  NO BUS FOUND...
                </h3>
              </center>
            ) : (
              <div className="row">
                {posts.map((post) => (
                  <div key={post.id} className="col-md-3">
                    <Link style={{ textDecoration: "none" }} to={"/blog/posts/" + post.id}>
                      <div className="card-body">
                        <center>
                          <h3 style={{ color: "black" }} className="card-title">
                            {post.bus_name}
                          </h3>
                        </center>
                        <center>
                          <h3 style={{ color: "Red" }} className="card-title">
                            {post.start_location}-{post.end_location}
                          </h3>
                        </center>
                        <br />
                        <center>
                          <h3 className="card-title">{post.fare}</h3>
                        </center>
                      </div>
                    </Link>
                    <button className="btn btn-danger" onClick={() => deletePost(post.id)}>
                      Delete
                    </button>
                    <Link to={"/blog/posts/" + post.id + "/edit"} className="btn btn-primary">
                      Edit
                    </Link>
                  </div>
                ))}
              </div>
            )}
            {error && <p>Error: {error}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListPosts;
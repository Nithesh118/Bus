import axios from "axios";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useCallback, useEffect, useState } from "react";

function BusListItem() {
  const [posts, setPosts] = useState([]);
  const user = useSelector((store) => store.auth.user);

  const fetchPosts = useCallback(() => {
    axios.get("http://127.0.0.1:8000/listt", {
      headers: { Authorization: `Token ${user.token}` },
    })
    .then((response) => {
      setPosts(response.data);
      console.log(response)
    })
    .catch((error) => {
      console.error("Failed to fetch the posts:", error);
    });
  }, [user]);

  useEffect(() => { fetchPosts(); }, [fetchPosts]);

  return (
    <div>
      <div className="container-lg">
        <div className="row">
          {posts.map((item) => (
            <div className="col-md-4" key={item.id}>
              <Link style={{ textDecoration: 'none' }} to={"/blog/posts/" +item.id}>
                <div className="card-mb-3">
                  <img className="card-img-top" src={`http://127.0.0.1:8000${item.bus_route.qr_image}`} alt={item.bus_route.qr_image} />
                </div>
                <div className="card-body">
                  <center><h3 style={{ color: 'black' }} className="card-title">{item.booked_datetime}</h3></center><br/>
                  <center><h3 style={{ color: 'skyblue' }} className="card-title">{item.bus_route.start_location} - {item.bus_route.end_location}</h3></center>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default BusListItem;
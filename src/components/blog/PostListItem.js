import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Modal, Button } from "react-bootstrap";
import { useState, useCallback } from 'react';

function PostListItem({ post, refresh }) {
  const navigate = useNavigate();
  const user = useSelector(state => state.auth.user);

  const [showModal, setShowModal] = useState(false);

  const deletePost = useCallback((postId) => {
    setShowModal(true);
  }, []);

  const deletePostApi = useCallback((postId) => {
    if (!user) {
      console.error("User is not defined.");
      return;
    }

    axios.delete(`http://127.0.0.1:8000/deletee/${postId}`, {
      headers: {
        Authorization: `Bearer ${user.token}`
      }
    })
    .then(response => {
      alert(response.data.message);
      refresh();
    })
    .catch(error => {
      if (error.response && error.response.status === 401) {
        console.error('Unauthorized:', error.response.data.message);
        navigate("/login");
      } else {
        console.error('Error:', error.message);
        // Handle other types of errors
      }
    });
  }, [user, navigate, refresh]);

  return (
    <div className="card">
      <div className="card-body">
        {post.name}
        <button className="btn btn-primary float-right" onClick={() => deletePost(post.id)}>Delete</button>
        <Link to={"/blog/posts/"+post.id+"/edit"} className="btn btn-primary float-right">Edit</Link>
        <Link to={"/blog/posts/"+post.id} className="btn btn-info float-right">View</Link>
      </div>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this post?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={() => { deletePostApi(post.id); setShowModal(false); }}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default PostListItem;
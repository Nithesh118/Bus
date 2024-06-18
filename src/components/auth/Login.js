import React from "react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { setUser } from "../../store/authSlice";
import { useDispatch } from "react-redux";
import Navbar from "../Navbar";

function Login() {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    function userlogin() {
        axios
        .post('http://127.0.0.1:8000/loginn', {
           username: name,
           password: password,
        })
        .then((response) => {
            setErrorMessage("");
            const { token, username: name, isAdmin } = response.data;
            const user = {
                username: name,
                token,
                isAdmin,
            };
            dispatch(setUser(user))
            if (isAdmin) {
                navigate('/blog/posts/')
            } else {
                navigate('/list');
            }
        })
        .catch((error) => {
            if (error.response?.data?.errors) {
                setErrorMessage(Object.values(error.response.data.errors).join(' '));
            } else if (error.response?.data?.message) {
                setErrorMessage(error.response.data.message);
            } else {
                setErrorMessage("Faild to login user. please contact admin");
            }
        });
    }
    return(
        <div>
            <Navbar/>
            <div className="container">
                <div className="row justify-content-center align-items-center" style={{ minHeight: "620px" }}>
                    <div className="col-md-6">
                        <div
                            className="login-form border rounded p-4"
                            style={{
                                backgroundColor: "transparent",
                                borderRadius: "15px",
                            }}
                        >
                            <h1 className="text-center">Login</h1>
                            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                            <form>
                                <div className="form-group">
                                    <label>username:</label>
                                    <input type="text" className="form-control" value={name} onChange={(event) => setName(event.target.value)} />
                                </div>
                                <div className="form-group">
                                    <label>Password:</label>
                                    <input type="password" className="form-control" value={password} onChange={(event) => setPassword(event.target.value)} />
                                </div>
                                <div className="form-group text-center">
                                    <button type="button" className="btn btn-primary form-control" onClick={userlogin}>
                                        Login
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Login;
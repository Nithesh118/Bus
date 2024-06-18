import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar";

function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConf, setPasswordConf] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    var navigate = useNavigate();
    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:8000/signupp', { username: name, email: email, password: password, password2: passwordConf });
            console.log('Signup successful:', response.data);
            navigate('/login')
        } catch (error) {
            console.error('Signup error:', error.response.data);
            setErrorMessage(error.response.data.username || error.response.data.password2 || 'Registration failed');
        }
    };
    const clearErrorMessage = () => {
        setErrorMessage('');
    };
    return (
        <div className='signup'>
            <Navbar />
            <div className="container-fluid pt-5 ">
                <div className="row d-flex justify-content-center move">
                    <div className="col-8 offset-2">
                        <h2 style={{ fontStyle: 'italic' }} className="card-title">SIGNUP</h2>
                        {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                        <form onSubmit={handleSignup}>
                            <div className="form-group">
                                <label style={{ fontStyle: 'italic' }}>NAME :</label>
                                <input style={{ width: '40%', fontStyle: 'italic', borderBlockStyle: 'outset', borderBlockColor: 'yellow' }} placeholder='ENTER NAME' type="text" className="form-control" value={name} onChange={(e) => { setName(e.target.value); clearErrorMessage(); }} />
                            </div>
                            <div className="form-group">
                                <label style={{ fontStyle: 'italic' }}>EMAIL :</label>
                                <input style={{ width: '40%', fontStyle: 'italic', borderBlockStyle: 'outset', borderBlockColor: 'yellow' }} placeholder='ENTER EMAIL' type="email" className="form-control" value={email} onChange={(e) => { setEmail(e.target.value); clearErrorMessage(); }} />
                            </div>
                            <div className="form-group">
                                <label style={{ fontStyle: 'italic' }}>PASSWORD :</label>
                                <input style={{ width: '40%', fontStyle: 'italic', borderBlockStyle: 'outset', borderBlockColor: 'yellow' }} placeholder='ENTER PASSWORD' type="password" className="form-control" value={password} onChange={(e) => { setPassword(e.target.value); clearErrorMessage(); }} />
                            </div>
                            <div className="form-group">
                                <label style={{ fontStyle: 'italic' }}>CONFIRM PASSWORD :</label>
                                <input style={{ width: '40%', fontStyle: 'italic', borderBlockStyle: 'outset', borderBlockColor: 'yellow' }} placeholder='ENTER CONFIRM PASSWORD' type="password" className="form-control" value={passwordConf} onChange={(e) => { setPasswordConf(e.target.value); clearErrorMessage(); }} />
                            </div>
                            <button style={{ fontStyle: 'italic', borderBlockStyle: 'outset' }} type="submit" className="btn btn-primary">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Register;

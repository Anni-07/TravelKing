import React, { useState } from 'react';
import "./Login.css";
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

const Login = () => {   
const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined 
});

const {loading, error, dispatch} = useContext(AuthContext);
const navigate = useNavigate(); 

const handleChange = (e) => {       

    setCredentials((prev) => ({...prev, [e.target.id]: e.target.value}));

};

// console.log(user);

const handleClick = async (e) => {
    e.preventDefault();
    dispatch({type: "LOGIN_START"});
    try {
        // const res = await axios.post("/auth/login", credentials);
        const res = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/auth/login`, credentials);

        dispatch({type: "LOGIN_SUCCESS", payload: res.data.details});
        navigate("/"); // Redirect to home page after successful login
    } catch (err) {
        dispatch({type: "LOGIN_FAILURE", payload: err.response.data});
    }
}

return (
<div className="login">
    <div className="lcontainer">
        <input
            type ="text"
            placeholder="username" 
            id  = "username"
            onChange = {handleChange}
            className="linput"/>

        <input
            type ="password"
            placeholder="password"
            id  = "password"
            onChange = {handleChange}
            className="linput"/>

            <button disabled={loading} onClick={handleClick} className='lButton'>
            {loading ? "Logging in..." : "Login"}
             </button>
            {/* <button disabled={loading} onClick={handleClick} className='lButton'>Login</button> */}
            {error && <span>{error.message}</span>}
    </div>



    </div>

    )
}


export default Login;
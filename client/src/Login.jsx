import React from 'react'
import Axios from 'axios'
import './Login.css'
import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
const Login = () => {
    // States are used to hold some value like variables
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");

    const [userlist, setUserlist] = useState([]);

    // const displayInfo = () => {
    //   console.log(`Welcome, ${name}`);
    // }

    const navigate = useNavigate();

    const login = async () => {
        const response = await Axios.post('http://localhost:3001/login', {
            name: name,
            password: password
        })
        console.log(response.data);
        if (response.data.userfound) {
            Cookies.set("isloggedin",true);
            Cookies.set("id",response.data.id);
            const redirectPath = Cookies.get("redirectPath") || '/'; 
            Cookies.remove("redirectPath");
            navigate(redirectPath, { state: { name: name, auth: true } });
        }
        else {
            alert("Invalid username or password!")
        }
    }


    return (
        <div className='login-container'>
        <div className="Login">
            <label htmlFor="name">Name:</label>
            <input type="text" placeholder="Enter name" id="name" onChange={
                (event) => {
                    setName(event.target.value);
                }
            } />
            <br />
            <label htmlFor="password">Password:</label>
            <input type="password" placeholder="Enter password" id="password" onChange={
                (event) => {
                    setPassword(event.target.value);
                }
            } />
            <button onClick={login}>Login</button>

            <button onClick={() => navigate('/register')}>Sign Up</button>

        </div>
        </div>
    );
}

export default Login

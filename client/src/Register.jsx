import React from 'react'
import './Login.css'
import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import Axios from 'axios';
import Cookies from 'js-cookie';
const Register = () => {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [userlist, setUserlist] = useState([]);

    const navigate = useNavigate();

    const register = async () => {
        Axios.post('https://quiz-app-backend-sepia.vercel.app/register', {
            name: name,
            password: password
        }).then((response)=>{
            if (response.data.registration) {
                Cookies.set("isloggedin",true);
                Cookies.set("id",response.data.id);
                // navigate('/', { state: { name: name, auth: true } });
                const redirectPath = Cookies.get("redirectPath") || '/'; 
                Cookies.remove("redirectPath");
                navigate(redirectPath, { state: { name: name, auth: true } });
            }
        }).catch((err)=>{
            Cookies.set("isloggedin",false);
            if(err.response.status==500){
                alert("already registered !");
            }
            else{
                alert("something went wrong !");
            }
        })
        

        // else {
        //     Cookies.set("isloggedin",false);
        //     alert("An error occured while registration!")
        // }
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
                <button onClick={register}>Register</button>

            </div>
        </div>
    )
}

export default Register

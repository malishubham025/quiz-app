import React from 'react';
import logo from './logo.svg';
import "./App.css"
import { useState } from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Intro from './components/Intro';
import Section from './components/Section';

import { useNavigate, useLocation, Navigate } from 'react-router-dom';

function App() {
  const navigate = useNavigate();
  // const logout = () => {
  //   location.state.auth = false;
  //   navigate('/login');
  // }

  const location = useLocation();
  console.log(location.state);
  
  // if(location.state == null){
  //   return <Navigate to="/" />
  // }
  // else if(location.state.auth){
    return (
      <>
        <Navbar/>
        <Home />
        <Intro/>
        <Section/>
      </>
    )
  }
// }

export default App;

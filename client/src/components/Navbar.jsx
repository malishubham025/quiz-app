import React from 'react'
import "./Navbar.css"
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <div>
      <nav>
        <div className="nav-left">
          <NavLink to="">Quizes</NavLink>
        </div>
        <div className="nav-right">
            <ul>
                <li><NavLink to="/" >Home</NavLink></li>
                <li><NavLink className={(e)=>{return e.isActive?"nav-effect": ""}} to="/admin">View Quiz</NavLink></li>
                <li><NavLink className={(e)=>{return e.isActive?"nav-effect": ""}} to="/test">Test</NavLink></li>
                <li><NavLink className={(e)=>{return e.isActive?"nav-effect": ""}} to="/books">Books</NavLink></li>
                <li><NavLink className={(e)=>{return e.isActive?"nav-effect": ""}} to="/about">About</NavLink></li>
            </ul>
        </div>
      </nav>
    </div>
  )
}

export default Navbar

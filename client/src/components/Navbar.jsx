import React from 'react'
import "./Navbar.css"
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <div>
      <nav>
        <div className="nav-left">
          <NavLink to="">MINDEASE</NavLink>
        </div>
        <div className="nav-right">
            <ul>
                <li><NavLink >Home</NavLink></li>
                <li><NavLink className={(e)=>{return e.isActive?"nav-effect": ""}} to="/admin">Admin</NavLink></li>
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

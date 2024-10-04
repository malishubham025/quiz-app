import React from 'react'
import "./Home.css"
import testlogo from './assets/test.svg'
import peace from './assets/peace.jpeg'
import home from './assets/home.jpg'
import { NavLink } from 'react-router-dom'

const Home = () => {
  return (
    <div>
      <img src={home} alt="home" className='bg'/>
      <div className="mock"></div>
      <div className="home">
        <div className="home-left">
            <div className='header'>Quizes</div>
            <div className='sub-header'>Quiz Taking  Platform</div>
            <div className='home-para'>Hello user, Quizes is a</div> 
            <div className='home-para'>Quiz Taking  Platform</div> 
            <NavLink to="/test"><button className='test'>Design Test <img className='testlogo' src={testlogo} alt="testlink" /></button></NavLink>
        </div>
        <div className="home-right">
            {/* <img className='image' src={peace} alt="" /> */}
        </div>
      </div>
    </div>
  )
}

export default Home

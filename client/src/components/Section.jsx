import React from 'react'
import sad from './assets/diagnose.jpg'
import "./Section.css"

const Section = () => {
  return (
    <div>
        <div className="section">
            <div className="heading">GET HELP</div>
            <div className="section-container">
                <div className="section-left">
                    <img className='section-img' src={sad} alt="diagnose" />
                </div>
                <div className="section-right">
                    <div className="para">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae temporibus totam vel nulla iure qui officia reiciendis, dolorum accusantium molestias minus ratione at animi labore assumenda voluptatem atque. Maxime, eligendi.
                    </div>
                  
                </div>
            </div>
        </div>
    </div>
  )
}

export default Section

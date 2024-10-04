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
                    The best way to diagnose SAD accurately is by taking help of a mental health expert. But due to a social taboo, many people avoid visiting the shrink. For such people, there is a test that you can take here which will give you an idea about the extent of your social anxiety with the help of the test score.
                    </div>
                    <div className="para">
                    This test is based on the Liebowitz social anxiety scale. This scale was developed in 1987 by Michael Liebowitz, a psychiatrist and researcher at Columbia University and the New York State Psychiatric Institute. It has stood the test of time and is used even today for accurate diagnosis. Based on the test score, recommendations will be given to tackle social fears.
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Section

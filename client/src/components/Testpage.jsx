import React from 'react'
import "./Testpage.css"
import tests from "./assets/tests.jpg"

const Testpage = () => {
  return (
    <div>
        <div className="testpage">
            <div className="heading">The Liebowitz Social Anxiety Scale</div>
            <div className="para">There are several social anxiety questionnaires that help determine whether or not an individual should be diagnosed with SAD. The Liebowitz Social Anxiety Scale is one of the most efficient and valid questionnaires that can help you get an idea of the severity of your social phobia. It is a request that you remain honest while selecting the answers as that wil increase the accuracy of the result. Based on the results you will be given recommendations and we hope that you follow them.</div>
            <div className='img-container'>
                <img src={tests} alt="tests" />
            </div>
            <div className="para">The following test will ask you questions based on different kinds of social situations. Read each situation carefully and rate how anxious or fearful you feel in the situation. Next, you will be asked to rate how often you avoid the scenario. If you have never faced a certain scenario imagine what would you do in it.</div>
        </div>
    </div>
  )
}

export default Testpage

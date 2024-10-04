import React from 'react'
import "./Intro.css"
import intro from "./assets/intro.png"

const Intro = () => {
  return (
    <div>
      <div className="intro">
        <div className="heading">INTRO</div>
        <div className="intro-container">
            <div className="intro-left">
                <div className="para">
                Social Anxiety is the fear or nervousness that people feel in various kinds of social interactions. Now, some people get anxiety while giving a presentation, some get anxiety while interacting with people in parties and so on. 
                </div>
                <div className="para">
                There are various reasons why people have social anxiety and we will try to map the main ones. Now, there is a difference between normal social insecurity and social anxiety disorder. 
                </div>
                <div className="para">
                The difference is in the response given when faced with a social situation that makes people uncomfortable. The ones with SAD (Social Anxiety Disorder) will totally avoid facing their social fears whereas the ones with normal social anxiety will face their fears.
                </div>
                <div className="para">
                This is not about being brave, it's about being comfortable enough to face a challenging social situation without things getting unbearable. For example, there are people who have a fear of giving speeches to a large crowd but that doesn't stop them from giving speeches. So on a fundamental level, the extent of avoidance of facing an uncomfortable social situation will define whether a person has a normal social insecurity or a case of SAD.
                </div>
            </div>
            <div className="intro-right">
                <img src={intro} alt="intro" />
            </div>
        </div>
        
      </div>
    </div>
  )
}

export default Intro

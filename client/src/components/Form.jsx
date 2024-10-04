import React, {useState} from 'react';
import './Form.css'

const Form = () => {
  const questions = [

    { text: "Do you fear to talk on your phone in public places?", answers: ["Never", "Rarely", "Sometimes", "Often"] },
    { text: "Do you get socially awkward while eating in public places?", answers: ["Never", "Rarely", "Sometimes", "Often"] },
    { text: "Do you feel fear while interacting in small groups?", answers: ["Never", "Rarely", "Sometimes", "Often"] },
    { text: "Do you like to go parties with friends?", answers: ["Never", "Rarely", "Sometimes", "Often"] },
    { text: "Do you feel low confidence while talking to people in authority?", answers: ["Never", "Rarely", "Sometimes", "Often"] },
    { text: "Do you get insecure/ anxious while being observed when you are working?", answers: ["Never", "Rarely", "Sometimes", "Often"] },
    { text: "Do you feel insecure/ anxious while talking to someone you don't know?", answers: ["Never", "Rarely", "Sometimes", "Often"] },
    { text: "Do you feel fear while meeting strangers?", answers: ["Never", "Rarely", "Sometimes", "Often"] },
    { text: "Do you get insecure while Being the center of attention?", answers: ["Never", "Rarely", "Sometimes", "Often"] },
    { text: "Do you get anxious/ feel low at confidence while Expressing disagreement or disapproval to someone you don't know very well?", answers: ["Never", "Rarely", "Sometimes", "Often"] },
    { text: "Do you get stressed while talking in meetings?", answers: ["Never", "Rarely", "Sometimes", "Often"] },
    { text: "Do you get stressed  while returning goods to a store for a refund?", answers: ["Never", "Rarely", "Sometimes", "Often"] },
    { text: "Do you like to give party to friends?", answers: ["Never", "Rarely", "Sometimes", "Often"] },
    { text: "Do you feel awkward while resisting a high pressure salesperson?", answers: ["Never", "Rarely", "Sometimes", "Often"] },
    { text: "Do you feel awkward while taking photos in public places?", answers: ["Never", "Rarely", "Sometimes", "Often"] },
    { text: "Do you feel stressed while asking for help to strangers?", answers: ["Never", "Rarely", "Sometimes", "Often"] },
    { text: "Do you fear to answer in class when you know the answer?", answers: ["Never", "Rarely", "Sometimes", "Often"] },
    { text: "Do you have fear of feeling left out in friend groups?", answers: ["Never", "Rarely", "Sometimes", "Often"] },
    { text: "Do you start conversations when you meet person for a first time?", answers: ["Never", "Rarely", "Sometimes", "Often"] },
    { text: "Do you get awkward while bargaining?", answers: ["Never", "Rarely", "Sometimes", "Often"] },

    { text: "How much fear you feel while talking on your phone in public places? Rate (1 to 4)", answers: ["1", "2", "3", "4"] },
    { text: "Do you avoid interacting in groups? Rate (1 to 4)", answers: ["1", "2", "3", "4"] },
    { text: "How much you avoid to going parties? Rate (1 to 4)", answers: ["1", "2", "3", "4"] },
    { text: "How uneasy do you feel when eating in front of others in a public setting?", answers: ["1", "2", "3", "4"] },
    { text: "How uncomfortable are you with assertively expressing your opinions in a group setting?", answers: ["1", "2", "3", "4"] },
    { text: "How anxious do you feel about speaking in front of a class or large audience?", answers: ["1", "2", "3", "4"] },
    { text: "How uncomfortable do you feel when someone introduces you to new people?", answers: ["1", "2", "3", "4"] },
    { text: "How uneasy are you about maintaining eye contact during conversations?", answers: ["1", "2", "3", "4"] },
    { text: "How anxious do you feel about participating in group activities or games?", answers: ["1", "2", "3", "4"] },
    { text: "How uncomfortable are you when others observe you while you work or perform a task?", answers: ["1", "2", "3", "4"] },
    { text: "How much do you fear rejection or criticism in social interactions?", answers: ["1", "2", "3", "4"] },
    { text: "How nervous do you get when having to ask someone for help or assistance?", answers: ["1", "2", "3", "4"] },
    { text: "How anxious do you feel about attending family gatherings or reunions?", answers: ["1", "2", "3", "4"] },
    { text: "How worried are you about making phone calls or sending emails to authority figures?", answers: ["1", "2", "3", "4"] },
    { text: "How worried are you about initiating conversations?", answers: ["1", "2", "3", "4"] },
    { text: "How worried are you about making mistakes in front of others?", answers: ["1", "2", "3", "4"] },
    { text: "How uneasy are you when being the center of attention?", answers: ["1", "2", "3", "4"] },
    { text: "How uncomfortable are you when someone asks you personal questions?", answers: ["1", "2", "3", "4"] },
    { text: "How nervous do you get when asked to participate in team activities?", answers: ["1", "2", "3", "4"] },
    { text: "How worried are you about others noticing your physical symptoms of anxiety?", answers: ["1", "2", "3", "4"] },

  ];

  const [answers, setAnswers] = useState(Array(questions.length).fill('')); // Initialize answers array
  const [submitted, setSubmitted] = useState(false); // Track if form is submitted
  const [fscore, setfscore] = useState(null);
  const [iscore, setiscore] = useState(null);

  const handleAnswerChange = (index, answer) => {
    const newAnswers = [...answers];
    newAnswers[index] = answer;
    setAnswers(newAnswers);
  };

  const handleCheck = () => {
    let frequencyScore = 0;
    let intensityScore = 0;
    
    answers.forEach(answer => {
      if(answer === "1") intensityScore += 1;
      else if(answer === "2") intensityScore += 2;
      else if(answer === "3") intensityScore += 3;
      else if(answer === "4") intensityScore += 4;
      else if(answer === "Never") frequencyScore += 1;
      else if(answer === "Rarely") frequencyScore += 2;
      else if(answer === "Sometimes") frequencyScore += 3;
      else if(answer === "Often") frequencyScore += 4;
    })

    if (frequencyScore < 20){
      setfscore("Mild Anxiety: Your results indicate mild anxiety symptoms, which may manifest as occasional feelings of worry or unease. While these feelings are manageable, it's important to acknowledge them and consider implementing self-care strategies to maintain your well-being.");
    }
    else if (frequencyScore >= 20 && frequencyScore < 35){
      setfscore("Mild to Moderate Anxiety: Your test results suggest mild to moderate anxiety symptoms. This indicates that your anxiety may be more persistent or slightly impacting your daily life. It's advisable to explore coping mechanisms and possibly seek support from a mental health professional to address these concerns effectively.");
    }
    else if (frequencyScore >= 35 && frequencyScore < 55){
      setfscore("Moderate Anxiety: Based on your responses, it appears you're experiencing moderate levels of anxiety. This level of anxiety may be noticeably affecting your daily activities and relationships. It's essential to prioritize your mental health and consider seeking guidance from a therapist or counselor to develop strategies for managing your symptoms.");
    }
    else if (frequencyScore >= 55 && frequencyScore <= 72){
      setfscore("Moderate to Severe Anxiety: Your results indicate moderate to severe anxiety symptoms, suggesting that your anxiety is significantly impacting various aspects of your life. It's crucial to take proactive steps to address these feelings, such as seeking professional help, practicing relaxation techniques, and maintaining a supportive network.");
    }
    else if (frequencyScore > 72){
      setfscore("Severe Anxiety: Your test results suggest severe anxiety symptoms, indicating that your anxiety is having a profound impact on your daily functioning and overall well-being. It's imperative to prioritize your mental health and seek support from a qualified mental health professional who can provide guidance, therapy, and possibly medication to help manage your symptoms effectively.");
    }

    if (intensityScore < 20){
      setiscore("Low Intensity: Your responses suggest low levels of social anxiety. You may experience occasional mild discomfort in certain social situations, but overall, you're able to navigate social interactions without significant distress.");
    }
    else if (intensityScore >= 20 && intensityScore < 35){
      setiscore("Low to Moderate Intensity: Based on your answers, it seems you have mild social anxiety. This means you may occasionally feel nervous or uneasy in certain social settings, but it's generally manageable with some self-awareness and coping strategies.");
    }
    else if (intensityScore >= 35 && intensityScore < 55){
      setiscore("Moderate Intensity: Your responses indicate moderate social anxiety. This suggests that you often experience discomfort or nervousness in social situations, which may impact your ability to fully engage in social activities and interactions.");
    }
    else if (intensityScore >= 55 && intensityScore <= 72){
      setiscore("Moderate to High Intensity: It appears you're experiencing moderate to high levels of social anxiety. This means that social situations may frequently trigger intense feelings of fear or unease, which could significantly impact your daily life and activities.");
    }
    else if (intensityScore > 72){
      setiscore("High Intensity: Your results suggest high levels of social anxiety, indicating that social situations often trigger intense feelings of fear or discomfort for you. It's important to seek support from a mental health professional to develop coping strategies and improve your quality of life.");
    }


    // Calculate total score based on answers
    // answers.forEach(answer => {
    //   if (answer === "None" || answer === "Never") totalScore += 0;
    //   else if (answer === "Mild" || answer === "Occassionally") totalScore += 1;
    //   else if (answer === "Moderate" || answer === "Often") totalScore += 2;
    //   else if (answer === "Severe" || answer === "Always") totalScore += 3;
    // });

    // Determine recommendation based on total score
    // if (totalScore <= 30) {
    //   setScore(`Your score is ${totalScore}. You do not suffer from social anxiety.`);
    // } else if (totalScore > 30 && totalScore <= 50) {
    //   setScore(`Your score is ${totalScore}. You have a mild level of social anxiety. It is recommended that you read the tips.`);
    // } else if (totalScore > 50 && totalScore <= 65) {
    //   setScore(`Your score is ${totalScore}. You have a moderate level of social anxiety. It is recommended that you read the tips.`);
    // } else if (totalScore > 65 && totalScore <= 80) {
    //   setScore(`Your score is ${totalScore}. You have a marked level of social anxiety. We recommend that you read the books.`);
    // } else if (totalScore > 80 && totalScore <= 95) {
    //   setScore(`Your score is ${totalScore}. You have a severe level of social anxiety. It is recommended that you please consult a psychologist.`);
    // } else if (totalScore > 95) {
    //   setScore(`Your score is ${totalScore}. You have a very severe level of social anxiety. We recommend that you take consultation from a mental health professional ASAP.`);
    // }

    // Set submitted to true after handling check
    setSubmitted(true);
  };
  return (
    <div>
      <div className="form-container">
        {submitted ? (
          <div>
            <h4>Results</h4>
            <h3>Frequency</h3>
            <p className='para'>{fscore}</p>
            <h3>Intensity</h3>
            <p className='para'>{iscore}</p>
          </div>
        ) : (
          <form>
          <div className="questions">
            {/* Render questions dynamically */}
            {questions.map((question, index) => (
              <div className='question' key={index}>
                <p className='para'>{`${index + 1}) ${question.text}`}</p>  
                <div className='answer'>
                  {question.answers.map((answer, answerIndex) => (
                    <label htmlFor={`question${index + 1}`} key={answerIndex}>
                      <input type="radio" name={`question${index + 1}`} value={answer} onChange={() => handleAnswerChange(index, answer)} />
                      {answer}
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>
          {/* <p className="submit"><input type="button" id="button" name="result" value="See Results" onClick={handleCheck} /></p> */}
          <button className='submit' onClick={handleCheck}>See Results</button>
        </form>
      )}
      </div>
      </div>
  )
}

export default Form































































































    // { text: "Anxiety/Fear: Talking to someone on your phone in public", answers: ["None", "Mild", "Moderate", "Severe"] },
    // { text: "Avoidance: Talking to someone on your phone in public", answers: ["Never", "Occassionally", "Often", "Always"] },
    // { text: "Anxiety/Fear: Eating in public places", answers: ["None", "Mild", "Moderate", "Severe"] },
    // { text: "Avoidance: Eating in public places", answers: ["Never", "Occassionally", "Often", "Always"] },
    // { text: "Anxiety/Fear: Interacting in small groups", answers: ["None", "Mild", "Moderate", "Severe"] },
    // { text: "Avoidance: Interacting in small groups", answers: ["Never", "Occassionally", "Often", "Always"] },
    // { text: "Anxiety/Fear: Drinking with others in Public Places", answers: ["None", "Mild", "Moderate", "Severe"] },
    // { text: "Avoidance: Drinking with others in Public Places", answers: ["Never", "Occassionally", "Often", "Always"] },
    // { text: "Anxiety/Fear: Talking to people in authority", answers: ["None", "Mild", "Moderate", "Severe"] },
    // { text: "Avoidance: Talking to people in authority", answers: ["Never", "Occassionally", "Often", "Always"] },
    // { text: "Anxiety/Fear: Acting, performing or giving a talk in front of an audience", answers: ["None", "Mild", "Moderate", "Severe"] },
    // { text: "Avoidance: Acting, performing or giving a talk in front of an audience", answers: ["Never", "Occassionally", "Often", "Always"] },
    // { text: "Anxiety/Fear: Going to a party", answers: ["None", "Mild", "Moderate", "Severe"] },
    // { text: "Avoidance: Going to a party", answers: ["Never", "Occassionally", "Often", "Always"] },
    // { text: "Anxiety/Fear: Working while being observed", answers: ["None", "Mild", "Moderate", "Severe"] },
    // { text: "Avoidance: Working while being observed", answers: ["Never", "Occassionally", "Often", "Always"] },
    // { text: "Anxiety/Fear: Writing while being observed", answers: ["None", "Mild", "Moderate", "Severe"] },
    // { text: "Avoidance: Writing while being observed", answers: ["Never", "Occassionally", "Often", "Always"] },
    // { text: "Anxiety/Fear: Calling someone you don't know very well", answers: ["None", "Mild", "Moderate", "Severe"] },
    // { text: "Avoidance: Calling someone you don't know very well", answers: ["Never", "Occassionally", "Often", "Always"] },
    // { text: "Anxiety/Fear: Talking with people you don't know very well", answers: ["None", "Mild", "Moderate", "Severe"] },
    // { text: "Avoidance: Talking with people you don't know very well", answers: ["Never", "Occassionally", "Often", "Always"] },
    // { text: "Anxiety/Fear: Meeting with strangers", answers: ["None", "Mild", "Moderate", "Severe"] },
    // { text: "Avoidance: Meeting with strangers", answers: ["Never", "Occassionally", "Often", "Always"] },
    // { text: "Anxiety/Fear: Urinating in public restroom", answers: ["None", "Mild", "Moderate", "Severe"] },
    // { text: "Avoidance: Urinating in public restroom", answers: ["Never", "Occassionally", "Often", "Always"] },
    // { text: "Anxiety/Fear: Entering a room when others are already seated", answers: ["None", "Mild", "Moderate", "Severe"] },
    // { text: "Avoidance: Entering a room when others are already seated", answers: ["Never", "Occassionally", "Often", "Always"] },
    // { text: "Anxiety/Fear: Being the center of attention", answers: ["None", "Mild", "Moderate", "Severe"] },
    // { text: "Avoidance: Being the center of attention", answers: ["Never", "Occassionally", "Often", "Always"] },
    // { text: "Anxiety/Fear: Speaking up at a meeting", answers: ["None", "Mild", "Moderate", "Severe"] },
    // { text: "Avoidance: Speaking up at a meeting", answers: ["Never", "Occassionally", "Often", "Always"] },
    // { text: "Anxiety/Fear: Taking a test", answers: ["None", "Mild", "Moderate", "Severe"] },
    // { text: "Avoidance: Taking a test", answers: ["Never", "Occassionally", "Often", "Always"] },
    // { text: "Anxiety/Fear: Expressing disagreement or disapproval to someone you don't know very well", answers: ["None", "Mild", "Moderate", "Severe"] },
    // { text: "Avoidance: Expressing disagreement or disapproval to someone you don't know very well", answers: ["Never", "Occassionally", "Often", "Always"] },
    // { text: "Anxiety/Fear: Looking at people you don't know very well in the eyes", answers: ["None", "Mild", "Moderate", "Severe"] },
    // { text: "Avoidance: Looking at people you don't know very well in the eyes", answers: ["Never", "Occassionally", "Often", "Always"] },
    // { text: "Anxiety/Fear: Giving a report to a group", answers: ["None", "Mild", "Moderate", "Severe"] },
    // { text: "Avoidance: Giving a report to a group", answers: ["Never", "Occassionally", "Often", "Always"] },
    // { text: "Anxiety/Fear: Trying to get acquainted with someone for a romantic relationship", answers: ["None", "Mild", "Moderate", "Severe"] },
    // { text: "Avoidance: Trying to get acquainted with someone for a romantic relationship", answers: ["Never", "Occassionally", "Often", "Always"] },
    // { text: "Anxiety/Fear: Returning goods to a store for a refund", answers: ["None", "Mild", "Moderate", "Severe"] },
    // { text: "Avoidance: Returning goods to a store for a refund", answers: ["Never", "Occassionally", "Often", "Always"] },
    // { text: "Anxiety/Fear: Giving a party", answers: ["None", "Mild", "Moderate", "Severe"] },
    // { text: "Avoidance: Giving a party", answers: ["Never", "Occassionally", "Often", "Always"] },
    // { text: "Anxiety/Fear: Resisting a high pressure salesperson", answers: ["None", "Mild", "Moderate", "Severe"] },
    // { text: "Avoidance: Resisting a high pressure salesperson", answers: ["Never", "Occassionally", "Often", "Always"] },
    // Add more questions here




// import React from 'react'
// import "./Form.css"
// import { useState } from 'react'

// const Form = () => {
//   // const [result, setResult] = useState('');
//   // const [score, setScore] = useState(0);
  
//   // const handleSubmit = (e) => {
//   //   e.preventDefault();
//   //   const form = e.target;
//   //   let currscore = 0;
  
//   //   for (let i = 1; i <= 48; i++) {
//   //     const questionElement = form.elements[`question${i}`];
//   //     if (questionElement) { // Check if the element exists
//   //       const question = questionElement.value;
//   //       switch (question) {
//   //         case "None":
//   //           currscore += 0;
//   //           break;
//   //         case "Mild":
//   //           currscore += 1;
//   //           break;
//   //         case "Moderate":
//   //           currscore += 2;
//   //           break;
//   //         case "Severe":
//   //           currscore += 3;
//   //           break;
//   //         default:
//   //           break;
//   //       }
//   //     }
//   //   }
  
//   //   setScore(currscore);
//   //   form.style.display = "none";
  
//   //   let message;
//   //   if (currscore <= 30) {
//   //     message = `Your score is ${currscore}. You do not suffer from social anxiety.`;
//   //   } else if (currscore > 30 && currscore <= 50) {
//   //     message = `Your score is ${currscore}. You have a mild level of social anxiety. It is recommended that you read the tips.`;
//   //   } else if (currscore > 50 && currscore <= 65) {
//   //     message = `Your score is ${currscore}. You have a moderate level of social anxiety. It is recommended that you read the tips.`;
//   //   } else if (currscore > 65 && currscore <= 80) {
//   //     message = `Your score is ${currscore}. You have a marked level of social anxiety. We recommend that you read the books.`;
//   //   } else if (currscore > 80 && currscore <= 95) {
//   //     message = `Your score is ${currscore}. You have a severe level of social anxiety. It is recommended that you please consult a psychologist.`;
//   //   } else if (currscore > 95) {
//   //     message = `Your score is ${currscore}. You have a very severe level of social anxiety. We recommend that you take consultation from a mental health professional ASAP.`;
//   //   }
//   //   setResult(message);
//   // }
  

//   return (
//     <div>
//       <div className="form-container">
//         <form>
//           <div className="question">
//             <p id='question1' className='para'>1) Anxiety/Fear: Talking to someone on your phone in public?</p>
//             <div className="answer">
//               <label htmlFor="question1">
//                 <input type="radio" name="question1" value = "None" /> None
//               </label>
//               <label htmlFor="question1">
//                 <input type="radio" name="question1" value = "Mild" /> Mild
//               </label>
//               <label htmlFor="question1">
//                 <input type="radio" name="question1" value = "Moderate" /> Moderate
//               </label>
//               <label htmlFor="question1">
//                 <input type="radio" name="question1" value = "Severe" /> Severe
//               </label>
//             </div>
//           </div>
//           <div className="question">
//             <p id='question2' className='para'>2) Avoidance: Talking to someone on your phone in public?</p>
//             <div className="answer">
//               <label htmlFor="question2">
//                 <input type="radio" name="question2" value = "Never" /> Never
//               </label>
//               <label htmlFor="question2">
//                 <input type="radio" name="question2" value = "Occasionally" /> Occasionally
//               </label>
//               <label htmlFor="question2">
//                 <input type="radio" name="question2" value = "Often" /> Often
//               </label>
//               <label htmlFor="question2">
//                 <input type="radio" name="question2" value = "Always" /> Always
//               </label>
//             </div>
//           </div>
//           <div className="question">
//             <p id='question3' className='para'>3) Anxiety/Fear: Eating in public places?</p>
//             <div className="answer">
//               <label htmlFor="question3">
//                 <input type="radio" name="question3" value = "None" /> None
//               </label>
//               <label htmlFor="question3">
//                 <input type="radio" name="question3" value = "Mild" /> Mild
//               </label>
//               <label htmlFor="question3">
//                 <input type="radio" name="question3" value = "Moderate" /> Moderate
//               </label>
//               <label htmlFor="question3">
//                 <input type="radio" name="question3" value = "Severe" /> Severe
//               </label>
//             </div>
//           </div>
//           <div className="question">
//             <p id='question4' className='para'>4) Avoidance: Eating in public places?</p>
//             <div className="answer">
//               <label htmlFor="question4">
//                 <input type="radio" name="question4" value = "Never" /> Never
//               </label>
//               <label htmlFor="question4">
//                 <input type="radio" name="question4" value = "Occasionally" /> Occasionally
//               </label>
//               <label htmlFor="question4">
//                 <input type="radio" name="question4" value = "Often" /> Often
//               </label>
//               <label htmlFor="question4">
//                 <input type="radio" name="question4" value = "Always" /> Always
//               </label>
//             </div>
//           </div>
//           <div className="question">
//             <p id='question5' className='para'>5) Anxiety/Fear: Interacting in small groups?</p>
//             <div className="answer">
//               <label htmlFor="question5">
//                 <input type="radio" name="question5" value = "None" /> None
//               </label>
//               <label htmlFor="question5">
//                 <input type="radio" name="question5question5" value = "Mild" /> Mild
//               </label>
//               <label htmlFor="question5">
//                 <input type="radio" name="question5" value = "Moderate" /> Moderate
//               </label>
//               <label htmlFor="question5">
//                 <input type="radio" name="question5" value = "Severe" /> Severe
//               </label>
//             </div>
//           </div>
//           <div className="question">
//             <p id='question6' className='para'>6) Avoidance: Interacting in small groups?</p>
//             <div className="answer">
//               <label htmlFor="question6">
//                 <input type="radio" name="question6" value = "Never" /> Never
//               </label>
//               <label htmlFor="question6">
//                 <input type="radio" name="question6" value = "Occasionally" /> Occasionally
//               </label>
//               <label htmlFor="question6">
//                 <input type="radio" name="question6" value = "Often" /> Often
//               </label>
//               <label htmlFor="question6">
//                 <input type="radio" name="question6" value = "Always" /> Always
//               </label>
//             </div>
//           </div>
//           <div className="question">
//             <p id='question7' className='para'>7) Anxiety/Fear: Drinking with others in Public Places?</p>
//             <div className="answer">
//               <label htmlFor="question7">
//                 <input type="radio" name="question7" value = "None" /> None
//               </label>
//               <label htmlFor="question7">
//                 <input type="radio" name="question7" value = "Mild" /> Mild
//               </label>
//               <label htmlFor="question7">
//                 <input type="radio" name="question7" value = "Moderate" /> Moderate
//               </label>
//               <label htmlFor="question7">
//                 <input type="radio" name="question7" value = "Severe" /> Severe
//               </label>
//             </div>
//           </div>
//           <div className="question">
//             <p id='question8' className='para'>8) Avoidance: Drinking with others in Public Places?</p>
//             <div className="answer">
//               <label htmlFor="question8">
//                 <input type="radio" name="question8" value = "Never" /> Never
//               </label>
//               <label htmlFor="question8">
//                 <input type="radio" name="question8" value = "Occasionally" /> Occasionally
//               </label>
//               <label htmlFor="question8">
//                 <input type="radio" name="question8" value = "Often" /> Often
//               </label>
//               <label htmlFor="question8">
//                 <input type="radio" name="question8" value = "Always" /> Always
//               </label>
//             </div>
//           </div>
//           <div className="question">
//             <p id='question9' className='para'>9) Anxiety/Fear: Talking to people in authority?</p>
//             <div className="answer">
//               <label htmlFor="question9">
//                 <input type="radio" name="question9" value = "None" /> None
//               </label>
//               <label htmlFor="question9">
//                 <input type="radio" name="question9" value = "Mild" /> Mild
//               </label>
//               <label htmlFor="question9">
//                 <input type="radio" name="question9" value = "Moderate" /> Moderate
//               </label>
//               <label htmlFor="question9">
//                 <input type="radio" name="question9" value = "Severe" /> Severe
//               </label>
//             </div>
//           </div>
//           <div className="question">
//             <p id='question10' className='para'>10) Avoidance: Talking to people in authority?</p>
//             <div className="answer">
//               <label htmlFor="question10">
//                 <input type="radio" name="question10" value = "Never" /> Never
//               </label>
//               <label htmlFor="question10">
//                 <input type="radio" name="question10" value = "Occasionally" /> Occasionally
//               </label>
//               <label htmlFor="question10">
//                 <input type="radio" name="question10" value = "Often" /> Often
//               </label>
//               <label htmlFor="question10">
//                 <input type="radio" name="question10" value = "Always" /> Always
//               </label>
//             </div>
//           </div>
//           <div className="question">
//             <p id='question11' className='para'>11) Anxiety/Fear: Acting, performing or giving a talk in front of an audience?</p>
//             <div className="answer">
//               <label htmlFor="question11">
//                 <input type="radio" name="question11" value = "None" /> None
//               </label>
//               <label htmlFor="question11">
//                 <input type="radio" name="question11" value = "Mild" /> Mild
//               </label>
//               <label htmlFor="question11">
//                 <input type="radio" name="question11" value = "Moderate" /> Moderate
//               </label>
//               <label htmlFor="question11">
//                 <input type="radio" name="question11" value = "Severe" /> Severe
//               </label>
//             </div>
//           </div>
//           <div className="question">
//             <p id='question12' className='para'>12) Avoidance: Acting, performing or giving a talk in front of an audience?</p>
//             <div className="answer">
//               <label htmlFor="question12">
//                 <input type="radio" name="question12" value = "Never" /> Never
//               </label>
//               <label htmlFor="question12">
//                 <input type="radio" name="question12" value = "Occasionally" /> Occasionally
//               </label>
//               <label htmlFor="question12">
//                 <input type="radio" name="question12" value = "Often" /> Often
//               </label>
//               <label htmlFor="question12">
//                 <input type="radio" name="question12" value = "Always" /> Always
//               </label>
//             </div>
//           </div>
//           <div className="question">
//             <p id='question13' className='para'>13) Anxiety/Fear: Going to a party?</p>
//             <div className="answer">
//               <label htmlFor="question13">
//                 <input type="radio" name="question13" value = "None" /> None
//               </label>
//               <label htmlFor="question13">
//                 <input type="radio" name="question13" value = "Mild" /> Mild
//               </label>
//               <label htmlFor="question13">
//                 <input type="radio" name="question13" value = "Moderate" /> Moderate
//               </label>
//               <label htmlFor="question13">
//                 <input type="radio" name="question13" value = "Severe" /> Severe
//               </label>
//             </div>
//           </div>
//           <div className="question">
//             <p id='question14' className='para'>14) Avoidance: Going to a party?</p>
//             <div className="answer">
//               <label htmlFor="question14">
//                 <input type="radio" name="question14" value = "Never" /> Never
//               </label>
//               <label htmlFor="question14">
//                 <input type="radio" name="question14" value = "Occasionally" /> Occasionally
//               </label>
//               <label htmlFor="question14">
//                 <input type="radio" name="question14" value = "Often" /> Often
//               </label>
//               <label htmlFor="question14">
//                 <input type="radio" name="question14" value = "Always" /> Always
//               </label>
//             </div>
//           </div>
//           <div className="question">
//             <p id='question15' className='para'>15) Anxiety/Fear: Working while being observed?</p>
//             <div className="answer">
//               <label htmlFor="question15">
//                 <input type="radio" name="question15" value = "None" /> None
//               </label>
//               <label htmlFor="question15">
//                 <input type="radio" name="question15" value = "Mild" /> Mild
//               </label>
//               <label htmlFor="question15">
//                 <input type="radio" name="question15" value = "Moderate" /> Moderate
//               </label>
//               <label htmlFor="question15">
//                 <input type="radio" name="question15" value = "Severe" /> Severe
//               </label>
//             </div>
//           </div>
//           <div className="question">
//             <p id='question16' className='para'>16) Avoidance: Working while being observed?</p>
//             <div className="answer">
//               <label htmlFor="question16">
//                 <input type="radio" name="question16" value = "Never" /> Never
//               </label>
//               <label htmlFor="question16">
//                 <input type="radio" name="question16" value = "Occasionally" /> Occasionally
//               </label>
//               <label htmlFor="question16">
//                 <input type="radio" name="question16" value = "Often" /> Often
//               </label>
//               <label htmlFor="question16">
//                 <input type="radio" name="question16" value = "Always" /> Always
//               </label>
//             </div>
//           </div>
//           <div className="question">
//             <p id='question17' className='para'>17) Anxiety/Fear: Writing while being observed?</p>
//             <div className="answer">
//               <label htmlFor="question17">
//                 <input type="radio" name="question17" value = "None" /> None
//               </label>
//               <label htmlFor="question17">
//                 <input type="radio" name="question17" value = "Mild" /> Mild
//               </label>
//               <label htmlFor="question17">
//                 <input type="radio" name="question17" value = "Moderate" /> Moderate
//               </label>
//               <label htmlFor="question17">
//                 <input type="radio" name="question17" value = "Severe" /> Severe
//               </label>
//             </div>
//           </div>
//           <div className="question">
//             <p id='question18' className='para'>18) Avoidance: Writing while being observed?</p>
//             <div className="answer">
//               <label htmlFor="question18">
//                 <input type="radio" name="question18" value = "Never" /> Never
//               </label>
//               <label htmlFor="question18">
//                 <input type="radio" name="question18" value = "Occasionally" /> Occasionally
//               </label>
//               <label htmlFor="question18">
//                 <input type="radio" name="question18" value = "Often" /> Often
//               </label>
//               <label htmlFor="question18">
//                 <input type="radio" name="question18" value = "Always" /> Always
//               </label>
//             </div>
//           </div>
//           <div className="question">
//             <p id='question19' className='para'>19) Anxiety/Fear: Calling someone you don't know very well?</p>
//             <div className="answer">
//               <label htmlFor="question19">
//                 <input type="radio" name="question19" value = "None" /> None
//               </label>
//               <label htmlFor="question19">
//                 <input type="radio" name="question19" value = "Mild" /> Mild
//               </label>
//               <label htmlFor="question19">
//                 <input type="radio" name="question19" value = "Moderate" /> Moderate
//               </label>
//               <label htmlFor="question19">
//                 <input type="radio" name="question19" value = "Severe" /> Severe
//               </label>
//             </div>
//           </div>
//           <div className="question">
//             <p id='question20' className='para'>20) Avoidance: Calling someone you don't know very well?</p>
//             <div className="answer">
//               <label htmlFor="question20">
//                 <input type="radio" name="question20" value = "Never" /> Never
//               </label>
//               <label htmlFor="question20">
//                 <input type="radio" name="question20" value = "Occasionally" /> Occasionally
//               </label>
//               <label htmlFor="question20">
//                 <input type="radio" name="question20" value = "Often" /> Often
//               </label>
//               <label htmlFor="question20">
//                 <input type="radio" name="question20" value = "Always" /> Always
//               </label>
//             </div>
//           </div>
//           <div className="question">
//             <p id='question21' className='para'>21) Anxiety/Fear: Talking with people you don't know very well?</p>
//             <div className="answer">
//               <label htmlFor="question21">
//                 <input type="radio" name="question21" value = "None" /> None
//               </label>
//               <label htmlFor="question21">
//                 <input type="radio" name="question21" value = "Mild" /> Mild
//               </label>
//               <label htmlFor="question21">
//                 <input type="radio" name="question21" value = "Moderate" /> Moderate
//               </label>
//               <label htmlFor="question21">
//                 <input type="radio" name="question21" value = "Severe" /> Severe
//               </label>
//             </div>
//           </div>
//           <div className="question">
//             <p id='question22' className='para'>22) Avoidance: Talking with people you don't know very well?</p>
//             <div className="answer">
//               <label htmlFor="question22">
//                 <input type="radio" name="question22" value = "Never" /> Never
//               </label>
//               <label htmlFor="question22">
//                 <input type="radio" name="question22" value = "Occasionally" /> Occasionally
//               </label>
//               <label htmlFor="question22">
//                 <input type="radio" name="question22" value = "Often" /> Often
//               </label>
//               <label htmlFor="question22">
//                 <input type="radio" name="question22" value = "Always" /> Always
//               </label>
//             </div>
//           </div>
//           <div className="question">
//             <p id='question23' className='para'>23) Anxiety/Fear: Meeting with strangers?</p>
//             <div className="answer">
//               <label htmlFor="question23">
//                 <input type="radio" name="question23" value = "None" /> None
//               </label>
//               <label htmlFor="question23">
//                 <input type="radio" name="question23" value = "Mild" /> Mild
//               </label>
//               <label htmlFor="question23">
//                 <input type="radio" name="question23" value = "Moderate" /> Moderate
//               </label>
//               <label htmlFor="question23">
//                 <input type="radio" name="question23" value = "Severe" /> Severe
//               </label>
//             </div>
//           </div>
//           <div className="question">
//             <p id='question24' className='para'>24) Avoidance: Meeting with strangers?</p>
//             <div className="answer">
//               <label htmlFor="question24">
//                 <input type="radio" name="question24" value = "Never" /> Never
//               </label>
//               <label htmlFor="question24">
//                 <input type="radio" name="question24" value = "Occasionally" /> Occasionally
//               </label>
//               <label htmlFor="question24">
//                 <input type="radio" name="question24" value = "Often" /> Often
//               </label>
//               <label htmlFor="question24">
//                 <input type="radio" name="question24" value = "Always" /> Always
//               </label>
//             </div>
//           </div>
//           <div className="question">
//             <p id='question25' className='para'>25) Anxiety/Fear: Urinating in public restroom?</p>
//             <div className="answer">
//               <label htmlFor="question25">
//                 <input type="radio" name="question25" value = "None" /> None
//               </label>
//               <label htmlFor="question25">
//                 <input type="radio" name="question25" value = "Mild" /> Mild
//               </label>
//               <label htmlFor="question25">
//                 <input type="radio" name="question25" value = "Moderate" /> Moderate
//               </label>
//               <label htmlFor="question25">
//                 <input type="radio" name="question25" value = "Severe" /> Severe
//               </label>
//             </div>
//           </div>
//           <div className="question">
//             <p id='question26' className='para'>26) Avoidance: Urinating in public restroom?</p>
//             <div className="answer">
//               <label htmlFor="question26">
//                 <input type="radio" name="question26" value = "Never" /> Never
//               </label>
//               <label htmlFor="question26">
//                 <input type="radio" name="question26" value = "Occasionally" /> Occasionally
//               </label>
//               <label htmlFor="question26">
//                 <input type="radio" name="question26" value = "Often" /> Often
//               </label>
//               <label htmlFor="question26">
//                 <input type="radio" name="question26" value = "Always" /> Always
//               </label>
//             </div>
//           </div>
//           <div className="question">
//             <p id='question27' className='para'>27) Anxiety/Fear: Entering a room when others are already seated?</p>
//             <div className="answer">
//               <label htmlFor="question27">
//                 <input type="radio" name="question27" value = "None" /> None
//               </label>
//               <label htmlFor="question27">
//                 <input type="radio" name="question27" value = "Mild" /> Mild
//               </label>
//               <label htmlFor="question27">
//                 <input type="radio" name="question27" value = "Moderate" /> Moderate
//               </label>
//               <label htmlFor="question27">
//                 <input type="radio" name="question27" value = "Severe" /> Severe
//               </label>
//             </div>
//           </div>
//           <div className="question">
//             <p id='question28' className='para'>28) Avoidance: Entering a room when others are already seated?</p>
//             <div className="answer">
//               <label htmlFor="question28">
//                 <input type="radio" name="question28" value = "Never" /> Never
//               </label>
//               <label htmlFor="question28">
//                 <input type="radio" name="question28" value = "Occasionally" /> Occasionally
//               </label>
//               <label htmlFor="question28">
//                 <input type="radio" name="question28" value = "Often" /> Often
//               </label>
//               <label htmlFor="question28">
//                 <input type="radio" name="question28" value = "Always" /> Always
//               </label>
//             </div>
//           </div>
//           <div className="question">
//             <p id='question29' className='para'>29) Anxiety/Fear: Being the center of attention?</p>
//             <div className="answer">
//               <label htmlFor="question29">
//                 <input type="radio" name="question29" value = "None" /> None
//               </label>
//               <label htmlFor="question29">
//                 <input type="radio" name="question29" value = "Mild" /> Mild
//               </label>
//               <label htmlFor="question29">
//                 <input type="radio" name="question29" value = "Moderate" /> Moderate
//               </label>
//               <label htmlFor="question29">
//                 <input type="radio" name="question29" value = "Severe" /> Severe
//               </label>
//             </div>
//           </div>
//           <div className="question">
//             <p id='question30' className='para'>30) Avoidance: Being the center of attention?</p>
//             <div className="answer">
//               <label htmlFor="question30">
//                 <input type="radio" name="question30" value = "Never" /> Never
//               </label>
//               <label htmlFor="question30">
//                 <input type="radio" name="question30" value = "Occasionally" /> Occasionally
//               </label>
//               <label htmlFor="question30">
//                 <input type="radio" name="question30" value = "Often" /> Often
//               </label>
//               <label htmlFor="question30">
//                 <input type="radio" name="question30" value = "Always" /> Always
//               </label>
//             </div>
//           </div>
//           <div className="question">
//             <p id='question31' className='para'>31) Anxiety/Fear: Speaking up at a meeting?</p>
//             <div className="answer">
//               <label htmlFor="question31">
//                 <input type="radio" name="question31" value = "None" /> None
//               </label>
//               <label htmlFor="question31">
//                 <input type="radio" name="question31" value = "Mild" /> Mild
//               </label>
//               <label htmlFor="question31">
//                 <input type="radio" name="question31" value = "Moderate" /> Moderate
//               </label>
//               <label htmlFor="question31">
//                 <input type="radio" name="question31" value = "Severe" /> Severe
//               </label>
//             </div>
//           </div>
//           <div className="question">
//             <p id='question32' className='para'>32) Avoidance: Speaking up at a meeting?</p>
//             <div className="answer">
//               <label htmlFor="question32">
//                 <input type="radio" name="question32" value = "Never" /> Never
//               </label>
//               <label htmlFor="question32">
//                 <input type="radio" name="question32" value = "Occasionally" /> Occasionally
//               </label>
//               <label htmlFor="question32">
//                 <input type="radio" name="question32" value = "Often" /> Often
//               </label>
//               <label htmlFor="question32">
//                 <input type="radio" name="question32" value = "Always" /> Always
//               </label>
//             </div>
//           </div>
//           <div className="question">
//             <p id='question33' className='para'>33) Anxiety/Fear: Taking a test?</p>
//             <div className="answer">
//               <label htmlFor="question33">
//                 <input type="radio" name="question33" value = "None" /> None
//               </label>
//               <label htmlFor="question33">
//                 <input type="radio" name="question33" value = "Mild" /> Mild
//               </label>
//               <label htmlFor="question33">
//                 <input type="radio" name="question33" value = "Moderate" /> Moderate
//               </label>
//               <label htmlFor="question33">
//                 <input type="radio" name="question33" value = "Severe" /> Severe
//               </label>
//             </div>
//           </div>
//           <div className="question">
//             <p id='question34' className='para'>34) Avoidance: Taking a test?</p>
//             <div className="answer">
//               <label htmlFor="question34">
//                 <input type="radio" name="question34" value = "Never" /> Never
//               </label>
//               <label htmlFor="question34">
//                 <input type="radio" name="question34" value = "Occasionally" /> Occasionally
//               </label>
//               <label htmlFor="question34">
//                 <input type="radio" name="question34" value = "Often" /> Often
//               </label>
//               <label htmlFor="question34">
//                 <input type="radio" name="question34" value = "Always" /> Always
//               </label>
//             </div>
//           </div>
//           <div className="question">
//             <p id='question35' className='para'>35) Anxiety/Fear: Expressing disagreement or disapproval to someone you don't know very well?</p>
//             <div className="answer">
//               <label htmlFor="question35">
//                 <input type="radio" name="question35" value = "None" /> None
//               </label>
//               <label htmlFor="question35">
//                 <input type="radio" name="question35" value = "Mild" /> Mild
//               </label>
//               <label htmlFor="question35">
//                 <input type="radio" name="question35" value = "Moderate" /> Moderate
//               </label>
//               <label htmlFor="question35">
//                 <input type="radio" name="question35" value = "Severe" /> Severe
//               </label>
//             </div>
//           </div>
//           <div className="question">
//             <p id='question36' className='para'>36) Avoidance: Expressing disagreement or disapproval to someone you don't know very well?</p>
//             <div className="answer">
//               <label htmlFor="question36">
//                 <input type="radio" name="question36" value = "Never" /> Never
//               </label>
//               <label htmlFor="question36">
//                 <input type="radio" name="question36" value = "Occasionally" /> Occasionally
//               </label>
//               <label htmlFor="question36">
//                 <input type="radio" name="question36" value = "Often" /> Often
//               </label>
//               <label htmlFor="question36">
//                 <input type="radio" name="question36" value = "Always" /> Always
//               </label>
//             </div>
//           </div>
//           <div className="question">
//             <p id='question37' className='para'>37) Anxiety/Fear: Looking at people you don't know very well in the eyes?</p>
//             <div className="answer">
//               <label htmlFor="question37">
//                 <input type="radio" name="question37" value = "None" /> None
//               </label>
//               <label htmlFor="question37">
//                 <input type="radio" name="question37" value = "Mild" /> Mild
//               </label>
//               <label htmlFor="question37">
//                 <input type="radio" name="question37" value = "Moderate" /> Moderate
//               </label>
//               <label htmlFor="question37">
//                 <input type="radio" name="question37" value = "Severe" /> Severe
//               </label>
//             </div>
//           </div>
//           <div className="question">
//             <p id='question38' className='para'>38) Avoidance: Looking at people you don't know very well in the eyes?</p>
//             <div className="answer">
//               <label htmlFor="question38">
//                 <input type="radio" name="question38" value = "Never" /> Never
//               </label>
//               <label htmlFor="question38">
//                 <input type="radio" name="question38" value = "Occasionally" /> Occasionally
//               </label>
//               <label htmlFor="question38">
//                 <input type="radio" name="question38" value = "Often" /> Often
//               </label>
//               <label htmlFor="question38">
//                 <input type="radio" name="question38" value = "Always" /> Always
//               </label>
//             </div>
//           </div>
//           <div className="question">
//             <p id='question39' className='para'>39) Anxiety/Fear: Giving a report to a group?</p>
//             <div className="answer">
//               <label htmlFor="question39">
//                 <input type="radio" name="question39" value = "None" /> None
//               </label>
//               <label htmlFor="question39">
//                 <input type="radio" name="question39" value = "Mild" /> Mild
//               </label>
//               <label htmlFor="question39">
//                 <input type="radio" name="question39" value = "Moderate" /> Moderate
//               </label>
//               <label htmlFor="question39">
//                 <input type="radio" name="question39" value = "Severe" /> Severe
//               </label>
//             </div>
//           </div>
//           <div className="question">
//             <p id='question40' className='para'>40) Avoidance: Giving a report to a group?</p>
//             <div className="answer">
//               <label htmlFor="question40">
//                 <input type="radio" name="question40" value = "Never" /> Never
//               </label>
//               <label htmlFor="question40">
//                 <input type="radio" name="question40" value = "Occasionally" /> Occasionally
//               </label>
//               <label htmlFor="question40">
//                 <input type="radio" name="question40" value = "Often" /> Often
//               </label>
//               <label htmlFor="question40">
//                 <input type="radio" name="question40" value = "Always" /> Always
//               </label>
//             </div>
//           </div>
//           <div className="question">
//             <p id='question41' className='para'>41) Anxiety/Fear: Trying to get acquainted with someone for a romantic relationship?</p>
//             <div className="answer">
//               <label htmlFor="question41">
//                 <input type="radio" name="question41" value = "None" /> None
//               </label>
//               <label htmlFor="question41">
//                 <input type="radio" name="question41" value = "Mild" /> Mild
//               </label>
//               <label htmlFor="question41">
//                 <input type="radio" name="question41" value = "Moderate" /> Moderate
//               </label>
//               <label htmlFor="question41">
//                 <input type="radio" name="question41" value = "Severe" /> Severe
//               </label>
//             </div>
//           </div>
//           <div className="question">
//             <p id='question42' className='para'>42) Avoidance: Trying to get acquainted with someone for a romantic relationship?</p>
//             <div className="answer">
//               <label htmlFor="question42">
//                 <input type="radio" name="question42" value = "Never" /> Never
//               </label>
//               <label htmlFor="question42">
//                 <input type="radio" name="question42" value = "Occasionally" /> Occasionally
//               </label>
//               <label htmlFor="question42">
//                 <input type="radio" name="question42" value = "Often" /> Often
//               </label>
//               <label htmlFor="question42">
//                 <input type="radio" name="question42" value = "Always" /> Always
//               </label>
//             </div>
//           </div>
//           <div className="question">
//             <p id='question43' className='para'>43) Anxiety/Fear: Returning goods to a store for a refund?</p>
//             <div className="answer">
//               <label htmlFor="question43">
//                 <input type="radio" name="question43" value = "None" /> None
//               </label>
//               <label htmlFor="question43">
//                 <input type="radio" name="question43" value = "Mild" /> Mild
//               </label>
//               <label htmlFor="question43">
//                 <input type="radio" name="question43" value = "Moderate" /> Moderate
//               </label>
//               <label htmlFor="question43">
//                 <input type="radio" name="question43" value = "Severe" /> Severe
//               </label>
//             </div>
//           </div>
//           <div className="question">
//             <p id='question44' className='para'>44) Avoidance: Returning goods to a store for a refund?</p>
//             <div className="answer">
//               <label htmlFor="question44">
//                 <input type="radio" name="question44" value = "Never" /> Never
//               </label>
//               <label htmlFor="question44">
//                 <input type="radio" name="question44" value = "Occasionally" /> Occasionally
//               </label>
//               <label htmlFor="question44">
//                 <input type="radio" name="question44" value = "Often" /> Often
//               </label>
//               <label htmlFor="question44">
//                 <input type="radio" name="question44" value = "Always" /> Always
//               </label>
//             </div>
//           </div>
//           <div className="question">
//             <p id='question45' className='para'>45) Anxiety/Fear: Giving a party?</p>
//             <div className="answer">
//               <label htmlFor="question45">
//                 <input type="radio" name="question45" value = "None" /> None
//               </label>
//               <label htmlFor="question45">
//                 <input type="radio" name="question45" value = "Mild" /> Mild
//               </label>
//               <label htmlFor="question45">
//                 <input type="radio" name="question45" value = "Moderate" /> Moderate
//               </label>
//               <label htmlFor="question45">
//                 <input type="radio" name="question45" value = "Severe" /> Severe
//               </label>
//             </div>
//           </div>
//           <div className="question">
//             <p id='question46' className='para'>46) Avoidance: Giving a party?</p>
//             <div className="answer">
//               <label htmlFor="question46">
//                 <input type="radio" name="question46" value = "Never" /> Never
//               </label>
//               <label htmlFor="question46">
//                 <input type="radio" name="question46" value = "Occasionally" /> Occasionally
//               </label>
//               <label htmlFor="question46">
//                 <input type="radio" name="question46" value = "Often" /> Often
//               </label>
//               <label htmlFor="question46">
//                 <input type="radio" name="question46" value = "Always" /> Always
//               </label>
//             </div>
//           </div>
//           <div className="question">
//             <p id='question47' className='para'>47) Anxiety/Fear: Resisting a high pressure salesperson?</p>
//             <div className="answer">
//               <label htmlFor="question47">
//                 <input type="radio" name="question47" value = "None" /> None
//               </label>
//               <label htmlFor="question47">
//                 <input type="radio" name="question47" value = "Mild" /> Mild
//               </label>
//               <label htmlFor="question47">
//                 <input type="radio" name="question47" value = "Moderate" /> Moderate
//               </label>
//               <label htmlFor="question47">
//                 <input type="radio" name="question47" value = "Severe" /> Severe
//               </label>
//             </div>
//           </div>
//           <div className="question">
//             <p id='question48' className='para'>48) Avoidance: Resisting a high pressure salesperson?</p>
//             <div className="answer">
//               <label htmlFor="question48">
//                 <input type="radio" name="question48" value = "Never" /> Never
//               </label>
//               <label htmlFor="question48">
//                 <input type="radio" name="question48" value = "Occasionally" /> Occasionally
//               </label>
//               <label htmlFor="question48">
//                 <input type="radio" name="question48" value = "Often" /> Often
//               </label>
//               <label htmlFor="question48">
//                 <input type="radio" name="question48" value = "Always" /> Always
//               </label>
//             </div>
//           </div>
//           {/* <input className='submit' type="button" value="See Results" /> */}
//           <button className="submit" onClick='' >See Results</button>
//         </form>
//       </div>
//     </div>
//   )
// }

// export default Form

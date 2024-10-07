import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import Cookies from 'js-cookie';
import "./Tipspage.css";
import { Navigate, useNavigate } from 'react-router-dom';
const Tipspage = () => {
  const [quizzes, setQuizzes] = useState([]);  // Store all quizzes
  const [selectedQuiz, setSelectedQuiz] = useState(null);  // Store the selected quiz to display
  const [visible, setVisible] = useState(false);
  const [uname, setUname] = useState("");
  const [userFieldsValues, setUserFieldsValues] = useState({}); // Track user field inputs
  const [userAnswers, setUserAnswers] = useState({}); // Track answers to quiz questions
  const navigate = useNavigate();
  
  useEffect(() => {
    let id = Cookies.get("id");
    Axios.get(`http://localhost:3001/get-quiz`, { params: { id: id } })
      .then((response) => {
        Cookies.set("uname", response.data.uname);
        setUname(response.data.uname);
        setQuizzes(response.data.responce); // Save fetched quizzes to state
      })
      .catch((error) => {
        console.error("Error fetching quizzes!", error);
      });
  }, []);

  // Handle quiz selection and display preview
  const handleQuizClick = (quiz) => {
    setSelectedQuiz(quiz); // Set the clicked quiz as the selected quiz
    setVisible(true); // Make the quiz preview visible
    setUserFieldsValues({}); // Reset user field values when a new quiz is selected
    setUserAnswers({}); // Reset quiz answers when a new quiz is selected
  };

  // Toggle quiz visibility
  const closePreview = () => {
    setVisible(false);
  };

  // Copy the quiz link
  const copyQuiz = (quiz) => {
    let link = `http://localhost:3000/users-get-quiz/${quiz}`;
    navigator.clipboard.writeText(link)
      .then(() => {
        alert("Link copied give them to users !");
        console.log("Copied to clipboard: " + link)})
      .catch((error) => console.error("Failed to copy link: ", error));
  };

  // Handle user field changes
  const handleUserFieldChange = (e, fieldName) => {
    setUserFieldsValues({
      ...userFieldsValues,
      [fieldName]: e.target.value, // Update the value for the specific user field
    });
  };

  // Handle answer changes for questions
  const handleAnswerChange = (e, questionIndex) => {
    setUserAnswers({
      ...userAnswers,
      [questionIndex]: e.target.value, // Update the answer for the specific question
    });
  };

  // Submit the answers and user fields to the backend
  const submitAnswers = () => {
    const data = {
      quizId: selectedQuiz.quizId, // Include quiz ID in the data
      userFields: userFieldsValues, // Include user fields values
      answers: userAnswers, // Include quiz answers
    };
    console.log(data);
    Axios.post("http://localhost:3001/submit-quiz", data)  // Update the endpoint URL here
    .then((response) => {
      console.log("Submission successful:", response.data);
      alert("Your answers have been submitted successfully!");
    })
    .catch((error) => {
      console.error("Error submitting answers!", error);
      alert("There was an issue submitting your answers.");
    });
  
  };
  function ViewQuiz(quiz){
    let id=quiz.quizId;
    navigate(`/view-answers/${id}`);
    // console.log(quiz);
  }
  return (
    <div style={{ marginTop: "100px" }}>
      <h1>Your Quizzes</h1>
      <div className="quiz-list">
        {quizzes && quizzes.length > 0 ? (
          quizzes.map((quiz, index) => (
            <div 
              key={index} 
              className="quiz-id-div" 
              style={{ cursor: "pointer", border: "1px solid black", marginBottom: "10px", padding: "10px" }}
            >
              Quiz ID: {"u" + uname.length + uname + quiz.quizId}
              <button onClick={() => copyQuiz("u" + uname.length + uname + quiz.quizId)} style={{position: "relative", left: "30px"}}>Copy Link</button>
              <button onClick={() => handleQuizClick(quiz)} style={{position: "relative", left: "50px"}}>View Quiz</button>
              <button onClick={() => ViewQuiz(quiz)} style={{position: "relative", left: "50px"}}>View Result</button>
            </div>
          ))
        ) : (
          <p>No quizzes available</p>
        )}
      </div>

      {/* Display selected quiz preview */}
      {visible && selectedQuiz && (
        <div className="quiz-preview" style={{ marginTop: "20px", border: "1px solid black", padding: "20px" }}>
          <h2>Quiz Preview</h2>

          <h3>User Fields:</h3>
          {selectedQuiz.userFields.length > 0 ? (
            selectedQuiz.userFields.map((field, index) => (
              <div key={index} className="quiz-user-field">
                <label>{field.name}:</label>
                <input
                  type={field.type}
                  placeholder={field.name}
                  value={userFieldsValues[field.name] || ""} // Set value from state
                  onChange={(e) => handleUserFieldChange(e, field.name)} // Call handler on input change
                />
              </div>
            ))
          ) : (
            <p>No user fields added</p>
          )}

          <h3>Questions:</h3>
          {selectedQuiz.questions.length > 0 ? (
            selectedQuiz.questions.map((q, index) => (
              <div key={index} className="quiz-question">
                <p>
                  <b>Q{index + 1}:</b> {q.question}
                </p>
                <ul>
                  {q.options.map((option, optIndex) => (
                    <li key={optIndex}>
                      <input
                        type="radio"
                        id={`q${index}-opt${optIndex}`}
                        name={`question${index}`}
                        value={option}
                        checked={userAnswers[index] === option} // Set checked value based on state
                        onChange={(e) => handleAnswerChange(e, index)} // Call handler on option change
                      />
                      <label htmlFor={`q${index}-opt${optIndex}`}>{option}</label>
                    </li>
                  ))}
                </ul>
              </div>
            ))
          ) : (
            <p>No questions added</p>
          )}

          <button onClick={closePreview} style={{ cursor: "pointer", marginTop: "10px" }}>Close Preview</button>
          <button onClick={submitAnswers} style={{ cursor: "pointer", marginTop: "10px" }}>Submit Answers</button>
        </div>
      )}
    </div>
  );
};

export default Tipspage;

import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import "./Testpage.css";
import Axios from 'axios';
const Testpage = () => {
  const [userFields, setUserFields] = useState([]);       // Store additional user info fields
  const [questions, setQuestions] = useState([]);         // Store all quiz questions
  const [currentField, setCurrentField] = useState("");    // Track the current user field being added
  const [currentQuestion, setCurrentQuestion] = useState(""); // Track the current question
  const [currentOptions, setCurrentOptions] = useState("");   // Track the current options for a question
  const [visible, setVisible] = useState(false);

  // Handler to add user fields (e.g., name, email)
  const addUserField = () => {
    if (currentField.trim() !== "") {
      setUserFields([...userFields, { name: currentField, type: "text" }]);
      setCurrentField("");
    }
  };

  // Handler to add quiz questions
  const addQuestion = () => {
    if (currentQuestion.trim() !== "" && currentOptions.trim() !== "") {
      const optionsArray = currentOptions.split("\n"); // Split the options based on newline
      const newQuestion = {
        question: currentQuestion,
        options: optionsArray,
      };
      setQuestions([...questions, newQuestion]);
      setCurrentQuestion("");
      setCurrentOptions("");
    }
  };

  // Handler to delete a question based on index
  const deleteQuestion = (indexToDelete) => {
    const updatedQuestions = questions.filter((_, index) => index !== indexToDelete);
    setQuestions(updatedQuestions);
  };

  // Toggle quiz visibility
  function handleVisible() {
    setVisible(!visible);
  }
  const saveQuiz = () => {
    const quizData = { userFields, questions };
    quizData.quizId = uuidv4();  // Add the unique quizId to the quizData object
    Axios.post('http://localhost:3001/save-quiz', quizData)
      .then(response => {
        alert(`Quiz saved successfully with ID: ${response.data.id}`);
        // setQuizId(response.data.id); // Store the quiz ID after saving
      })
      .catch(error => {
        console.error('Error saving quiz:', error);
      });
    console.log(quizData);
  };
  
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div className="generate-quiz" style={{ marginTop: "100px" }}>
        <h1>Design Quiz</h1>
        <button onClick={() => {
          handleVisible();
          console.log(questions);
        }}>View Quiz</button>
        <button onClick={saveQuiz} style={{marginLeft:"10px"}}>Save Quiz</button>

        <div>
          <h1>User's Information</h1>
          <input
            type="text"
            placeholder="Add field"
            value={currentField}
            onChange={(e) => setCurrentField(e.target.value)}
          />
          <button onClick={addUserField}>ADD</button>

          {/* Display added user fields with inputs */}
          {userFields.length > 0 && (
            <div className="user-fields-list">
              <h2>Added Fields:</h2>
              <ul>
                {userFields.map((field, index) => (
                  <li key={index}>
                    <label>{field.name}: </label>
                    <input type={field.type} placeholder={field.name} />
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div>
          <h1>Questions</h1>
          <input
            type="text"
            placeholder="Enter your question"
            value={currentQuestion}
            onChange={(e) => setCurrentQuestion(e.target.value)}
          />
          <br />
          <textarea
            value={currentOptions}
            onChange={(e) => setCurrentOptions(e.target.value)}
            placeholder="Put answers with numbers, e.g., 1. option one\n2. option two"
          ></textarea>
          <button onClick={addQuestion}>ADD</button>

          {/* Display added questions */}
          {questions.length > 0 && (
            <div className="questions-list">
              <h2>Added Questions:</h2>
              <ul>
                {questions.map((q, index) => (
                  <li key={index} style={{ marginBottom: "10px" }}>
                    <b>Q{index + 1}:</b> {q.question}
                    <ul>
                      {q.options.map((option, optIndex) => (
                        <li key={optIndex}>{option}</li>
                      ))}
                    </ul>
                    {/* Delete Button for Each Question */}
                    <button onClick={() => deleteQuestion(index)} style={{ cursor: "pointer", marginTop: "5px" }}>
                      Delete Question
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Displaying the designed quiz */}
      <div className="quizes" style={visible ? { visibility: "visible" } : { visibility: "hidden" }}>
        <h2>Created Quiz</h2>
        <div className="quiz-preview">
          <h3>User Fields:</h3>
          {userFields.length > 0 ? (
            userFields.map((field, index) => (
              <div key={index} className="quiz-user-field">
                <label>{field.name}:</label>
                <input type={field.type} placeholder={field.name} />
              </div>
            ))
          ) : (
            <p>No user fields added</p>
          )}

          <h3>Questions:</h3>
          {questions.length > 0 ? (
            questions.map((q, index) => (
              <div key={index} className="quiz-question">
                <p>
                  <b>Q{index + 1}:</b> {q.question}
                </p>
                <ul>
                  {q.options.map((option, optIndex) => (
                    <li key={optIndex}>
                      {/* Add radio buttons for each answer option */}
                      <input
                        type="radio"
                        id={`q${index}-opt${optIndex}`}
                        name={`question${index}`} // Group radio buttons by question index
                        value={option}
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
          <button onClick={handleVisible} style={{ cursor: "pointer", padding: "5px" }}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default Testpage;

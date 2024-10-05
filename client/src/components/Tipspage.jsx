import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import Cookies from 'js-cookie';
import "./Tipspage.css";

const Tipspage = () => {
  const [quizzes, setQuizzes] = useState([]);  // Store all quizzes
  const [selectedQuiz, setSelectedQuiz] = useState(null);  // Store the selected quiz to display
  const [visible, setVisible] = useState(false);

  // Fetch quizzes on component mount
  useEffect(() => {
    let id = Cookies.get("id");
    Axios.get(`http://localhost:3001/get-quiz`, { params: { id: id } })
      .then((response) => {
        setQuizzes(response.data); // Save fetched quizzes to state
      })
      .catch((error) => {
        console.error("Error fetching quizzes!", error);
      });
  }, []);

  // Handle quiz selection and display preview
  const handleQuizClick = (quiz) => {
    setSelectedQuiz(quiz); // Set the clicked quiz as the selected quiz
    setVisible(true); // Make the quiz preview visible
  };

  // Toggle quiz visibility
  const closePreview = () => {
    setVisible(false);
  };

  return (
    <div style={{ marginTop: "100px" }}>
      <h1>Your Quizzes</h1>
      <div className="quiz-list">
        {quizzes.length > 0 ? (
          quizzes.map((quiz, index) => (
            <div 
              key={index} 
              className="quiz-id-div" 
              onClick={() => handleQuizClick(quiz)}
              style={{ cursor: "pointer", border: "1px solid black", marginBottom: "10px", padding: "10px" }}
            >
              Quiz ID: {quiz.quizId}
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
                <input type={field.type} placeholder={field.name} />
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
        </div>
      )}
    </div>
  );
};

export default Tipspage;

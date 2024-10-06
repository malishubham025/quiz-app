import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Axios from 'axios';

const QuizPage = () => {
  const { quiz } = useParams(); // Extract quiz parameter from the URL
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [userAnswers, setUserAnswers] = useState({}); // State to track user answers

  useEffect(() => {
    // Fetch the quiz details from the server using the `quiz` parameter
    Axios.get(`http://localhost:3001/users-get-quiz/${quiz}`)
      .then((response) => {
        setSelectedQuiz({
          userFields: response.data[0].userFields,
          questions: response.data[0].questions,
        });
      })
      .catch((error) => {
        console.error("Error fetching quiz!", error);
      });
  }, [quiz]);

  // Handler to update the selected answer for each question
  const handleAnswerChange = (e, questionIndex) => {
    setUserAnswers({
      ...userAnswers,
      [questionIndex]: e.target.value, // Update the answer for the specific question
    });
  };

  // Handle form submission
  const submitForm = (event) => {
    event.preventDefault();
    console.log("User Answers:", userAnswers); // Log user answers to the console
    // You can also send the userAnswers object to your backend if needed
  };

  // Render loading text while `selectedQuiz` is null
  if (!selectedQuiz) {
    return <p>Loading quiz...</p>;
  }

  return (
    <div className="quiz-preview" style={{ marginTop: "20px", border: "1px solid black", padding: "20px" }}>
      <h2>Test</h2>

      <h3>Fill your Information:</h3>
      {selectedQuiz.userFields && selectedQuiz.userFields.length > 0 ? (
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
      <form onSubmit={submitForm}>
        {selectedQuiz.questions && selectedQuiz.questions.length > 0 ? (
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

        <button type="submit" style={{ cursor: "pointer", marginTop: "10px" }}>Submit</button>
      </form>
    </div>
  );
};

export default QuizPage;

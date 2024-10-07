import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import Axios from 'axios';
import Cookies from "js-cookie";
import { useNavigate } from 'react-router-dom';

const QuizPage = () => {
  const { quiz } = useParams(); // Extract quiz parameter from the URL
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [userAnswers, setUserAnswers] = useState({}); // State to track user answers
  const [userFieldsValues, setUserFieldsValues] = useState({}); // State to track user field values
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuizDetails = async () => {
      try {
        let username = Cookies.get("id");
        const response = await Axios.get(`https://quiz-app-backend-sepia.vercel.app/${quiz}?username=${username}`);
        setSelectedQuiz({
          userFields: response.data[0].userFields,
          questions: response.data[0].questions,
        });
      } catch (error) {
        if (error.response && error.response.status === 400) {
          alert("You have already submitted!");
          navigate("/");
        } else {
          console.error('Error fetching quiz!', error);
        }
      }
    };

    fetchQuizDetails();
  }, [quiz, navigate]);

  // Handler to update the selected answer for each question
  const handleAnswerChange = (e, questionIndex) => {
    setUserAnswers({
      ...userAnswers,
      [questionIndex]: e.target.value, // Update the answer for the specific question
    });
  };

  // Handler to update user fields values
  const handleUserFieldChange = (e, fieldName) => {
    setUserFieldsValues({
      ...userFieldsValues,
      [fieldName]: e.target.value, // Update the value for the specific user field
    });
  };

  // Handle form submission
  const submitForm = async (event) => {
    event.preventDefault();

    const data = {
      userid: Cookies.get("id"),
      quizId: quiz,
      userFields: userFieldsValues,
      answers: userAnswers,
    };

    try {
      const response = await Axios.post(`http://localhost:3001/user-submit-answer`, data);
      alert("Your marks are " + response.data.correctAnswers);
      navigate("/");
    } catch (error) {
      if (error.response && error.response.status === 400) {
        alert("You have already submitted!");
        navigate("/");
      } else {
        console.error('Error submitting quiz:', error);
      }
    }
  };

  // Render loading text while `selectedQuiz` is null
  if (!selectedQuiz) {
    return <p>Loading quiz...</p>;
  }

  return (
    <div className="quiz-preview" style={{ marginTop: '20px', border: '1px solid black', padding: '20px' }}>
      <h2>Quiz</h2>

      <h3>Fill your Information:</h3>
      <form onSubmit={submitForm}>
        {selectedQuiz.userFields && selectedQuiz.userFields.length > 0 ? (
          selectedQuiz.userFields.map((field, index) => (
            <div key={index} className="quiz-user-field">
              <label>{field.name}:</label>
              <input
                required
                type={field.type}
                placeholder={field.name}
                onChange={(e) => handleUserFieldChange(e, field.name)} // Call handler on input change
              />
            </div>
          ))
        ) : (
          <p>No user fields added</p>
        )}

        <h3>Questions:</h3>

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
                      required
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

        <button type="submit" style={{ cursor: 'pointer', marginTop: '10px' }}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default QuizPage;

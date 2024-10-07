import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function ViewAnswers() {
  const { quizid } = useParams();
  const [tableHeaders, setTableHeaders] = React.useState([]);  // State for dynamic table headers
  const [userData, setUserData] = React.useState([]);          // State to hold user data

  React.useEffect(() => {
    axios
      .post("http://localhost:3001/viewall", { quizid })
      .then((response) => {
        const data = response.data;

        if (data.length > 0) {
          // Extract the keys from the first object's userFields to form headers
          const headers = Object.keys(data[0].data.userFields);
          headers.push("marks");  // Add 'marks' as a header
          setTableHeaders(headers);  // Set table headers

          setUserData(data);  // Set response data
        }
        console.log("Submission successful:", data);
      })
      .catch((error) => {
        console.error("Error fetching data!", error);
      });
  }, [quizid]);

  return (
    <div>
      <h1>View Answers for Quiz ID: {quizid}</h1>

      {/* Dynamic Table */}
      <table border="1" style={{ margin: "20px auto", width: "60%" }}>
        <thead>
          <tr>
            {tableHeaders.length > 0 ? (
              tableHeaders.map((header, index) => (
                <th key={index}>{header.charAt(0).toUpperCase() + header.slice(1)}</th>
              ))
            ) : (
              <th colSpan="3">Loading headers...</th>
            )}
          </tr>
        </thead>
        <tbody>
          {userData.length > 0 ? (
            userData.map((item, index) => (
              <tr key={index}>
                {/* Map over the table headers to get corresponding values */}
                {tableHeaders.map((header, i) => (
                  <td key={i}>
                    {/* Display data from userFields or marks */}
                    {header === "marks"
                      ? item.data.marks
                      : item.data.userFields[header] || "-"}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={tableHeaders.length} style={{ textAlign: "center" }}>
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ViewAnswers;

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Login from './Login';
import Register from './Register';
import App from './App';
import Tips from './Tips';
import Test from './Test';
import Books from './Books';
import About from './About';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import Cookies from 'js-cookie';

// Function to check authentication and render child components accordingly
function RenderChild({ children }) {
  let isLoggedIn = Cookies.get("isloggedin");
  return isLoggedIn ? children : <Navigate to="/login" />;
}

const root = ReactDOM.createRoot(document.getElementById('root'));

// Define routes using the createBrowserRouter
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/admin",
    element: (
      <RenderChild>
        <Tips />
      </RenderChild>
    ),
  },
  {
    path: "/test",
    element: (
      <RenderChild>
        <Test />
      </RenderChild>
    ),
  },
  {
    path: "/books",
    element: (
      <RenderChild>
        <Books />
      </RenderChild>
    ),
  },
  {
    path: "/about",
    element: <About />,
  },
]);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

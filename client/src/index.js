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

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>
  },
  {
    path: "/register",
    element: <Register/>
  },
  // {
  //   path: "/home",
  //   element: <App/>
  // },
  {
    path: "/admin",
    element: <Tips/>
  },
  {
    path: "/test",
    element: <Test/>
  },
  {
    path: "/books",
    element: <Books/>
  },
  {
    path: "/about",
    element: <About/>
  }
])
root.render(
  <React.StrictMode>
    {/* <App /> */}
    <RouterProvider router={router}/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

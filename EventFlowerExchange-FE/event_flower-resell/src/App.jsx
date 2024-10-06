import { useState } from "react";
import "./App.css";
import Login from "./pages/login/login";
import Home from "./pages/home/home";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Register from "./pages/register/register";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "login",
      element: <Login />,
    },
    {
      path: "register",
      element: <Register />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;

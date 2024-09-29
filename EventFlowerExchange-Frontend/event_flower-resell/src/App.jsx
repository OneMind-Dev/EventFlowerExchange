import { useState } from "react";
import "./App.css";
import Login from "./pages/login/login";
import Home from "./pages/home/home";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Register from "./pages/register/register";
import AdminDashboard from "./pages/admin/adminDashboard";
import Admin from "./pages/admin/adminManager";
import UserProfile from "./pages/user/userProfile";
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
    {
      path: "dashboard",
      element: <AdminDashboard />,
    },
    {
      path: "admin",
      element: <Admin />,
    },
    {
      path: "profile",
      element: <UserProfile />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;

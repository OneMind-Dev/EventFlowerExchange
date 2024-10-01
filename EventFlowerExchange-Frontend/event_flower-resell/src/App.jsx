import { useState } from "react";
import "./App.css";
import Login from "./pages/login/login";
import Home from "./pages/home/home";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Register from "./pages/register/register";
import AdminDashboard from "./pages/admin/adminDashboard";
import Events from "./pages/see-all/events/allEvents/allEvents";
import Flowers from "./pages/see-all/flowers/allFlowers/allFlowers";
import EventDetail from "./pages/see-all/events/eventDetail/eventDetail";
import FlowerDetail from "./pages/see-all/flowers/flowerDetail/flowerDetail";

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
      path: "events",
      element: <Events />,
    },
    {
      path: "events/:id",
      element: <EventDetail />,
    },
    {
      path: "flowers",
      element: <Flowers />,
    },
    {
      path: "flowers/:id",
      element: <FlowerDetail />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;

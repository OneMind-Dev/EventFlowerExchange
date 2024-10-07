import { useState } from "react";
import "./App.css";
import Login from "./pages/login/login";
import Home from "./pages/home/home";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import Register from "./pages/register/register";
import AdminDashboard from "./pages/admin/adminDashboard";
import Events from "./pages/see-all/events/allEvents/allEvents";
import Flowers from "./pages/see-all/flowers/allFlowers/allFlowers";
import EventDetail from "./pages/see-all/events/eventDetail/eventDetail";
import FlowerDetail from "./pages/see-all/flowers/flowerDetail/flowerDetail";
import UserProfile from "./pages/userProfile/userProfile";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Test from "./pages/test";

import Admin from "./pages/admin/adminManager";
import UserProfile from "./pages/user/userProfile";
const App = () => {
  const ProtectRouteAuth = ({ children }) => {
    const user = useSelector((store) => store.user);
    console.log(user);
    if (user != null && user?.role.includes("ADMIN")) {
      return children;
    }
    if (user == null) {
      return children;
    }
    toast.error("Trang này đã bị khóa!");
    return <Navigate to={"/login"} />;
  };

  const ProtectRouteAuth1 = ({ children }) => {
    const user = useSelector((store) => store.user);
    console.log(user);
    if (user != null) {
      return children;
    }
    toast.error("Trang này đã bị khóa!");
    return <Navigate to={"/"} />;
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "test",
      element: (
        <ProtectRouteAuth1>
          <Test />
        </ProtectRouteAuth1>
      ),
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
      element: (
        <ProtectRouteAuth>
          <AdminDashboard />
        </ProtectRouteAuth>
      ),
    },
    {
      path: "profile",
      element: (
        <ProtectRouteAuth1>
          <UserProfile />
        </ProtectRouteAuth1>
      ),
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

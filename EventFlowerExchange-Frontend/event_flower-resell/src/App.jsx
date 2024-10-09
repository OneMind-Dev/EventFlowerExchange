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
import ShopProfile from "./pages/shopProfile/shopProfile";
const App = () => {
  const ProtectRouteAuth = ({ children }) => {
    const user = useSelector((store) => store.user);
    if (user != null && user.role.includes("ADMIN")) {
      return children;
    }
    toast.error("Trang này đã bị khóa!");
    return <Navigate to={"/"} />;
  };

  const ProtectRouteAuth1 = ({ children }) => {
    const user = useSelector((store) => store.user);
    if (user != null) {
      return children;
    }
    toast.error("Trang này đã bị khóa!");
    return <Navigate to={"/"} />;
  };

  const ProtectRouteAuth2 = ({ children }) => {
    const user = useSelector((store) => store.user);
    if (user == null) {
      return children;
    }
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
      element: (
        <ProtectRouteAuth2>
          <Login />
        </ProtectRouteAuth2>
      ),
    },
    {
      path: "register",
      element: (
        <ProtectRouteAuth2>
          <Register />
        </ProtectRouteAuth2>
      ),
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
      path: "/:id",
      element: <ShopProfile />,
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

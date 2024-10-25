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
import UserInfo from "./pages/userProfile/userInfo/userInfo";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Test from "./pages/test";
import ShopProfile from "./pages/shopProfile/shopProfile";
import CartPage from "./pages/cart/cart";
import SellerManage from "./pages/userProfile/sellerManagement/sellerManage";
import SellerRegister from "./pages/sellerRegister/sellerRegister";
import AddFlowerToEvent from "./pages/addFlowerToEvent/addFlowerToEvent";
import Managers from "./pages/admin/adminManagers";
import Approve from "./pages/admin/adminApprove";
const App = () => {
  const ProtectRouteAuth = ({ children }) => {
    const user = useSelector((store) => store.user);
    if (user && user.role.includes("ADMIN")) {
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
    toast.error("Đăng nhập để truy cập!");
    return <Navigate to={"/"} />;
  };

  const ProtectRouteAuth2 = ({ children }) => {
    const user = useSelector((store) => store.user);
    if (user == null) {
      return children;
    } else if (user && !user.role.includes("ADMIN")) {
      return <Navigate to={"/"} />;
    }
  };

  const ProtectRouteAuth3 = ({ children }) => {
    const user = useSelector((store) => store.user);
    if (user && !user.role.includes("SELLER")) {
      return children;
    }
    toast.error("Trở thành Người bán để truy cập!");
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
      path: "cart",
      element: <CartPage />,
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
      path: "managers",
      element: (
        <ProtectRouteAuth>
          <Managers />
        </ProtectRouteAuth>
      ),
    },
    {
      path: "approve",
      element: (
        <ProtectRouteAuth>
          <Approve />
        </ProtectRouteAuth>
      ),
    },
    {
      path: "profile/userinfo",
      element: (
        <ProtectRouteAuth1>
          <UserInfo />
        </ProtectRouteAuth1>
      ),
    },
    {
      path: "sellerRegister",
      element: <SellerRegister />,
    },
    {
      path: "profile/sellermanage",
      element: (
        <ProtectRouteAuth1>
          <SellerManage />
        </ProtectRouteAuth1>
      ),
    },
    {
      path: "manager",
      element: (<ProtectRouteAuth1>
        <Managers />
      </ProtectRouteAuth1>)
    },
    {
      path: "events",
      element: <Events />,
    },
    {
      path: "events/:eventId",
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
      path: "addFlowerToEvent/:id",
      element: <AddFlowerToEvent />,
    },
    {
      path: "/:id",
      element: <ShopProfile />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;

import React, { useEffect, useState } from "react";
import "./header.css";
import { Input } from "antd";
import { SearchOutlined, ShoppingCartOutlined, BellOutlined } from "@ant-design/icons";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Space } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaCircleUser } from "react-icons/fa6";

function Header() {
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const [avatarUrl, setAvatarUrl] = useState(null);

  const events = [
    { label: <a href="#">ĐÁM CƯỚI</a>, key: "1" },
    { label: <a href="#">SINH NHẬT</a>, key: "2" },
    { label: <a href="#">LỄ HỘI</a>, key: "3" },
    { label: <a href="#">KHÁC</a>, key: "4" },
  ];

  const flowers = [
    { label: <a href="#">HOA ĐÁM CƯỚI</a>, key: "1" },
    { label: <a href="#">GIỎ HOA</a>, key: "2" },
    { label: <a href="#">HOA ??</a>, key: "3" },
    { label: <a href="#">KHÁC</a>, key: "4" },
  ];

  useEffect(() => {
    // Load avatar URL from sessionStorage on component mount
    const storedAvatar = sessionStorage.getItem("userAvatar");
    if (storedAvatar) {
      console.log("Loaded avatar from sessionStorage:", storedAvatar); // Debug
      setAvatarUrl(storedAvatar);
    }

    // Event listener for custom avatar update events
    const handleAvatarUpdate = () => {
      const updatedAvatar = sessionStorage.getItem("userAvatar");
      console.log("Avatar updated in sessionStorage:", updatedAvatar); // Debug
      setAvatarUrl(updatedAvatar);
    };

    window.addEventListener("avatarUpdated", handleAvatarUpdate);

    // Cleanup on component unmount
    return () => {
      window.removeEventListener("avatarUpdated", handleAvatarUpdate);
    };
  }, []);


  return (
    <>
      <header className="header">
        <div className="header__container">
          <div>
            <img
              className="header__container-logo"
              src="../src/components/images/logo.png"
              alt="logo"
              onClick={() => navigate("/")}
            />
          </div>
          <div className="header___container-search">
            <Input
              className="search"
              placeholder="Tìm kiếm"
              prefix={<SearchOutlined />}
            />
            <ShoppingCartOutlined
              onClick={() => navigate("/cart")}
              className="header___container-search--cart"
            />
            <BellOutlined className="header___container-search--noti" />
          </div>
          <div>
            {user == null ? (
              <div className="header__login-register">
                <p
                  className="header__login-register--seperate"
                  onClick={() => navigate("/register")}
                >
                  Đăng ký
                </p>
                <p onClick={() => navigate("/login")}>Đăng nhập</p>
              </div>
            ) : (
              <div className="header__user">
                {user.role.includes("USER") && !user.role.includes("SELLER") ? (
                  <>
                    <p onClick={() => navigate("/sellerRegister")}>
                      Trở thành Người bán
                    </p>
                    {avatarUrl ? (
                      <img
                        src={avatarUrl}
                        alt="User Avatar"
                        onClick={() => navigate("/profile/userinfo")}
                        className="header__user-avatar"
                      />
                    ) : (
                      <FaCircleUser
                        onClick={() => navigate("/profile/userinfo")}
                        className="header__user-icon"
                        size={30}
                      />
                    )}
                  </>
                ) : (
                  <>
                    {avatarUrl ? (
                      <img
                        src={avatarUrl}
                        alt="User Avatar"
                        onClick={() => navigate("/profile/userinfo")}
                        className="header__user-avatar"
                      />
                    ) : (
                      <FaCircleUser
                        onClick={() => navigate("/profile/userinfo")}
                        className="header__user-icon"
                        size={30}
                      />
                    )}
                  </>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="header__navbar">
          <p onClick={() => navigate("/")} className="header__navbar-home">
            TRANG CHỦ
          </p>
          <div className="header__navbar-events">
            <Dropdown menu={{ items: events }}>
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  SỰ KIỆN
                  <DownOutlined />
                </Space>
              </a>
            </Dropdown>
          </div>
          <div className="header__navbar-flowers">
            <Dropdown menu={{ items: flowers }}>
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  CÁC LOẠI HOA
                  <DownOutlined />
                </Space>
              </a>
            </Dropdown>
          </div>
        </div>
      </header>
      <div className="divide"></div>
    </>
  );
}

export default Header;

import React from "react";
import "./header.css";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Space } from "antd";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  const events = [
    {
      label: <a href="#">ĐÁM CƯỚI</a>,
      key: "1",
    },
    {
      label: <a href="#">SINH NHẬT</a>,
      key: "2",
    },
    {
      label: <a href="#">LỄ HỘI</a>,
      key: "3",
    },
    {
      label: <a href="#">KHÁC</a>,
      key: "4",
    },
  ];

  const flowers = [
    {
      label: <a href="#">HOA ĐÁM CƯỚI</a>,
      key: "1",
    },
    {
      label: <a href="#">GIỎ HOA</a>,
      key: "2",
    },
    {
      label: <a href="#">HOA ??</a>,
      key: "3",
    },
    {
      label: <a href="#">KHÁC</a>,
      key: "4",
    },
  ];

  return (
    <>
      <header className="header">
        <div className="header__container">
          <div>
            <img
              className="header__container-logo"
              src="./src/components/images/logo.png"
              alt="logo"
            />
          </div>

          <div className="header___container-search">
            <Input
              className="search"
              placeholder="Tìm kiếm"
              prefix={<SearchOutlined />}
            />
          </div>

          <div className="header__login-register">
            <p
              className="header__login-register--seperate"
              onClick={() => {
                navigate("/register");
              }}
            >
              Đăng ký
            </p>
            <p
              onClick={() => {
                navigate("/login");
              }}
            >
              Đăng nhập
            </p>
          </div>
        </div>

        <div className="header__navbar">
          <p className="header__navbar-home">TRANG CHỦ</p>

          <div className="header__navbar-events">
            <Dropdown
              menu={{
                items: events,
              }}
            >
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  SỰ KIỆN
                  <DownOutlined />
                </Space>
              </a>
            </Dropdown>
          </div>

          <div className="header__navbar-flowers">
            <Dropdown
              menu={{
                items: flowers,
              }}
            >
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  CÁC LOẠI HOA
                  <DownOutlined />
                </Space>
              </a>
            </Dropdown>
          </div>

          <p className="header__navbar-us">VỀ CHÚNG TÔI</p>

          <p className="header__navbar-feedback">GÓP Ý</p>
        </div>
      </header>
    </>
  );
}

export default Header;
import React, { useState } from "react";
import AuthenTemplate from "../../components/authen-template/authen-template";
import { Form, Input, Button } from "antd";
import FormItem from "antd/es/form/FormItem";
import { useNavigate } from "react-router-dom";
//import api from "../../config/axios";
const users = [
  { username: "admin", password: "123", role: "admin" },
  { username: "user", password: "123", role: "user" },
];
const Login = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (values) => {
    const { username, password } = values;
    const user = users.find(
      (user) => user.username === username && user.password === password
    );

    if (user.role == "admin") {
      // You can set user role in a global state or context here if needed
      console.log("Logged in as:", user.role);
      navigate("/admin"); // Navigate to home page on success
    } else {
      setError("Tên người dùng hoặc mật khẩu không chính xác.");
    }
  };
  return (
    <>
      <AuthenTemplate>
        <Form
          labelCol={{ span: 24 }}
          onFinish={handleSubmit}
        >
          <h1>Đăng Nhập</h1>
          {error && <div style={{ color: 'red' }}>{error}</div>}
          <FormItem
            className="input-box"
            name="username"
            rules={[
              { required: true, message: "Vui lòng nhập tên người dùng." },
            ]}
          >
            <Input className="input" type="text" placeholder="Tên người dùng" />
          </FormItem>
          <FormItem
            className="input-box"
            name="password"
            rules={[
              { required: true, message: "Vui lòng nhập mật khẩu." },
            ]}
          >
            <Input type="password" placeholder="Mật khẩu" />
          </FormItem>
          <Button htmlType="submit" className="register-login__btn">
            ĐĂNG NHẬP
          </Button>
          <div className="register-login__link">
            <p>
              Chưa có tài khoản?
              <a
                onClick={() => {
                  navigate("/register");
                }}
              >
                Đăng ký
              </a>
            </p>
          </div>
        </Form>
      </AuthenTemplate>
    </>
  );
};

export default Login;

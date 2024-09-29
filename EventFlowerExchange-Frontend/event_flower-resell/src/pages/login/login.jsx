import React, { useState } from "react";
import AuthenTemplate from "../../components/authen-template/authen-template";
import { Form, Input, Button } from "antd";
import FormItem from "antd/es/form/FormItem";
import { useNavigate } from "react-router-dom";
import api from "../../components/config/axios";
import { toast } from "react-toastify";

const Login = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (values) => {
    try {
      const response = await api.post("login", values);
      console.log(response);
      const { role, token } = response.data;
      localStorage.setItem("token", token);

      if (role === "admin") {
        navigate("/dashboard");
      } else {
        navigate("/");
      }
    } catch (err) {
      toast.error(err.response.data);
    }
  };

  return (
    <>
      <AuthenTemplate>
        <Form
          labelCol={{
            span: 24,
          }}
          onFinish={handleLogin}
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
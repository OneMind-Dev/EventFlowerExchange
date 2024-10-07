import React from "react";
import { Form, Input, Button } from "antd";
import FormItem from "antd/es/form/FormItem";
import { useNavigate } from "react-router-dom";
import AuthenTemplate from "../../components/authen-template/authen-template";
import { toast } from "react-toastify";
import api from "../../components/config/axios";

const Register = () => {
  const navigate = useNavigate();

  const handleRegister = async (values) => {
    //submit xuống back-end
    try {
      const response = await api.post("users/register", values);

      toast.success("Successfully register new account");
      navigate("/login");
    } catch (err) {
      toast.error("Error register new account");
    }
  };

  return (
    <>
      <AuthenTemplate>
        <Form
          labelCol={{
            span: 24,
          }}
          onFinish={handleRegister}
        >
          <h1>Đăng Ký</h1>
          <FormItem
            className="input-box"
            name="username"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập tên người dùng.",
              },
            ]}
          >
            <Input className="input" type="text" placeholder="Tên người dùng" />
          </FormItem>

          <FormItem
            className="input-box"
            name="address"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập địa chỉ.",
              },
            ]}
          >
            <Input className="input" type="text" placeholder="địa chỉ" />
          </FormItem>

          <FormItem
            className="input-box"
            name="email"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập email.",
              },
            ]}
          >
            <Input className="input" type="text" placeholder="Email" />
          </FormItem>

          <FormItem
            className="input-box"
            name="phone"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập số điện thoại.",
              },
            ]}
          >
            <Input className="input" type="text" placeholder="Số điện thoại" />
          </FormItem>

          <FormItem
            className="input-box"
            name="password"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập mật khẩu.",
              },
            ]}
          >
            <Input type="password" placeholder="Mật khẩu" />
          </FormItem>

          <Button htmlType="submit" className="register-login__btn">
            ĐĂNG KÝ
          </Button>

          <div className="register-login__link">
            <p>
              Đã có tài khoản?
              <a
                onClick={() => {
                  navigate("/login");
                }}
              >
                Đăng nhập
              </a>
            </p>
          </div>
        </Form>
      </AuthenTemplate>
    </>
  );
};

export default Register;

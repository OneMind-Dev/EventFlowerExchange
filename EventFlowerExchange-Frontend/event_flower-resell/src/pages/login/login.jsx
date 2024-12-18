import AuthenTemplate from "../../components/authen-template/authen-template";
import { Form, Input, Button } from "antd";
import FormItem from "antd/es/form/FormItem";
import { useNavigate } from "react-router-dom";
import api from "../../components/config/axios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { login } from "../../redux/features/userSlice";

const Login = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleLogin = async (values) => {
    try {
      const response = await api.post("auth/login", values);
      toast.success("Đăng nhập thành công");
      console.log(response.data);
      dispatch(login(response.data.result));
      const { role, token } = response.data.result;
      localStorage.setItem("token", token);

      if (role.includes("ADMIN")) {
        console.log("Include");
        navigate("/");
      } else {
        navigate("/");
      }
    } catch (err) {
      toast.error("Đăng nhập thất bại");
      console.log(err);
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
            rules={[{ required: true, message: "Vui lòng nhập mật khẩu." }]}
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

import { useState } from "react";
import Header from "../../../components/header/header";
import Footer from "../../../components/footer/footer";
import "./userInfo.css";
import { Form, Input, Button, Popconfirm } from "antd";
import { FaCircleUser } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../redux/features/userSlice";
import { useNavigate } from "react-router-dom";
import api from "../../../components/config/axios";
import { login } from "../../../redux/features/userSlice";
import { toast } from "react-toastify";

function UserInfo() {
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [editingField, setEditingField] = useState(null);
  const [form] = Form.useForm();

  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  console.log(user.address);

  // const handleLogout = () => {
  //   dispatch(logoutUser());
  // };

  const handleEdit = (field) => {
    setEditingField(field);
  };

  const handleSave = async (userId, field) => {
    try {
      const values = await form.validateFields([field]);
      const updatedField = { [field]: values[field] };

      const response = await api.put(`/users/${userId}`, updatedField);

      console.log(response.data);
      dispatch(login(response.data));
      setEditingField(null);
      toast.success("Cập nhật thông tin thành công");
    } catch (error) {
      console.error(error);
      toast.error("Cập nhật thông tin thất bại");
    }
  };

  const handleCancel = () => {
    setEditingField(null);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarUrl(reader.result); // Update avatarUrl with the new image
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    document.getElementById("fileInput").click();
  };

  return (
    <>
      <Header />
      <div className="wrapper">
        <div className="background">
          <div className="user_container">
            <div className="user_infor">
              {avatarUrl ? (
                <img
                  src={avatarUrl}
                  alt="User Avatar"
                  className="user_avatar"
                />
              ) : (
                <FaCircleUser className="user_icon" />
              )}
              <a className="username" onClick={triggerFileInput}>
                Thay đổi ảnh
              </a>
              <input
                type="file"
                id="fileInput"
                style={{ display: "none" }}
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>
            <div className="user_interact">
              <h3 className="privateInfor">Hồ sơ cá nhân</h3>
              <p>Thay đổi mật khẩu</p>
              <p>Đơn hàng</p>
              {user.role && user.role.includes("SELLER") && (
                <p
                  onClick={() => {
                    navigate("/profile/sellermanage");
                  }}
                >
                  Quản lý sự kiện
                </p>
              )}
              <Popconfirm
                onConfirm={() => dispatch(logout())}
                title="Bạn muốn đăng xuất ?"
              >
                <Button type="primary" danger>
                  ĐĂNG XUẤT
                </Button>
              </Popconfirm>
            </div>
          </div>
          <div className="infor_container">
            <h1>Thông Tin Cá Nhân</h1>
            <Form layout="vertical" form={form}>
              {/* Username */}
              <div className="form-item">
                <label htmlFor="username">Tên tài khoản</label>
                {editingField === "username" ? (
                  <Form.Item
                    name="username"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập tên tài khoản!",
                      },
                    ]}
                  >
                    <Input placeholder="Tên tài khoản" />
                  </Form.Item>
                ) : (
                  <p>{form.getFieldValue("username") || user.username}</p>
                )}
                {editingField === "username" ? (
                  <>
                    <Button
                      type="primary"
                      onClick={() => handleSave(user.userId, "username")}
                    >
                      Lưu
                    </Button>
                    <Button onClick={handleCancel}>Hủy</Button>
                  </>
                ) : (
                  <Button
                    className="edit-button"
                    onClick={() => handleEdit("username")}
                  >
                    Thay đổi
                  </Button>
                )}
              </div>

              {/* Phone */}
              <div className="form-item">
                <label htmlFor="phone">Số điện thoại</label>
                {editingField === "phone" ? (
                  <Form.Item
                    name="phone"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập số điện thoại!",
                      },
                    ]}
                  >
                    <Input placeholder="Số điện thoại" />
                  </Form.Item>
                ) : (
                  <p>{form.getFieldValue("phone") || user.phone}</p>
                )}
                {editingField === "phone" ? (
                  <>
                    <Button
                      type="primary"
                      onClick={() => handleSave(user.userId, "phone")}
                    >
                      Lưu
                    </Button>
                    <Button onClick={handleCancel}>Hủy</Button>
                  </>
                ) : (
                  <Button
                    className="edit-button"
                    onClick={() => handleEdit("phone")}
                  >
                    Thay đổi
                  </Button>
                )}
              </div>
              {/* Email */}
              <div className="form-item">
                <label htmlFor="email">Email</label>
                {editingField === "email" ? (
                  <Form.Item
                    name="email"
                    rules={[
                      { required: true, message: "Vui lòng nhập email!" },
                    ]}
                  >
                    <Input placeholder="Email" />
                  </Form.Item>
                ) : (
                  <p>{form.getFieldValue("email") || user.email}</p>
                )}
                {editingField === "email" ? (
                  <>
                    <Button
                      type="primary"
                      onClick={() => handleSave(user.userId, "email")}
                    >
                      Lưu
                    </Button>
                    <Button onClick={handleCancel}>Hủy</Button>
                  </>
                ) : (
                  <Button
                    className="edit-button"
                    onClick={() => handleEdit("email")}
                  >
                    Thay đổi
                  </Button>
                )}
              </div>
              {/* Address */}
              <div className="form-item">
                <label htmlFor="address">Địa chỉ</label>
                {editingField === "address" ? (
                  <Form.Item
                    name="address"
                    rules={[
                      { required: true, message: "Vui lòng nhập địa chỉ!" },
                    ]}
                  >
                    <Input className="address" placeholder="Địa chỉ" />
                  </Form.Item>
                ) : (
                  <p>{form.getFieldValue("address") || user.address}</p>
                )}
                {editingField === "address" ? (
                  <>
                    <Button
                      type="primary"
                      onClick={() => handleSave(user.userId, "address")}
                    >
                      Lưu
                    </Button>
                    <Button onClick={handleCancel}>Hủy</Button>
                  </>
                ) : (
                  <Button
                    className="edit-button"
                    onClick={() => handleEdit("address")}
                  >
                    Thay đổi
                  </Button>
                )}
              </div>
            </Form>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default UserInfo;

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, Popconfirm, Image } from "antd";
import { FaCircleUser } from "react-icons/fa6";
import { toast } from "react-toastify";
import api from "../../../components/config/axios";
import Header from "../../../components/header/header";
import Footer from "../../../components/footer/footer";
import { logout, login } from "../../../redux/features/userSlice";
import "./userInfo.css";

function UserInfo() {
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [editingField, setEditingField] = useState(null);
  const [form] = Form.useForm();
  const user = useSelector((store) => store.user);
  const [activeSection, setActiveSection] = useState("profile");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleEdit = (field) => {
    setEditingField(field);
  };

  const handleSave = async (userId, field) => {
    try {
      const values = await form.validateFields([field]);

      // Kiểm tra mật khẩu mới khác với mật khẩu cũ nếu đang cập nhật mật khẩu
      if (field === 'password') {
        if (values.newPassword === user.password) {
          console.log(user.password);
          toast.error("Mật khẩu mới không được trùng với mật khẩu cũ!");
          return;
        }
        if (values.newPassword !== values.confirmPassword) {
          toast.error("Mật khẩu xác nhận không khớp với mật khẩu mới!");
          return;
        }
      }

      const updatedField = { [field]: values[field] };
      const response = await api.put(`/users/${userId}`, updatedField);
      dispatch(login(response.data));
      setEditingField(null);
      toast.success("Cập nhật thông tin thành công");
    } catch (error) {
      console.error(error.response?.data || error);
      console.error(error);
      toast.error("Cập nhật thông tin thất bại");
    }
  };

  const handleCancel = () => {
    setEditingField(null);
  };

  const togglePasswordChange = () => {
    setIsPasswordChanging((prev) => !prev);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64Image = reader.result;
        setAvatarUrl(base64Image); // Update local state with new avatar URL
        sessionStorage.setItem("userAvatar", base64Image); // Save to session storage

        // Dispatch custom event to notify Header
        window.dispatchEvent(new Event("avatarUpdated"));

        try {
          const response = await api.put(`/users/${user.userId}`, {
            avatar: base64Image,
          });
          dispatch(login(response.data)); // Update user info in global state
          toast.success("Ảnh đại diện đã được cập nhật thành công!");
        } catch (error) {
          console.error("Error updating avatar:", error);
          toast.error("Cập nhật ảnh đại diện thất bại");
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Function to trigger the file input click
  const triggerFileInput = () => {
    document.getElementById("fileInput").click();
  };

  // Retrieve the avatar from session storage
  useEffect(() => {
    const storedAvatar = sessionStorage.getItem('userAvatar');
    if (storedAvatar) {
      setAvatarUrl(storedAvatar); // Set state from session storage
    }
  }, []);

  return (
    <>
      <Header />
      <div className="wrapper">
        <div className="background">
          <div className="user_container">
            <div className="user_infor">
              {avatarUrl ? (
                <Image src={avatarUrl} alt="User Avatar" className="user_avatar" />
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
              <h3 className="privateInfor">
                Hồ sơ cá nhân
              </h3>
              {user.role?.includes("ADMIN") && (
                <>
                  <p onClick={() => navigate("/dashboard")}>Bảng thống kê</p>
                  <p onClick={() => navigate("/manager")}>Danh sách người dùng</p>
                  <p onClick={() => navigate("/approve")}>Danh sách đăng ký seller</p>
                </>
              )}
              <p
                onClick={() => navigate("/profile/changePassword")}
              >
                Thay đổi mật khẩu
              </p>
              {user.role && user.role.includes("USER") && user.role.includes("SELLER") && (
                <p>Đơn hàng</p>
              )}
              {user.role && user.role.includes("SELLER") && (
                <p onClick={() => navigate("/profile/sellermanage")}>
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
              <>
                <div className="form-item">
                  <label htmlFor="username">Tên tài khoản</label>
                  <p>{user.username}</p>
                </div>
                <div className="form-item">
                  <label htmlFor="phone">Số điện thoại</label>
                  {editingField === "phone" ? (
                    <Form.Item
                      name="phone"
                      rules={[{ required: true, message: "Vui lòng nhập số điện thoại!" }]}
                    >
                      <Input placeholder="Số điện thoại" defaultValue={user.phone} />
                    </Form.Item>
                  ) : (
                    <p>{user.phone}</p>
                  )}
                  {editingField === "phone" ? (
                    <>
                      <Button type="primary" onClick={() => handleSave(user.userId, "phone")}>
                        Lưu
                      </Button>
                      <Button onClick={handleCancel}>Hủy</Button>
                    </>
                  ) : (
                    <Button className="edit-button" onClick={() => handleEdit("phone")}>
                      Thay đổi
                    </Button>
                  )}
                </div>
                <div className="form-item">
                  <label htmlFor="email">Email</label>
                  {editingField === "email" ? (
                    <Form.Item
                      name="email"
                      rules={[{ required: true, message: "Vui lòng nhập email!" }]}
                    >
                      <Input placeholder="Email" defaultValue={user.email} />
                    </Form.Item>
                  ) : (
                    <p>{user.email}</p>
                  )}
                  {editingField === "email" ? (
                    <>
                      <Button type="primary" onClick={() => handleSave(user.userId, "email")}>
                        Lưu
                      </Button>
                      <Button onClick={handleCancel}>Hủy</Button>
                    </>
                  ) : (
                    <Button className="edit-button" onClick={() => handleEdit("email")}>
                      Thay đổi
                    </Button>
                  )}
                </div>
                <div className="form-item">
                  <label htmlFor="address">Địa chỉ</label>
                  {editingField === "address" ? (
                    <Form.Item
                      name="address"
                      rules={[{ required: true, message: "Vui lòng nhập địa chỉ!" }]}
                    >
                      <Input placeholder="Địa chỉ" defaultValue={user.address} />
                    </Form.Item>
                  ) : (
                    <p>{user.address}</p>
                  )}
                  {editingField === "address" ? (
                    <>
                      <Button type="primary" onClick={() => handleSave(user.userId, "address")}>
                        Lưu
                      </Button>
                      <Button onClick={handleCancel}>Hủy</Button>
                    </>
                  ) : (
                    <Button className="edit-button" onClick={() => handleEdit("address")}>
                      Thay đổi
                    </Button>
                  )}
                </div>
              </>
            </Form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default UserInfo;

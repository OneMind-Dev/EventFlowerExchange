import React, { useState } from "react";
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";
import "./userProfile.css";
import { Form, Input, Button, Popconfirm } from "antd";
import { FaCircleUser } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { logout, logoutUser } from "../../redux/features/userSlice";

function UserProfile() {
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [editingField, setEditingField] = useState(null); // Track which field is being edited
  const [form] = Form.useForm();

  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  const handleEdit = (field) => {
    setEditingField(field); // Set the field to edit
  };

  const handleSave = (field) => {
    form
      .validateFields([field])
      .then((values) => {
        console.log(`Saved ${field}:`, values[field]);
        setEditingField(null); // Stop editing after saving
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  const handleCancel = () => {
    setEditingField(null); // Cancel editing
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
              <Popconfirm onConfirm={handleLogout} title="Bạn muốn đăng xuất ?">
                <Button type="primary" danger>
                  ĐĂNG XUẤT
                </Button>
              </Popconfirm>
            </div>
          </div>
          <div className="infor_container">
            <h1>Thông tin cá nhân</h1>
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
                      onClick={() => handleSave("username")}
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
                    <Button type="primary" onClick={() => handleSave("phone")}>
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
                    <Button type="primary" onClick={() => handleSave("email")}>
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
                      onClick={() => handleSave("address")}
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

export default UserProfile;

// import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import api from "../../components/config/axios";
// import { updateUserInfo } from "../../redux/features/userSlice";

// const UserProfile = () => {
//   const user = useSelector((store) => store.user); // Lấy thông tin user từ Redux
//   const dispatch = useDispatch();

//   // Tạo state để lưu thông tin form
//   const [formData, setFormData] = useState({
//     username: user?.username || "",
//     email: user?.email || "",
//     phone: user?.phone || "",
//     address: user?.address || "",
//   });

//   // Tạo state để lưu trạng thái thành công hoặc thất bại
//   const [status, setStatus] = useState("");

//   // Xử lý khi thay đổi dữ liệu form
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   // Xử lý khi nhấn nút "Save"
//   const handleSave = async () => {
//     try {
//       // Gọi API PUT để cập nhật thông tin user
//       const response = await api.put(`users/${user.userId}`, formData);

//       // Cập nhật thông tin người dùng trong Redux nếu API thành công
//       if (response.status === 200) {
//         dispatch(updateUserInfo(formData));
//         setStatus("Cập nhật thông tin thành công!");
//       }
//     } catch (error) {
//       console.error("Lỗi khi cập nhật thông tin:", error);
//       setStatus("Cập nhật thông tin thất bại!");
//     }
//   };

//   return (
//     <div>
//       <h2>User Information</h2>
//       <form>
//         <div>
//           <label>Username:</label>
//           <input
//             type="text"
//             name="username"
//             value={formData.username}
//             onChange={handleChange}
//           />
//         </div>
//         <div>
//           <label>Email:</label>
//           <input
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//           />
//         </div>
//         <div>
//           <label>Phone:</label>
//           <input
//             type="text"
//             name="phone"
//             value={formData.phone}
//             onChange={handleChange}
//           />
//         </div>
//         <div>
//           <label>Address:</label>
//           <input
//             type="text"
//             name="address"
//             value={formData.address}
//             onChange={handleChange}
//           />
//         </div>
//         <button type="button" onClick={handleSave}>
//           Save
//         </button>
//       </form>

//       {/* Hiển thị trạng thái sau khi lưu */}
//       {status && <p>{status}</p>}
//     </div>
//   );
// };

// export default UserProfile;

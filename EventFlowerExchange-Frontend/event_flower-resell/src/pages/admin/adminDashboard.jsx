// src/pages/admin/AdminDashboard.jsx
import React from "react";
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";
<<<<<<< Updated upstream
import Dashboard from "../../components/admin/dashboard"; // Đảm bảo đường dẫn đúng với chữ "D" viết hoa
import { useNavigate } from "react-router-dom"; // Import hook useNavigate
import '../../components/admin/admin.css'; // Import file CSS

const AdminDashboard = () => {
  const navigate = useNavigate(); // Khởi tạo hàm navigate

=======
import Dashboard from "../../components/admin/dashboard";
import { useNavigate } from "react-router-dom";
import "../../components/admin/admin.css";
const AdminDashboard = () => {
  const navigate = useNavigate();
>>>>>>> Stashed changes
  return (
    <>
      <Header />
      <div className="admin-container">
        <h1 className="title">Dashboard</h1>
        <div className="dashboard-content">
          <div className="left-content">
<<<<<<< Updated upstream
            <button
              onClick={() => navigate("/admin")}
              className="admin-button"
            >
              User List
            </button>
            {/* Bạn có thể thêm thêm các thành phần khác ở đây nếu cần */}
=======
            <button onClick={() => navigate("/admin")} className="admin-button">
              User List
            </button>
>>>>>>> Stashed changes
          </div>
          <div className="right-content">
            <Dashboard />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AdminDashboard;

// src/pages/admin/AdminDashboard.jsx
import React from "react";
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";
import Dashboard from "../../components/admin/dashboard"; // Đảm bảo đường dẫn đúng với chữ "D" viết hoa
import { useNavigate } from "react-router-dom"; // Import hook useNavigate
import "../../components/admin/admin.css"; // Import file CSS

const AdminDashboard = () => {
  const navigate = useNavigate(); // Khởi tạo hàm navigate

  return (
    <>
      <Header />
      <div className="admin-container">
        <h1 className="title">Dashboard</h1>
        <div className="dashboard-content">
          <div className="left-content">
            <button onClick={() => navigate("/admin")} className="admin-button">
              User List
            </button>
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

import React from "react";
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";
import Dashboard from "../../components/admin/dashboard"; // Ensure path is correct
import { useNavigate } from "react-router-dom"; // Import navigate hook
import "../../components/admin/admin.css"; // Import CSS file

const AdminDashboard = () => {
  const navigate = useNavigate(); // Initialize navigate function

  return (
    <>
      <Header />
      <div className="admin-container">
        <h1 className="title">Bảng thống kê</h1>
        <div className="dashboard-content">
          <div className="left-content">
            <button onClick={() => navigate("/manager")} className="user-button">
              User List
            </button>
            <button onClick={() => navigate("/approve")} className="seller-button">
              Seller List
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

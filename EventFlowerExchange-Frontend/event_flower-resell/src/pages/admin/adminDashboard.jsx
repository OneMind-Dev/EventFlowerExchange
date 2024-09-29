import React from "react";
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";
import { useNavigate } from "react-router-dom"; // Import the useNavigate hook

const AdminDashboard = () => {
  const navigate = useNavigate(); // Initialize the navigate function

  return (
    <>
      <Header />
      Dashboard
      <button onClick={() => {
        navigate("/admin")
      }}>User List</button>
      <Footer />
    </>
  );
};

export default AdminDashboard;

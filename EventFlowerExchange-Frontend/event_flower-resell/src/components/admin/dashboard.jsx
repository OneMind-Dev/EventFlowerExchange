import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import "../admin/admin.css"; // Import CSS file
import api from "../../components/config/axios";

const COLORS = ["#00C49F", "#FF7F50", "#27A4F2"]; // Added a third color for SELLER

function Dashboard() {
  const [data, setData] = useState([
    { name: "Người dùng", value: 0 },
    { name: "Bị Ban", value: 0 },
    { name: "Người bán", value: 0 }, // Changed to "Người bán" to reflect seller role
  ]);

  // Fetch user data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await api.get("/users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("API Response Data:", response.data);
        if (response.data) {
          const registeredCount = response.data.result.filter(
            (user) => user.status === true
          ).length;

          const bannedCount = response.data.result.filter(
            (user) => user.status === false
          ).length;

          // Count users with role "SELLER"
          const sellerCount = response.data.result.filter(
            (user) => user.role.includes("SELLER") // Check if 'SELLER' is in the role array
          ).length;

          setData([
            { name: "Người dùng", value: registeredCount },
            { name: "Bị Ban", value: bannedCount },
            { name: "Người bán", value: sellerCount }, // Update SELLER count
          ]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="dashboard-container">
      <h2 className="title">Thống Kê Người Đăng Ký</h2>
      <PieChart width={650} height={400}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
          outerRadius={150}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
}

export default Dashboard;

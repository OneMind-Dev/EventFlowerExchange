import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import "../admin/admin.css"; // Import file CSS

const data = [
  { name: "Đã Đăng Ký", value: 400 },
  { name: "Khách Truy Cập", value: 600 },
];

const COLORS = ["#0088FE", "#00C49F"];

function Dashboard() {
  return (
    <div className="dashboard-container">
      <h2 className="title">Thống Kê Người Đăng Ký</h2>
      <PieChart width={400} height={400}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({ name, percent }) =>
            `${name}: ${(percent * 100).toFixed(0)}%`
          }
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

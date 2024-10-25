import React, { useState, useEffect } from "react";
import { Input, Button, Space, Table, Tag, message, Spin } from "antd";
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";
import api from "../../components/config/axios";
import "../../components/admin/admin.css";

function AdminManagers() {
  const [data, setData] = useState([]); // State to hold user data
  const [filteredData, setFilteredData] = useState([]); // State for filtered users
  const [loading, setLoading] = useState(true); // State to handle loading
  const [error, setError] = useState(null); // State to handle errors
  const [searchTerm, setSearchTerm] = useState(""); // State for search term

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await api.get("/users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const usersWithKey = response.data.result.map((user) => ({
          ...user,
          key: user.userId || user.email,
        }));
        setData(usersWithKey);
        setFilteredData(usersWithKey); // Set the initial filtered data to all users
      } catch (err) {
        console.error("Error fetching users:", err);
        setError(err);
        message.error("Failed to load users.");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  // Search handler function
  const handleSearch = () => {
    const filteredUsers = data.filter(
      (user) =>
        user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filteredUsers);
  };

  // Function to toggle Ban/Unban user
  const toggleBanStatus = async (userId, status) => {
    try {
      const token = localStorage.getItem("token");
      // If the user is inactive (banned), call the unban API, otherwise call the ban API
      const action = status ? "ban" : "unban";
      const apiUrl = `http://localhost:8080/swp391/users/${action}/${userId}`;

      await api.post(apiUrl, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      message.success(`${status ? "Banned" : "Unbanned"} user successfully!`);

      // Update the local state to reflect the status change
      setData((prevData) =>
        prevData.map((user) =>
          user.userId === userId ? { ...user, status: !status } : user
        )
      );
      setFilteredData((prevFilteredData) =>
        prevFilteredData.map((user) =>
          user.userId === userId ? { ...user, status: !status } : user
        )
      );
    } catch (err) {
      console.error("Error updating user status:", err);
      message.error(`Failed to ${status ? "ban" : "unban"} user.`);
    }
  };


  const columns = [
    { title: "Username", dataIndex: "username", key: "username" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Address", dataIndex: "address", key: "address" },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      render: (_, { status }) => {
        let displayStatus = status === true ? "ACTIVE" : "INACTIVE";
        let color = status === true ? "green" : "red";
        return <Tag color={color}>{displayStatus}</Tag>;
      },
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a
            onClick={() => toggleBanStatus(record.userId, record.status)}
          >
            {record.status === true ? "Ban" : "Unban"}
          </a>
        </Space>
      ),
    },
  ];

  if (loading) {
    return (
      <div>
        <Header />
        <div className="admin-container">
          <Spin tip="Loading users..." />
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <Header />
        <div className="admin-container">
          <p>There was an error loading the users.</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div className="admin-container">
        <h1 className="title">Users List</h1>
        {/* Search Bar */}
        <div className="search-container">
          <Input
            placeholder="Search by username or email"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: 200, marginRight: 10 }}
          />
          <Button type="primary" onClick={handleSearch}>
            Search
          </Button>
        </div>
        {/* Users Table */}
        <div className="table-container">
          <Table columns={columns} dataSource={filteredData} />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default AdminManagers;


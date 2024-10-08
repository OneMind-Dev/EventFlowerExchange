import React from "react";
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";
import { Space, Table, Tag } from "antd";
import "../../components/admin/admin.css";

function Admin() {
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      render: (_, { status }) => {
        let color = status;
        if (status === "Active") {
          color = "green";
        } else {
          color = "red";
        }
        return (
          <Tag color={color} key={status}>
            {status.toUpperCase()}
          </Tag>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a>{record.status === "Active" ? "Ban" : "Unban"}</a>
        </Space>
      ),
    },
  ];
  const data = [
    {
      key: "1",
      name: "nibba",
      email: "quyendanchu404@black.man",
      address: "New York No. 1 Lake Park",
      status: "Active",
    },
    {
      key: "2",
      name: "littleboy",
      email: "shadowjutsu@nuclear.boom",
      address: "London No. 1 Lake Park",
      status: "InActive",
    },
    {
      key: "3",
      name: "china",
      email: "badluckifitsagirl@reincarnation",
      address: "Sydney No. 1 Lake Park",
      status: "Active",
    },
  ];
  return (
    <div>
      <Header />
      <div className="admin-container">
        <h1 className="title">Users List</h1>
        <div className="table-container">
          <Table columns={columns} dataSource={data} />;
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Admin;

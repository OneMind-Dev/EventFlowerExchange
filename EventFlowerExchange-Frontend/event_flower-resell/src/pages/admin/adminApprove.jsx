import React, { useEffect, useState } from 'react';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import "../../components/admin/admin.css";
import api from "../../components/config/axios";  // Assuming 'api' is set up with axios instance
import { Input, Button, Space, Table, Tag, message, Spin } from "antd";
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';  // Import checkmark and close icons

function AdminApprove() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [confirmedIds, setConfirmedIds] = useState(new Set()); // State to track confirmed IDs
    const [declinedIds, setDeclinedIds] = useState(new Set()); // State to track declined IDs

    // Fetch data from the API
    const fetchData = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem("token");
            const response = await api.get("/admin/registerForm", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setData(response.data.result);
        } catch (error) {
            message.error("Failed to fetch data. Please try again.");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
        const confirmedIdsFromStorage = JSON.parse(localStorage.getItem("confirmedIds")) || [];
        setConfirmedIds(new Set(confirmedIdsFromStorage));
        const declinedIdsFromStorage = JSON.parse(localStorage.getItem("declinedIds")) || [];
        setDeclinedIds(new Set(declinedIdsFromStorage));
    }, []);

    const columns = [
        { title: "Id", dataIndex: "id", key: "id" },
        { title: "Username", dataIndex: "username", key: "username" },
        { title: "CitizenId", dataIndex: "citizenId", key: "citizenId" },
        {
            title: "Image",
            dataIndex: "image",
            key: "image",
            render: (image) => image ? <img src={image} alt="user" style={{ width: 50, height: 50 }} /> : "No Image"
        },
        {
            title: "Action",
            key: "action",
            render: (_, record) => (
                <Space size="middle">
                    {confirmedIds.has(record.id) ? (  // Check if ID is confirmed
                        <CheckCircleOutlined style={{ color: 'green' }} />  // Show checkmark icon
                    ) : declinedIds.has(record.id) ? (  // Check if ID is declined
                        <CloseCircleOutlined style={{ color: 'red' }} />  // Show red X icon
                    ) : (
                        <>
                            <Button type="primary" onClick={() => handleConfirm(record.id)}>Confirm</Button>
                            <Button type="danger" onClick={() => handleDecline(record.id)}>Decline</Button>
                        </>
                    )}
                </Space>
            ),
        },
    ];

    const handleConfirm = async (formId) => {
        try {
            const token = localStorage.getItem("token");
            const response = await api.post(`/admin/approveRegistration/${formId}`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log("API Response:", response); // Log the entire response object
            if (response.data && response.data.code === 1000) {
                const updatedConfirmedIds = new Set(confirmedIds).add(formId);
                setConfirmedIds(updatedConfirmedIds);
                localStorage.setItem("confirmedIds", JSON.stringify(Array.from(updatedConfirmedIds)));
                fetchData();
            } else {
                console.error("Error response:", response.data);
                message.error("Failed to confirm registration.");
            }
        } catch (error) {
            message.error("Error confirming registration. Please try again.");
            console.error("Error details:", error);
        }
    };

    const handleDecline = async (formId) => {
        try {
            const token = localStorage.getItem("token");
            const response = await api.post(`/admin/rejectRegistration/${formId}`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.data.code === 1000) {
                const updatedDeclinedIds = new Set(declinedIds).add(formId);
                setDeclinedIds(updatedDeclinedIds);
                localStorage.setItem("declinedIds", JSON.stringify(Array.from(updatedDeclinedIds)));
                message.success("Registration declined successfully!");
                fetchData();  // Refresh the data after cancelling
            } else {
                console.error("Error response:", response.data);
                message.error("Failed to cancel registration.");
            }
        } catch (error) {
            message.error("Error cancelling registration. Please try again.");
            console.error(error);
        }
    };

    return (
        <div>
            <Header />
            <div className="admin-container">
                <h1 className="title">Danh sách đăng ký seller</h1>
                <div className="table-container">
                    {loading ? <Spin size="large" /> : <Table columns={columns} dataSource={data} rowKey="id" />}
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default AdminApprove;

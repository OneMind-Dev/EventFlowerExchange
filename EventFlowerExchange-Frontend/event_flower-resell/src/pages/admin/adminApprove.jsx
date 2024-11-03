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
    const [reasonData, setReasonData] = useState({}); // Store reasons for each record
    const addNewItem = (newItem) => {
        setData((prevData) => [newItem, ...prevData]); // Add new item at the beginning
    };

    useEffect(() => {
        fetchData();
        const confirmedIdsFromStorage = JSON.parse(localStorage.getItem("confirmedIds")) || [];
        setConfirmedIds(new Set(confirmedIdsFromStorage));
        const declinedIdsFromStorage = JSON.parse(localStorage.getItem("declinedIds")) || [];
        setDeclinedIds(new Set(declinedIdsFromStorage));
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem("token");
            const response = await api.get("/admin/registerForm", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log("Fetched Data:", response.data.result); // Log fetched data

            setData(response.data.result);

            // Set reasons if they exist in the response
            const reasons = {};
            response.data.result.forEach(item => {
                // Parse the rejectionReason and extract the reason if it exists
                const reasonObj = item.rejectionReason ? JSON.parse(item.rejectionReason) : null;
                reasons[item.id] = reasonObj ? reasonObj.reason : ""; // Default to empty string if no reason
            });
            setReasonData(reasons);
        } catch (error) {
            message.error("Failed to fetch data. Please try again.");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    // Columns configuration
    const columns = [
        { title: "Id", dataIndex: "id", key: "id" },
        { title: "Username", dataIndex: "username", key: "username" },
        { title: "CitizenId", dataIndex: "citizenId", key: "citizenId" },
        {
            title: "Image",
            dataIndex: "image",
            key: "image",
            render: (image) => image ? <img src={image} alt="user" style={{ width: 50, height: 50 }} /> : "No Image",
        },
        {
            title: "Reason",
            dataIndex: "reason",
            key: "reason",
            render: (_, record) => (
                <Input
                    placeholder="Enter reason"
                    value={reasonData[record.id] || ""}
                    onChange={(e) => handleReasonChange(record.id, e.target.value)}
                    disabled={confirmedIds.has(record.id) || declinedIds.has(record.id)} // Disable input if confirmed and decline
                />
            ),
        },
        {
            title: "Action",
            key: "action",
            render: (_, record) => (
                <Space size="middle">
                    {confirmedIds.has(record.id) ? (
                        <CheckCircleOutlined style={{ color: 'green' }} />
                    ) : declinedIds.has(record.id) ? (
                        <CloseCircleOutlined style={{ color: 'red' }} />
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

    // Handle reason input change
    const handleReasonChange = (id, value) => {
        setReasonData(prev => ({ ...prev, [id]: value }));
    };

    // Handle confirm function
    const handleConfirm = async (formId) => {
        try {
            const token = localStorage.getItem("token");
            const response = await api.post(`/admin/approveRegistration/${formId}`, {}, {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (response.data && response.data.code === 1000) {
                setConfirmedIds(prevIds => {
                    const updatedIds = new Set(prevIds);
                    updatedIds.add(formId);
                    localStorage.setItem("confirmedIds", JSON.stringify(Array.from(updatedIds)));
                    return updatedIds;
                });
                fetchData(); // Refresh data to update UI
            } else {
                message.error("Failed to confirm registration.");
            }
        } catch (error) {
            message.error("Error confirming registration. Please try again.");
        }
    };

    // Handle decline function with reason validation
    const handleDecline = async (formId) => {
        // Check if the reason is provided
        if (!reasonData[formId]) {
            message.warning("Please provide a reason before declining.");
            return;
        }

        try {
            // Get the token from local storage
            const token = localStorage.getItem("token");

            // Prepare the API request
            const response = await api.post(`/admin/rejectRegistration/${formId}`,
                { reason: reasonData[formId] }, // Include the reason in the payload
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            // Check if the response indicates a successful decline
            if (response.data && response.data.code === 1000) {
                setDeclinedIds(prevIds => {
                    const updatedIds = new Set(prevIds);
                    updatedIds.add(formId);
                    localStorage.setItem("declinedIds", JSON.stringify(Array.from(updatedIds)));
                    return updatedIds;
                });
                fetchData(); // Refresh data to update UI
            } else {
                message.error("Failed to decline registration.");
            }
        } catch (error) {
            message.error("Error declining registration. Please try again.");
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

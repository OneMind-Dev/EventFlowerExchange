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
    const [confirmedIds, setConfirmedIds] = useState(new Set()); // Track confirmed IDs
    const [declinedIds, setDeclinedIds] = useState(new Set()); // Track declined IDs
    const [reasonData, setReasonData] = useState({}); // Store reasons for each record
    const token = localStorage.getItem("token");
    useEffect(() => {
        fetchData();

    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {

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
        }
    ];

    // Handle reason input change
    const handleReasonChange = (id, value) => {
        setReasonData(prev => ({ ...prev, [id]: value }));
    };

    // Function to handle confirmation of registration
    const handleConfirm = async (formId) => {
        try {
            // Set the authorization token (you need to replace 'yourToken' with the actual token you are using)
            const config = {
                headers: { Authorization: `Bearer ${token}` },
            };

            // Make API request to confirm registration
            const response = await api.post(`admin/approveRegistration/${formId}`, {}, config);

            // Check if the response indicates success
            if (response.status === 200) {
                // Update the confirmed IDs state
                setConfirmedIds((prev) => new Set(prev).add(formId));
                console.log(response.data);
                toast.success('Confirmation successful!');
            }
        } catch (error) {
            // Handle any errors that occur during the request
            toast.error(error.message || 'Confirmation failed, please try again.');
        }
    };

    // Function to handle declining registration
    const handleDecline = async (formId) => {
        // Check if the reason is provided
        if (!reasonData[formId]) {
            toast.error('Please enter a reason before declining.');
            return;
        }

        try {
            // Set the authorization token (you need to replace 'yourToken' with the actual token you are using)
            const config = {
                headers: { Authorization: `Bearer ${token}` },
            };

            // Make API request to decline registration with reason
            const response = await api.post(`admin/rejectRegistration/${formId}`, {
                reason: reasonData[formId],
            }, config);

            // Check if the response indicates success
            if (response.status === 200) {
                // Update the declined IDs state
                setDeclinedIds((prev) => new Set(prev).add(formId));
                toast.success('Decline successful!');
            }
        } catch (error) {
            // Handle any errors that occur during the request
            toast.error(error.message || 'Decline failed, please try again.');
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

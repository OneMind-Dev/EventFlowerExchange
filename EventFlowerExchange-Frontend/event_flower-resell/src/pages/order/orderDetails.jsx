import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from "../../components/config/axios";
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import { useSelector } from "react-redux";
import { Table } from "antd";
import "./orderDetails.css";

function OrderDetails() {
    const { orderId } = useParams(); // Lấy orderId từ URL
    const [orderDetails, setOrderDetails] = useState([]);
    const [loading, setLoading] = useState(true);
    const user = useSelector((store) => store.user);

    useEffect(() => {
        const fetchOrderDetails = async () => {
            try {
                const response = await api.get(`/order/detail/${orderId}`, {
                    headers: {
                        Authorization: `Bearer ${user?.token}`, // Thêm token vào header
                    },
                });
                setOrderDetails(response.data); // Lưu dữ liệu vào state
            } catch (error) {
                console.error("Error fetching order details:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchOrderDetails();
    }, [orderId, user?.token]);

    // Cấu hình cột cho Ant Design Table
    const columns = [
        {
            title: 'Sự kiện',
            dataIndex: 'eventName',
            key: 'eventName',
        },
        {
            title: 'Tên hoa',
            dataIndex: 'flowerName',
            key: 'flowerName',
        },
        {
            title: 'Số lượng',
            dataIndex: 'quantity',
            key: 'quantity',
            render: (quantity) => <span>{quantity}</span>, // Custom render nếu cần
        },
        {
            title: 'Giá',
            dataIndex: 'price',
            key: 'price',
            render: (price) => <span>{price.toLocaleString()} VNĐ</span>, // Hiển thị giá với định dạng tiền tệ
        },
    ];

    if (loading) {
        return <div className="loading-message">Đang tải...</div>; // Hiển thị khi dữ liệu đang được tải
    }

    return (
        <>
            <Header />
            <div className="order-details-container">
                <h1>Chi tiết đơn hàng #{orderId}</h1>
                {orderDetails.length > 0 ? (
                    <Table
                        columns={columns}
                        dataSource={orderDetails}
                        rowKey="orderDetailId" // Khóa duy nhất cho từng hàng
                        pagination={{ pageSize: 5 }} // Phân trang, hiển thị 5 hàng mỗi trang
                        bordered
                    />
                ) : (
                    <div className="no-data">Không có dữ liệu chi tiết cho đơn hàng này.</div>
                )}
            </div>
            <Footer />
        </>
    );
}

export default OrderDetails;
